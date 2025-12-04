-- ============================================================================
-- TRIGGER: Eliminar usuario de Auth cuando se elimina de la tabla users
-- Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
-- ============================================================================
-- Este trigger elimina automáticamente el usuario de auth.users
-- cuando se elimina de la tabla public.users
-- ============================================================================

-- Función que se ejecuta ANTES de eliminar un usuario de la tabla users
CREATE OR REPLACE FUNCTION delete_auth_user_on_users_delete()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    auth_user_id UUID;
BEGIN
    -- Buscar el usuario en auth.users por email
    SELECT id INTO auth_user_id 
    FROM auth.users 
    WHERE email = OLD.email;
    
    -- Si encontramos el usuario en Auth, eliminarlo
    IF auth_user_id IS NOT NULL THEN
        -- Eliminar directamente de auth.users (SECURITY DEFINER permite esto)
        DELETE FROM auth.users WHERE id = auth_user_id;
        RAISE LOG 'Usuario eliminado de auth.users: % (email: %)', auth_user_id, OLD.email;
    ELSE
        RAISE LOG 'Usuario no encontrado en auth.users para email: %', OLD.email;
    END IF;
    
    RETURN OLD;
EXCEPTION WHEN OTHERS THEN
    -- Si falla, solo log y continuar (no bloquear la eliminación de users)
    RAISE WARNING 'Error eliminando de auth.users para %: %', OLD.email, SQLERRM;
    RETURN OLD;
END;
$$;

-- Crear el trigger BEFORE DELETE
DROP TRIGGER IF EXISTS trigger_delete_auth_user ON users;
CREATE TRIGGER trigger_delete_auth_user
    BEFORE DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION delete_auth_user_on_users_delete();

-- ============================================================================
-- RESULTADO:
-- Ahora cuando el admin elimina un usuario desde la interfaz:
-- 1. Se dispara este trigger ANTES del DELETE
-- 2. El trigger busca el email en auth.users
-- 3. Si existe, lo elimina de auth.users (contraseña)
-- 4. Luego se completa el DELETE en public.users (datos)
-- 
-- TODO ES AUTOMÁTICO - El admin solo presiona "Eliminar" y listo.
-- ============================================================================
