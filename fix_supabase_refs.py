# Replace ALL remaining 'supabase' variable references with 'supabaseClient'
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace patterns where 'supabase' is used as a variable (not window.supabase or supabase.co)
# Pattern 1: = supabase followed by newline then .channel/.from/etc
content = re.sub(r'=\s+supabase\s*\n\s*\.', '= supabaseClient\n            .', content)

# Pattern 2: Just 'supabase' at end of line (before a method call on next line)
content = re.sub(r'(\s)supabase\s*$', r'\1supabaseClient', content, flags=re.MULTILINE)

# Pattern 3: 'supabase.' in middle of line (excluding window.supabase. and supabase.co)
# This catches cases like: await supabase.from(
content = re.sub(r'(?<!window\.)(?<!@)supabase\.', 'supabaseClient.', content)

# Pattern 4: ' supabase' at end of code section
content = re.sub(r'\bsupabase\s*\n\s*\.channel', 'supabaseClient\n                    .channel', content)
content = re.sub(r'\bsupabase\s*\n\s*\.from', 'supabaseClient\n                    .from', content)
content = re.sub(r'\bsupabase\s*\n\s*\.auth', 'supabaseClient\n                    .auth', content)
content = re.sub(r'\bsupabase\s*\n\s*\.rpc', 'supabaseClient\n                    .rpc', content)

# Also catch: { supabase. or ( supabase. patterns
content = re.sub(r'(\s)supabase\.', r'\1supabaseClient.', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All supabase references replaced with supabaseClient")
