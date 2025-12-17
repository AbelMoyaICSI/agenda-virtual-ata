# Copy emojis from old file to current file
import re

old_file = r"C:\Users\HOUSE\Desktop\old_index.html"
current_file = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

# Read old file (has correct emojis)
with open(old_file, 'r', encoding='utf-8') as f:
    old_content = f.read()

# Read current file
with open(current_file, 'r', encoding='utf-8') as f:
    current_content = f.read()

# Extract emoji patterns from old file
# Find all console.log with emojis: console.log('EMOJI ...
emoji_pattern = re.compile(r"console\.log\('([\U0001F300-\U0001F9FF\u2600-\u26FF\u2700-\u27BF]) ([^']+)'")

# Map of text patterns to their correct emojis
old_matches = emoji_pattern.findall(old_content)
print(f"Found {len(old_matches)} console.log statements with emojis in old file")

# Create replacement mapping
replacements = {}
for emoji, text in old_matches:
    # Create pattern to find: console.log('text (without emoji at start)
    text_start = text[:20] if len(text) > 20 else text
    key = f"console.log('{text_start}"
    replacements[key] = f"console.log('{emoji} {text_start}"

# Apply replacements to current content
count = 0
for old_pattern, new_pattern in replacements.items():
    if old_pattern in current_content and new_pattern not in current_content:
        current_content = current_content.replace(old_pattern, new_pattern)
        count += 1

print(f"Applied {count} emoji replacements")

# Save
with open(current_file, 'w', encoding='utf-8') as f:
    f.write(current_content)

print("Done!")
