-- =====================================================
-- AGENDA VIRTUAL ATA - DOCUMENTACIÓN DEL SCHEMA
-- I.E. 80002 Antonio Torres Araujo
-- Sistema de Gestión de Incidencias Escolares
-- =====================================================

-- =====================================================
-- ÍNDICE
-- =====================================================
-- 1. ENUMS (Tipos Enumerados)
-- 2. TABLAS PRINCIPALES
--    2.1 users
--    2.2 estudiantes
--    2.3 periodos
--    2.4 catalogo_meritos
--    2.5 catalogo_demeritos
--    2.6 incidencias
--    2.7 alertas
--    2.8 citaciones
--    2.9 actas
-- 3. RELACIONES Y CONSTRAINTS
-- 4. ÍNDICES
-- 5. TRIGGERS
-- 6. ROW LEVEL SECURITY (RLS)
-- 7. REGLAS DE NEGOCIO

-- =====================================================
-- 1. ENUMS (TIPOS ENUMERADOS)
-- =====================================================

/*
role_enum:
  Roles de usuario en el sistema
  Valores: docente, tutor, auxiliar, direccion, toe, padre, admin
  
sexo_enum:
  Sexo del estudiante
  Valores: M (Masculino), F (Femenino), NA (No Aplica)
  
nivel_enum:
  Nivel educativo
  Valores: inicial, primaria, secundaria
  
severidad_enum:
  Nivel de severidad de deméritos
  Valores: leve, grave, muy_grave
  
incidencia_tipo_enum:
  Tipo de incidencia registrada
  Valores: merito, demerito
  
incidencia_estado_enum:
  Estado de procesamiento de incidencia
  Valores: pendiente, revisado, resuelto
  
alerta_tipo_enum:
  Tipo de alerta generada automáticamente
  Valores: alerta_tutor, citacion_toe
  
alerta_estado_enum:
  Estado de procesamiento de alerta
  Valores: pendiente, notificado, resuelto
*/

-- =====================================================
-- 2. TABLAS PRINCIPALES
-- =====================================================

-- -----------------------------------------------------
-- 2.1 TABLA: users
-- -----------------------------------------------------
/*
Descripción:
  Almacena usuarios del sistema con sus credenciales y roles.
  Soporta autenticación JWT y RBAC (Role-Based Access Control).

Columnas:
  - id: UUID, Primary Key, generado automáticamente
  - email: Correo electrónico único del usuario
  - password_hash: Hash bcrypt de la contraseña
  - role: Rol del usuario (role_enum)
  - nombre_completo: Nombre completo del usuario
  - activo: Indica si la cuenta está activa
  - created_at: Fecha de creación del registro
  - updated_at: Fecha de última actualización

Relaciones:
  - 1:N con estudiantes (como tutor)
  - 1:N con estudiantes (como padre)
  - 1:N con incidencias (registrado_por)
  - 1:N con alertas (generado_por)

Índices:
  - idx_users_email (email)
  - idx_users_role (role)
  - idx_users_activo (activo)
*/

-- -----------------------------------------------------
-- 2.2 TABLA: estudiantes
-- -----------------------------------------------------
/*
Descripción:
  Registro de estudiantes de la institución educativa.
  Relaciona estudiantes con tutores y padres de familia.

Columnas:
  - id: UUID, Primary Key
  - nombre_completo: Nombre completo del estudiante
  - dni: DNI único de 8 dígitos
  - sexo: Sexo del estudiante (sexo_enum)
  - nivel: Nivel educativo (nivel_enum)
  - grado: Grado académico (ejemplo: "1°", "5°")
  - seccion: Sección (ejemplo: "A", "B", "C")
  - aula: Identificador del aula física
  - tutor_id: FK a users (rol tutor)
  - padre_id: FK a users (rol padre)
  - activo: Estudiante activo en el sistema
  - created_at, updated_at: Timestamps

Relaciones:
  - N:1 con users (tutor)
  - N:1 con users (padre)
  - 1:N con incidencias
  - 1:N con alertas

Índices:
  - idx_estudiantes_dni (dni)
  - idx_estudiantes_tutor (tutor_id)
  - idx_estudiantes_padre (padre_id)
  - idx_estudiantes_nivel (nivel)
  - idx_estudiantes_grado_seccion (grado, seccion)
  - idx_estudiantes_activo (activo)
*/

-- -----------------------------------------------------
-- 2.3 TABLA: periodos
-- -----------------------------------------------------
/*
Descripción:
  Períodos académicos (bimestres) para organización temporal
  de incidencias y generación de reportes.

Columnas:
  - id: UUID, Primary Key
  - nombre: Nombre único del período ("I Bimestre 2025")
  - fecha_inicio: Fecha de inicio del período
  - fecha_fin: Fecha de fin del período
  - activo: Período académico activo
  - created_at, updated_at: Timestamps

Constraints:
  - check_fecha_periodo: Valida que fecha_fin > fecha_inicio

Relaciones:
  - 1:N con incidencias

Índices:
  - idx_periodos_nombre (nombre)
  - idx_periodos_activo (activo)
  - idx_periodos_fechas (fecha_inicio, fecha_fin)
*/

-- -----------------------------------------------------
-- 2.4 TABLA: catalogo_meritos
-- -----------------------------------------------------
/*
Descripción:
  Catálogo de méritos según reglamento institucional.
  Organizado en 3 áreas: Responsabilidad, Respeto, Solidaridad.

Columnas:
  - id: UUID, Primary Key
  - codigo: Código único del mérito (A-H, I-K, N-P)
  - nombre: Nombre del mérito
  - descripcion: Descripción detallada
  - area: Área del mérito (Responsabilidad, Respeto, Solidaridad)
  - vigente: Indica si el mérito está vigente
  - created_at, updated_at: Timestamps

Total de méritos: 14
  - Responsabilidad: 8 (A-H)
  - Respeto: 3 (I-K)
  - Solidaridad: 3 (N-P)

Relaciones:
  - 1:N con incidencias

Índices:
  - idx_meritos_codigo (codigo)
  - idx_meritos_area (area)
  - idx_meritos_vigente (vigente)
*/

-- -----------------------------------------------------
-- 2.5 TABLA: catalogo_demeritos
-- -----------------------------------------------------
/*
Descripción:
  Catálogo de deméritos según reglamento institucional.
  Clasificados por severidad para escalación automática.

Columnas:
  - id: UUID, Primary Key
  - codigo: Código único del demérito (1-54)
  - nombre: Nombre del demérito
  - descripcion: Descripción detallada
  - categoria: Categoría del demérito (Leves, Graves, Muy Graves)
  - severidad: Nivel de severidad (severidad_enum)
  - vigente: Indica si el demérito está vigente
  - created_at, updated_at: Timestamps

Total de deméritos: 54
  - Leves: 18 (códigos 1-18)
  - Graves: 18 (códigos 19-36)
  - Muy Graves: 18 (códigos 37-54)

Reglas de escalación:
  - 3 leves/semana → Alerta a tutor
  - 5 leves/bimestre → Citación TOE
  - 1 grave → Citación TOE
  - 1 muy grave → Citación con dirección + acta

Relaciones:
  - 1:N con incidencias

Índices:
  - idx_demeritos_codigo (codigo)
  - idx_demeritos_categoria (categoria)
  - idx_demeritos_severidad (severidad)
  - idx_demeritos_vigente (vigente)
*/

-- -----------------------------------------------------
-- 2.6 TABLA: incidencias
-- -----------------------------------------------------
/*
Descripción:
  Registro central de todas las incidencias (méritos y deméritos).
  Incluye trazabilidad completa y evidencias.

Columnas:
  - id: UUID, Primary Key
  - estudiante_id: FK a estudiantes
  - periodo_id: FK a periodos
  - tipo: merito o demerito (incidencia_tipo_enum)
  - catalogo_merito_id: FK a catalogo_meritos (si tipo=merito)
  - catalogo_demerito_id: FK a catalogo_demeritos (si tipo=demerito)
  - codigo: Código de referencia del catálogo
  - descripcion: Descripción detallada de la incidencia
  - severidad: Severidad (solo deméritos)
  - registrado_por: FK a users (quien registró)
  - estado: pendiente, revisado, resuelto
  - accion_requerida: Acciones correctivas o seguimiento
  - evidencia_url: URL a evidencias (fotos, documentos)
  - fecha: Fecha de ocurrencia
  - created_at, updated_at: Timestamps

Constraints:
  - check_tipo_merito_demerito: Valida integridad referencial
    según tipo de incidencia

Relaciones:
  - N:1 con estudiantes
  - N:1 con periodos
  - N:1 con catalogo_meritos
  - N:1 con catalogo_demeritos
  - N:1 con users (registrado_por)
  - 1:N con alertas

Índices:
  - idx_incidencias_estudiante (estudiante_id)
  - idx_incidencias_periodo (periodo_id)
  - idx_incidencias_tipo (tipo)
  - idx_incidencias_estado (estado)
  - idx_incidencias_fecha (fecha)
  - idx_incidencias_registrado_por (registrado_por)
*/

-- -----------------------------------------------------
-- 2.7 TABLA: alertas
-- -----------------------------------------------------
/*
Descripción:
  Alertas automáticas generadas por el sistema según
  reglas de negocio de escalación.

Columnas:
  - id: UUID, Primary Key
  - estudiante_id: FK a estudiantes
  - incidencia_id: FK a incidencias (que disparó la alerta)
  - tipo: alerta_tutor o citacion_toe
  - motivo: Razón de la alerta
  - generado_por: FK a users (puede ser NULL si es automática)
  - fecha_generacion: Timestamp de creación
  - estado: pendiente, notificado, resuelto
  - mensaje: Contenido de la notificación
  - created_at, updated_at: Timestamps

Tipos de alertas:
  - alerta_tutor: Notificación al tutor (3 leves/semana)
  - citacion_toe: Requiere citación TOE (5 leves/bimestre o grave)

Relaciones:
  - N:1 con estudiantes
  - N:1 con incidencias
  - N:1 con users (generado_por)
  - 1:1 con citaciones

Índices:
  - idx_alertas_estudiante (estudiante_id)
  - idx_alertas_incidencia (incidencia_id)
  - idx_alertas_tipo (tipo)
  - idx_alertas_estado (estado)
  - idx_alertas_fecha (fecha_generacion)
*/

-- -----------------------------------------------------
-- 2.8 TABLA: citaciones
-- -----------------------------------------------------
/*
Descripción:
  Citaciones programadas a padres de familia.
  Generadas por alertas de escalación.

Columnas:
  - id: UUID, Primary Key
  - alerta_id: FK a alertas
  - fecha_citacion: Fecha programada para la reunión
  - lugar: Lugar de la reunión
  - asunto: Tema de la citación
  - mensaje: Contenido del mensaje al padre
  - padre_confirmado: Confirmación de asistencia
  - evidencia_url: URL a evidencias (convocatoria, confirmación)
  - created_at, updated_at: Timestamps

Relaciones:
  - 1:1 con alertas
  - 1:1 con actas

Índices:
  - idx_citaciones_alerta (alerta_id)
  - idx_citaciones_fecha (fecha_citacion)
  - idx_citaciones_confirmado (padre_confirmado)
*/

-- -----------------------------------------------------
-- 2.9 TABLA: actas
-- -----------------------------------------------------
/*
Descripción:
  Actas de reuniones con padres de familia.
  Evidencia documental del proceso disciplinario.

Columnas:
  - id: UUID, Primary Key
  - citacion_id: FK a citaciones
  - contenido: Contenido del acta (acuerdos, compromisos)
  - firmado_padre: Firma del padre/apoderado
  - firmado_tutor: Firma del tutor/TOE
  - fecha: Fecha de la reunión
  - evidencia_url: URL a acta escaneada con firmas
  - created_at, updated_at: Timestamps

Relaciones:
  - 1:1 con citaciones

Índices:
  - idx_actas_citacion (citacion_id)
  - idx_actas_fecha (fecha)
  - idx_actas_firmado (firmado_padre, firmado_tutor)
*/

-- =====================================================
-- 3. RELACIONES Y CONSTRAINTS
-- =====================================================

/*
RELACIONES PRINCIPALES:

users (1) → (N) estudiantes [como tutor]
users (1) → (N) estudiantes [como padre]
users (1) → (N) incidencias [registrado_por]

estudiantes (1) → (N) incidencias
estudiantes (1) → (N) alertas

periodos (1) → (N) incidencias

catalogo_meritos (1) → (N) incidencias
catalogo_demeritos (1) → (N) incidencias

incidencias (1) → (N) alertas

alertas (1) → (1) citaciones

citaciones (1) → (1) actas

CONSTRAINTS:
- check_fecha_periodo: Valida períodos académicos
- check_tipo_merito_demerito: Valida integridad de incidencias
*/

-- =====================================================
-- 4. ÍNDICES
-- =====================================================

/*
Índices creados para optimización de consultas:

1. Búsquedas por email y autenticación: idx_users_email
2. Filtros por rol: idx_users_role
3. Búsqueda de estudiantes por DNI: idx_estudiantes_dni
4. Consultas por tutor/padre: idx_estudiantes_tutor, idx_estudiantes_padre
5. Reportes por período: idx_incidencias_periodo
6. Consultas de incidencias por estudiante: idx_incidencias_estudiante
7. Filtros por tipo y estado: idx_incidencias_tipo, idx_incidencias_estado
8. Reportes temporales: idx_incidencias_fecha, idx_alertas_fecha
9. Búsquedas en catálogos: idx_meritos_codigo, idx_demeritos_codigo
10. Consultas compuestas: idx_estudiantes_grado_seccion
*/

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

/*
Función: update_updated_at_column()
  Actualiza automáticamente el campo updated_at en cada UPDATE

Triggers aplicados a todas las tablas:
  - update_users_updated_at
  - update_estudiantes_updated_at
  - update_periodos_updated_at
  - update_catalogo_meritos_updated_at
  - update_catalogo_demeritos_updated_at
  - update_incidencias_updated_at
  - update_alertas_updated_at
  - update_citaciones_updated_at
  - update_actas_updated_at
*/

-- =====================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- =====================================================

/*
RLS habilitado en todas las tablas para seguridad granular.

Funciones auxiliares:
  - auth.user_role(): Obtiene rol del usuario autenticado
  - auth.is_admin(): Verifica si es administrador
  - auth.is_staff(): Verifica si es personal educativo

Políticas principales:

users:
  - Ver propio perfil
  - Admins ven todos
  - Actualizar propio perfil (sin cambiar rol)

estudiantes:
  - Staff ve todos
  - Padres ven solo sus hijos

incidencias:
  - Staff ve todas
  - Padres ven de sus hijos
  - Staff puede registrar
  - Docente actualiza las que registró
  - Dirección/TOE actualizan todas

alertas:
  - Staff ve todas
  - Padres ven de sus hijos
  - TOE puede crear y actualizar

citaciones/actas:
  - Staff ve todas
  - Padres ven las suyas
  - TOE puede crear y actualizar
  - Padres pueden confirmar asistencia

Para detalles completos, ver: 002_rls_policies.sql
*/

-- =====================================================
-- 7. REGLAS DE NEGOCIO
-- =====================================================

/*
ESCALACIÓN AUTOMÁTICA DE DEMÉRITOS:

1. DEMÉRITOS LEVES:
   - 3 leves en una semana → Genera alerta_tutor
   - 5 leves en un bimestre → Genera citacion_toe
   
2. DEMÉRITOS GRAVES:
   - 1 grave → Genera citacion_toe inmediata
   
3. DEMÉRITOS MUY GRAVES:
   - 1 muy grave → Genera citacion_toe con dirección
   - Requiere acta obligatoria
   
FLUJO DE PROCESAMIENTO:

1. Registro de incidencia (docente/tutor/auxiliar)
2. Sistema evalúa severidad
3. Sistema verifica acumulación
4. Si cumple reglas → Genera alerta automática
5. Si alerta es citacion_toe → TOE recibe notificación
6. TOE programa citación
7. Reunión con padre → Se genera acta
8. Acta firmada → Incidencia cambia a "resuelto"

PERÍODOS ACADÉMICOS:

- 4 bimestres por año escolar
- Solo 1 período activo a la vez
- Incidencias se contabilizan por período
- Reportes se generan por período

MÉRITOS:

- Reconocimiento positivo a estudiantes
- No afectan escalación de deméritos
- Se incluyen en reportes bimestrales
- Pueden compensar deméritos leves (a criterio del tutor)

EVIDENCIAS:

- URL a archivos almacenados en Supabase Storage
- Formatos: PDF, JPG, PNG
- Máximo 5MB por archivo
- Obligatorio para deméritos graves y muy graves
*/

-- =====================================================
-- FIN DE DOCUMENTACIÓN
-- =====================================================
