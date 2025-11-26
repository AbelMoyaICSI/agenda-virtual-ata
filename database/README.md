# 📊 Base de Datos - Agenda Virtual ATA

Estructura de base de datos para el Sistema de Gestión de Incidencias Escolares de la I.E. 80002 Antonio Torres Araujo.

## 📁 Estructura de Carpetas

```
database/
├── migrations/          # Scripts de migración SQL
│   ├── 001_initial_schema.sql      # Schema inicial (tablas, ENUMs, triggers)
│   └── 002_rls_policies.sql        # Políticas de Row Level Security
├── schemas/            # Documentación del schema
│   └── schema.sql                  # Documentación completa del modelo
└── seeds/              # Datos semilla (catálogos iniciales)
    ├── 001_periodos.sql            # Períodos académicos 2025
    ├── 002_meritos.sql             # Catálogo de 14 méritos
    ├── 003_demeritos.sql           # Catálogo de 54 deméritos
    └── 004_users_demo.sql          # Usuarios de demostración
```

## 🗄️ Modelo de Datos

### Tablas Principales (10)

1. **users** - Usuarios del sistema (docentes, tutores, padres, etc.)
2. **estudiantes** - Registro de estudiantes
3. **periodos** - Períodos académicos (bimestres)
4. **catalogo_meritos** - Catálogo de 14 méritos institucionales
5. **catalogo_demeritos** - Catálogo de 54 deméritos institucionales
6. **incidencias** - Registro de méritos y deméritos
7. **alertas** - Alertas automáticas generadas por el sistema
8. **citaciones** - Citaciones a padres de familia
9. **actas** - Actas de reuniones con padres

### ENUMs (8)

- `role_enum`: docente, tutor, auxiliar, direccion, toe, padre, admin
- `sexo_enum`: M, F, NA
- `nivel_enum`: inicial, primaria, secundaria
- `severidad_enum`: leve, grave, muy_grave
- `incidencia_tipo_enum`: merito, demerito
- `incidencia_estado_enum`: pendiente, revisado, resuelto
- `alerta_tipo_enum`: alerta_tutor, citacion_toe
- `alerta_estado_enum`: pendiente, notificado, resuelto

## 🚀 Instrucciones de Instalación

### Opción 1: Supabase Dashboard (Recomendado)

1. **Acceder al SQL Editor**
   - Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
   - Navega a: **SQL Editor** (menú lateral izquierdo)

2. **Ejecutar Migraciones en Orden**

   **Paso 1: Schema Inicial**
   ```sql
   -- Copiar y ejecutar: migrations/001_initial_schema.sql
   ```
   ✅ Verifica que se crearon: 10 tablas + 8 ENUMs + triggers

   **Paso 2: Políticas RLS**
   ```sql
   -- Copiar y ejecutar: migrations/002_rls_policies.sql
   ```
   ✅ Verifica las políticas en: Authentication → Policies

3. **Cargar Datos Semilla**

   Ejecutar en orden:
   ```sql
   -- 1. Períodos académicos
   -- Copiar: seeds/001_periodos.sql
   
   -- 2. Catálogo de méritos
   -- Copiar: seeds/002_meritos.sql
   
   -- 3. Catálogo de deméritos
   -- Copiar: seeds/003_demeritos.sql
   
   -- 4. Usuarios demo (opcional)
   -- Copiar: seeds/004_users_demo.sql
   ```

4. **Verificar Instalación**
   ```sql
   -- Ver todas las tablas
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   
   -- Contar registros en catálogos
   SELECT 'Méritos' as catalogo, COUNT(*) FROM catalogo_meritos
   UNION ALL
   SELECT 'Deméritos', COUNT(*) FROM catalogo_demeritos
   UNION ALL
   SELECT 'Períodos', COUNT(*) FROM periodos;
   ```

   **Resultado esperado:**
   - ✅ 10 tablas creadas
   - ✅ 14 méritos
   - ✅ 54 deméritos
   - ✅ 4 períodos (bimestres 2025)

### Opción 2: Supabase CLI

```powershell
# 1. Instalar Supabase CLI (si no lo tienes)
scoop install supabase

# 2. Login
supabase login

# 3. Link al proyecto
supabase link --project-ref TU_PROJECT_REF

# 4. Aplicar migraciones
supabase db push

# 5. (Opcional) Aplicar seeds
supabase db seed
```

## 📊 Catálogos de Datos

### Méritos (14 total)

**Responsabilidad (A-H):**
- A: Cumplimiento ejemplar de tareas
- B: Asistencia y puntualidad perfecta
- C: Cuidado del material educativo
- D: Organización y orden personal
- E: Participación activa en clase
- F: Mejora académica sostenida
- G: Compromiso con normas de convivencia
- H: Liderazgo académico positivo

**Respeto (I-K):**
- I: Trato respetuoso constante
- J: Cuidado del patrimonio institucional
- K: Promoción de ambiente de paz

**Solidaridad (N-P):**
- N: Ayuda a compañeros
- O: Participación en actividades solidarias
- P: Representación institucional destacada

### Deméritos (54 total)

**Leves (1-18):**
- Incumplimiento de tareas, tardanzas, desorden, etc.

**Graves (19-36):**
- Reincidencia en leves, copia, falta de respeto verbal, etc.

**Muy Graves (37-54):**
- Agresión física, bullying, amenazas, robo, etc.

## 🔐 Seguridad - Row Level Security (RLS)

Todas las tablas tienen RLS habilitado con políticas específicas por rol:

### Permisos por Rol

| Tabla | Admin | Dirección/TOE | Docente/Tutor | Padre |
|-------|-------|---------------|---------------|-------|
| users | CRUD | R | R (propio) | R (propio) |
| estudiantes | CRUD | CRU | RU | R (hijos) |
| catálogos | CRUD | R | R | R |
| incidencias | CRUD | CRU | CR (propias) | R (hijos) |
| alertas | CRUD | CRU | R | R (hijos) |
| citaciones | CRUD | CRU | R | RU (propias) |
| actas | CRUD | CRU | R | RU (firmas) |

**Leyenda:** C=Create, R=Read, U=Update, D=Delete

## 🔄 Reglas de Negocio Automáticas

### Escalación de Deméritos

```
3 LEVES en 1 semana
  ↓
ALERTA AL TUTOR
  ↓
Si continúa...
  ↓
5 LEVES en 1 bimestre
  ↓
CITACIÓN TOE

---

1 GRAVE
  ↓
CITACIÓN TOE (inmediata)

---

1 MUY GRAVE
  ↓
CITACIÓN CON DIRECCIÓN + ACTA OBLIGATORIA
```

## 🧪 Datos de Prueba

Usuarios demo incluidos en `seeds/004_users_demo.sql`:

| Email | Password | Rol |
|-------|----------|-----|
| admin@ata.edu.pe | demo123 | admin |
| direccion@ata.edu.pe | demo123 | direccion |
| toe@ata.edu.pe | demo123 | toe |
| tutor.primaria@ata.edu.pe | demo123 | tutor |
| docente.matematica@ata.edu.pe | demo123 | docente |
| padre1@gmail.com | demo123 | padre |

⚠️ **IMPORTANTE:** Eliminar estos usuarios en producción y crear credenciales reales.

## 📝 Mantenimiento

### Agregar Nuevo Período Académico

```sql
INSERT INTO periodos (nombre, fecha_inicio, fecha_fin, activo) 
VALUES ('I Bimestre 2026', '2026-03-09', '2026-05-15', false);
```

### Actualizar Catálogo

```sql
-- Marcar demérito como no vigente
UPDATE catalogo_demeritos 
SET vigente = false 
WHERE codigo = '10';

-- Agregar nuevo mérito
INSERT INTO catalogo_meritos (codigo, nombre, descripcion, area) 
VALUES ('Q', 'Nuevo mérito', 'Descripción', 'Responsabilidad');
```

### Backup

```powershell
# Backup completo
supabase db dump -f backup_$(Get-Date -Format "yyyyMMdd_HHmmss").sql

# Solo schema
supabase db dump --schema-only -f schema_backup.sql

# Solo datos
supabase db dump --data-only -f data_backup.sql
```

## 🔍 Consultas Útiles

### Ver incidencias de un estudiante

```sql
SELECT 
  i.fecha,
  i.tipo,
  COALESCE(cm.nombre, cd.nombre) as incidencia,
  i.severidad,
  u.nombre_completo as registrado_por
FROM incidencias i
LEFT JOIN catalogo_meritos cm ON i.catalogo_merito_id = cm.id
LEFT JOIN catalogo_demeritos cd ON i.catalogo_demerito_id = cd.id
JOIN users u ON i.registrado_por = u.id
WHERE i.estudiante_id = 'UUID_DEL_ESTUDIANTE'
ORDER BY i.fecha DESC;
```

### Alertas pendientes

```sql
SELECT 
  a.tipo,
  e.nombre_completo as estudiante,
  a.motivo,
  a.fecha_generacion
FROM alertas a
JOIN estudiantes e ON a.estudiante_id = e.id
WHERE a.estado = 'pendiente'
ORDER BY a.fecha_generacion DESC;
```

## 📚 Documentación Adicional

- **Schema completo:** Ver `schemas/schema.sql`
- **Diagrama ER:** Ver `/docs/diagramas/modelo_datos.png`
- **API Endpoints:** Ver `/docs/api/README.md`

## 🐛 Troubleshooting

### Error: "role already exists"

```sql
-- Eliminar ENUMs si necesitas recrearlos
DROP TYPE IF EXISTS role_enum CASCADE;
```

### Error: "relation already exists"

```sql
-- Ver tablas existentes
\dt

-- Eliminar tabla específica
DROP TABLE IF EXISTS nombre_tabla CASCADE;
```

### RLS bloqueando consultas

```sql
-- Deshabilitar temporalmente RLS (solo desarrollo)
ALTER TABLE nombre_tabla DISABLE ROW LEVEL SECURITY;
```

---

**Desarrollado para:** I.E. 80002 Antonio Torres Araujo  
**Versión:** 1.0.0  
**Última actualización:** Enero 2025
