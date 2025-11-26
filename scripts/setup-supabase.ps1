# =====================================================
# AGENDA VIRTUAL ATA - SETUP SUPABASE
# Script para configurar la base de datos en Supabase
# =====================================================

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  AGENDA VIRTUAL ATA - Setup Supabase" -ForegroundColor Cyan
Write-Host "  I.E. 80002 Antonio Torres Araujo" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "database\migrations\001_initial_schema.sql")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    Write-Host "   (donde está la carpeta 'database')" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Este script te guiará para configurar Supabase" -ForegroundColor Green
Write-Host ""

# =====================================================
# PASO 1: Verificar archivos SQL
# =====================================================
Write-Host "PASO 1: Verificando archivos SQL..." -ForegroundColor Yellow

$sqlFiles = @(
    "database\migrations\001_initial_schema.sql",
    "database\migrations\002_rls_policies.sql",
    "database\seeds\001_periodos.sql",
    "database\seeds\002_meritos.sql",
    "database\seeds\003_demeritos.sql",
    "database\seeds\004_users_demo.sql"
)

$allFilesExist = $true
foreach ($file in $sqlFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - NO ENCONTRADO" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "❌ Faltan archivos SQL. Verifica la estructura del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Todos los archivos SQL están disponibles" -ForegroundColor Green
Write-Host ""

# =====================================================
# PASO 2: Instrucciones para Supabase Dashboard
# =====================================================
Write-Host "PASO 2: Configuración en Supabase Dashboard" -ForegroundColor Yellow
Write-Host ""
Write-Host "📌 INSTRUCCIONES:" -ForegroundColor Cyan
Write-Host "   1. Abre tu navegador en: https://app.supabase.com" -ForegroundColor White
Write-Host "   2. Selecciona tu proyecto (Organization: AgendaVirtualATA)" -ForegroundColor White
Write-Host "   3. Ve al menú: SQL Editor (icono de código)" -ForegroundColor White
Write-Host ""

$response = Read-Host "¿Estás listo para continuar? (s/n)"
if ($response -ne "s" -and $response -ne "S") {
    Write-Host "Operación cancelada" -ForegroundColor Yellow
    exit 0
}

# =====================================================
# PASO 3: Ejecutar migraciones
# =====================================================
Write-Host ""
Write-Host "PASO 3: Ejecutar migraciones SQL" -ForegroundColor Yellow
Write-Host ""

Write-Host "📝 MIGRACIÓN 1: Schema Inicial (Tablas + ENUMs + Triggers)" -ForegroundColor Cyan
Write-Host "   Archivo: database\migrations\001_initial_schema.sql" -ForegroundColor White
Write-Host ""
Write-Host "   Acciones:" -ForegroundColor White
Write-Host "   1. En SQL Editor, haz clic en 'New query'" -ForegroundColor White
Write-Host "   2. Copia TODO el contenido del archivo 001_initial_schema.sql" -ForegroundColor White
Write-Host "   3. Pega en el editor de Supabase" -ForegroundColor White
Write-Host "   4. Haz clic en 'Run' (botón verde)" -ForegroundColor White
Write-Host "   5. Verifica que aparezca: 'Success. No rows returned'" -ForegroundColor White
Write-Host ""

# Abrir archivo en notepad para facilitar copia
$openFile = Read-Host "¿Abrir archivo en Notepad para copiar? (s/n)"
if ($openFile -eq "s" -or $openFile -eq "S") {
    Start-Process notepad "database\migrations\001_initial_schema.sql"
}

$response = Read-Host "¿Ejecutaste la migración exitosamente? (s/n)"
if ($response -ne "s" -and $response -ne "S") {
    Write-Host "Por favor, ejecuta la migración antes de continuar" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "📝 MIGRACIÓN 2: Políticas RLS (Seguridad)" -ForegroundColor Cyan
Write-Host "   Archivo: database\migrations\002_rls_policies.sql" -ForegroundColor White
Write-Host ""
Write-Host "   Repite el mismo proceso con el archivo 002_rls_policies.sql" -ForegroundColor White
Write-Host ""

$openFile = Read-Host "¿Abrir archivo en Notepad? (s/n)"
if ($openFile -eq "s" -or $openFile -eq "S") {
    Start-Process notepad "database\migrations\002_rls_policies.sql"
}

$response = Read-Host "¿Ejecutaste la migración RLS exitosamente? (s/n)"
if ($response -ne "s" -and $response -ne "S") {
    Write-Host "Por favor, ejecuta la migración antes de continuar" -ForegroundColor Yellow
    exit 0
}

# =====================================================
# PASO 4: Cargar datos semilla
# =====================================================
Write-Host ""
Write-Host "PASO 4: Cargar datos semilla (Catálogos)" -ForegroundColor Yellow
Write-Host ""

$seedFiles = @(
    @{Name="Períodos Académicos 2025"; File="database\seeds\001_periodos.sql"; Records="4 períodos"},
    @{Name="Catálogo de Méritos"; File="database\seeds\002_meritos.sql"; Records="14 méritos"},
    @{Name="Catálogo de Deméritos"; File="database\seeds\003_demeritos.sql"; Records="54 deméritos"},
    @{Name="Usuarios Demo"; File="database\seeds\004_users_demo.sql"; Records="11 usuarios"}
)

foreach ($seed in $seedFiles) {
    Write-Host "📦 $($seed.Name)" -ForegroundColor Cyan
    Write-Host "   Archivo: $($seed.File)" -ForegroundColor White
    Write-Host "   Registros: $($seed.Records)" -ForegroundColor White
    Write-Host ""
    
    $openFile = Read-Host "¿Abrir archivo y ejecutar? (s/n/saltar)"
    if ($openFile -eq "s" -or $openFile -eq "S") {
        Start-Process notepad $seed.File
        $response = Read-Host "¿Ejecutaste el seed exitosamente? (s/n)"
        if ($response -ne "s" -and $response -ne "S") {
            Write-Host "Continuando..." -ForegroundColor Yellow
        }
    } elseif ($openFile -eq "saltar") {
        Write-Host "⏭️  Saltando..." -ForegroundColor Yellow
    }
    Write-Host ""
}

# =====================================================
# PASO 5: Verificación
# =====================================================
Write-Host "PASO 5: Verificación de la instalación" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ejecuta esta consulta en SQL Editor para verificar:" -ForegroundColor Cyan
Write-Host ""

$verificationQuery = @"
-- Ver todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Contar registros en catálogos
SELECT 'Méritos' as catalogo, COUNT(*) as total FROM catalogo_meritos
UNION ALL
SELECT 'Deméritos', COUNT(*) FROM catalogo_demeritos
UNION ALL
SELECT 'Períodos', COUNT(*) FROM periodos
UNION ALL
SELECT 'Usuarios', COUNT(*) FROM users;
"@

Write-Host $verificationQuery -ForegroundColor White
Write-Host ""

$copyQuery = Read-Host "¿Copiar query al portapapeles? (s/n)"
if ($copyQuery -eq "s" -or $copyQuery -eq "S") {
    Set-Clipboard -Value $verificationQuery
    Write-Host "✅ Query copiado al portapapeles. Pégalo en SQL Editor" -ForegroundColor Green
}

# =====================================================
# PASO 6: Obtener credenciales
# =====================================================
Write-Host ""
Write-Host "PASO 6: Obtener credenciales de Supabase" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para conectar el backend, necesitas obtener:" -ForegroundColor Cyan
Write-Host "   1. Project URL" -ForegroundColor White
Write-Host "   2. Anon (public) key" -ForegroundColor White
Write-Host "   3. Service (secret) key" -ForegroundColor White
Write-Host ""
Write-Host "📌 Ubicación en Supabase:" -ForegroundColor Cyan
Write-Host "   Project Settings → API → Project URL y API Keys" -ForegroundColor White
Write-Host ""

$response = Read-Host "¿Abrir Supabase Dashboard para obtener credenciales? (s/n)"
if ($response -eq "s" -or $response -eq "S") {
    Start-Process "https://app.supabase.com"
}

# =====================================================
# PASO 7: Configurar .env
# =====================================================
Write-Host ""
Write-Host "PASO 7: Configurar archivo .env" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "backend\.env")) {
    Write-Host "Creando backend\.env desde .env.example..." -ForegroundColor Cyan
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "⚠️  El archivo backend\.env ya existe" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Ahora debes editar backend\.env con tus credenciales:" -ForegroundColor Cyan
Write-Host "   - SUPABASE_URL" -ForegroundColor White
Write-Host "   - SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "   - SUPABASE_SERVICE_KEY" -ForegroundColor White
Write-Host "   - JWT_SECRET (genera uno nuevo)" -ForegroundColor White
Write-Host ""

$openEnv = Read-Host "¿Abrir backend\.env en Notepad? (s/n)"
if ($openEnv -eq "s" -or $openEnv -eq "S") {
    Start-Process notepad "backend\.env"
}

# =====================================================
# FINALIZACIÓN
# =====================================================
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  ✅ SETUP COMPLETADO" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 RESUMEN DE LO QUE SE CONFIGURÓ:" -ForegroundColor Yellow
Write-Host "   ✅ 10 tablas creadas en Supabase" -ForegroundColor Green
Write-Host "   ✅ 8 ENUMs definidos" -ForegroundColor Green
Write-Host "   ✅ Políticas RLS configuradas" -ForegroundColor Green
Write-Host "   ✅ 14 méritos cargados" -ForegroundColor Green
Write-Host "   ✅ 54 deméritos cargados" -ForegroundColor Green
Write-Host "   ✅ 4 períodos académicos 2025" -ForegroundColor Green
Write-Host "   ✅ 11 usuarios demo (opcional)" -ForegroundColor Green
Write-Host ""
Write-Host "📌 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "   1. Completa las credenciales en backend\.env" -ForegroundColor White
Write-Host "   2. Prueba la conexión: cd backend; npm run dev" -ForegroundColor White
Write-Host "   3. Accede a: http://localhost:8787/health" -ForegroundColor White
Write-Host "   4. Verifica en Supabase: Table Editor" -ForegroundColor White
Write-Host ""
Write-Host "📚 DOCUMENTACIÓN:" -ForegroundColor Yellow
Write-Host "   - database\README.md - Guía completa de la BD" -ForegroundColor White
Write-Host "   - database\schemas\schema.sql - Documentación técnica" -ForegroundColor White
Write-Host ""
Write-Host "🔑 USUARIOS DEMO (Password: demo123):" -ForegroundColor Yellow
Write-Host "   - admin@ata.edu.pe" -ForegroundColor White
Write-Host "   - direccion@ata.edu.pe" -ForegroundColor White
Write-Host "   - toe@ata.edu.pe" -ForegroundColor White
Write-Host "   - tutor.primaria@ata.edu.pe" -ForegroundColor White
Write-Host "   - docente.matematica@ata.edu.pe" -ForegroundColor White
Write-Host "   - padre1@gmail.com" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Elimina usuarios demo en producción" -ForegroundColor Red
Write-Host ""
Write-Host "¡Listo para empezar! 🚀" -ForegroundColor Green
Write-Host ""
