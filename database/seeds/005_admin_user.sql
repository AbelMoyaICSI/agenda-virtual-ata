-- ============================================================================
-- SEED: USUARIO ADMINISTRADOR INICIAL
-- ============================================================================
-- Este script crea SOLO el usuario administrador inicial
-- Los demás usuarios se crearán mediante:
--   1. Importación desde Excel (padres/madres/apoderados) con script Python
--   2. Registro manual por administrador (docentes/TOE/dirección)
--   3. Solicitudes de registro aprobadas por administrador
-- ============================================================================

-- ⚠️ INSTRUCCIONES PARA CREAR EL ADMINISTRADOR:
-- ============================================================================
-- PASO 1: Crear usuario en Supabase Auth
-- ============================================================================
-- 1. Ve a: https://supabase.com/dashboard/project/jbdjlivrfkrcivkrnuio/auth/users
-- 2. Click "Add user" → "Create new user"
-- 3. Email: admin@ata.edu.pe
-- 4. Password: (elige una contraseña segura y guárdala - ej: ATA_Admin2025!#)
-- 5. Marca "Auto Confirm User" ✅
-- 6. Click "Create user"
-- 7. Copia el UUID del usuario creado (formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

-- ============================================================================
-- PASO 2: Ejecutar este script (después de obtener el UUID)
-- ============================================================================
-- Reemplaza [UUID-DEL-ADMIN] abajo con el UUID copiado en el paso 7

-- Eliminar usuario admin si existe (para re-ejecutar)
DELETE FROM users WHERE email = 'abelmoyaicsi@gmail.com';

-- Crear usuario administrador en la tabla users
-- UUID del administrador: d17639d9-915e-4c01-b9e6-df01c2de9f87
INSERT INTO users (
  id,
  email,
  password_hash,
  dni,
  nombre_completo,
  telefono,
  role,
  activo,
  created_at
) VALUES (
  'd17639d9-915e-4c01-b9e6-df01c2de9f87'::uuid,
  'abelmoyaicsi@gmail.com',
  'SUPABASE_AUTH',  -- Placeholder (el password real está en auth.users)
  '00000000',
  'Abel Moya - Administrador Sistema ATA',
  NULL,
  'admin',
  true,
  NOW()
);

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
-- Después de ejecutar, verifica que el usuario existe:
SELECT id, email, nombre_completo, role, activo FROM users WHERE email = 'abelmoyaicsi@gmail.com';

-- ============================================================================
-- NOTA FINAL:
-- ============================================================================
-- Después de ejecutar este script, podrás iniciar sesión en el frontend con:
-- Email: admin@ata.edu.pe
-- Password: (la que elegiste en PASO 1, punto 4)
-- ============================================================================
