# 📓 Guía de Uso del Jupyter Notebook - Importación de Estudiantes

## 📋 Archivo: `importar_estudiantes.ipynb`

---

## 🎯 Objetivo

Este Jupyter Notebook permite importar **798 estudiantes con sus apoderados** desde un archivo Excel/CSV a la base de datos Supabase de manera segura y controlada.

---

## ✅ Requisitos Previos

### 1. **Instalar Dependencias**

```powershell
# Desde la raíz del proyecto
pip install pandas numpy openpyxl supabase python-dotenv jupyter
```

### 2. **Configurar Variables de Entorno**

Asegúrate de tener configurado `backend/.env` con:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. **Base de Datos Creada**

Ejecuta primero las migraciones SQL:
- `database/migrations/001_initial_schema.sql`
- `database/migrations/002_rls_policies.sql`

---

## 🚀 Cómo Ejecutar el Notebook

### **Paso 1: Abrir Jupyter Notebook en VS Code**

```powershell
cd database\scripts
jupyter notebook importar_estudiantes.ipynb
```

O abrirlo directamente en VS Code (ya tienes la extensión Jupyter instalada).

---

### **Paso 2: Ejecutar Celdas en Orden**

#### **Celda 1: Importar Librerías**
- Importa pandas, numpy, supabase, etc.
- Verifica versiones instaladas

#### **Celda 2: Conectar a Supabase**
- Carga variables de entorno desde `backend/.env`
- Establece conexión con Supabase
- **✅ Verifica:** Debe mostrar "Conectado a Supabase correctamente"

#### **Celda 3: Leer CSV**
- Lee el archivo `database/data/estudiantes_apoderados_2025.csv`
- Omite encabezados institucionales (primeras 11 filas)
- **✅ Verifica:** Debe mostrar ~798 filas

#### **Celda 4: Vista Previa**
- Muestra las primeras 5 filas del CSV
- Verifica que los datos se lean correctamente

#### **Celda 5: Funciones de Limpieza**
- Define funciones auxiliares para limpiar datos
- No genera output, solo define funciones

#### **Celda 6-9: Procesar Estudiantes**
- Limpia y valida datos de estudiantes
- Genera estadísticas (por grado, sección, sexo)
- Muestra ejemplo de estudiante procesado
- **✅ Verifica:** Estadísticas coherentes

#### **Celda 10-11: Procesar Apoderados** (En desarrollo)
- Procesa datos de padres y madres
- Identifica columnas correctas

#### **Celda 12: Insertar en Supabase** ⚠️
- **IMPORTANTE:** Esta celda está comentada por seguridad
- **Descomenta solo cuando estés listo para insertar**
- Inserta todos los estudiantes en la BD

#### **Celda 13-14: Verificar Datos**
- Consulta la base de datos
- Muestra primeros 5 estudiantes insertados
- Verifica total de registros

#### **Celda 15: Exportar Datos**
- Guarda datos procesados en CSV para revisión
- Útil para auditoría

---

## 📊 Estructura del CSV

El archivo CSV tiene la siguiente estructura:

```
Filas 1-11: Encabezados institucionales (se omiten)
Fila 12: Nombres de columnas
Filas 13-810: Datos de estudiantes (798 registros)
```

**Columnas principales:**
- Estudiante: GRADO, SECCIÓN, DNI, APELLIDOS, NOMBRES, SEXO, FECHA NACIMIENTO
- Padre: APELLIDOS Y NOMBRES, DNI, EMAIL, CELULAR
- Madre: APELLIDOS Y NOMBRES, DNI, EMAIL, CELULAR
- Apoderado: (Si aplica)

---

## ⚙️ Funciones de Limpieza Implementadas

| Función | Propósito | Ejemplo |
|---------|-----------|---------|
| `limpiar_dni()` | Valida y formatea DNI (8 dígitos) | `77927245` |
| `limpiar_texto()` | Normaliza texto (mayúsculas, sin espacios) | `DIEGO SEBASTIAN` |
| `limpiar_email()` | Valida formato de email | `jesus.albm@gmail.com` |
| `limpiar_celular()` | Valida celular peruano (9 dígitos) | `948528485` |
| `convertir_fecha()` | Convierte DD/MM/YYYY → YYYY-MM-DD | `2012-12-18` |
| `hash_password()` | Genera hash SHA256 para contraseñas | `abc123` → hash |
| `generar_email_temporal()` | Crea email temporal si no existe | `77927245@padre.ata.edu.pe` |

---

## 📈 Estadísticas Generadas

El notebook genera automáticamente:

✅ **Distribución por Grado:**
- PRIMERO, SEGUNDO, TERCERO, CUARTO, QUINTO

✅ **Distribución por Sección:**
- A, B, C, D (según corresponda)

✅ **Distribución por Sexo:**
- Hombres / Mujeres

✅ **Estado de Matrícula:**
- Activos (DEFINITIVA) / Otros estados

---

## ⚠️ Consideraciones Importantes

### **1. Duplicados**
- El sistema valida que no haya DNIs duplicados
- Si un estudiante ya existe, se generará un error

### **2. Emails Faltantes**
- Si un apoderado no tiene email, se genera uno temporal: `DNI@padre.ata.edu.pe`

### **3. Contraseñas**
- Los apoderados se crean con contraseña temporal: `temporal123`
- Se debe implementar cambio de contraseña en el primer login

### **4. Relación Padre-Estudiante**
- Se debe implementar una tabla intermedia o FK para relacionarlos
- Por ahora, el campo `padre_id` queda como `NULL`

---

## 🐛 Troubleshooting

### **Error: "Variables de entorno no configuradas"**
**Solución:** Verifica que `backend/.env` exista y tenga las credenciales correctas.

### **Error: "No such table: estudiantes"**
**Solución:** Ejecuta las migraciones SQL en Supabase primero.

### **Error: "Duplicate key value"**
**Solución:** Un estudiante con ese DNI ya existe. Verifica o elimina duplicados.

### **Error al leer CSV**
**Solución:** Verifica que el archivo sea UTF-8 y esté en `database/data/`.

---

## 📝 Próximos Pasos

Después de ejecutar este notebook:

1. ✅ **Verificar datos en Supabase Dashboard**
   - Ir a Table Editor → `estudiantes`
   - Verificar que se hayan insertado los 798 registros

2. ✅ **Procesar Apoderados**
   - Ejecutar notebook adicional para padres/madres
   - Crear registros en tabla `users`

3. ✅ **Relacionar Estudiantes con Padres**
   - Actualizar campo `padre_id` en tabla `estudiantes`
   - Crear FK constraints

4. ✅ **Asignar Tutores**
   - Asignar docentes tutores por grado/sección
   - Actualizar campo `tutor_id`

5. ✅ **Verificar Integridad**
   - Ejecutar consultas de verificación
   - Validar relaciones

---

## 📚 Archivos Relacionados

```
database/
├── data/
│   ├── estudiantes_apoderados_2025.csv       ← CSV original
│   ├── estudiantes_apoderados_2025.xlsx      ← Excel original (backup)
│   └── estudiantes_procesados.csv            ← Generado por el notebook
├── scripts/
│   ├── importar_estudiantes.ipynb            ← Este notebook
│   └── README_NOTEBOOK.md                    ← Esta guía
├── migrations/
│   ├── 001_initial_schema.sql                ← Schema de tablas
│   └── 002_rls_policies.sql                  ← Políticas de seguridad
└── seeds/
    └── ...                                    ← Datos semilla
```

---

## ✅ Checklist de Ejecución

- [ ] Dependencias Python instaladas
- [ ] Variables de entorno configuradas
- [ ] Migraciones SQL ejecutadas en Supabase
- [ ] Archivo CSV en `database/data/`
- [ ] Notebook abierto en VS Code o Jupyter
- [ ] Celdas ejecutadas en orden
- [ ] Estadísticas verificadas
- [ ] Inserción en BD confirmada
- [ ] Datos verificados en Supabase Dashboard

---

## 🎓 Buenas Prácticas Aplicadas

✅ **Separación de Responsabilidades:**
- Lectura de datos
- Validación y limpieza
- Transformación
- Inserción en BD

✅ **Validación de Datos:**
- DNI (8 dígitos)
- Email (formato válido)
- Celular (9 dígitos, empieza con 9)
- Fechas (formato consistente)

✅ **Manejo de Errores:**
- Try-catch en cada operación
- Registro de errores con detalles
- Rollback en caso de fallo

✅ **Trazabilidad:**
- Logs detallados
- Estadísticas por etapa
- Exportación de datos procesados

✅ **Seguridad:**
- Celdas de inserción comentadas
- Contraseñas hasheadas
- Variables de entorno para credenciales

---

**Desarrollado para:** I.E. 80002 Antonio Torres Araujo  
**Sistema:** Agenda Virtual ATA  
**Versión:** 1.0.0  
**Fecha:** Noviembre 2025
