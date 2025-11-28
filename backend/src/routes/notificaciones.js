// ============================================================================
// RUTAS DE NOTIFICACIONES - API
// ============================================================================

import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { enviarPushAUsuario, enviarPushAPadreDeEstudiante, enviarPushARol } from '../services/pushService.js';

const app = new Hono();

/**
 * POST /api/notificaciones/push/test
 * Enviar notificación push de prueba al usuario actual
 */
app.post('/push/test', async (c) => {
    try {
        const user = c.get('user');
        
        if (!user) {
            return c.json({ error: 'Usuario no autenticado' }, 401);
        }
        
        const resultado = await enviarPushAUsuario(c.env, user.id, {
            title: '🧪 Prueba de Notificación',
            body: 'Esta es una notificación de prueba desde el servidor',
            icon: '/logo-ata-192.png',
            data: { url: '/', tipo: 'test' }
        });
        
        return c.json({
            success: true,
            mensaje: 'Notificación de prueba enviada',
            ...resultado
        });
        
    } catch (error) {
        console.error('Error en push test:', error);
        return c.json({ error: error.message }, 500);
    }
});

/**
 * POST /api/notificaciones/incidencia
 * Notificar al padre sobre nueva incidencia de su hijo
 */
app.post('/incidencia', async (c) => {
    try {
        const { estudianteId, incidenciaId, tipo, descripcion, estudianteNombre } = await c.req.json();
        
        if (!estudianteId) {
            return c.json({ error: 'estudianteId requerido' }, 400);
        }
        
        const esDemérito = tipo === 'demerito' || tipo === 'demérito';
        
        const mensaje = {
            title: esDemérito 
                ? `⚠️ Incidencia registrada - ${estudianteNombre || 'Tu hijo/a'}`
                : `⭐ Mérito registrado - ${estudianteNombre || 'Tu hijo/a'}`,
            body: descripcion || (esDemérito 
                ? 'Se ha registrado una incidencia. Ingresa para ver los detalles.'
                : 'Se ha registrado un mérito. ¡Felicidades!'),
            icon: '/logo-ata-192.png',
            data: {
                url: '/incidencias',
                tipo: 'incidencia',
                incidenciaId: incidenciaId
            }
        };
        
        const resultado = await enviarPushAPadreDeEstudiante(c.env, estudianteId, mensaje);
        
        return c.json({
            success: true,
            mensaje: 'Notificación enviada al padre',
            ...resultado
        });
        
    } catch (error) {
        console.error('Error notificando incidencia:', error);
        return c.json({ error: error.message }, 500);
    }
});

/**
 * POST /api/notificaciones/citacion
 * Notificar al padre sobre citación
 */
app.post('/citacion', async (c) => {
    try {
        const { estudianteId, fecha, motivo, estudianteNombre } = await c.req.json();
        
        if (!estudianteId) {
            return c.json({ error: 'estudianteId requerido' }, 400);
        }
        
        const mensaje = {
            title: `📋 Citación - ${estudianteNombre || 'Su hijo/a'}`,
            body: `Se le cita para el ${fecha}. Motivo: ${motivo || 'Ver detalles en la app'}`,
            icon: '/logo-ata-192.png',
            data: {
                url: '/citaciones',
                tipo: 'citacion'
            }
        };
        
        const resultado = await enviarPushAPadreDeEstudiante(c.env, estudianteId, mensaje);
        
        return c.json({
            success: true,
            mensaje: 'Notificación de citación enviada',
            ...resultado
        });
        
    } catch (error) {
        console.error('Error notificando citación:', error);
        return c.json({ error: error.message }, 500);
    }
});

/**
 * POST /api/notificaciones/admin
 * Notificar a admins sobre nuevas solicitudes
 */
app.post('/admin', async (c) => {
    try {
        const { tipo, mensaje: mensajeTexto, titulo } = await c.req.json();
        
        const mensaje = {
            title: titulo || '📬 Nueva notificación',
            body: mensajeTexto || 'Tienes una nueva notificación pendiente',
            icon: '/logo-ata-192.png',
            data: {
                url: tipo === 'solicitud' ? '/solicitudes' : '/soporte',
                tipo: tipo
            }
        };
        
        const resultado = await enviarPushARol(c.env, 'admin', mensaje);
        
        return c.json({
            success: true,
            mensaje: 'Notificación enviada a admins',
            ...resultado
        });
        
    } catch (error) {
        console.error('Error notificando admins:', error);
        return c.json({ error: error.message }, 500);
    }
});

/**
 * GET /api/notificaciones/suscripciones
 * Ver suscripciones del usuario actual
 */
app.get('/suscripciones', async (c) => {
    try {
        const user = c.get('user');
        const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
        
        const { data, error } = await supabase
            .from('push_subscriptions')
            .select('id, created_at, activa, user_agent')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return c.json({
            total: data.length,
            activas: data.filter(s => s.activa).length,
            suscripciones: data
        });
        
    } catch (error) {
        console.error('Error obteniendo suscripciones:', error);
        return c.json({ error: error.message }, 500);
    }
});

/**
 * DELETE /api/notificaciones/suscripciones
 * Eliminar todas las suscripciones del usuario
 */
app.delete('/suscripciones', async (c) => {
    try {
        const user = c.get('user');
        const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY);
        
        const { error } = await supabase
            .from('push_subscriptions')
            .update({ activa: false })
            .eq('user_id', user.id);
        
        if (error) throw error;
        
        return c.json({
            success: true,
            mensaje: 'Todas las suscripciones desactivadas'
        });
        
    } catch (error) {
        console.error('Error eliminando suscripciones:', error);
        return c.json({ error: error.message }, 500);
    }
});

export default app;
