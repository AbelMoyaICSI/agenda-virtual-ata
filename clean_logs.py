# Clean console.log statements by removing corrupted emoji prefixes
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match console.log with corrupted prefix
# The corruption typically appears as: console.log('GARBAGE text:', ...
# We want to clean it to: console.log('[LOG] text:', ...

# Remove known corrupted patterns at the start of console.log strings
patterns_to_clean = [
    # Pattern: console.log('├░┼©ÔÇ£┼á text -> console.log('[DEBUG] text
    (r"console\.log\('[^']{1,20}(?=Obteniendo|Par|Total|Este|Pendientes|Casos|Estad|Estudiantes|Usuario|Service|Audio|Verificando|JavaScript|URL)", 
     "console.log('[DEBUG] "),
]

# Count replacements
total_replacements = 0

# Simpler approach: find all console.log and clean the first part
def clean_console_log(match):
    global total_replacements
    full_match = match.group(0)
    # Extract the message after the corrupted prefix
    # The format is usually: console.log('GARBAGE Actual message
    # Find where actual words start (uppercase letter after space)
    import re as re2
    clean_start = re2.search(r"[A-Z][a-zA-Z]", full_match[13:])  # Skip "console.log('"
    if clean_start:
        pos = 13 + clean_start.start()
        message_part = full_match[pos:]
        total_replacements += 1
        return "console.log('[DEBUG] " + message_part
    return full_match

# Apply cleaning
content = re.sub(r"console\.log\('[^']{1,30}[A-Z]", clean_console_log, content)

# Also fix remaining Spanish characters
spanish_fixes = {
    'estad\u00edst': 'estadíst',
    'estad├¡st': 'estadíst',
    'sesi\u00f3n': 'sesión',
    'sesi├│n': 'sesión',
}

for bad, good in spanish_fixes.items():
    content = content.replace(bad, good)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Cleaned {total_replacements} console.log statements")
