-- =====================================================
-- MIGRACIÓN 007: Sincronización COMPLETA automática
-- Ejecutar en: Supabase SQL Editor
-- Fecha: Diciembre 2025
-- =====================================================
-- PROBLEMA: Cuando un usuario activa su cuenta:
-- 1. Se crea en auth.users con un nuevo UUID
-- 2. Su registro en public.users tiene un UUID diferente
-- 3. La política RLS no permite actualizar porque id != auth.uid()
-- 4. El campo 'activado' no se actualiza a true
-- 5. El email_confirmed_at queda NULL → Error "Email not confirmed"
--
-- SOLUCIÓN COMPLETA AUTOMÁTICA:
-- 1. Trigger que sincroniza id de users con auth.users
-- 2. Trigger que confirma email automáticamente
-- 3. Marca activado=true automáticamente
-- =====================================================

-- =====================================================
-- PARTE 1: Función y Trigger para sincronizar TODO
-- =====================================================

-- Función que sincroniza el ID, marca activado Y confirma email
CREATE OR REPLACE FUNCTION sync_user_on_auth_create()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Sincronizar UUID y marcar activado en public.users
    -- También preservar DNI y teléfono si ya existen
    UPDATE public.users
    SET 
        id = NEW.id,           -- Sincronizar el UUID con auth.users
        activado = true        -- Marcar como activado automáticamente
    WHERE email = NEW.email;
    
    -- 2. Confirmar email automáticamente en auth.users
    -- (Porque ya verificamos el email con OTP durante la activación)
    UPDATE auth.users
    SET 
        email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
        updated_at = NOW()
    WHERE id = NEW.id
    AND email_confirmed_at IS NULL;
    
    RAISE NOTICE 'Usuario sincronizado y email confirmado: %', NEW.email;
    
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
-- PARTE 3: Sincronizar TODOS los usuarios existentes
-- =====================================================

-- 3.1 Sincronizar IDs de usuarios que ya tienen cuenta en auth
UPDATE public.users u
SET 
    id = a.id,
    activado = true
FROM auth.users a
WHERE u.email = a.email
AND u.id != a.id;

-- 3.2 Marcar activado=true para usuarios cuyo ID ya coincide
UPDATE public.users u
SET activado = true
WHERE EXISTS (
    SELECT 1 FROM auth.users a WHERE a.id = u.id
)
AND (u.activado IS NULL OR u.activado = false);

-- 3.3 CONFIRMAR EMAIL de TODOS los usuarios existentes en auth
-- (Para evitar "Email not confirmed" en cualquier cuenta)
UPDATE auth.users
SET 
    email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
    updated_at = NOW()
WHERE email_confirmed_at IS NULL;

-- =====================================================
-- VERIFICACIÓN COMPLETA
-- =====================================================

-- Ver usuarios y su estado COMPLETO
SELECT 
    u.nombre_completo,
    u.email,
    u.id as users_id,
    a.id as auth_id,
    CASE WHEN u.id = a.id THEN '✅ Sincronizado' ELSE '❌ Desincronizado' END as sync_status,
    u.activo,
    u.activado,
    CASE WHEN a.email_confirmed_at IS NOT NULL THEN '✅ Confirmado' ELSE '❌ Sin confirmar' END as email_status
FROM public.users u
LEFT JOIN auth.users a ON u.email = a.email
ORDER BY u.created_at DESC;

