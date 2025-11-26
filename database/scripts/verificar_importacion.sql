-- ============================================================================
-- VERIFICACIÓN POST-IMPORTACIÓN
-- Agenda Virtual ATA - I.E. 80002 Antonio Torres Araujo
-- ============================================================================

-- 1. Contar estudiantes con DNI poblado
SELECT 
    COUNT(*) FILTER (WHERE dni IS NOT NULL) as con_dni,
    COUNT(*) FILTER (WHERE dni IS NULL) as sin_dni,
    COUNT(*) as total
FROM estudiantes;

-- 2. Ver ejemplos de estudiantes CON DNI
SELECT dni, nombre_completo, grado, seccion
FROM estudiantes
WHERE dni IS NOT NULL
LIMIT 10;

-- 3. Ver estudiantes SIN DNI (esperamos 26)
SELECT nombre_completo, grado, seccion, fecha_nacimiento
FROM estudiantes
WHERE dni IS NULL;

-- 4. Verificar los 2 duplicados que se reportaron
SELECT dni, COUNT(*) as cantidad, 
       STRING_AGG(nombre_completo, ' | ') as nombres
FROM estudiantes
WHERE dni IS NOT NULL
GROUP BY dni
HAVING COUNT(*) > 1;

-- 5. Verificar total de usuarios
SELECT role, COUNT(*) as cantidad
FROM users
GROUP BY role
ORDER BY role;

-- 6. Verificar relaciones padre-estudiante
SELECT 
    e.nombre_completo as estudiante,
    e.grado,
    e.seccion,
    p.nombre_completo as padre,
    m.nombre_completo as madre
FROM estudiantes e
LEFT JOIN users p ON e.padre_id = p.id
LEFT JOIN users m ON e.madre_id = m.id
LIMIT 10;

-- ============================================================================
-- RESULTADOS ESPERADOS:
-- ============================================================================
-- Query 1: con_dni=772, sin_dni=26, total=798 (pero tenemos 796 por duplicados)
-- Query 2: Debería mostrar DNI como: 77927245, 80808595, etc.
-- Query 3: Debería mostrar ~26 estudiantes sin DNI
-- Query 4: Debería estar vacío (duplicados no se importaron)
-- Query 5: admin=2, padre=~1187
-- Query 6: Debería mostrar relaciones correctas
-- ============================================================================
