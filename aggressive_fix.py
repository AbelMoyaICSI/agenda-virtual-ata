# Aggressive cleanup - remove corrupted prefixes from console.log
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

# Read raw bytes
with open(file_path, 'rb') as f:
    content = f.read()

# Decode as UTF-8
text = content.decode('utf-8')

# The corrupted pattern in the file looks like this in Unicode:
# \u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u2555\u00a0 (├░┼©ÔÇ£┼á)
# \u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u00d4\u00c7\u00aa (├░┼©ÔÇ£ÔÇª)
# etc.

# Remove these sequences wherever they appear before text
corrupted_patterns = [
    '\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u2555\u00a0',  # ├░┼©ÔÇ£┼á
    '\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u00d4\u00c7\u00aa',  # ├░┼©ÔÇ£ÔÇª
    '\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u02c6\u00e5',  # ├░┼©ÔÇ£╦å
    '\u251c\u2592\u00d3\u2555\u00f4\u00d4\u00c7\u00aa',  # ├ó┼ôÔÇª
    '\u251c\u2592\u2555\u00a9\u00d4\u00c7\u2019\u00ac\u00a5',  # ├░┼©ÔÇÿ¬¥
    '\u251c\u00e9\u00ac\u00b0',  # ├é┬░
    '\u251c\u00e9¬\u00b0',
    '\u251c\u00b0',
    '\u251c\u2592',
]

# Simple replacement - remove the corrupted prefix
for pattern in corrupted_patterns:
    text = text.replace(pattern, '')

# Also remove any remaining box-drawing chars at start of log messages
# Pattern: console.log('GARBAGE -> console.log('
text = re.sub(r"console\.log\('([^\u0000-\u007F]+)\s*([A-Z])", r"console.log('\2", text)

# Fix remaining Spanish chars
text = text.replace('\u251c\u00a1', 'á')
text = text.replace('\u251c\u00ad', 'í')
text = text.replace('\u251c\u00b3', 'ó')
text = text.replace('\u251c\u00ba', 'ú')
text = text.replace('\u251c\u00b1', 'ñ')

# Write back  
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Aggressive cleanup completed")
