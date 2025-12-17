# Comprehensive UTF-8 cleanup for all visible content
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix known encoding issues that affect UI display
# Pattern "Á°" should be "°" (degree symbol got double-encoded)
replacements = {
    'Á°': '°',       # Fix corrupted degree symbol
    'Ã°': '°',       # Another variant
    '├░': '°',       # Box drawing variant
    'Â°': '°',       # Windows-1252 variant
    # Spanish characters that may still be broken in UI
    'Ã¡': 'á',
    'Ã©': 'é', 
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã': 'Á',
    'Ã‰': 'É',
    'Ã': 'Í',
    'Ã"': 'Ó',
    'Ãš': 'Ú',
    'Ã'': 'Ñ',
    '├¡': 'á',
    '├©': 'é',
    '├¡': 'í',
    '├│': 'ó',
    '├║': 'ú',
    '├±': 'ñ',
    # Question/exclamation marks
    'Â¿': '¿',
    'Â¡': '¡',
}

count = 0
for bad, good in replacements.items():
    if bad in content:
        occurrences = content.count(bad)
        content = content.replace(bad, good)
        count += occurrences
        print(f"Fixed '{bad}' -> '{good}': {occurrences} times")

print(f"\nTotal fixes: {count}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("UTF-8 cleanup complete!")
