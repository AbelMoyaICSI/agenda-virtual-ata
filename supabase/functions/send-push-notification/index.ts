// ============================================================================
// EDGE FUNCTION: Enviar Web Push Notifications
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// Implementación manual compatible con Deno
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configurar VAPID - DEBEN coincidir con las del frontend
const VAPID_PUBLIC_KEY = 'BPOLy4-xme3o_x7oKHjjqkl4SNbICUfWZm5MTWAaqZnrTFyi_T6q7BUZPzDOfxwlYfUISxJU8KbgihmN8373RMU';
const VAPID_PRIVATE_KEY = '-tIOH_C4F106Uq-Ev4mbqhGadV8qajcd27PWd7R5Tfg';
const VAPID_SUBJECT = 'mailto:agenda.ata@gmail.com';

interface PushPayload {
  type: string;
  user_id: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

interface PushSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  activa: boolean;
}

// Utilidades Base64 URL-safe
function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Crear JWT para VAPID
async function createVapidJwt(audience: string): Promise<string> {
  const header = { typ: 'JWT', alg: 'ES256' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    aud: audience,
    exp: now + 12 * 60 * 60, // 12 horas
    sub: VAPID_SUBJECT
  };

  const headerB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const unsignedToken = `${headerB64}.${payloadB64}`;

  // Importar clave privada VAPID
  const privateKeyBytes = base64UrlDecode(VAPID_PRIVATE_KEY);
  
  // Crear la clave en formato JWK
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    d: VAPID_PRIVATE_KEY,
    x: VAPID_PUBLIC_KEY.substring(0, 43),
    y: VAPID_PUBLIC_KEY.substring(43)
  };

  const cryptoKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const signatureB64 = base64UrlEncode(new Uint8Array(signature));
  return `${unsignedToken}.${signatureB64}`;
}

// Enviar Web Push sin encriptación (notificación simple)
async function sendWebPush(subscription: PushSubscription, payload: string): Promise<boolean> {
  try {
    const url = new URL(subscription.endpoint);
    const audience = `${url.protocol}//${url.host}`;
    
    const jwt = await createVapidJwt(audience);
    
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `vapid t=${jwt}, k=${VAPID_PUBLIC_KEY}`,
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'aes128gcm',
        'TTL': '86400',
        'Urgency': 'high'
      },
      body: payload
    });

    if (response.status === 201) {
      return true;
    } else if (response.status === 410 || response.status === 404) {
      console.log(`Suscripción expirada: ${subscription.id}`);
      return false;
    } else {
      const text = await response.text();
      console.error(`Error ${response.status}: ${text}`);
      return false;
    }
  } catch (error) {
    console.error('Error en sendWebPush:', error);
    return false;
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

    // Crear cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Obtener suscripciones del usuario
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', payload.user_id)
      .eq('activa', true);

    if (error) {
      console.error('Error obteniendo suscripciones:', error);
      return new Response(
        JSON.stringify({ error: 'Error obteniendo suscripciones', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No hay suscripciones activas para:', payload.user_id);
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: 'No hay suscripciones' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📱 Encontradas ${subscriptions.length} suscripciones`);

    // Preparar el payload de la notificación
    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: payload.type || 'notification',
      data: {
        type: payload.type,
        url: '/',
        timestamp: Date.now(),
        ...payload.data
      }
    });

    // Enviar a todas las suscripciones
    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions as PushSubscription[]) {
      try {
        const success = await sendWebPush(sub, notificationPayload);
        
        if (success) {
          console.log(`✅ Push enviado a: ${sub.id}`);
          sent++;
        } else {
          console.log(`❌ Error enviando a ${sub.id}`);
          failed++;
          
          // Desactivar suscripción inválida
          await supabase
            .from('push_subscriptions')
            .update({ activa: false })
            .eq('id', sub.id);
          console.log(`🗑️ Desactivando suscripción: ${sub.id}`);
        }
      } catch (pushError: any) {
        console.error(`❌ Error con ${sub.id}:`, pushError.message);
        failed++;
      }
    }

    console.log(`📊 Resultado: ${sent} enviadas, ${failed} fallidas`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent,
        failed,
        user_id: payload.user_id
      }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error: any) {
    console.error('Error general:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
