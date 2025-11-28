// ============================================================================
// EDGE FUNCTION: Enviar Web Push Notifications
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import webpush from 'https://esm.sh/web-push@3.6.7'

// Configuración VAPID
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || 'BPOLy4-xme3o_x7oKHjjqkl4SNbICUfWZm5MTWAaqZnrTFyi_T6q7BUZPzDOfxwlYfUISxJU8KbgihmN8373RMU';
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_SUBJECT = 'mailto:admin@antoniotorresaraujo.edu.pe';

// Configurar VAPID
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

interface PushPayload {
  type: 'mensaje_soporte' | 'incidencia' | 'solicitud' | 'respuesta';
  user_id: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

// Enviar Web Push usando la librería web-push
async function sendWebPush(
  endpoint: string, 
  p256dh: string, 
  auth: string, 
  payload: object
): Promise<{ success: boolean; expired?: boolean }> {
  try {
    const subscription = {
      endpoint: endpoint,
      keys: {
        p256dh: p256dh,
        auth: auth
      }
    };

    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { success: true };
  } catch (error: any) {
    console.error('Error enviando push:', error.message || error);
    
    // Si el endpoint ya no es válido
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log('Suscripción expirada');
      return { success: false, expired: true };
    }
    
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
