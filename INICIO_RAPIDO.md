# 🚀 INICIO RÁPIDO - Agenda Virtual ATA

## ⚡ Configuración en 5 Minutos

### PASO 1: Ejecutar Script de Setup (2 min)

```powershell
# Desde la raíz del proyecto
.\scripts\setup-supabase.ps1
```

El script te guiará paso a paso. Solo sigue las instrucciones.

---

### PASO 2: Obtener Credenciales de Supabase (1 min)

1. Ve a: https://app.supabase.com
2. Selecciona tu proyecto: **AgendaVirtualATA**
3. Ve a: **Project Settings** → **API**
4. Copia:
   - **Project URL**
   - **anon public** key
   - **service_role** key (⚠️ secret)

---

### PASO 3: Configurar .env (1 min)

```powershell
# Editar archivo de entorno
notepad backend\.env
```

Pegar tus credenciales:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=genera_uno_nuevo_con_el_comando_de_abajo
```

Generar JWT_SECRET:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### PASO 4: Probar Backend (1 min)

```powershell
cd backend
npm install
npm run dev
```

Abrir en navegador: http://localhost:8787/health

**Respuesta esperada:**

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-01-..."
}
```

✅ **¡Listo! El backend está funcionando**

---

## 🧪 Probar con Usuarios Demo

**Usuarios disponibles** (password: `demo123`):

```
admin@ata.edu.pe
direccion@ata.edu.pe
toe@ata.edu.pe
tutor.primaria@ata.edu.pe
docente.matematica@ata.edu.pe
padre1@gmail.com
```

---

## 📊 Verificar Base de Datos

Ve a Supabase → **Table Editor**

Deberías ver:

| Tabla | Registros |
|-------|-----------|
| catalogo_meritos | 14 |
| catalogo_demeritos | 54 |
| periodos | 4 |
| users | 11 |

---

## 🔍 Verificar con SQL

En Supabase → **SQL Editor**, ejecutar:

```sql
SELECT 
  'Méritos' as catalogo, 
  COUNT(*) as total 
FROM catalogo_meritos

UNION ALL

SELECT 'Deméritos', COUNT(*) 
FROM catalogo_demeritos

UNION ALL

SELECT 'Períodos', COUNT(*) 
FROM periodos

UNION ALL

SELECT 'Usuarios', COUNT(*) 
FROM users;
```

**Resultado esperado:**

```
Méritos      14
Deméritos    54
Períodos      4
Usuarios     11
```

---

## ❌ Troubleshooting

### Error: "no such table"

**Causa:** No ejecutaste las migraciones SQL  
**Solución:** Ejecutar `database/migrations/001_initial_schema.sql` en SQL Editor

### Error: "SUPABASE_URL not defined"

**Causa:** Archivo `.env` no configurado  
**Solución:** Copiar `.env.example` a `.env` y completar credenciales

### Error: "connection refused"

**Causa:** Backend no está corriendo  
**Solución:** `cd backend; npm run dev`

### Error: "RLS policy violated"

**Causa:** Políticas RLS no aplicadas  
**Solución:** Ejecutar `database/migrations/002_rls_policies.sql`

---

## 📁 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `database/README.md` | Guía completa de BD |
| `backend/.env.example` | Plantilla de configuración |
| `scripts/setup-supabase.ps1` | Script automatizado |
| `ESTADO_PROYECTO.md` | Estado actual completo |

---

## 🎯 Próximos Pasos

Después de configurar la BD:

1. **Desarrollar Backend** → Handlers y servicios
2. **Migrar Frontend** → De HTML a React
3. **Implementar Auth** → JWT + Supabase Auth
4. **Configurar Push** → Notificaciones web
5. **Deploy** → Cloudflare Pages + Workers

---

## 📞 Ayuda

Si algo no funciona:

1. Revisa `database/README.md` sección **Troubleshooting**
2. Verifica logs del backend en la terminal
3. Revisa Supabase Dashboard → **Logs**
4. Consulta documentación: https://supabase.com/docs

---

**¿Todo funcionando?** ✅  
**¡Empieza a desarrollar!** 🚀

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025
