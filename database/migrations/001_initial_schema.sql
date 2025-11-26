-- =====================================================
-- AGENDA VIRTUAL ATA - MIGRACIÓN INICIAL
-- I.E. 80002 Antonio Torres Araujo
-- Versión: 1.0.0
-- Fecha: 2025-01-XX
-- =====================================================

-- =====================================================
-- PARTE 1: ENUMS (Tipos Enumerados)
-- =====================================================

-- Roles de usuario en el sistema
CREATE TYPE role_enum AS ENUM (
  'docente',
  'tutor',
  'auxiliar',
  'direccion',
  'toe',
  'padre',
  'admin'
);

-- Sexo del estudiante
CREATE TYPE sexo_enum AS ENUM (
  'M',  -- Masculino
  'F',  -- Femenino
  'NA'  -- No Aplica / Prefiere no decir
);

-- Nivel educativo (MVP: solo secundaria)
CREATE TYPE nivel_enum AS ENUM (
  'secundaria'
);

-- Severidad de deméritos e incidencias
CREATE TYPE severidad_enum AS ENUM (
  'leve',
  'grave',
  'muy_grave'
);

-- Tipo de incidencia
CREATE TYPE incidencia_tipo_enum AS ENUM (
  'merito',
  'demerito'
);

-- Estado de procesamiento de incidencias
CREATE TYPE incidencia_estado_enum AS ENUM (
  'pendiente',
  'revisado',
  'resuelto'
);

-- Tipo de alerta generada
CREATE TYPE alerta_tipo_enum AS ENUM (
  'alerta_tutor',
  'citacion_toe'
);

-- Estado de alertas y notificaciones
CREATE TYPE alerta_estado_enum AS ENUM (
  'pendiente',
  'notificado',
  'resuelto'
);

-- =====================================================
-- PARTE 2: TABLAS PRINCIPALES
-- =====================================================

-- -----------------------------------------------------
-- Tabla: users
-- Descripción: Usuarios del sistema (docentes, tutores, auxiliares, TOE, dirección, padres, admins)
-- -----------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,
  role role_enum NOT NULL DEFAULT 'docente',
  nombre_completo VARCHAR(255) NOT NULL,
  dni VARCHAR(8) UNIQUE,
  telefono VARCHAR(15),
  activo BOOLEAN DEFAULT true,
  activado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_dni ON users(dni);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_activo ON users(activo);

-- Comentarios
COMMENT ON TABLE users IS 'Usuarios del sistema con autenticación y roles';
COMMENT ON COLUMN users.role IS 'Rol del usuario: docente, tutor, auxiliar, direccion, toe, padre, admin';
COMMENT ON COLUMN users.activado IS 'Indica si el usuario ya activó su cuenta y estableció contraseña';

-- -----------------------------------------------------
-- Tabla: estudiantes
-- Descripción: Registro de estudiantes de la institución
-- -----------------------------------------------------
CREATE TABLE estudiantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_completo VARCHAR(255) NOT NULL,
  dni VARCHAR(8) UNIQUE,
  sexo sexo_enum,
  fecha_nacimiento DATE,
  edad_al_31_marzo INTEGER,
  nivel nivel_enum NOT NULL DEFAULT 'secundaria',
  grado VARCHAR(10) NOT NULL CHECK (grado IN ('1', '2', '3', '4', '5')),
  seccion VARCHAR(5) NOT NULL CHECK (seccion IN ('A', 'B', 'C', 'D', 'E')),
  tutor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  padre_id UUID REFERENCES users(id) ON DELETE SET NULL,
  madre_id UUID REFERENCES users(id) ON DELETE SET NULL,
  apoderado_id UUID REFERENCES users(id) ON DELETE SET NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para estudiantes
CREATE INDEX idx_estudiantes_dni ON estudiantes(dni);
CREATE INDEX idx_estudiantes_tutor ON estudiantes(tutor_id);
CREATE INDEX idx_estudiantes_padre ON estudiantes(padre_id);
CREATE INDEX idx_estudiantes_madre ON estudiantes(madre_id);
CREATE INDEX idx_estudiantes_apoderado ON estudiantes(apoderado_id);
CREATE INDEX idx_estudiantes_nivel ON estudiantes(nivel);
CREATE INDEX idx_estudiantes_grado_seccion ON estudiantes(grado, seccion);
CREATE INDEX idx_estudiantes_activo ON estudiantes(activo);

-- Comentarios
COMMENT ON TABLE estudiantes IS 'Estudiantes de SECUNDARIA (1° a 5° grado) de la I.E. Antonio Torres Araujo';
COMMENT ON COLUMN estudiantes.nivel IS 'Nivel educativo: secundaria (MVP solo incluye este nivel)';
COMMENT ON COLUMN estudiantes.grado IS 'Grado de secundaria: 1, 2, 3, 4 o 5';
COMMENT ON COLUMN estudiantes.seccion IS 'Sección: A, B, C, D o E';

-- -----------------------------------------------------
-- Tabla: periodos
-- Descripción: Períodos académicos (bimestres)
-- -----------------------------------------------------
CREATE TABLE periodos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) UNIQUE NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT check_fecha_periodo CHECK (fecha_fin > fecha_inicio)
);

-- Índices para periodos
CREATE INDEX idx_periodos_nombre ON periodos(nombre);
CREATE INDEX idx_periodos_activo ON periodos(activo);
CREATE INDEX idx_periodos_fechas ON periodos(fecha_inicio, fecha_fin);

-- Comentarios
COMMENT ON TABLE periodos IS 'Períodos académicos (bimestres) para organización temporal';

-- -----------------------------------------------------
-- Tabla: catalogo_meritos
-- Descripción: Catálogo de méritos según reglamento institucional
-- -----------------------------------------------------
CREATE TABLE catalogo_meritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  area VARCHAR(100) NOT NULL,
  vigente BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para catalogo_meritos
CREATE INDEX idx_meritos_codigo ON catalogo_meritos(codigo);
CREATE INDEX idx_meritos_area ON catalogo_meritos(area);
CREATE INDEX idx_meritos_vigente ON catalogo_meritos(vigente);

-- Comentarios
COMMENT ON TABLE catalogo_meritos IS 'Catálogo de méritos: Responsabilidad (A-H), Respeto (I-K), Solidaridad (N-P)';
COMMENT ON COLUMN catalogo_meritos.area IS 'Área del mérito: Responsabilidad, Respeto, Solidaridad';

-- -----------------------------------------------------
-- Tabla: catalogo_demeritos
-- Descripción: Catálogo de deméritos según reglamento institucional
-- -----------------------------------------------------
CREATE TABLE catalogo_demeritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(10) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(50) NOT NULL,
  severidad severidad_enum NOT NULL,
  vigente BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para catalogo_demeritos
CREATE INDEX idx_demeritos_codigo ON catalogo_demeritos(codigo);
CREATE INDEX idx_demeritos_categoria ON catalogo_demeritos(categoria);
CREATE INDEX idx_demeritos_severidad ON catalogo_demeritos(severidad);
CREATE INDEX idx_demeritos_vigente ON catalogo_demeritos(vigente);

-- Comentarios
COMMENT ON TABLE catalogo_demeritos IS 'Catálogo de deméritos clasificados por severidad';
COMMENT ON COLUMN catalogo_demeritos.severidad IS 'Severidad: leve, grave, muy_grave';

-- -----------------------------------------------------
-- Tabla: incidencias
-- Descripción: Registro de incidencias (méritos y deméritos)
-- -----------------------------------------------------
CREATE TABLE incidencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id UUID NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  periodo_id UUID NOT NULL REFERENCES periodos(id) ON DELETE RESTRICT,
  tipo incidencia_tipo_enum NOT NULL,
  catalogo_merito_id UUID REFERENCES catalogo_meritos(id) ON DELETE SET NULL,
  catalogo_demerito_id UUID REFERENCES catalogo_demeritos(id) ON DELETE SET NULL,
  codigo VARCHAR(10),
  descripcion TEXT NOT NULL,
  severidad severidad_enum,
  registrado_por UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  estado incidencia_estado_enum DEFAULT 'pendiente',
  accion_requerida TEXT,
  evidencia_url TEXT,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT check_tipo_merito_demerito CHECK (
    (tipo = 'merito' AND catalogo_merito_id IS NOT NULL AND catalogo_demerito_id IS NULL) OR
    (tipo = 'demerito' AND catalogo_demerito_id IS NOT NULL AND catalogo_merito_id IS NULL)
  )
);

-- Índices para incidencias
CREATE INDEX idx_incidencias_estudiante ON incidencias(estudiante_id);
CREATE INDEX idx_incidencias_periodo ON incidencias(periodo_id);
CREATE INDEX idx_incidencias_tipo ON incidencias(tipo);
CREATE INDEX idx_incidencias_estado ON incidencias(estado);
CREATE INDEX idx_incidencias_fecha ON incidencias(fecha);
CREATE INDEX idx_incidencias_registrado_por ON incidencias(registrado_por);
CREATE INDEX idx_incidencias_merito ON incidencias(catalogo_merito_id);
CREATE INDEX idx_incidencias_demerito ON incidencias(catalogo_demerito_id);

-- Comentarios
COMMENT ON TABLE incidencias IS 'Registro de incidencias (méritos y deméritos) de estudiantes';
COMMENT ON COLUMN incidencias.tipo IS 'Tipo de incidencia: merito o demerito';
COMMENT ON COLUMN incidencias.estado IS 'Estado: pendiente, revisado, resuelto';

-- -----------------------------------------------------
-- Tabla: alertas
-- Descripción: Alertas automáticas generadas por el sistema
-- -----------------------------------------------------
CREATE TABLE alertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id UUID NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  incidencia_id UUID REFERENCES incidencias(id) ON DELETE SET NULL,
  tipo alerta_tipo_enum NOT NULL,
  motivo TEXT NOT NULL,
  generado_por UUID REFERENCES users(id) ON DELETE SET NULL,
  fecha_generacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado alerta_estado_enum DEFAULT 'pendiente',
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para alertas
CREATE INDEX idx_alertas_estudiante ON alertas(estudiante_id);
CREATE INDEX idx_alertas_incidencia ON alertas(incidencia_id);
CREATE INDEX idx_alertas_tipo ON alertas(tipo);
CREATE INDEX idx_alertas_estado ON alertas(estado);
CREATE INDEX idx_alertas_fecha ON alertas(fecha_generacion);

-- Comentarios
COMMENT ON TABLE alertas IS 'Alertas automáticas para tutores y TOE según reglas de negocio';
COMMENT ON COLUMN alertas.tipo IS 'Tipo: alerta_tutor (3 leves/semana), citacion_toe (5 leves/bimestre)';

-- -----------------------------------------------------
-- Tabla: citaciones
-- Descripción: Citaciones a padres de familia
-- -----------------------------------------------------
CREATE TABLE citaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alerta_id UUID NOT NULL REFERENCES alertas(id) ON DELETE CASCADE,
  fecha_citacion DATE NOT NULL,
  lugar VARCHAR(255),
  asunto VARCHAR(255) NOT NULL,
  mensaje TEXT,
  padre_confirmado BOOLEAN DEFAULT false,
  evidencia_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para citaciones
CREATE INDEX idx_citaciones_alerta ON citaciones(alerta_id);
CREATE INDEX idx_citaciones_fecha ON citaciones(fecha_citacion);
CREATE INDEX idx_citaciones_confirmado ON citaciones(padre_confirmado);

-- Comentarios
COMMENT ON TABLE citaciones IS 'Citaciones programadas a padres de familia';

-- -----------------------------------------------------
-- Tabla: actas
-- Descripción: Actas de reuniones con padres
-- -----------------------------------------------------
CREATE TABLE actas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citacion_id UUID NOT NULL REFERENCES citaciones(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  firmado_padre BOOLEAN DEFAULT false,
  firmado_tutor BOOLEAN DEFAULT false,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  evidencia_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para actas
CREATE INDEX idx_actas_citacion ON actas(citacion_id);
CREATE INDEX idx_actas_fecha ON actas(fecha);
CREATE INDEX idx_actas_firmado ON actas(firmado_padre, firmado_tutor);

-- Comentarios
COMMENT ON TABLE actas IS 'Actas de reuniones con padres de familia (evidencia documental)';

-- =====================================================
-- PARTE 3: TRIGGERS PARA UPDATED_AT
-- =====================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para todas las tablas
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON estudiantes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_periodos_updated_at BEFORE UPDATE ON periodos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_catalogo_meritos_updated_at BEFORE UPDATE ON catalogo_meritos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_catalogo_demeritos_updated_at BEFORE UPDATE ON catalogo_demeritos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incidencias_updated_at BEFORE UPDATE ON incidencias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alertas_updated_at BEFORE UPDATE ON alertas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_citaciones_updated_at BEFORE UPDATE ON citaciones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actas_updated_at BEFORE UPDATE ON actas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PARTE 4: ROW LEVEL SECURITY (RLS) - PREPARACIÓN
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE periodos ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogo_meritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogo_demeritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE citaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE actas ENABLE ROW LEVEL SECURITY;

-- Nota: Las políticas RLS específicas se definirán en 002_rls_policies.sql

-- =====================================================
-- FIN DE MIGRACIÓN INICIAL
-- =====================================================
