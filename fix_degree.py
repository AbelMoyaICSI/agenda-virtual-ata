# Fix corrupted degree symbol: ┬░ -> °
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# ┬░ is the corrupted version of °
# In Unicode: \u252c\u00b0 (box drawing + degree) should be just \u00b0 (degree)
corrupted = '\u252c\u00b0'  # ┬°
correct = '\u00b0'  # °

count = content.count(corrupted)
content = content.replace(corrupted, correct)

print(f"Fixed {count} corrupted degree symbols (┬° -> °)")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
