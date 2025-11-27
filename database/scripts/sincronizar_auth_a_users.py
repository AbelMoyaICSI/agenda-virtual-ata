#!/usr/bin/env python3
"""
Script para SINCRONIZAR usuarios de Supabase Auth → tabla users
Toma los usuarios DEMO de Auth y los inserta en la tabla users
"""

from supabase import create_client
import bcrypt
from datetime import datetime

# Credenciales de Supabase
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI'

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Contraseña para generar hash
PASSWORD = "Demo2025!"

def generar_password_hash(password: str) -> str:
    """Genera hash bcrypt de una contraseña"""
    salt = bcrypt.gensalt(rounds=12)
    password_bytes = password.encode('utf-8')
    hash_bytes = bcrypt.hashpw(password_bytes, salt)
    return hash_bytes.decode('utf-8')

print("=" * 80)
print("🔄 SINCRONIZANDO USUARIOS DEMO: Auth → Tabla users")
print("=" * 80)
print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"🌐 URL: {SUPABASE_URL}")
print("=" * 80)

# Paso 1: Obtener usuarios DEMO de Supabase Auth
print("\n📥 PASO 1: Obteniendo usuarios de Supabase Auth...")
print("-" * 80)

try:
    auth_users = supabase.auth.admin.list_users()
    demo_users = [u for u in auth_users if '@ata.edu.pe' in u.email or '.demo@' in u.email]
    print(f"✅ Encontrados {len(demo_users)} usuarios DEMO en Auth\n")
except Exception as e:
    print(f"❌ ERROR: {e}")
    exit(1)

# Paso 2: Generar hash de contraseña
print("\n🔐 PASO 2: Generando hash de contraseña...")
print("-" * 80)
password_hash = generar_password_hash(PASSWORD)
print(f"✅ Hash generado: {password_hash[:50]}...\n")

# Paso 3: Insertar usuarios en tabla users
print("\n✨ PASO 3: Insertando usuarios en tabla 'users'...")
print("-" * 80)

insertados = 0
actualizados = 0
errores = 0

# Mapeo de teléfonos
telefonos = {
    '00000001': '999888777',
    '00000002': '999888778',
    '00000003': '999888779',
    '00000004': '999888780',
    '00000005': '999888781',
    '00000006': '999888782',
    '00000007': '999888783',
    '00000008': '999888784'
}

for user in demo_users:
    try:
        metadata = user.user_metadata if hasattr(user, 'user_metadata') else {}
        dni = metadata.get('dni', 'N/A')
        role = metadata.get('role', 'N/A')
        nombre = metadata.get('nombre_completo', 'N/A')
        telefono = telefonos.get(dni, '999888888')
        
        # Verificar si ya existe
        existing = supabase.table('users').select('id').eq('id', user.id).execute()
        
        user_data = {
            'id': user.id,
            'email': user.email,
            'password_hash': password_hash,
            'role': role,
            'nombre_completo': nombre,
            'dni': dni,
            'telefono': telefono,
            'activo': True,
            'activado': True,
            'created_at': user.created_at.isoformat() if hasattr(user.created_at, 'isoformat') else str(user.created_at),
            'updated_at': datetime.now().isoformat()
        }
        
        if existing.data:
            # Actualizar
            supabase.table('users').update(user_data).eq('id', user.id).execute()
            print(f"🔄 {role.upper():12} | {dni} | {user.email:40} | ACTUALIZADO")
            actualizados += 1
        else:
            # Insertar nuevo
            supabase.table('users').insert(user_data).execute()
            print(f"✅ {role.upper():12} | {dni} | {user.email:40} | INSERTADO")
            insertados += 1
            
    except Exception as e:
        print(f"❌ {user.email:40} | ERROR: {str(e)}")
        errores += 1

print("\n" + "=" * 80)
print("📊 RESUMEN")
print("=" * 80)
print(f"✅ Insertados:     {insertados}")
print(f"🔄 Actualizados:   {actualizados}")
print(f"❌ Errores:        {errores}")
print(f"📋 Total:          {len(demo_users)}")
print("=" * 80)

if insertados + actualizados > 0:
    print("\n🎉 SINCRONIZACIÓN COMPLETADA")
    print("\n📝 AHORA PUEDES INICIAR SESIÓN CON:")
    print("-" * 80)
    print(f"{'EMAIL':<40} {'PASSWORD'}")
    print("-" * 80)
    for user in demo_users:
        print(f"{user.email:<40} {PASSWORD}")
    print("-" * 80)
    print("\n💡 TIP: También puedes usar el DNI en lugar del email")
    print("   Ejemplo: 00000001 / Demo2025!")
