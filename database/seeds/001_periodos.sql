-- =====================================================
-- AGENDA VIRTUAL ATA - DATOS SEMILLA
-- Períodos Académicos 2025
-- =====================================================

-- Insertar períodos académicos del año 2025
INSERT INTO periodos (nombre, fecha_inicio, fecha_fin, activo) VALUES
  ('I Bimestre 2025', '2025-03-11', '2025-05-16', true),
  ('II Bimestre 2025', '2025-05-19', '2025-07-25', false),
  ('III Bimestre 2025', '2025-08-11', '2025-10-17', false),
  ('IV Bimestre 2025', '2025-10-20', '2025-12-19', false)
ON CONFLICT (nombre) DO NOTHING;

-- Comentario
-- El I Bimestre está activo por defecto (año escolar en curso)
