-- =====================================================
-- AGENDA VIRTUAL ATA - DATOS SEMILLA
-- Catálogo de Méritos según Reglamento Institucional
-- I.E. 80002 Antonio Torres Araujo
-- =====================================================

-- CATEGORÍA: RESPONSABILIDAD (Códigos A-H)
INSERT INTO catalogo_meritos (codigo, nombre, descripcion, area, vigente) VALUES
  (
    'A',
    'Cumplimiento ejemplar de tareas',
    'Estudiante que entrega todas sus tareas en tiempo y forma, demostrando dedicación y compromiso constante con su aprendizaje.',
    'Responsabilidad',
    true
  ),
  (
    'B',
    'Asistencia y puntualidad perfecta',
    'Estudiante con asistencia completa sin tardanzas durante el bimestre, demostrando compromiso y respeto por el tiempo.',
    'Responsabilidad',
    true
  ),
  (
    'C',
    'Cuidado del material educativo',
    'Mantiene en excelente estado sus útiles escolares, textos y materiales, promoviendo el cuidado de los recursos.',
    'Responsabilidad',
    true
  ),
  (
    'D',
    'Organización y orden personal',
    'Demuestra organización en su espacio de trabajo, mochila y materiales, siendo ejemplo de orden para sus compañeros.',
    'Responsabilidad',
    true
  ),
  (
    'E',
    'Participación activa en clase',
    'Participa constantemente en clase con aportes significativos, preguntas pertinentes y actitud proactiva hacia el aprendizaje.',
    'Responsabilidad',
    true
  ),
  (
    'F',
    'Mejora académica sostenida',
    'Demuestra progreso constante en su rendimiento académico, superando dificultades con esfuerzo y dedicación.',
    'Responsabilidad',
    true
  ),
  (
    'G',
    'Compromiso con normas de convivencia',
    'Cumple ejemplarmente con el reglamento interno, siendo modelo de conducta para la comunidad educativa.',
    'Responsabilidad',
    true
  ),
  (
    'H',
    'Liderazgo académico positivo',
    'Asume roles de liderazgo en trabajos grupales, promoviendo el aprendizaje colaborativo y el logro de objetivos comunes.',
    'Responsabilidad',
    true
  ),

-- CATEGORÍA: RESPETO (Códigos I-K)
  (
    'I',
    'Trato respetuoso constante',
    'Trata con respeto, amabilidad y cortesía a todos los miembros de la comunidad educativa (docentes, compañeros, personal).',
    'Respeto',
    true
  ),
  (
    'J',
    'Cuidado del patrimonio institucional',
    'Cuida y protege las instalaciones, mobiliario y recursos de la institución, promoviendo su conservación.',
    'Respeto',
    true
  ),
  (
    'K',
    'Promoción de ambiente de paz',
    'Contribuye activamente a la resolución pacífica de conflictos y mantiene un ambiente armonioso en el aula.',
    'Respeto',
    true
  ),

-- CATEGORÍA: SOLIDARIDAD (Códigos N-P)
  (
    'N',
    'Ayuda a compañeros',
    'Brinda apoyo académico y emocional a compañeros que lo necesitan, fomentando la cooperación y el compañerismo.',
    'Solidaridad',
    true
  ),
  (
    'O',
    'Participación en actividades solidarias',
    'Participa activamente en campañas, actividades benéficas y proyectos sociales organizados por la institución.',
    'Solidaridad',
    true
  ),
  (
    'P',
    'Representación institucional destacada',
    'Representa dignamente a la institución en eventos académicos, deportivos, culturales o sociales, obteniendo reconocimiento.',
    'Solidaridad',
    true
  )

ON CONFLICT (codigo) DO NOTHING;

-- Comentario
-- Total: 14 méritos organizados en 3 áreas
-- Responsabilidad: 8 méritos (A-H)
-- Respeto: 3 méritos (I-K)
-- Solidaridad: 3 méritos (N-P)
