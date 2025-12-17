
import os

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

# Common UTF-8 characters interpreted as Windows-1252/ISO-8859-1
replacements = {
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã\xad': 'í',  # í is C3 AD, AD is soft hyphen/unused in some sets, often shows as just Ã or Ã­
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã‘': 'Ñ',
    'Â¿': '¿',     # sometimes ¿ (C2 BF) becomes Â¿
    'Ã¿': '¿',     # double corruption case
    'Ã': 'Á',
    'Ã‰': 'É',
    'Ã': 'Í',     # C3 8D
    'Ã“': 'Ó',
    'Ãš': 'Ú',
    'Â¡': '¡',     # ¡ is C2 A1 -> Â¡
}

# Also specific double-encoded ones if any
# The user saw 'Ã¿QuÃ©' -> '¿Qué'
# 'Ã©' is 'é'
# 'Ã¿' is '¿'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Apply replacements
for bad, good in replacements.items():
    content = content.replace(bad, good)

# Extra check for just 'Ã' which might be 'í' stuck to something else, 
# but risky to replace blindly. 'Ã' is C3. 
# Usually C3 followed by something.
# Let's rely on the specifics above first.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed encoding in {file_path}")
