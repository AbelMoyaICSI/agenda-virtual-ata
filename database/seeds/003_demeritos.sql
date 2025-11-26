-- =====================================================
-- AGENDA VIRTUAL ATA - DATOS SEMILLA
-- Catálogo de Deméritos según Reglamento Institucional
-- I.E. 80002 Antonio Torres Araujo
-- =====================================================

-- =====================================================
-- DEMÉRITOS LEVES (Códigos 1-18)
-- =====================================================
INSERT INTO catalogo_demeritos (codigo, nombre, descripcion, categoria, severidad, vigente) VALUES
  ('1', 'Incumplimiento de tareas', 'No presenta tareas asignadas en el plazo establecido sin justificación válida.', 'Leves', 'leve', true),
  ('2', 'Tardanza injustificada', 'Llega tarde a clase sin motivo justificado, interrumpiendo el normal desarrollo de la sesión.', 'Leves', 'leve', true),
  ('3', 'Desorden en el aula', 'Genera desorden, ruido o distracción que afecta el ambiente de aprendizaje.', 'Leves', 'leve', true),
  ('4', 'Incumplimiento de uniforme', 'No porta correctamente el uniforme escolar o incumple normas de presentación personal.', 'Leves', 'leve', true),
  ('5', 'Uso indebido de materiales', 'Utiliza materiales educativos para fines no académicos o de forma inapropiada.', 'Leves', 'leve', true),
  ('6', 'Falta de atención', 'Muestra desinterés o distracción constante durante las clases.', 'Leves', 'leve', true),
  ('7', 'Lenguaje inapropiado leve', 'Utiliza lenguaje coloquial, jergas o palabras inadecuadas en el contexto escolar.', 'Leves', 'leve', true),
  ('8', 'Incumplimiento de normas menores', 'No respeta normas menores de convivencia establecidas en el aula o institución.', 'Leves', 'leve', true),
  ('9', 'Desorganización personal', 'No trae materiales necesarios, olvida útiles escolares frecuentemente.', 'Leves', 'leve', true),
  ('10', 'Interrupciones constantes', 'Interrumpe al docente o compañeros sin permiso durante las clases.', 'Leves', 'leve', true),
  ('11', 'Incumplimiento de instrucciones', 'No sigue indicaciones del docente o personal de la institución.', 'Leves', 'leve', true),
  ('12', 'Uso de celular en clase', 'Utiliza dispositivos móviles durante clases sin autorización del docente.', 'Leves', 'leve', true),
  ('13', 'Masticar chicle', 'Mastica chicle en horas de clase o dentro de las instalaciones donde está prohibido.', 'Leves', 'leve', true),
  ('14', 'Salir del aula sin permiso', 'Abandona el salón de clases sin autorización del docente.', 'Leves', 'leve', true),
  ('15', 'Falta de higiene personal', 'Descuido en la higiene y presentación personal que afecta la convivencia.', 'Leves', 'leve', true),
  ('16', 'Conversaciones fuera de tema', 'Mantiene conversaciones no relacionadas con la clase durante la sesión.', 'Leves', 'leve', true),
  ('17', 'Consumir alimentos en clase', 'Come o bebe durante clases sin autorización, generando distracción.', 'Leves', 'leve', true),
  ('18', 'Descuido del espacio común', 'No contribuye al orden y limpieza del aula o espacios compartidos.', 'Leves', 'leve', true),

-- =====================================================
-- DEMÉRITOS GRAVES (Códigos 19-36)
-- =====================================================
  ('19', 'Reincidencia en faltas leves', 'Acumulación de 3 o más deméritos leves en una semana.', 'Graves', 'grave', true),
  ('20', 'Copia en evaluaciones', 'Intenta copiar durante exámenes o trabajos evaluados.', 'Graves', 'grave', true),
  ('21', 'Falta de respeto verbal', 'Utiliza lenguaje ofensivo, grosero o irrespetuoso hacia compañeros o docentes.', 'Graves', 'grave', true),
  ('22', 'Comportamiento disruptivo', 'Conducta que interrumpe significativamente el proceso de enseñanza-aprendizaje.', 'Graves', 'grave', true),
  ('23', 'Daño a propiedad ajena', 'Daña o destruye materiales, útiles o pertenencias de compañeros.', 'Graves', 'grave', true),
  ('24', 'Falta injustificada a clases', 'Ausencia a clases sin justificación médica o familiar válida.', 'Graves', 'grave', true),
  ('25', 'Desobediencia a autoridad', 'Se niega a cumplir órdenes o indicaciones del personal docente o administrativo.', 'Graves', 'grave', true),
  ('26', 'Uso de apodos ofensivos', 'Utiliza sobrenombres despectivos o humillantes hacia compañeros.', 'Graves', 'grave', true),
  ('27', 'Mentira o engaño', 'Proporciona información falsa a docentes, padres o autoridades escolares.', 'Graves', 'grave', true),
  ('28', 'Incitación al desorden', 'Promueve o lidera acciones que alteran el orden y la disciplina escolar.', 'Graves', 'grave', true),
  ('29', 'Sustracción menor', 'Toma objetos ajenos sin permiso (de valor menor).', 'Graves', 'grave', true),
  ('30', 'Abandono de la institución', 'Sale de la institución sin autorización durante el horario escolar.', 'Graves', 'grave', true),
  ('31', 'Daño a instalaciones', 'Deteriora mobiliario, paredes, puertas u otras instalaciones escolares.', 'Graves', 'grave', true),
  ('32', 'Grabaciones no autorizadas', 'Graba audio, video o toma fotografías sin consentimiento en la institución.', 'Graves', 'grave', true),
  ('33', 'Plagio académico', 'Presenta trabajos copiados de internet o de otros estudiantes como propios.', 'Graves', 'grave', true),
  ('34', 'Conducta inapropiada', 'Comportamientos que atentan contra la moral y buenas costumbres en la institución.', 'Graves', 'grave', true),
  ('35', 'Difusión de información falsa', 'Propaga rumores, información falsa o difamatoria sobre compañeros o personal.', 'Graves', 'grave', true),
  ('36', 'Uso de lenguaje discriminatorio', 'Utiliza expresiones racistas, sexistas o discriminatorias de cualquier tipo.', 'Graves', 'grave', true),

-- =====================================================
-- DEMÉRITOS MUY GRAVES (Códigos 37-54)
-- =====================================================
  ('37', 'Agresión física', 'Golpea, empuja o agrede físicamente a compañeros, docentes o personal.', 'Muy Graves', 'muy_grave', true),
  ('38', 'Bullying o acoso escolar', 'Realiza acoso sistemático, intimidación o hostigamiento a compañeros.', 'Muy Graves', 'muy_grave', true),
  ('39', 'Cyberbullying', 'Acoso, intimidación o difamación a través de medios digitales o redes sociales.', 'Muy Graves', 'muy_grave', true),
  ('40', 'Amenazas graves', 'Profiere amenazas serias de daño físico o psicológico a miembros de la comunidad.', 'Muy Graves', 'muy_grave', true),
  ('41', 'Robo', 'Sustrae objetos de valor pertenecientes a la institución o miembros de la comunidad.', 'Muy Graves', 'muy_grave', true),
  ('42', 'Consumo de sustancias prohibidas', 'Consume alcohol, tabaco o drogas dentro de la institución.', 'Muy Graves', 'muy_grave', true),
  ('43', 'Porte de armas', 'Porta armas blancas, de fuego o cualquier objeto peligroso en la institución.', 'Muy Graves', 'muy_grave', true),
  ('44', 'Suplantación de identidad', 'Falsifica firmas, documentos o se hace pasar por otra persona.', 'Muy Graves', 'muy_grave', true),
  ('45', 'Extorsión o chantaje', 'Obliga a compañeros a entregar dinero, objetos o realizar acciones bajo amenaza.', 'Muy Graves', 'muy_grave', true),
  ('46', 'Difamación grave', 'Difunde información falsa o humillante que daña gravemente la reputación de terceros.', 'Muy Graves', 'muy_grave', true),
  ('47', 'Acoso sexual', 'Realiza insinuaciones, contacto físico o comentarios de naturaleza sexual no deseados.', 'Muy Graves', 'muy_grave', true),
  ('48', 'Vandalismo', 'Destrucción intencional y grave de propiedad institucional o ajena.', 'Muy Graves', 'muy_grave', true),
  ('49', 'Incitación a la violencia', 'Promueve, organiza o lidera actos violentos o motines dentro de la institución.', 'Muy Graves', 'muy_grave', true),
  ('50', 'Publicación de contenido ofensivo', 'Publica en redes sociales contenido que denigra a la institución o sus miembros.', 'Muy Graves', 'muy_grave', true),
  ('51', 'Porte de material pornográfico', 'Posee, distribuye o exhibe material de contenido sexual explícito.', 'Muy Graves', 'muy_grave', true),
  ('52', 'Alteración de documentos oficiales', 'Falsifica, modifica o altera documentos académicos o administrativos.', 'Muy Graves', 'muy_grave', true),
  ('53', 'Comercialización ilícita', 'Vende, comercializa o distribuye sustancias prohibidas en la institución.', 'Muy Graves', 'muy_grave', true),
  ('54', 'Reincidencia en faltas graves', 'Acumulación de 5 o más deméritos leves en un bimestre o reiteración de faltas graves.', 'Muy Graves', 'muy_grave', true)

ON CONFLICT (codigo) DO NOTHING;

-- =====================================================
-- RESUMEN DEL CATÁLOGO
-- =====================================================
-- Total: 54 deméritos clasificados por severidad
-- Leves: 18 deméritos (códigos 1-18)
-- Graves: 18 deméritos (códigos 19-36)
-- Muy Graves: 18 deméritos (códigos 37-54)
--
-- Reglas de escalación automática:
-- - 3 leves en una semana → Alerta al tutor
-- - 5 leves en un bimestre → Citación TOE
-- - 1 grave → Citación TOE inmediata
-- - 1 muy grave → Citación con dirección + acta obligatoria
-- =====================================================
