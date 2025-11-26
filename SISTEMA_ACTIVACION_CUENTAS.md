# 🔐 SISTEMA DE ACTIVACIÓN DE CUENTAS - AGENDA VIRTUAL ATA

## 📋 RESUMEN DE CAMBIOS

Fecha: 21 de noviembre de 2025  
Versión: 1.1.0  
Desarrollador: Abel Moya - Prácticas UPAO

---

## 🎯 OBJETIVO

Implementar un sistema de activación de cuentas para usuarios pre-registrados (padres, madres, apoderados, docentes, tutores, auxiliares, TOE, dirección) que permita:

1. **Verificar identidad** con DNI y nombre completo
2. **Activar cuenta** estableciendo una contraseña por primera vez
3. **Solicitar registro** si no están en la base de datos

---

## ✅ CAMBIOS REALIZADOS

### 1. **BASE DE DATOS** 📊

#### `database/migrations/001_initial_schema.sql`
- ✅ Agregado campo `activado BOOLEAN DEFAULT false` en tabla `users`
- ✅ Campo `password_hash` ahora es nullable (permite NULL para usuarios no activados)
- ✅ Agregado comentario descriptivo para el campo

#### `database/migrations/003_add_activado_field.sql` ⭐ NUEVO
- ✅ Migración para agregar campo `activado` a usuarios existentes
- ✅ Actualiza automáticamente usuarios que ya tienen contraseña
- ✅ Crea índices para mejorar rendimiento de consultas
- ✅ Muestra resumen de usuarios activados/pendientes

---

### 2. **BACKEND** 🔧

#### `backend/src/routes/auth.js`
**Nuevos schemas de validación:**
```javascript
- verificarUsuarioSchema: valida DNI (8 dígitos) + nombre completo
- activarCuentaSchema: valida DNI + nombre + contraseña + confirmación
- solicitarRegistroSchema: valida datos para solicitud de registro
```

**Nuevos endpoints:**

**POST `/api/auth/verificar-usuario`**
- Valida DNI y nombre contra la BD
- Verifica si el usuario existe y está activo
- Comprueba si ya fue activado
- Responde con datos del usuario si existe y no está activado

**POST `/api/auth/activar-cuenta`**
- Verifica identidad del usuario
- Establece contraseña por primera vez
- Marca cuenta como activada (`activado = true`)
- Devuelve confirmación de activación

**POST `/api/auth/solicitar-registro`**
- Recibe solicitud de registro de usuarios no registrados
- Valida que no exista duplicado
- Prepara para futura tabla `solicitudes_registro`

**Modificado POST `/api/auth/login`**
- Ahora acepta DNI (8 dígitos) o email como usuario
- Verifica que la cuenta esté activada antes de permitir login
- Devuelve error específico si cuenta no está activada

---

### 3. **FRONTEND** 💻

#### `frontend/src/pages/ActivarCuentaPage.jsx` ⭐ NUEVO
**Componente de activación de cuenta en 2 pasos:**

**Paso 1: Verificación de Identidad**
- Formulario con DNI (8 dígitos) y nombre completo (mayúsculas)
- Validación en tiempo real
- Normalización automática de datos
- Mensajes de error específicos

**Paso 2: Configuración de Contraseña**
- Muestra datos del usuario verificado
- Dos campos de contraseña (nueva + confirmación)
- Indicador de fortaleza de contraseña
- Validación de coincidencia

**Características:**
- ✅ Indicador visual de pasos (1 → 2)
- ✅ Navegación entre pasos
- ✅ Mensajes de error/éxito amigables
- ✅ Redirección automática al login tras activación
- ✅ Botón "Volver al inicio de sesión"

---

#### `frontend/src/pages/SolicitarRegistroPage.jsx` ⭐ NUEVO
**Componente de solicitud de registro:**

**Formulario completo con:**
- DNI (8 dígitos) - requerido
- Nombre completo (mayúsculas) - requerido
- Tipo de cuenta (dropdown) - requerido
- Email (opcional)
- Teléfono (opcional)
- Mensaje adicional (opcional)

**Características:**
- ✅ Validación de campos requeridos
- ✅ Normalización automática (mayúsculas)
- ✅ Mensaje de confirmación de envío
- ✅ Redirección automática al login
- ✅ Botón "Volver al inicio"

---

#### `frontend/src/pages/LoginPage.jsx` 🔄 MODIFICADO
**Pantalla 1: Selección de Tipo de Cuenta**
- Grid visual con 7 tipos de cuenta:
  - 👨‍🏫 Docente
  - 👨‍🎓 Tutor
  - 👥 Auxiliar
  - 🧑‍⚕️ TOE
  - 👔 Dirección
  - 👨‍👩‍👧 Padre/Madre
  - ⚙️ Administrador

**Pantalla 2: Login**
- Logo institucional
- Indicador del rol seleccionado
- Campo DNI o Email
- Campo contraseña (con show/hide)
- **3 botones principales:**
  - 🔓 **Activar mi Cuenta** (redirige a `/activar-cuenta`)
  - 📝 **Solicitar Registro** (redirige a `/solicitar-registro`)
  - 🔐 **Iniciar Sesión** (formulario tradicional)

**Características:**
- ✅ Botones adicionales **NO aparecen** para Administrador
- ✅ Botón "Cambiar tipo de cuenta" para volver a selección
- ✅ Diseño responsivo y profesional
- ✅ Mensajes de error específicos

---

#### `frontend/src/services/authService.js` 🔄 ACTUALIZADO
**Nuevas funciones:**

```javascript
verificarUsuario(dni, nombreCompleto)
// Verifica si un usuario existe en la BD
// Compara DNI y nombre (normalizado)
// Retorna estado de activación

activarCuenta(dni, nombreCompleto, password, confirmarPassword)
// Establece contraseña por primera vez
// Valida coincidencia de contraseñas
// Marca cuenta como activada

solicitarRegistro(datos)
// Envía solicitud de registro
// Valida DNI y datos requeridos
// Prepara para aprobación de administrador
```

**Función modificada:**
```javascript
login(usuario, password)
// Ahora acepta DNI o email como usuario
// Verifica que la cuenta esté activada
// Devuelve error específico si no está activada
```

---

#### `frontend/src/App.jsx` 🔄 ACTUALIZADO
**Nuevas rutas:**
```jsx
<Route path="/activar-cuenta" element={<ActivarCuentaPage />} />
<Route path="/solicitar-registro" element={<SolicitarRegistroPage />} />
```

**Características:**
- ✅ Redirección automática a dashboard si ya está logueado
- ✅ Protección de rutas
- ✅ Navegación fluida entre componentes

---

#### `frontend/src/styles/components.css` 🔄 ACTUALIZADO
**Nuevos estilos:**
```css
.steps-indicator   // Indicador de pasos 1 → 2
.step              // Cada paso individual
.step-number       // Círculo numerado
.step-label        // Etiqueta del paso
.step-divider      // Línea divisoria
.step.active       // Paso activo (verde)
.step.completed    // Paso completado (✓)
```

---

## 🔄 FLUJO COMPLETO DEL SISTEMA

### **Caso 1: Usuario pre-registrado (primera vez)**

```
1. Usuario accede a /login
2. Selecciona su tipo de cuenta (ej: Padre/Madre)
3. Clic en "Activar mi Cuenta"
   ↓
4. Ingresa DNI (12345678) y nombre completo (PEREZ GARCIA JUAN)
5. Sistema verifica en BD:
   - ✅ Usuario existe
   - ✅ DNI y nombre coinciden
   - ❌ No está activado
   ↓
6. Sistema muestra Paso 2
7. Usuario ingresa contraseña nueva (2 veces)
8. Sistema valida y guarda contraseña hash
9. Marca activado = true
   ↓
10. Redirección automática a /login
11. Usuario puede iniciar sesión normalmente
```

---

### **Caso 2: Usuario NO registrado**

```
1. Usuario accede a /login
2. Selecciona su tipo de cuenta
3. Clic en "Solicitar Registro"
   ↓
4. Completa formulario:
   - DNI
   - Nombre completo
   - Tipo de cuenta
   - Email (opcional)
   - Teléfono (opcional)
   ↓
5. Sistema valida que NO exista en BD
6. Guarda solicitud (futura tabla solicitudes_registro)
7. Muestra mensaje: "Solicitud enviada. El administrador la revisará"
   ↓
8. Redirección automática a /login
```

---

### **Caso 3: Usuario ya activado**

```
1. Usuario accede a /login
2. Selecciona su tipo de cuenta
3. Clic en "Activar mi Cuenta"
   ↓
4. Ingresa DNI y nombre
5. Sistema verifica:
   - ✅ Usuario existe
   - ✅ DNI y nombre coinciden
   - ✅ YA está activado
   ↓
6. Mensaje: "Esta cuenta ya fue activada. Por favor, inicia sesión."
7. Redirección automática a /login
8. Usuario debe usar "Iniciar Sesión" normal
```

---

## 🔒 SEGURIDAD IMPLEMENTADA

1. ✅ **Validación en backend y frontend**
   - Zod schemas para validación de datos
   - Normalización de datos (mayúsculas, trim)

2. ✅ **Comparación segura de nombres**
   - Conversión a mayúsculas
   - Eliminación de espacios extra

3. ✅ **Contraseñas seguras**
   - Hash con bcryptjs (12 rounds)
   - Validación de longitud mínima (6 caracteres)
   - Verificación de coincidencia

4. ✅ **Prevención de activación múltiple**
   - Campo `activado` boolean
   - Validación antes de permitir reactivación

5. ✅ **Prevención de duplicados**
   - Verificación de DNI único
   - Validación de email único

---

## 📊 ESTRUCTURA DE DATOS

### **Tabla `users` (actualizada)**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,  -- ⭐ Ahora nullable
  role role_enum NOT NULL DEFAULT 'docente',
  nombre_completo VARCHAR(255) NOT NULL,
  dni VARCHAR(8) UNIQUE,
  telefono VARCHAR(15),
  activo BOOLEAN DEFAULT true,
  activado BOOLEAN DEFAULT false,  -- ⭐ NUEVO
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Estados posibles de un usuario**

| Estado | `activo` | `activado` | `password_hash` | Descripción |
|--------|----------|------------|-----------------|-------------|
| **Registrado** | `true` | `false` | `NULL` | Usuario pre-registrado, nunca activó cuenta |
| **Activado** | `true` | `true` | `hash...` | Usuario completó activación, puede iniciar sesión |
| **Desactivado** | `false` | `true/false` | `hash.../NULL` | Usuario bloqueado por admin |

---

## 🧪 PRUEBAS RECOMENDADAS

### **Prueba 1: Activación exitosa**
```
1. Crear usuario en BD:
   INSERT INTO users (dni, nombre_completo, role, activo, activado)
   VALUES ('12345678', 'PEREZ GARCIA JUAN CARLOS', 'padre', true, false);

2. Acceder a /activar-cuenta
3. Ingresar DNI: 12345678
4. Ingresar nombre: PEREZ GARCIA JUAN CARLOS
5. Ingresar contraseña: test123456 (2 veces)
6. Verificar redirección a /login
7. Iniciar sesión con DNI + contraseña
```

### **Prueba 2: Usuario no existe**
```
1. Acceder a /activar-cuenta
2. Ingresar DNI: 99999999
3. Ingresar nombre: NO EXISTE EN BD
4. Verificar mensaje: "No estás registrado..."
```

### **Prueba 3: Nombre no coincide**
```
1. Acceder a /activar-cuenta
2. Ingresar DNI correcto: 12345678
3. Ingresar nombre INCORRECTO: GARCIA PEREZ JUAN
4. Verificar mensaje: "Los datos no coinciden..."
```

### **Prueba 4: Solicitar registro**
```
1. Acceder a /solicitar-registro
2. Completar formulario con DNI nuevo
3. Verificar mensaje de confirmación
4. Verificar redirección a /login
```

---

## 📝 NOTAS IMPORTANTES

1. ⚠️ **Administradores NO ven botones de activación/solicitud**
   - Solo pueden iniciar sesión normalmente

2. ⚠️ **Nombres deben coincidir EXACTAMENTE**
   - Sistema compara en MAYÚSCULAS
   - Sin tildes, sin espacios extra

3. ⚠️ **DNI debe tener exactamente 8 dígitos**
   - Validación automática en frontend

4. ⚠️ **Primera activación es ÚNICA**
   - Una vez activado, no se puede reactivar
   - Debe usar "Iniciar Sesión" normal

5. ℹ️ **Futura implementación**
   - Tabla `solicitudes_registro` para gestionar solicitudes
   - Panel de administrador para aprobar/rechazar
   - Notificaciones por email (opcional)

---

## 🚀 PRÓXIMOS PASOS

1. **Ejecutar migraciones SQL en Supabase:**
   ```sql
   -- Ejecutar en este orden:
   001_initial_schema.sql  (ya ejecutado)
   002_rls_policies.sql    (ya ejecutado)
   003_add_activado_field.sql  ⭐ NUEVO
   ```

2. **Importar usuarios desde CSV:**
   - Ejecutar `scripts/importar_a_supabase.py`
   - Todos los usuarios se crearán con `activado = false`

3. **Capacitación a usuarios:**
   - Explicar flujo de activación
   - Recordar usar DNI completo y nombre en mayúsculas

4. **Pruebas piloto:**
   - Seleccionar 5-10 padres para prueba
   - Recopilar feedback sobre usabilidad

---

## 📞 SOPORTE

**Desarrollador:** Abel Moya  
**Email:** abelmoyaicsi@gmail.com  
**Institución:** I.E. 80002 Antonio Torres Araujo  
**Universidad:** UPAO - Prácticas Preprofesionales

---

**Fecha de creación:** 21 de noviembre de 2025  
**Versión:** 1.1.0  
**Estado:** ✅ Implementación completa
