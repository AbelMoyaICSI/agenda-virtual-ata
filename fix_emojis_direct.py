# Direct emoji replacement using hardcoded correct emojis from commit 464e68e
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# These are the actual console.log patterns from the old commit with correct emojis
# Based on what I saw in: git show 464e68e:frontend/index.html | Select-String "console.log"
emoji_fixes = [
    # Format: (text_to_find, replacement_with_emoji)
    ("console.log('Obteniendo estad", "console.log('\U0001F4CA Obteniendo estad"),  # 📊
    ("console.log('Par", "console.log('\U0001F4C5 Par"),  # 📅
    ("console.log('Total incidencias:", "console.log('\U0001F4C8 Total incidencias:"),  # 📈
    ("console.log('Este mes:", "console.log('\U0001F4C8 Este mes:"),  # 📈
    ("console.log('Pendientes:", "console.log('\U0001F4C8 Pendientes:"),  # 📈
    ("console.log('Casos graves:", "console.log('\U0001F4C8 Casos graves:"),  # 📈
    ("console.log('Estad", "console.log('\u2705 Estad"),  # ✅
    ("console.log('Estudiantes en el aula:", "console.log('\U0001F465 Estudiantes en el aula:"),  # 👥
    ("console.log('JavaScript cargado completamente", "console.log('\U0001F680 JavaScript cargado completamente"),  # 🚀
    ("console.log('[DEBUG]", "console.log('\U0001F527 [DEBUG]"),  # 🔧 (or just keep [DEBUG])
    ("console.log('Verificando", "console.log('\U0001F50D Verificando"),  # 🔍
    ("console.log('Buscando", "console.log('\U0001F50D Buscando"),  # 🔍
    ("console.log('Iniciando Realtime", "console.log('\U0001F534 Iniciando Realtime"),  # 🔴
    ("console.log('Service Worker", "console.log('\u2699\uFE0F Service Worker"),  # ⚙️
    ("console.log('Usuario ha interactuado", "console.log('\U0001F50A Usuario ha interactuado"),  # 🔊
    ("console.log('AudioContext", "console.log('\U0001F50A AudioContext"),  # 🔊
    ("console.log('Datos cargados", "console.log('\u2705 Datos cargados"),  # ✅
    ("console.log('URL completa:", "console.log('\U0001F517 URL completa:"),  # 🔗
    ("console.log('Hash:", "console.log('\U0001F4CC Hash:"),  # 📌
    ("console.log('Search:", "console.log('\U0001F4CC Search:"),  # 📌
    ("console.log('Contiene", "console.log('\U0001F4CC Contiene"),  # 📌
    ("console.log('Resultado", "console.log('\U0001F4CB Resultado"),  # 📋
    ("console.log('Sesión", "console.log('\U0001F511 Sesión"),  # 🔑
    ("console.log('Aulas", "console.log('\U0001F3EB Aulas"),  # 🏫
    ("console.log('Confirmaciones", "console.log('\u2705 Confirmaciones"),  # ✅
    ("console.log('Badge", "console.log('\U0001F514 Badge"),  # 🔔
    ("console.log('UI", "console.log('\U0001F3A8 UI"),  # 🎨
]

count = 0
for old, new in emoji_fixes:
    if old in content:
        content = content.replace(old, new)
        count += 1

print(f"Applied {count} emoji fixes")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
