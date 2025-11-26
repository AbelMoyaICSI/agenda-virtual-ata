-- =====================================================
-- MIGRACIÓN: Agregar campo 'activado' a tabla users
-- Descripción: Permite control de activación de cuentas
-- Fecha: 2025-11-21
-- =====================================================

-- Agregar columna activado si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'activado'
  ) THEN
    ALTER TABLE users ADD COLUMN activado BOOLEAN DEFAULT false;
    COMMENT ON COLUMN users.activado IS 'Indica si el usuario ya activó su cuenta y estableció contraseña';
  END IF;
END $$;

-- Cambiar password_hash a nullable (permitir NULL para usuarios no activados)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Actualizar usuarios existentes
-- Los usuarios con contraseña ya establecida se marcan como activados
UPDATE users 
SET activado = true 
WHERE password_hash IS NOT NULL AND password_hash != '';

-- Marcar al administrador como activado automáticamente
UPDATE users 
SET activado = true 
WHERE role = 'admin';

-- Crear índice para mejorar consultas de verificación
CREATE INDEX IF NOT EXISTS idx_users_activado ON users(activado);
CREATE INDEX IF NOT EXISTS idx_users_dni_activo ON users(dni, activo);

-- Comentario en la tabla
COMMENT ON COLUMN users.activado IS 'Indica si el usuario completó el proceso de activación de cuenta por primera vez';

-- Mostrar resumen
DO $$
DECLARE
  total_users INTEGER;
  activados INTEGER;
  pendientes INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_users FROM users WHERE activo = true;
  SELECT COUNT(*) INTO activados FROM users WHERE activo = true AND activado = true;
  SELECT COUNT(*) INTO pendientes FROM users WHERE activo = true AND activado = false;
  
  RAISE NOTICE '================================================';
  RAISE NOTICE 'MIGRACIÓN COMPLETADA: Campo activado agregado';
  RAISE NOTICE '================================================';
  RAISE NOTICE 'Total usuarios activos: %', total_users;
  RAISE NOTICE 'Usuarios activados: %', activados;
  RAISE NOTICE 'Usuarios pendientes de activación: %', pendientes;
  RAISE NOTICE '================================================';
END $$;
