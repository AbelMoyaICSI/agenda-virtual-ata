# URGENT FIX: Revert supabaseClient.co back to supabase.co
file_path = r"c:\Users\HOUSE\Desktop\agenda-virtual-ata\frontend\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken URL
content = content.replace('supabaseClient.co', 'supabase.co')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("FIXED: supabaseClient.co -> supabase.co")
