@echo off
REM ============================================================
REM  AGENDA VIRTUAL ATA - INICIAR SERVIDOR DE DESARROLLO
REM  Archivo temporal para desarrollo local
REM ============================================================

echo.
echo ====================================================
echo   INICIANDO AGENDA VIRTUAL ATA (Modo Desarrollo)
echo ====================================================
echo.

REM Ir a la carpeta frontend
cd /d "%~dp0frontend"

echo [1/3] Verificando dependencias...
if not exist "node_modules" (
    echo.
    echo [!] Instalando dependencias por primera vez...
    call npm install
)

echo.
echo [2/3] Iniciando servidor Vite...
echo.
echo ====================================================
echo   Servidor iniciado en: http://localhost:5173
echo ====================================================
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Esperar 3 segundos y abrir navegador
timeout /t 3 /nobreak >nul
start http://localhost:5173

REM Iniciar servidor Vite
call npm run dev

pause
