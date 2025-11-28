// ============================================================================
// SERVICIO WEB PUSH - ENVÍO DE NOTIFICACIONES PUSH
// ============================================================================

import { createClient } from '@supabase/supabase-js';

// Estructura de mensaje push
// {
//   title: 'Título de la notificación',
//   body: 'Cuerpo del mensaje',
//   icon: '/logo-ata-192.png',
//   data: { url: '/incidencias', tipo: 'incidencia' }
// }

/**
 * Enviar notificación push a un usuario específico
 */
export async function enviarPushAUsuario(env, userId, mensaje) {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    
    try {
        // Obtener suscripciones activas del usuario
        const { data: suscripciones, error } = await supabase
            .from('push_subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('activa', true);
        
        if (error) throw error;
        
        if (!suscripciones || suscripciones.length === 0) {
            console.log(`⚠️ Usuario ${userId} no tiene suscripciones push activas`);
            return { enviados: 0, fallidos: 0 };
        }
        
        console.log(`📬 Enviando push a ${suscripciones.length} dispositivo(s) del usuario ${userId}`);
        
        let enviados = 0;
        let fallidos = 0;
        
        for (const sub of suscripciones) {
            try {
                const resultado = await enviarPush(env, {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth
                    }
                }, mensaje);
                
                if (resultado.ok) {
                    enviados++;
                } else {
                    fallidos++;
                    // Si el endpoint ya no es válido, desactivarlo
                    if (resultado.status === 404 || resultado.status === 410) {
                        await supabase
                            .from('push_subscriptions')
                            .update({ activa: false })
                            .eq('id', sub.id);
                    }
                }
            } catch (e) {
                console.error('Error enviando push:', e);
                fallidos++;
            }
        }
        
        return { enviados, fallidos };
        
    } catch (error) {
        console.error('Error en enviarPushAUsuario:', error);
        throw error;
    }
}

/**
 * Enviar notificación push a todos los usuarios con cierto rol
 */
export async function enviarPushARol(env, rol, mensaje) {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    
    try {
        // Obtener usuarios con ese rol
        const { data: usuarios, error: errorUsuarios } = await supabase
            .from('users')
            .select('id')
            .eq('role', rol)
            .eq('activado', true);
        
        if (errorUsuarios) throw errorUsuarios;
        
        if (!usuarios || usuarios.length === 0) {
            return { enviados: 0, fallidos: 0 };
        }
        
        let totalEnviados = 0;
        let totalFallidos = 0;
        
        for (const usuario of usuarios) {
            const resultado = await enviarPushAUsuario(env, usuario.id, mensaje);
            totalEnviados += resultado.enviados;
            totalFallidos += resultado.fallidos;
        }
        
        return { enviados: totalEnviados, fallidos: totalFallidos };
        
    } catch (error) {
        console.error('Error en enviarPushARol:', error);
        throw error;
    }
}

/**
 * Enviar push a padre de un estudiante específico
 */
export async function enviarPushAPadreDeEstudiante(env, estudianteId, mensaje) {
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    
    try {
        // Obtener apoderado del estudiante
        const { data: estudiante, error } = await supabase
            .from('estudiantes')
            .select('apoderado_id')
            .eq('id', estudianteId)
            .single();
        
        if (error || !estudiante?.apoderado_id) {
            console.log(`⚠️ Estudiante ${estudianteId} no tiene apoderado registrado`);
            return { enviados: 0, fallidos: 0 };
        }
        
        return await enviarPushAUsuario(env, estudiante.apoderado_id, mensaje);
        
    } catch (error) {
        console.error('Error en enviarPushAPadreDeEstudiante:', error);
        throw error;
    }
}

/**
 * Función base para enviar un push usando Web Push Protocol
 */
async function enviarPush(env, subscription, payload) {
    // Importar web-push helpers (adaptar para Cloudflare Workers)
    const vapidDetails = {
        subject: 'mailto:admin@ata.edu.pe',
        publicKey: env.VAPID_PUBLIC_KEY,
        privateKey: env.VAPID_PRIVATE_KEY
    };
    
    const payloadString = JSON.stringify(payload);
    
    // Headers requeridos para Web Push
    const headers = {
        'Content-Type': 'application/json',
        'Content-Encoding': 'aes128gcm',
        'TTL': '86400', // 24 horas
    };
    
    try {
        // Crear JWT para autenticación VAPID
        const jwt = await crearJwtVapid(vapidDetails, subscription.endpoint);
        headers['Authorization'] = `vapid t=${jwt}, k=${vapidDetails.publicKey}`;
        
        // Encriptar payload (simplificado - en producción usar librería)
        const encryptedPayload = await encriptarPayload(payloadString, subscription.keys);
        
        // Enviar al push service
        const response = await fetch(subscription.endpoint, {
            method: 'POST',
            headers: headers,
            body: encryptedPayload
        });
        
        return {
            ok: response.ok,
            status: response.status
        };
        
    } catch (error) {
        console.error('Error en enviarPush:', error);
        return { ok: false, error: error.message };
    }
}

/**
 * Crear JWT para VAPID (simplificado)
 */
async function crearJwtVapid(vapidDetails, audience) {
    const urlObj = new URL(audience);
    const aud = urlObj.origin;
    
    const header = {
        typ: 'JWT',
        alg: 'ES256'
    };
    
    const payload = {
        aud: aud,
        exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60), // 12 horas
        sub: vapidDetails.subject
    };
    
    // En producción, usar crypto.subtle para firmar correctamente
    // Esto es un placeholder - necesita implementación completa
    const headerB64 = btoa(JSON.stringify(header));
    const payloadB64 = btoa(JSON.stringify(payload));
    
    return `${headerB64}.${payloadB64}.signature`;
}

/**
 * Encriptar payload para Web Push (placeholder)
 * En producción usar librería de encriptación ECE
 */
async function encriptarPayload(payload, keys) {
    // Placeholder - necesita implementación completa con ece
    return new TextEncoder().encode(payload);
}

export default {
    enviarPushAUsuario,
    enviarPushARol,
    enviarPushAPadreDeEstudiante
};
