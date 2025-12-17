# Comprehensive UTF-8 cleanup using Unicode code points to avoid syntax issues
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix known encoding issues using Unicode escapes
# These are byte sequences that result from double UTF-8 encoding
replacements = [
    # Degree symbol corruptions
    ('\u00c1\u00b0', '\u00b0'),  # Á° -> °
    ('\u00c3\u00b0', '\u00b0'),  # Ã° -> °
    ('\u00c2\u00b0', '\u00b0'),  # Â° -> °
    # Spanish lowercase
    ('\u00c3\u00a1', '\u00e1'),  # Ã¡ -> á
    ('\u00c3\u00a9', '\u00e9'),  # Ã© -> é
    ('\u00c3\u00ad', '\u00ed'),  # Ã­ -> í
    ('\u00c3\u00b3', '\u00f3'),  # Ã³ -> ó
    ('\u00c3\u00ba', '\u00fa'),  # Ãº -> ú
    ('\u00c3\u00b1', '\u00f1'),  # Ã± -> ñ
    # Spanish uppercase
    ('\u00c3\u0081', '\u00c1'),  # Ã -> Á
    ('\u00c3\u0089', '\u00c9'),  # Ã‰ -> É
    ('\u00c3\u008d', '\u00cd'),  # Ã -> Í
    ('\u00c3\u0093', '\u00d3'),  # Ã" -> Ó
    ('\u00c3\u009a', '\u00da'),  # Ãš -> Ú
    ('\u00c3\u0091', '\u00d1'),  # Ã' -> Ñ
    # Punctuation
    ('\u00c2\u00bf', '\u00bf'),  # Â¿ -> ¿
    ('\u00c2\u00a1', '\u00a1'),  # Â¡ -> ¡
]

count = 0
for bad, good in replacements:
    if bad in content:
        occurrences = content.count(bad)
        content = content.replace(bad, good)
        count += occurrences
        print(f"Fixed: {occurrences} occurrences")

print(f"Total fixes: {count}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
