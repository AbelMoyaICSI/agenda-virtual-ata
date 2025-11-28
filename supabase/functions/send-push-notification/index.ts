// ============================================================================
// EDGE FUNCTION: Enviar Web Push Notifications
// Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
// Usando @negrel/webpush - librería nativa Deno
// ============================================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as webpush from "jsr:@negrel/webpush@0.5.0"

// VAPID Keys en formato JWK - generadas para este proyecto
// IMPORTANTE: Estas claves deben coincidir con applicationServerKey en el frontend
const VAPID_KEYS_JWK = {
  publicKey: {
    kty: "EC",
    crv: "P-256",
    x: "Yvma7OqqY0KxPcP4Iw6LUfsKvEF6p9JrcCpXmu4WMpo",
    y: "dZJO9BlcdyNrcMeGomBMVC64DvCUDAT4ApWM5i1qETY"
  },
  privateKey: {
    kty: "EC", 
    crv: "P-256",
    x: "Yvma7OqqY0KxPcP4Iw6LUfsKvEF6p9JrcCpXmu4WMpo",
    y: "dZJO9BlcdyNrcMeGomBMVC64DvCUDAT4ApWM5i1qETY",
    d: "Gm7tqf0RT-5wn5kecqI12bOar-ZMIPw_vcdwAjw-6Do"
  }
};

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

// Singleton para Application Server
let appServer: webpush.ApplicationServer | null = null;

async function getAppServer(): Promise<webpush.ApplicationServer> {
  if (!appServer) {
    // Importar claves VAPID desde JWK
    const vapidKeys = await webpush.importVapidKeys(VAPID_KEYS_JWK);
    
    // Crear Application Server usando el método estático .new()
    appServer = await webpush.ApplicationServer.new({
      contactInformation: VAPID_SUBJECT,
      vapidKeys: vapidKeys,
    });
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
        // Crear suscriptor desde la suscripción almacenada
        const subscriber = server.subscribe({
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        });

        // Enviar mensaje push
        await subscriber.pushTextMessage(notificationPayload, {
          ttl: 86400, // 24 horas
          urgency: "high"
        });

        console.log(`✅ Push enviado a: ${sub.id}`);
        sent++;
        
      } catch (pushError: any) {
        // Capturar detalles completos del error
        const errorMsg = pushError.message || pushError.toString() || 'Error desconocido';
        const errorResponse = pushError.response;
        
        console.error(`❌ Error enviando a ${sub.id}: ${errorMsg}`);
        
        // Si hay una respuesta HTTP, loguearla
        if (errorResponse) {
          const status = errorResponse.status;
          const statusText = errorResponse.statusText;
          console.error(`   HTTP ${status} ${statusText}`);
          
          // Desactivar suscripción si está expirada
          if (status === 410 || status === 404) {
            await supabase
              .from('push_subscriptions')
              .update({ activa: false })
              .eq('id', sub.id);
            console.log(`🗑️ Desactivando suscripción expirada: ${sub.id}`);
          }
        }
        
        // También verificar método isGone() si existe
        if (typeof pushError.isGone === 'function' && pushError.isGone()) {
          await supabase
            .from('push_subscriptions')
            .update({ activa: false })
            .eq('id', sub.id);
          console.log(`🗑️ Desactivando suscripción (isGone): ${sub.id}`);
        }
        
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
