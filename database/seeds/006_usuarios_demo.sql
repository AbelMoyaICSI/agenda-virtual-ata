-- =====================================================
-- USUARIOS DEMO/TEMPORALES PARA TESTING
-- I.E. 80002 Antonio Torres Araujo
-- =====================================================
-- Contraseña para todos: Demo2025!
-- Hash bcrypt (12 rounds): $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2
-- =====================================================

INSERT INTO users (
  id,
  email,
  password_hash,
  role,
  nombre_completo,
  dni,
  telefono,
  activo,
  activado,
  created_at,
  updated_at
) VALUES 
  -- 1. ADMINISTRADOR
  (
    gen_random_uuid(),
    'admin@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'admin',
    'ADMINISTRADOR SISTEMA',
    '00000001',
    '999000001',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 2. DIRECTOR
  (
    gen_random_uuid(),
    'director@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'direccion',
    'GARCIA RODRIGUEZ CARLOS ALBERTO',
    '00000002',
    '999000002',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 3. TUTOR DE ORIENTACIÓN EDUCATIVA (TOE/Psicólogo)
  (
    gen_random_uuid(),
    'toe@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'toe',
    'LOPEZ SILVA MARIA FERNANDA',
    '00000003',
    '999000003',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 4. TUTOR DE AULA (1ro A - Secundaria)
  (
    gen_random_uuid(),
    'tutor1a@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'tutor',
    'MARTINEZ TORRES JUAN PABLO',
    '00000004',
    '999000004',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 5. AUXILIAR DE EDUCACIÓN
  (
    gen_random_uuid(),
    'auxiliar@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'auxiliar',
    'RAMIREZ CASTRO ANA LUCIA',
    '00000005',
    '999000005',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 6. DOCENTE (Matemática)
  (
    gen_random_uuid(),
    'docente.matematica@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'docente',
    'FLORES MENDOZA RICARDO JAVIER',
    '00000006',
    '999000006',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 7. DOCENTE (Comunicación)
  (
    gen_random_uuid(),
    'docente.comunicacion@ata.edu.pe',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'docente',
    'SANCHEZ VEGA PATRICIA ISABEL',
    '00000007',
    '999000007',
    true,
    true,
    NOW(),
    NOW()
  ),
  
  -- 8. PADRE DE FAMILIA (Apoderado de estudiante de prueba)
  (
    gen_random_uuid(),
    'padre.demo@gmail.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5FS6s2KBvcHh2',
    'padre',
    'GONZALES PEREZ LUIS ENRIQUE',
    '00000008',
    '999000008',
    true,
    true,
    NOW(),
    NOW()
  )

ON CONFLICT (dni) DO NOTHING;

-- =====================================================
-- NOTAS IMPORTANTES:
-- =====================================================
-- 1. Todos los usuarios tienen la contraseña: Demo2025!
-- 2. Pueden iniciar sesión con EMAIL o DNI
-- 3. Ejemplos de login:
--    - Email: admin@ata.edu.pe / Demo2025!
--    - DNI: 00000001 / Demo2025!
-- 4. Para cambiar contraseña, usar bcrypt con 12 rounds
-- 5. Estos usuarios están activados (activado = true)
-- =====================================================
