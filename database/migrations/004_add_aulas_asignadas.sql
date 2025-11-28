-- =====================================================
-- MIGRACIÓN: Agregar campo aulas_asignadas a users
-- Descripción: Permite a los tutores tener aulas asignadas
-- Fecha: 2025-11-27
-- =====================================================

-- Agregar columna para almacenar las aulas asignadas del tutor
-- Formato: Array de strings como ["1A", "1B"] o simplemente "1A"
ALTER TABLE users ADD COLUMN IF NOT EXISTS aulas_asignadas JSONB DEFAULT NULL;

-- Comentario explicativo
COMMENT ON COLUMN users.aulas_asignadas IS 'Aulas asignadas al tutor. Formato: ["1A", "2B"] para múltiples aulas o "1A" para una sola';

-- Índice para búsquedas por aulas asignadas
CREATE INDEX IF NOT EXISTS idx_users_aulas_asignadas ON users USING GIN (aulas_asignadas);

-- =====================================================
-- EJEMPLO DE USO:
-- =====================================================
-- Para asignar un aula a un tutor:
-- UPDATE users SET aulas_asignadas = '["1A"]' WHERE id = 'uuid-del-tutor';
--
-- Para asignar múltiples aulas:
-- UPDATE users SET aulas_asignadas = '["1A", "1B", "2A"]' WHERE id = 'uuid-del-tutor';
--
-- Para buscar tutores de un aula específica:
-- SELECT * FROM users WHERE aulas_asignadas @> '"1A"';
-- =====================================================
