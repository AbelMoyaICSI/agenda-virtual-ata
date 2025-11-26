-- ============================================================================
-- SCRIPT DE LIMPIEZA DE TABLAS - SUPABASE
-- Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
-- ============================================================================
-- 
-- PROPÓSITO: Eliminar todos los datos importados para permitir reimportación
--            limpia sin duplicados.
--
-- IMPORTANTE: 
-- - Este script NO elimina el usuario admin
-- - NO elimina los datos de catálogos (periodos, meritos, demeritos)
-- - Solo elimina estudiantes, padres y registros relacionados
--
-- ORDEN: Se eliminan en orden inverso a las dependencias (FK)
-- ============================================================================

-- PASO 1: Eliminar registros de incidencias (dependen de estudiantes)
DELETE FROM incidencias;
-- ✅ Esperado: 0 registros eliminados (no hay incidencias aún)

-- PASO 2: Eliminar alertas (dependen de estudiantes)
DELETE FROM alertas;
-- ✅ Esperado: 0 registros eliminados (no hay alertas aún)

-- PASO 3: Eliminar citaciones (dependen de estudiantes)
DELETE FROM citaciones;
-- ✅ Esperado: 0 registros eliminados (no hay citaciones aún)

-- PASO 4: Eliminar actas (dependen de estudiantes)
DELETE FROM actas;
-- ✅ Esperado: 0 registros eliminados (no hay actas aún)

-- PASO 5: Eliminar estudiantes (tienen FK a users para padre/madre/apoderado)
DELETE FROM estudiantes;
-- ✅ Esperado: 798 registros eliminados

-- PASO 6: Eliminar usuarios padres/madres/apoderados (mantener admin)
DELETE FROM users WHERE role != 'admin';
-- ✅ Esperado: 1,187 registros eliminados (todos los padres)

-- ============================================================================
-- VERIFICACIÓN FINAL
-- ============================================================================
-- Ejecuta estas consultas para verificar el estado:

-- SELECT COUNT(*) as total_estudiantes FROM estudiantes;
-- Resultado esperado: 0

-- SELECT COUNT(*) as total_usuarios FROM users;
-- Resultado esperado: 1 (solo admin)

-- SELECT COUNT(*) as total_admin FROM users WHERE role = 'admin';
-- Resultado esperado: 1

-- SELECT email FROM users WHERE role = 'admin';
-- Resultado esperado: admin@ieat80002.edu.pe

-- ============================================================================
-- PRÓXIMO PASO: Ejecutar script de importación
-- ============================================================================
-- python database/scripts/importar_a_supabase.py
-- ✅ Importará 1,187 usuarios + 798 estudiantes CON 772 DNI de estudiantes
-- ============================================================================
