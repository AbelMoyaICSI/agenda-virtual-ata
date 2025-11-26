-- ============================================================================
-- SCRIPT: LIMPIAR EMAILS FICTICIOS DE LA BASE DE DATOS
-- ============================================================================
-- Descripción: Elimina todos los emails ficticios generados durante la
--              importación inicial que tienen el patrón @padres.ata.edu.pe
-- 
-- IMPORTANTE: Este script pone NULL en los emails que fueron generados
--             automáticamente, para que los usuarios puedan registrar
--             su email real durante la activación de cuenta.
-- ============================================================================

-- PASO 1: Ver cuántos registros se verán afectados
SELECT 
    COUNT(*) as total_emails_ficticios,
    role
FROM users
WHERE email LIKE '%@padres.ata.edu.pe'
GROUP BY role;

-- PASO 2: Mostrar ejemplos de emails que se eliminarán
SELECT 
    id,
    nombre_completo,
    dni,
    email,
    role,
    activado
FROM users
WHERE email LIKE '%@padres.ata.edu.pe'
LIMIT 10;

-- PASO 3: ACTUALIZAR - Poner NULL en emails ficticios
-- Descomenta las siguientes líneas para ejecutar la limpieza:

/*
UPDATE users
SET email = NULL
WHERE email LIKE '%@padres.ata.edu.pe';
*/

-- PASO 4: Verificar resultado
-- Descomenta para ver cuántos emails quedaron como NULL:

/*
SELECT 
    COUNT(*) as total_sin_email,
    role
FROM users
WHERE email IS NULL
GROUP BY role;
*/

-- ============================================================================
-- NOTAS:
-- ============================================================================
-- 1. Los usuarios con email NULL deberán registrar su email durante la
--    activación de cuenta (paso obligatorio antes de crear contraseña)
--
-- 2. Los emails reales (como gmail.com, outlook.com, etc.) NO se verán
--    afectados por este script
--
-- 3. Después de ejecutar este script, el sistema de activación requerirá
--    que cada usuario registre un email válido y único
--
-- 4. Para ejecutar este script:
--    - Ve al SQL Editor en Supabase Dashboard
--    - Copia y pega este contenido
--    - Ejecuta primero las consultas SELECT para verificar
--    - Luego descomenta el UPDATE para aplicar cambios
-- ============================================================================
