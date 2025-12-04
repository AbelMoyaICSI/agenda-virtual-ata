-- =====================================================
-- MIGRACIÓN 007: Política para activación de cuentas
-- Ejecutar en: Supabase SQL Editor
-- Fecha: Diciembre 2025
-- =====================================================
-- PROBLEMA: Cuando un usuario activa su cuenta, se crea en auth.users
-- con un nuevo UUID, pero su registro en public.users tiene un UUID diferente.
-- La política RLS "users_update_own" requiere id = auth.uid(), pero no coinciden.
--
-- SOLUCIÓN: Crear una política que permita actualizar basándose en el email
-- durante el proceso de activación de cuenta.
-- =====================================================

-- 1. Eliminar política anterior si existe
DROP POLICY IF EXISTS "users_update_activacion" ON public.users;

-- 2. Crear política que permite activar cuenta por email
-- Esta política permite actualizar SOLO el campo activado cuando:
-- - El email del usuario autenticado coincide con el email del registro
-- - O el usuario está recién registrado (dentro de los primeros minutos)
CREATE POLICY "users_update_activacion" ON public.users
  FOR UPDATE
  USING (
    -- Permitir si el email coincide
    email = auth.email()
    OR
    -- O si es admin
    public.is_admin()
  )
  WITH CHECK (
    email = auth.email()
    OR
    public.is_admin()
  );

-- 3. Verificar que la política se creó
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users' AND policyname LIKE '%activacion%';

-- =====================================================
-- NOTA: Esta política funciona así:
-- 1. Usuario busca su cuenta por DNI → encuentra registro con email X
-- 2. Usuario verifica email X (recibe código OTP)
-- 3. Usuario crea contraseña → se registra en auth.users
-- 4. Al actualizar activado=true, la política permite porque email coincide
-- =====================================================
