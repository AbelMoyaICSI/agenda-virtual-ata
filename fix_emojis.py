# Fix corrupted emojis and special characters
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace corrupted console.log emoji patterns with clean ones
# Pattern found: console.log('├░┼©ÔÇ£┼á -> should be console.log('🔍 

# Method: Find all console.log lines and clean up the garbled prefixes
# The pattern is usually: console.log('GARBAGE text:', 

# List of known corrupted patterns (as bytes that got misinterpreted)
replacements = [
    # corrupted -> correct (using regex-safe escapes)
    (r"console\.log\('\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u2555\u00a0", "console.log('\U0001F50D "),  # 🔍
    (r"console\.log\('\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u00d4\u00c7\u00aa", "console.log('\U0001F50E "),  # 🔎
    (r"console\.log\('\u251c\u2592\u2555\u00a9\u00d4\u00c7\u201c\u02c6\u00e5", "console.log('\U0001F4CA "),  # 📊
    (r"console\.log\('\u251c\u2592\u00d3\u2555\u00f4\u00d4\u00c7\u00aa", "console.log('\u2705 "),  # ✅
    (r"console\.log\('\u251c\u2592\u2555\u00a9\u00d4\u00c7\u2019\u00ac\u00a5", "console.log('\U0001F465 "),  # 👥
    (r"\u251c\u00e9\u00ac\u00b0", "\u00b0"),  # degree symbol
]

# Simple approach: just replace the known patterns
simple_replacements = {
    "├░┼©ÔÇ£┼á": "🔍",
    "├░┼©ÔÇ£ÔÇª": "🔎", 
    "├░┼©ÔÇ£╦å": "📊",
    "├ó┼ôÔÇª": "✅",
    "├░┼©ÔÇÿ┬Ñ": "👥",
    "├é┬░": "°",
    "├¡": "í",
    "├í": "á",
    "├│": "ó",
    "├║": "ú",
    "├▒": "ñ",
}

for bad, good in simple_replacements.items():
    content = content.replace(bad, good)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed emojis and characters")
