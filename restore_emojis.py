# Restore correct emojis to console.log statements
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Map of console.log messages to their correct emojis (from commit 464e68e)
emoji_mapping = {
    "console.log('Obteniendo estad": "console.log('📊 Obteniendo estad",
    "console.log('Par": "console.log('📅 Par",
    "console.log('Total incidencias": "console.log('📈 Total incidencias",
    "console.log('Este mes": "console.log('📈 Este mes",
    "console.log('Pendientes": "console.log('📈 Pendientes",
    "console.log('Casos graves": "console.log('📈 Casos graves",
    "console.log('Estad": "console.log('✅ Estad",
    "console.log('Estudiantes en el aula": "console.log('👥 Estudiantes en el aula",
    "console.log('Usuario ha interactuado": "console.log('🔊 Usuario ha interactuado",
    "console.log('Service Worker": "console.log('⚙️ Service Worker",
    "console.log('JavaScript cargado completamente": "console.log('🚀 JavaScript cargado completamente",
    "console.log('Verificando": "console.log('🔍 Verificando",
    "console.log('Buscando": "console.log('🔍 Buscando",
    "console.log('Iniciando": "console.log('🔴 Iniciando",
    "console.log('URL completa": "console.log('🔗 URL completa",
    "console.log('Hash": "console.log('📌 Hash",
    "console.log('Search": "console.log('📌 Search",
    "console.log('Contiene": "console.log('📌 Contiene",
    "console.log('Datos cargados": "console.log('✅ Datos cargados",
    "console.log('Resultado": "console.log('📋 Resultado",
    "console.log('AudioContext": "console.log('🔊 AudioContext",
    "console.log('[DEBUG]": "console.log('🔧 [DEBUG]",
}

for old, new in emoji_mapping.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Emojis restored!")
