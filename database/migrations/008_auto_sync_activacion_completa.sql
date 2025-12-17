-- ============================================================================
-- MIGRACIÓN 008: Sincronización Automática de Activación (Auth <-> Public)
-- ============================================================================
-- Este script automatiza la gestión del estado 'activado'.
-- 1. Limpia los datos antiguos incorrectos.
-- 2. Crea un trigger para mantener la sincronización en tiempo real.

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. LIMPIEZA INICIAL DE DATOS (Corrección Histórica)
-- ----------------------------------------------------------------------------

-- A) Desactivar usuarios que NO tienen cuenta real en auth.users
-- (Corrige los "falsos positivos" actuales)
UPDATE public.users 
SET activado = false 
WHERE email NOT IN (SELECT email FROM auth.users);

-- B) Asegurar que los usuarios con cuenta real estén activados
UPDATE public.users 
SET activado = true 
WHERE email IN (SELECT email FROM auth.users);


-- ----------------------------------------------------------------------------
-- 2. CREACIÓN DEL TRIGGER DE AUTOMATIZACIÓN
-- ----------------------------------------------------------------------------

-- Crear la función que ejecutará el trigger
CREATE OR REPLACE FUNCTION public.handle_activation_sync()
RETURNS TRIGGER AS $$
BEGIN
  -- CASO 1: Usuario completa registro (INSERT en auth.users)
  IF (TG_OP = 'INSERT') THEN
    -- Marcar como activado automáticamente en la tabla pública
    UPDATE public.users
    SET activado = true
    WHERE email = NEW.email;
    RETURN NEW;
  
  -- CASO 2: Usuario es eliminado del sistema (DELETE en auth.users)
  ELSIF (TG_OP = 'DELETE') THEN
    -- Marcar como NO activado en la tabla pública
    -- (Esto asegura que si se borra la cuenta, no aparezca como activado)
    UPDATE public.users
    SET activado = false
    WHERE email = OLD.email;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- SECURITY DEFINER permite escribir en public.users

-- Eliminar el trigger si ya existía para evitar duplicados
DROP TRIGGER IF EXISTS trigger_sync_activation_status ON auth.users;

-- Crear el trigger que escucha INSERT y DELETE en auth.users
CREATE TRIGGER trigger_sync_activation_status
AFTER INSERT OR DELETE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_activation_sync();

COMMIT;

-- ============================================================================
-- FIN DE INSTALACIÓN
-- ============================================================================
