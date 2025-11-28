// ============================================================================
// EDGE FUNCTION: Enviar Web Push Notifications
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// Usando @negrel/webpush - librería compatible con Deno
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { 
  ApplicationServer, 
  type PushSubscription as WebPushSubscription,
  generateVAPIDKeys,
  importVAPIDKeys
} from "jsr:@negrel/webpush@0.5.0"

// VAPID Keys - Las mismas que en el frontend
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

interface DBSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  activa: boolean;
}

// Inicializar Application Server (singleton)
let appServer: ApplicationServer | null = null;

async function getAppServer(): Promise<ApplicationServer> {
  if (!appServer) {
    const vapidKeys = await importVAPIDKeys({
      publicKey: VAPID_PUBLIC_KEY,
      privateKey: VAPID_PRIVATE_KEY
    });
    appServer = new ApplicationServer(vapidKeys, VAPID_SUBJECT);
  }
  return appServer;
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
      console.error('❌ Error obteniendo suscripciones:', error);
      return new Response(
        JSON.stringify({ error: 'Error obteniendo suscripciones', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('⚠️ No hay suscripciones activas para:', payload.user_id);
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: 'No hay suscripciones' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📱 Encontradas ${subscriptions.length} suscripciones`);

    // Obtener Application Server
    const server = await getAppServer();

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

    for (const sub of subscriptions as DBSubscription[]) {
      try {
        // Convertir a formato WebPush
        const webPushSub: WebPushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        // Enviar push
        const response = await server.pushTextMessage(webPushSub, notificationPayload, {
          ttl: 86400, // 24 horas
          urgency: "high"
        });

        if (response.ok) {
          console.log(`✅ Push enviado a: ${sub.id}`);
          sent++;
        } else {
          const status = response.status;
          console.error(`❌ Error ${status} enviando a ${sub.id}`);
          failed++;
          
          // Si es 410 (Gone) o 404, desactivar suscripción
          if (status === 410 || status === 404) {
            await supabase
              .from('push_subscriptions')
              .update({ activa: false })
              .eq('id', sub.id);
            console.log(`🗑️ Suscripción desactivada: ${sub.id}`);
          }
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
    console.error('❌ Error general:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
