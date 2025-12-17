
import re

file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace 'await supabase' -> 'await supabaseClient'
content = re.sub(r'await\s+supabase\b', 'await supabaseClient', content)

# 2. Replace 'supabase.' -> 'supabaseClient.' BUT NOT 'window.supabase.'
#    Regex logic: Find 'supabase.' that is NOT preceded by 'window.' or '@' (for npm package)
#    and is NOT inside a string like '...supabase.co...'
#    Given the specific context, we can be more targeted to avoid risks.

replacements = [
    (r'supabase\.from\(', 'supabaseClient.from('),
    (r'supabase\.auth\.', 'supabaseClient.auth.'),
    (r'supabase\.storage\.', 'supabaseClient.storage.'),
    (r'supabase\.rpc\(', 'supabaseClient.rpc('),
    (r'supabase\.channel\(', 'supabaseClient.channel('),
    (r'supabase\.removeChannel\(', 'supabaseClient.removeChannel('),
    (r'supabase\.removeAllChannels\(', 'supabaseClient.removeAllChannels('),
    (r'supabase\.getChannels\(', 'supabaseClient.getChannels('),
]

for pat, repl in replacements:
    content = re.sub(pat, repl, content)

# 3. Handle 'query = supabase.from' lines carefully if they didn't catch above
#    The list above handles 'supabase.from(' which is the main one.

# 4. Save file
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
