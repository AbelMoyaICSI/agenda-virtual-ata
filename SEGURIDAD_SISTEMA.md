# 🔒 SEGURIDAD DEL SISTEMA - Agenda Virtual ATA

## 📋 POLÍTICAS DE SEGURIDAD IMPLEMENTADAS

### 1. **AUTENTICACIÓN Y AUTORIZACIÓN**

#### Supabase Auth (Nivel Enterprise)
- ✅ **Hash bcrypt** para contraseñas (industry standard)
- ✅ **Tokens JWT** para sesiones autenticadas
- ✅ **Refresh tokens** para mantener sesión segura
- ✅ **Email verification** disponible (opcional)

#### Row Level Security (RLS)
```sql
-- Política actual: Lectura anónima solo para verificación
CREATE POLICY "Allow anonymous read for verification"
ON public.users
FOR SELECT
USING (true);

-- TODO: Agregar políticas más restrictivas:
-- 1. UPDATE solo para usuarios autenticados sobre sus propios datos
-- 2. DELETE solo para administradores
-- 3. INSERT solo para administradores
```

---

### 2. **FLUJO DE ACTIVACIÓN DE CUENTAS**

#### Primera vez (Activación):
1. ✅ Usuario verifica identidad con **DNI único** + Nombre completo
2. ✅ Sistema busca en base de datos (tabla `users`)
3. ✅ Valida campo `activado = false` (cuenta no activada aún)
4. ✅ Usuario crea contraseña (mínimo 6 caracteres)
5. ✅ Sistema crea cuenta en **Supabase Auth**
6. ✅ Actualiza `activado = true` en tabla `users`
7. ✅ Auto-login automático

#### Prevención de duplicados:
- ✅ **DNI único** por persona (8 dígitos numéricos)
- ✅ **Email único** en Supabase (automático)
- ✅ **Verificación doble**: Campo `activado` + existencia en Auth
- ✅ **Mensaje claro** si cuenta ya activada: "Ya tiene contraseña creada"

---

### 3. **VALIDACIÓN DE CONTRASEÑAS**

#### Requisitos mínimos:
- ✅ Mínimo 6 caracteres (configurable)
- ✅ Confirmación de contraseña (deben coincidir)
- ✅ Medidor de seguridad en tiempo real:
  - 🔴 **Baja** (< 40 puntos): Solo caracteres básicos
  - 🟠 **Media** (40-69 puntos): Mix de caracteres
  - 🟢 **Alta** (≥ 70 puntos): May/min + números + símbolos

#### Criterios de fortaleza:
```javascript
- Longitud ≥ 6 chars: +25 puntos
- Longitud ≥ 8 chars: +15 puntos
- Longitud ≥ 10 chars: +10 puntos
- Minúsculas (a-z): +10 puntos
- Mayúsculas (A-Z): +15 puntos
- Números (0-9): +15 puntos
- Símbolos (!@#$): +10 puntos
```

---

### 4. **RECUPERACIÓN DE CONTRASEÑA**

#### Implementado:
- ✅ Botón "Olvidé mi contraseña" en pantalla de verificación
- ✅ Envío de correo con link de recuperación
- ✅ Usa `supabase.auth.resetPasswordForEmail()`
- ✅ Redirect a página de reset (pendiente implementar)

#### Flujo:
1. Usuario verifica cuenta con DNI/Nombre
2. Si `activado = true`, aparece link "¿Olvidaste tu contraseña?"
3. Click → Confirma email → Supabase envía correo
4. Usuario click en link → Restablece contraseña

**PENDIENTE**: Crear página `/reset-password` para formulario de nueva contraseña

---

### 5. **CONTROL DE ACCESO POR ROLES**

#### Roles definidos:
- `docente` - Profesores
- `tutor` - Tutores de aula
- `auxiliar` - Auxiliares de educación
- `toe` - Coordinador TOE
- `direccion` - Director/Subdirector
- `padre` - Padres/Madres de familia
- `admin` - Administrador del sistema

#### Validación:
- ✅ Usuario selecciona rol ANTES de login/activación
- ✅ Sistema valida que el rol en DB coincida con selección
- ✅ Mensaje de error claro si no coincide
- ✅ Cada rol tiene permisos diferentes en la app

---

### 6. **PREVENCIÓN DE VULNERABILIDADES**

#### XSS (Cross-Site Scripting):
- ⚠️ **RIESGO MEDIO**: Uso de `.innerHTML` para mensajes
- 🔧 **RECOMENDACIÓN**: Sanitizar inputs con DOMPurify
- 🔧 **ALTERNATIVA**: Usar `.textContent` para datos dinámicos

#### SQL Injection:
- ✅ **PROTEGIDO**: Supabase usa consultas parametrizadas
- ✅ No hay concatenación de strings en queries

#### CSRF (Cross-Site Request Forgery):
- ✅ **PROTEGIDO**: Supabase Auth usa tokens JWT
- ✅ Tokens validados en cada request

#### Fuerza Bruta:
- ⚠️ **PENDIENTE**: Rate limiting en intentos de login
- 🔧 **RECOMENDACIÓN**: Implementar bloqueo temporal tras 5 intentos fallidos

---

### 7. **DATOS SENSIBLES**

#### Almacenamiento:
- ✅ **Contraseñas**: NUNCA en texto plano, solo hash bcrypt en Supabase Auth
- ✅ **DNI**: Almacenado en tabla `users` (necesario para verificación)
- ✅ **Email**: Almacenado en tabla `users` + Supabase Auth
- ⚠️ **Teléfono**: Texto plano en tabla `users` (bajo riesgo)

#### Transmisión:
- ✅ **HTTPS obligatorio** en producción (Supabase + Cloudflare Workers)
- ✅ Tokens JWT en headers `Authorization`
- ✅ No se envían contraseñas en URLs

---

### 8. **AUDITORÍA Y LOGS**

#### Implementado:
- ✅ `console.log()` para debugging (solo desarrollo)
- ⚠️ **PENDIENTE**: Sistema de logs en base de datos

#### Recomendado para producción:
```javascript
// Tabla audit_logs
- id
- user_id
- action (login, logout, create_account, etc.)
- ip_address
- user_agent
- timestamp
- details (JSON)
```

---

## 🚨 ESCENARIOS DE SEGURIDAD

### ✅ **CASO 1: Usuario intenta activar cuenta ya activada**
**Flujo actual:**
1. Verifica DNI → Sistema detecta `activado = true`
2. Muestra mensaje: "Cuenta ya activada"
3. Ofrece link "Olvidé mi contraseña"
4. Botón "Ir a Iniciar Sesión"

### ✅ **CASO 2: Dos usuarios con mismo DNI (imposible por diseño)**
**Prevención:**
- DNI es único en tabla `users` (constraint UNIQUE)
- Cada persona tiene DNI único en Perú (8 dígitos)
- Si existiera duplicado → Error de base de datos

### ✅ **CASO 3: Email ya registrado en Supabase Auth**
**Flujo actual:**
1. Usuario intenta crear contraseña
2. Supabase retorna error "User already registered"
3. Sistema muestra: "Email ya registrado"
4. Redirige a "Iniciar sesión"

### ⚠️ **CASO 4: Usuario olvida contraseña**
**Flujo implementado:**
1. Verificación con DNI/Nombre
2. Si `activado = true` → Link "Olvidé mi contraseña"
3. Supabase envía email con magic link
4. Usuario restablece contraseña

**PENDIENTE**: Página de reset-password

---

## 📊 NIVEL DE SEGURIDAD ACTUAL

| Aspecto | Estado | Nivel |
|---------|--------|-------|
| Autenticación | ✅ Supabase Auth | 🟢 Alta |
| Hash contraseñas | ✅ bcrypt | 🟢 Alta |
| Tokens JWT | ✅ Implementado | 🟢 Alta |
| RLS Políticas | ⚠️ Básico | 🟡 Media |
| Validación inputs | ⚠️ Frontend only | 🟡 Media |
| Rate limiting | ❌ No implementado | 🔴 Baja |
| Logs auditoría | ❌ No implementado | 🔴 Baja |
| XSS Protection | ⚠️ Parcial | 🟡 Media |
| HTTPS | ✅ Producción | 🟢 Alta |
| 2FA | ❌ No implementado | 🔴 Baja |

**NIVEL GENERAL: 🟡 MEDIO-ALTO**

---

## ✅ RECOMENDACIONES PRIORITARIAS

### 🔴 **CRÍTICO (Implementar antes de producción):**
1. ✅ ~~Recuperación de contraseña~~ (IMPLEMENTADO)
2. 🔧 Crear página `/reset-password`
3. 🔧 Sanitizar inputs con DOMPurify
4. 🔧 Rate limiting en login (5 intentos/minuto)
5. 🔧 Políticas RLS más restrictivas

### 🟠 **IMPORTANTE (Implementar en v2):**
6. Sistema de logs de auditoría
7. Notificaciones por email (nuevo login, cambio contraseña)
8. Validación de email obligatoria
9. Sesión única (logout de otros dispositivos)
10. Confirmación doble para acciones críticas

### 🟢 **DESEABLE (Futuro):**
11. Autenticación de dos factores (2FA)
12. Biometría (Face ID, Touch ID)
13. Captcha en registro/login
14. Análisis de comportamiento anómalo

---

## 🛡️ CUMPLIMIENTO NORMATIVO

### Perú - Ley de Protección de Datos Personales (Ley N° 29733)
- ✅ Datos personales encriptados en tránsito (HTTPS)
- ✅ Contraseñas hasheadas (no texto plano)
- ⚠️ **PENDIENTE**: Política de privacidad visible
- ⚠️ **PENDIENTE**: Consentimiento explícito para uso de datos
- ⚠️ **PENDIENTE**: Derecho al olvido (eliminación de cuenta)

---

## 📞 CONTACTO SEGURIDAD

**Responsable**: [Definir responsable]  
**Email**: [seguridad@ata.edu.pe]  
**Incidentes**: Reportar a través del sistema de tickets

---

**Última actualización**: 22/11/2025  
**Versión del sistema**: 1.0 (Activación de cuentas)
