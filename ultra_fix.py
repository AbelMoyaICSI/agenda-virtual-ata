# Ultra-aggressive box-drawing character removal
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The box drawing character U+251C appears repeatedly
# Pattern: ├ followed by another char that should be a Spanish letter

# Direct replacements
replacements = [
    ('├í', 'á'),
    ('├¡', 'í'),  
    ('├ó', 'ó'),
    ('├ú', 'ú'),
    ('├ñ', 'ñ'),
    ('├é', 'é'),
    ('├Á', 'Á'),
    ('├É', 'É'),
    ('├Í', 'Í'),
    ('├Ó', 'Ó'),
    ('├Ú', 'Ú'),
    ('├Ñ', 'Ñ'),
    ('├¿', '¿'),
    ('├¡', '¡'),
    ('├─', '─'),
    # Also clean up any remaining box drawing
    ('┼©', ''),
    ('┼á', ''),
    ('╦å', ''),
    ('Ô', ''),
]

for old, new in replacements:
    content = content.replace(old, new)

# Remove the box-drawing char before vowels with accents
# Pattern: ├ + some char -> the char should be the Spanish letter
content = re.sub(r'├([áéíóúñÁÉÍÓÚÑ¿¡])', r'\1', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final cleanup done")
