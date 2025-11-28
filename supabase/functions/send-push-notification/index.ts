// ============================================================================
// EDGE FUNCTION: Enviar Web Push Notifications
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuración VAPID
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || 'BPOLy4-xme3o_x7oKHjjqkl4SNbICUfWZm5MTWAaqZnrTFyi_T6q7BUZPzDOfxwlYfUISxJU8KbgihmN8373RMU';
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_SUBJECT = 'mailto:admin@antoniotorresaraujo.edu.pe';

interface PushPayload {
  type: 'mensaje_soporte' | 'incidencia' | 'solicitud' | 'respuesta';
  user_id: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

// Función para convertir base64url a Uint8Array
function base64UrlToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

// Función para crear el JWT para VAPID
async function createVapidJwt(endpoint: string): Promise<string> {
  const urlObj = new URL(endpoint);
  const audience = `${urlObj.protocol}//${urlObj.host}`;
  
  const header = { alg: 'ES256', typ: 'JWT' };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 horas
    sub: VAPID_SUBJECT
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const signatureInput = `${headerB64}.${payloadB64}`;
  
  // Importar la clave privada VAPID
  const privateKeyData = base64UrlToUint8Array(VAPID_PRIVATE_KEY);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    privateKeyData,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    encoder.encode(signatureInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

// Enviar Web Push
async function sendWebPush(
  endpoint: string, 
  p256dh: string, 
  auth: string, 
  payload: object
): Promise<{ success: boolean; expired?: boolean }> {
  try {
    const payloadString = JSON.stringify(payload);
    const encoder = new TextEncoder();
    const payloadBytes = encoder.encode(payloadString);

    // Crear JWT para VAPID
    const jwt = await createVapidJwt(endpoint);
    
    // Headers para Web Push
    const headers: Record<string, string> = {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      'TTL': '86400',
      'Urgency': 'high',
      'Authorization': `vapid t=${jwt}, k=${VAPID_PUBLIC_KEY}`,
    };

    // Por simplicidad, enviamos sin encriptar (algunos navegadores lo aceptan)
    // Para producción completa se necesitaría implementar encriptación aes128gcm
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TTL': '86400',
        'Urgency': 'high',
      },
      body: payloadString
    });

    if (response.ok || response.status === 201) {
      return { success: true };
    }

    if (response.status === 410 || response.status === 404) {
      console.log('Suscripción expirada:', endpoint);
      return { success: false, expired: true };
    }

    console.error('Error HTTP:', response.status, await response.text());
    return { success: false };
  } catch (error) {
    console.error('Error enviando push:', error);
    return { success: false };
  }
}

Deno.serve(async (req) => {
  // Manejar CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const payload: PushPayload = await req.json();
    console.log('📬 Recibido payload:', JSON.stringify(payload));

    if (!payload.user_id || !payload.title) {
      return new Response(
        JSON.stringify({ error: 'user_id y title son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear cliente Supabase con service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Obtener suscripciones push del usuario
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', payload.user_id)
      .eq('activa', true);

    if (error) {
      console.error('Error obteniendo suscripciones:', error);
      return new Response(
        JSON.stringify({ error: 'Error obteniendo suscripciones' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No hay suscripciones activas para usuario:', payload.user_id);
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: 'No hay suscripciones activas' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📱 Encontradas ${subscriptions.length} suscripciones`);

    // Preparar payload de la notificación
    const notificationPayload = {
      title: payload.title,
      body: payload.body,
      icon: '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
      badge: '/assets/images/INSIGNIA_I.E.ANTONIO_TORRES_ARAUJO.png',
      tag: `ata-${payload.type}-${Date.now()}`,
      requireInteraction: true,
      vibrate: [200, 100, 200],
      data: {
        url: '/',
        type: payload.type,
        ...payload.data
      }
    };

    // Enviar a todas las suscripciones
    let sent = 0;
    let failed = 0;
    const expiredSubscriptions: string[] = [];

    for (const sub of subscriptions) {
      const result = await sendWebPush(
        sub.endpoint,
        sub.p256dh,
        sub.auth,
        notificationPayload
      );
      
      if (result.success) {
        sent++;
      } else {
        failed++;
        if (result.expired) {
          expiredSubscriptions.push(sub.id);
        }
      }
    }

    // Desactivar suscripciones expiradas
    if (expiredSubscriptions.length > 0) {
      await supabase
        .from('push_subscriptions')
        .update({ activa: false })
        .in('id', expiredSubscriptions);
      
      console.log(`🗑️ Desactivadas ${expiredSubscriptions.length} suscripciones expiradas`);
    }

    console.log(`✅ Enviadas: ${sent}, Fallidas: ${failed}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent, 
        failed,
        total: subscriptions.length 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );

  } catch (error) {
    console.error('Error en Edge Function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})
