-- =====================================================
-- SQL PARA TRIGGER DE CONFIRMACIÓN DE INCIDENCIA
-- Notifica al docente cuando el padre confirma la lectura
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- Actualizar la función para manejar la confirmación de lectura por el padre
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
    nombre_estudiante TEXT;
    nombre_demerito TEXT;
    nombre_merito TEXT;
    tipo_incidencia TEXT;
BEGIN
    -- Determinar qué tipo de evento es
    IF TG_TABLE_NAME = 'incidencias' THEN
        -- Nueva incidencia (INSERT)
        IF TG_OP = 'INSERT' THEN
            tipo := 'nueva_incidencia';
            
            -- Obtener nombre del estudiante
            SELECT estudiantes.nombre_completo INTO nombre_estudiante
            FROM estudiantes
            WHERE estudiantes.id = NEW.estudiante_id;
            
            -- Determinar si es mérito o demérito y obtener el nombre
            IF NEW.tipo = 'merito' THEN
                tipo_incidencia := '🏆 Mérito';
                SELECT catalogo_meritos.nombre INTO nombre_merito
                FROM catalogo_meritos
                WHERE catalogo_meritos.id = NEW.catalogo_merito_id;
                titulo := '🏆 Nuevo Mérito Registrado';
                cuerpo := COALESCE(nombre_estudiante, 'Su hijo(a)') || ' - ' || COALESCE(nombre_merito, 'Reconocimiento');
            ELSE
                tipo_incidencia := '⚠️ Demérito';
                SELECT catalogo_demeritos.nombre INTO nombre_demerito
                FROM catalogo_demeritos
                WHERE catalogo_demeritos.id = NEW.catalogo_demerito_id;
                titulo := '⚠️ Nueva Incidencia Registrada';
                cuerpo := COALESCE(nombre_estudiante, 'Su hijo(a)') || ' - ' || COALESCE(nombre_demerito, NEW.descripcion, 'Falta registrada');
            END IF;
            
            -- Obtener el apoderado del estudiante
            SELECT estudiantes.apoderado_id INTO user_id_destino
            FROM estudiantes
            WHERE estudiantes.id = NEW.estudiante_id;
            
        -- Padre confirma lectura (UPDATE con revisado_por_padre = true)
        ELSIF TG_OP = 'UPDATE' AND NEW.revisado_por_padre = true AND (OLD.revisado_por_padre IS NULL OR OLD.revisado_por_padre = false) THEN
            tipo := 'incidencia_confirmada';
            titulo := '✅ Incidencia Confirmada';
            
            -- Obtener nombre del estudiante
            SELECT estudiantes.nombre_completo INTO nombre_estudiante
            FROM estudiantes
            WHERE estudiantes.id = NEW.estudiante_id;
            
            cuerpo := 'El padre/apoderado ha confirmado la lectura de la incidencia de ' || COALESCE(nombre_estudiante, 'un estudiante');
            
            -- Si hay comentario del padre, incluirlo
            IF NEW.comentario_padre IS NOT NULL AND NEW.comentario_padre != '' THEN
                cuerpo := cuerpo || '. Comentario: "' || LEFT(NEW.comentario_padre, 80) || '"';
            END IF;
            
            -- Notificar al docente que creó la incidencia
            user_id_destino := NEW.docente_id;
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
    IF user_id_destino IS NOT NULL AND tipo IS NOT NULL THEN
        payload := jsonb_build_object(
            'type', tipo,
            'user_id', user_id_destino::TEXT,
            'title', titulo,
            'body', cuerpo,
            'data', jsonb_build_object(
                'table', TG_TABLE_NAME,
                'record_id', COALESCE(NEW.id::TEXT, ''),
                'estudiante_id', COALESCE(NEW.estudiante_id::TEXT, '')
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

-- Eliminar trigger anterior y crear uno nuevo que también capture UPDATE
DROP TRIGGER IF EXISTS trigger_push_incidencias ON incidencias;

-- Trigger para INSERT y UPDATE en incidencias
CREATE TRIGGER trigger_push_incidencias
    AFTER INSERT OR UPDATE ON incidencias
    FOR EACH ROW
    EXECUTE FUNCTION notify_push_notification();

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Verificar que el trigger está activo:
-- SELECT trigger_name, event_manipulation, event_object_table 
-- FROM information_schema.triggers 
-- WHERE trigger_schema = 'public' 
-- AND trigger_name LIKE 'trigger_push%';

-- =====================================================
-- FIN - Ahora el docente recibirá notificación cuando
-- el padre confirme la lectura de una incidencia
-- =====================================================
