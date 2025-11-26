-- =====================================================
-- AGENDA VIRTUAL ATA - DATOS SEMILLA
-- Usuarios de Demostración
-- =====================================================

-- IMPORTANTE: Estas son credenciales de DEMO
-- En producción, deben crearse desde la interfaz con contraseñas seguras
-- Password para todos: "demo123" (hash bcrypt)

INSERT INTO users (email, password_hash, role, nombre_completo, activo) VALUES
  -- ADMINISTRADOR
  (
    'admin@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'admin',
    'Sistema Administrador',
    true
  ),
  
  -- DIRECCIÓN
  (
    'direccion@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'direccion',
    'María Elena Rodríguez Sánchez',
    true
  ),
  
  -- TOE (Tutoría y Orientación Educativa)
  (
    'toe@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'toe',
    'Carlos Alberto Méndez Torres',
    true
  ),
  
  -- TUTORES
  (
    'tutor.primaria@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'tutor',
    'Ana Patricia Flores Guzmán',
    true
  ),
  (
    'tutor.secundaria@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'tutor',
    'Jorge Luis Vásquez Morales',
    true
  ),
  
  -- DOCENTES
  (
    'docente.matematica@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'docente',
    'Roberto Carlos Díaz Peña',
    true
  ),
  (
    'docente.comunicacion@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'docente',
    'Lucía Isabel Ramírez Castro',
    true
  ),
  
  -- AUXILIARES
  (
    'auxiliar.primaria@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'auxiliar',
    'Sandra Beatriz López Herrera',
    true
  ),
  (
    'auxiliar.secundaria@ata.edu.pe',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5Y',
    'auxiliar',
    'Miguel Ángel Torres Ruiz',
    true
  ),
  
  -- PADRES DE FAMILIA
  (
    'padre1@gmail.com',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'padre',
    'Carmen Rosa Sánchez de García',
    true
  ),
  (
    'padre2@gmail.com',
    '$2a$10$rJ7qYqGKYZZJQvZX4pVYb.qr5YqOYGY5YqGKYZZJQvZX4pVYb.qr5Y',
    'padre',
    'José Antonio Pérez Villanueva',
    true
  )

ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================
-- 1. Password de DEMO: "demo123"
-- 2. El hash mostrado es un ejemplo, usar bcrypt real en producción
-- 3. Estos usuarios permiten probar todas las funcionalidades
-- 4. En producción, eliminar estos usuarios y crear reales
-- 5. Configurar política de contraseñas seguras (min 8 caracteres, mayúsculas, números, símbolos)
-- =====================================================
