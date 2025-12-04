-- =====================================================
-- MIGRACIÓN 006: Limpiar solicitudes huérfanas
-- Ejecutar en: Supabase SQL Editor
-- Fecha: Diciembre 2025
-- =====================================================
-- Este script limpia las solicitudes de registro que quedaron
-- "huérfanas" (pendientes o aprobadas) cuando un usuario fue
-- eliminado manualmente sin procesar la solicitud.
-- =====================================================

-- 1. Ver solicitudes pendientes actuales (para diagnóstico)
SELECT 
    id,
    dni,
    email,
    nombre_completo,
    estado,
    created_at
FROM solicitudes_registro
ORDER BY created_at DESC;

-- 2. ELIMINAR TODAS las solicitudes que NO son pendientes
-- (aprobadas, rechazadas, etc - ya fueron procesadas)
DELETE FROM solicitudes_registro 
WHERE estado != 'pendiente';

-- 3. ELIMINAR solicitudes pendientes de usuarios que YA existen en la tabla users
-- (significa que el admin creó la cuenta manualmente y la solicitud quedó pendiente)
DELETE FROM solicitudes_registro sr
WHERE estado = 'pendiente'
AND EXISTS (
    SELECT 1 FROM users u 
    WHERE u.email = sr.email OR u.dni = sr.dni
);

-- 4. Ver solicitudes que quedan (deberían ser solo pendientes legítimas)
SELECT 
    id,
    dni,
    email,
    nombre_completo,
    estado,
    created_at
FROM solicitudes_registro
ORDER BY created_at DESC;

-- =====================================================
-- NOTA: Si quieres eliminar una solicitud específica por email:
-- DELETE FROM solicitudes_registro WHERE email = 'correo@ejemplo.com';
-- =====================================================
