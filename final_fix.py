# Final Spanish character fix
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# These are the box-drawing + special char combos that represent Spanish letters
fixes = {
    '\u251c\u00a1': 'á',  # ├¡ -> á
    '\u251c\u00ad': 'í',  # ├­ -> í  
    '\u251c\u00b3': 'ó',  # ├³ -> ó
    '\u251c\u00ba': 'ú',  # ├º -> ú
    '\u251c\u00b1': 'ñ',  # ├± -> ñ
    '\u251c\u00a9': 'é',  # ├© -> é
    '├¡': 'í',
    '├á': 'á',
    '├³': 'ó',
    '├º': 'ú',
    '├±': 'ñ',
    '├©': 'é',
    '├í': 'á',  # Sometimes mapped differently
    '├ó': 'ó',
    '├ú': 'ú',
    '├ñ': 'ñ',
    '├é': 'é',
}

for bad, good in fixes.items():
    content = content.replace(bad, good)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Spanish characters fixed")
