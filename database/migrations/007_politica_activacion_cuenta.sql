-- =====================================================
-- MIGRACIÓN 007: Sincronización automática auth.users ↔ users
-- Ejecutar en: Supabase SQL Editor
-- Fecha: Diciembre 2025
-- =====================================================
-- PROBLEMA: Cuando un usuario activa su cuenta:
-- 1. Se crea en auth.users con un nuevo UUID
-- 2. Su registro en public.users tiene un UUID diferente
-- 3. La política RLS no permite actualizar porque id != auth.uid()
-- 4. El campo 'activado' no se actualiza a true
--
-- SOLUCIÓN: 
-- 1. Trigger que sincroniza el id de users con auth.users por email
-- 2. Política RLS que permite actualizar por email
-- =====================================================

-- =====================================================
-- PARTE 1: Función y Trigger para sincronizar IDs
-- =====================================================

-- Función que sincroniza el ID y marca activado cuando se crea usuario en Auth
CREATE OR REPLACE FUNCTION sync_user_on_auth_create()
RETURNS TRIGGER AS $$
BEGIN
    -- Cuando se crea un usuario en auth.users,
    -- actualizar el registro en public.users que tenga el mismo email
    UPDATE public.users
    SET 
        id = NEW.id,           -- Sincronizar el UUID
        activado = true        -- Marcar como activado automáticamente
    WHERE email = NEW.email;
    
    -- Log para debugging
    RAISE NOTICE 'Usuario sincronizado: % -> activado=true', NEW.email;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar trigger si existe
DROP TRIGGER IF EXISTS trigger_sync_user_on_auth_create ON auth.users;

-- Crear trigger que se ejecuta DESPUÉS de crear usuario en auth
CREATE TRIGGER trigger_sync_user_on_auth_create
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_user_on_auth_create();

-- =====================================================
-- PARTE 2: Política RLS para permitir actualización por email
-- =====================================================

-- Eliminar política anterior si existe
DROP POLICY IF EXISTS "users_update_activacion" ON public.users;

-- Crear política que permite actualizar cuando el email coincide
CREATE POLICY "users_update_activacion" ON public.users
  FOR UPDATE
  USING (
    email = auth.email()
    OR
    public.is_admin()
  )
  WITH CHECK (
    email = auth.email()
    OR
    public.is_admin()
  );

-- =====================================================
-- PARTE 3: Sincronizar usuarios existentes que ya se registraron
-- =====================================================

-- Actualizar usuarios que ya tienen cuenta en auth pero no están sincronizados
UPDATE public.users u
SET 
    id = a.id,
    activado = true
FROM auth.users a
WHERE u.email = a.email
AND u.id != a.id;

-- También marcar activado=true para usuarios cuyo ID ya coincide con auth
UPDATE public.users u
SET activado = true
WHERE EXISTS (
    SELECT 1 FROM auth.users a WHERE a.id = u.id
)
AND (u.activado IS NULL OR u.activado = false);

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

-- Ver usuarios y su estado de sincronización
SELECT 
    u.nombre_completo,
    u.email,
    u.id as users_id,
    a.id as auth_id,
    CASE WHEN u.id = a.id THEN '✅ Sincronizado' ELSE '❌ Desincronizado' END as sync_status,
    u.activo,
    u.activado
FROM public.users u
LEFT JOIN auth.users a ON u.email = a.email
ORDER BY u.created_at DESC;

