-- =====================================================
-- SQL PARA TRIGGERS DE PUSH NOTIFICATIONS
-- Ejecutar en Supabase SQL Editor DESPUÉS del SQL_NOTIFICACIONES.sql
-- =====================================================

-- 1. Habilitar extensión pg_net para llamadas HTTP
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Función que llama a la Edge Function
CREATE OR REPLACE FUNCTION notify_push_notification()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    payload JSONB;
    user_id_destino UUID;
    titulo TEXT;
    cuerpo TEXT;
    tipo TEXT;
BEGIN
    -- Determinar qué tipo de evento es
    IF TG_TABLE_NAME = 'incidencias' THEN
        -- Nueva incidencia o incidencia actualizada
        IF TG_OP = 'INSERT' THEN
            tipo := 'nueva_incidencia';
            titulo := '📋 Nueva Incidencia';
            cuerpo := 'Se ha registrado una nueva incidencia para su hijo(a)';
            
            -- Obtener el apoderado del estudiante
            SELECT estudiantes.apoderado_id INTO user_id_destino
            FROM estudiantes
            WHERE estudiantes.id = NEW.estudiante_id;
        END IF;
        
    ELSIF TG_TABLE_NAME = 'mensajes_soporte' THEN
        -- Respuesta del admin a un mensaje
        IF TG_OP = 'UPDATE' AND NEW.respuesta_admin IS NOT NULL AND OLD.respuesta_admin IS NULL THEN
            tipo := 'respuesta_soporte';
            titulo := '💬 Respuesta del Administrador';
            cuerpo := LEFT(NEW.respuesta_admin, 100);
            user_id_destino := NEW.remitente_id;
        END IF;
    END IF;
    
    -- Si hay usuario destino, llamar a la Edge Function
    IF user_id_destino IS NOT NULL THEN
        payload := jsonb_build_object(
            'type', tipo,
            'user_id', user_id_destino::TEXT,
            'title', titulo,
            'body', cuerpo,
            'data', jsonb_build_object(
                'table', TG_TABLE_NAME,
                'record_id', COALESCE(NEW.id::TEXT, '')
            )
        );
        
        -- Llamar a la Edge Function usando pg_net
        PERFORM net.http_post(
            url := 'https://jbdjlivrfkrcivkrnuio.supabase.co/functions/v1/send-push-notification',
            headers := jsonb_build_object('Content-Type', 'application/json'),
            body := payload,
            timeout_milliseconds := 5000
        );
        
        RAISE LOG 'Push notification enviada para user_id: %, tipo: %', user_id_destino, tipo;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error en notify_push_notification: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- 3. Trigger para nuevas incidencias
DROP TRIGGER IF EXISTS trigger_push_incidencias ON incidencias;
CREATE TRIGGER trigger_push_incidencias
    AFTER INSERT ON incidencias
    FOR EACH ROW
    EXECUTE FUNCTION notify_push_notification();

-- 4. Trigger para respuestas a mensajes de soporte
DROP TRIGGER IF EXISTS trigger_push_mensajes ON mensajes_soporte;
CREATE TRIGGER trigger_push_mensajes
    AFTER UPDATE ON mensajes_soporte
    FOR EACH ROW
    WHEN (NEW.respuesta_admin IS NOT NULL AND OLD.respuesta_admin IS NULL)
    EXECUTE FUNCTION notify_push_notification();

-- =====================================================
-- VERIFICACIÓN - Ejecutar para confirmar que todo está bien
-- =====================================================
-- SELECT trigger_name, event_manipulation, event_object_table 
-- FROM information_schema.triggers 
-- WHERE trigger_schema = 'public' 
-- AND trigger_name LIKE 'trigger_push%';

-- =====================================================
-- FIN - Los triggers están listos
-- =====================================================
