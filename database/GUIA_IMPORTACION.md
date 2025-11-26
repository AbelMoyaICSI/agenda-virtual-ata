# 📚 GUÍA DE IMPORTACIÓN A SUPABASE

## 🎯 OBJETIVO
Importar los datos limpios de estudiantes y apoderados del archivo CSV a la base de datos Supabase para el sistema "Agenda Digital ATA".

---

## ✅ PREREQUISITOS

### 1. Cuenta de Supabase configurada
- Ir a https://supabase.com
- Crear cuenta gratuita (si no tienes)
- Crear nuevo proyecto: `agenda-digital-ata`
- **Región recomendada:** South America (São Paulo) o US East (más cercana)
- **Contraseña de base de datos:** Guardar en lugar seguro
- Esperar ~2 minutos a que se active el proyecto

### 2. Python instalado
- Python 3.8 o superior
- Verificar con: `python --version`

### 3. Dependencias de Python
```bash
pip install supabase pandas python-dotenv
```

---

## 📋 PASO A PASO

### PASO 1: Obtener credenciales de Supabase

#### 1.1. En el Dashboard de Supabase:

**Para URL y ANON_KEY:**
1. Ir a **Settings** → **API**
2. Copiar:
   - **Project URL** → Esta es tu `SUPABASE_URL`
   - **anon public** key → Esta es tu `SUPABASE_ANON_KEY`

**Para SERVICE_KEY:**
1. En la misma página (**Settings** → **API**)
2. Buscar sección **Project API keys**
3. Copiar:
   - **service_role** key → Esta es tu `SUPABASE_SERVICE_KEY` (⚠️ NUNCA compartir)

**Para DATABASE_URL (opcional):**
1. Ir a **Settings** → **Database**
2. Buscar **Connection string**
3. Seleccionar **URI**
4. Copiar y reemplazar `[YOUR-PASSWORD]` con tu contraseña de DB

---

### PASO 2: Crear archivo `.env`

En la raíz del proyecto (`agenda-virtual-ata/`), crear archivo `.env`:

```bash
# SUPABASE (Base de datos y autenticación)
SUPABASE_URL=https://xxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# DATABASE (Para scripts de Python)
DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxx.supabase.co:5432/postgres
```

⚠️ **IMPORTANTE:** Reemplazar con tus claves reales.

---

### PASO 3: Ejecutar migraciones SQL

En el **SQL Editor** de Supabase Dashboard:

#### 3.1. Schema inicial
```sql
-- Copiar COMPLETO el archivo:
-- database/migrations/001_initial_schema.sql

-- Ejecutar (botón RUN o Ctrl+Enter)
```

✅ **Verificar:** En la pestaña **Table Editor** deberían aparecer las tablas:
- `users`
- `estudiantes`
- `periodos`
- `catalogo_meritos`
- `catalogo_demeritos`
- `incidencias`
- `alertas`
- `citaciones`
- `actas`

#### 3.2. Políticas RLS
```sql
-- Copiar COMPLETO el archivo:
-- database/migrations/002_rls_policies.sql

-- Ejecutar
```

✅ **Verificar:** En **Authentication** → **Policies** deberían aparecer políticas para cada tabla.

---

### PASO 4: Ejecutar seeds (datos iniciales)

#### 4.1. Periodos académicos
```sql
-- Copiar y ejecutar:
-- database/seeds/001_periodos.sql
```

#### 4.2. Méritos
```sql
-- Copiar y ejecutar:
-- database/seeds/002_meritos.sql
```

#### 4.3. Deméritos
```sql
-- Copiar y ejecutar:
-- database/seeds/003_demeritos.sql
```

#### 4.4. (Opcional) Usuarios de demostración
```sql
-- Copiar y ejecutar:
-- database/seeds/004_users_demo.sql
```

✅ **Verificar con query:**
```sql
SELECT 
    'periodos' AS tabla, COUNT(*) AS total FROM periodos
UNION ALL
SELECT 'catalogo_meritos', COUNT(*) FROM catalogo_meritos
UNION ALL
SELECT 'catalogo_demeritos', COUNT(*) FROM catalogo_demeritos;
```

**Resultado esperado:**
```
tabla                  | total
-----------------------|-------
periodos               | 4
catalogo_meritos       | 14
catalogo_demeritos     | 38
```

---

### PASO 5: Importar estudiantes y apoderados

#### Opción A: Script Python (Recomendado)

```bash
# Desde la raíz del proyecto:
python database/scripts/importar_a_supabase.py
```

**Salida esperada:**
```
📚 IMPORTACIÓN DE DATOS A SUPABASE - AGENDA DIGITAL ATA
================================================================================

📂 Leyendo archivo: database/data/estudiantes_apoderados_2025_LIMPIO.csv
   ✅ Archivo leído correctamente: 798 registros

🔍 Validando estructura del CSV...
   ✅ Estructura validada correctamente

================================================================================
👥 PASO 1: IMPORTANDO USUARIOS (PADRES/MADRES/APODERADOS)
================================================================================
   ✅ Importados 50 usuarios...
   ✅ Importados 100 usuarios...
   ...

📊 Total de usuarios importados: ~2400

================================================================================
🎓 PASO 2: IMPORTANDO ESTUDIANTES
================================================================================
   ✅ Importados 50 estudiantes...
   ✅ Importados 100 estudiantes...
   ...

📊 Total de estudiantes importados: 798

================================================================================
✅ IMPORTACIÓN COMPLETADA
================================================================================
```

#### Opción B: Importación manual (No recomendada)

Si el script falla, puedes importar manualmente desde Supabase Dashboard:
1. Ir a **Table Editor**
2. Seleccionar tabla `users`
3. Botón **Insert** → **Import data from CSV**
4. Repetir para `estudiantes`

---

## 🔍 VERIFICACIÓN FINAL

### Query de prueba en SQL Editor:

```sql
-- Contar registros totales
SELECT 
    'users' AS tabla, COUNT(*) AS total FROM users
UNION ALL
SELECT 'estudiantes', COUNT(*) FROM estudiantes
UNION ALL
SELECT 'periodos', COUNT(*) FROM periodos
UNION ALL
SELECT 'catalogo_meritos', COUNT(*) FROM catalogo_meritos
UNION ALL
SELECT 'catalogo_demeritos', COUNT(*) FROM catalogo_demeritos;
```

**Resultado esperado:**
```
tabla                  | total
-----------------------|-------
users                  | ~2400  (aprox 3 apoderados × 798 estudiantes)
estudiantes            | 798
periodos               | 4
catalogo_meritos       | 14
catalogo_demeritos     | 38
```

### Verificar relaciones:

```sql
-- Estudiantes con al menos un apoderado
SELECT 
    COUNT(*) AS estudiantes_con_apoderado
FROM estudiantes
WHERE padre_id IS NOT NULL 
   OR madre_id IS NOT NULL 
   OR apoderado_id IS NOT NULL;
```

**Resultado esperado:** ~798 (todos deberían tener al menos un apoderado)

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "relation already exists"
**Causa:** Ya ejecutaste el schema antes.

**Solución:**
```sql
-- CUIDADO: Esto BORRA TODAS las tablas
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Volver a ejecutar migraciones desde PASO 3
```

---

### Error: "permission denied for table"
**Causa:** Políticas RLS bloqueando inserción.

**Solución temporal:**
```sql
-- Deshabilitar RLS temporalmente:
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE estudiantes DISABLE ROW LEVEL SECURITY;

-- Importar datos con el script Python

-- Rehabilitar RLS:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;
```

---

### Error: "duplicate key value violates unique constraint"
**Causa:** DNI duplicado en CSV.

**Solución:**
El notebook `importar_estudiantes.ipynb` ya eliminó duplicados, pero si persiste:

```python
import pandas as pd
df = pd.read_csv('database/data/estudiantes_apoderados_2025_LIMPIO.csv', sep=';')

# Eliminar duplicados por DNI de estudiante:
df = df.drop_duplicates(subset=['ESTUDIANTE_NUMERO_DE_DOCUMENTO'], keep='first')

# Guardar CSV corregido:
df.to_csv('database/data/estudiantes_apoderados_2025_SIN_DUPLICADOS.csv', index=False, sep=';')
```

---

### Error: "supabase module not found"
**Causa:** Falta instalar dependencias.

**Solución:**
```bash
pip install supabase pandas python-dotenv
```

---

### Error: "connection refused" o "invalid credentials"
**Causa:** Credenciales incorrectas en `.env`.

**Solución:**
1. Verificar que `.env` tenga las claves correctas
2. Verificar que `SUPABASE_SERVICE_KEY` tenga el formato `eyJhbGciOiJIUzI1NiIs...`
3. NO uses `SUPABASE_ANON_KEY` para importar, debe ser `SERVICE_KEY`

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto Supabase creado
- [ ] Credenciales copiadas a `.env`
- [ ] Migración `001_initial_schema.sql` ejecutada
- [ ] Migración `002_rls_policies.sql` ejecutada
- [ ] Seeds ejecutados (periodos, méritos, deméritos)
- [ ] Script `importar_a_supabase.py` ejecutado exitosamente
- [ ] Query de verificación ejecutada (798 estudiantes, ~2400 usuarios)
- [ ] Relaciones estudiante-apoderado verificadas

---

## 📞 SIGUIENTE PASO

Una vez completada la importación:
1. Ir a **Authentication** → **Providers** → Habilitar **Email**
2. Crear usuario administrador manualmente
3. Probar login desde frontend
4. Configurar notificaciones (futuro)

---

## 🔗 RECURSOS

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Python Supabase Client](https://github.com/supabase-community/supabase-py)

---

**✅ Listo para producción una vez completados todos los pasos**
