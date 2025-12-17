# Binary approach to fix encoding
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

# Read as bytes
with open(file_path, 'rb') as f:
    content = f.read()

# Try to recover by decoding windows-1252 then encoding utf-8
# This is a heuristic fix for double-encoding issues
try:
    # Decode as if it was UTF-8 that got saved as Windows-1252
    text = content.decode('utf-8')
    
    # Now fix the known corrupted patterns
    # These are the box drawing chars that appear in the screenshots
    fixes = {
        b'\xe2\x94\x9c\xc2\xb0\xc5\xa9\xc3\x94\xc3\x87\xc2\xa3\xc5\xa0': b'\xf0\x9f\x94\x8d',  # 🔍
        b'\xe2\x94\x9c\xc2\xb0\xc5\xa9\xc3\x94\xc3\x87\xc2\xa3\xc3\x94\xc3\x87\xc2\xaa': b'\xf0\x9f\x94\x8e',  # 🔎
        b'\xe2\x94\x9c\xc2\xb0\xc5\xa9\xc3\x94\xc3\x87\xc2\xa3\xcb\x86\xc3\xa5': b'\xf0\x9f\x93\x8a',  # 📊
        b'\xe2\x94\x9c\xc2\xb2\xc5\x93\xc3\x94\xc3\x87\xc2\xaa': b'\xe2\x9c\x85',  # ✅
    }
    
    encoded = text.encode('utf-8')
    for bad, good in fixes.items():
        encoded = encoded.replace(bad, good)
    
    with open(file_path, 'wb') as f:
        f.write(encoded)
    
    print("Fixed encoding using binary approach")
except Exception as e:
    print(f"Error: {e}")
