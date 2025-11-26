#!/usr/bin/env python3
"""
Script para RECREAR usuarios DEMO con Supabase Auth
1. Elimina usuarios DEMO de tabla users
2. Los crea en Supabase Auth + tabla users
Contraseña para todos: Demo2025!
"""

from supabase import create_client
import bcrypt
from datetime import datetime

# Credenciales de Supabase
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI'

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Contraseña común para todos los usuarios demo
PASSWORD = "Demo2025!"

# Usuarios DEMO a crear
usuarios_demo = [
    {
        'email': 'admin@ata.edu.pe',
        'dni': '00000001',
        'nombre_completo': 'ADMINISTRADOR SISTEMA',
        'role': 'admin',
        'telefono': '999888777'
    },
    {
        'email': 'director@ata.edu.pe',
        'dni': '00000002',
        'nombre_completo': 'DIRECTOR DEMO',
        'role': 'direccion',
        'telefono': '999888778'
    },
    {
        'email': 'toe@ata.edu.pe',
        'dni': '00000003',
        'nombre_completo': 'TOE DEMO',
        'role': 'toe',
        'telefono': '999888779'
    },
    {
        'email': 'tutor1a@ata.edu.pe',
        'dni': '00000004',
        'nombre_completo': 'TUTOR 1A DEMO',
        'role': 'tutor',
        'telefono': '999888780'
    },
    {
        'email': 'auxiliar@ata.edu.pe',
        'dni': '00000005',
        'nombre_completo': 'AUXILIAR DEMO',
        'role': 'auxiliar',
        'telefono': '999888781'
    },
    {
        'email': 'docente.matematica@ata.edu.pe',
        'dni': '00000006',
        'nombre_completo': 'DOCENTE MATEMATICA DEMO',
        'role': 'docente',
        'telefono': '999888782'
    },
    {
        'email': 'docente.comunicacion@ata.edu.pe',
        'dni': '00000007',
        'nombre_completo': 'DOCENTE COMUNICACION DEMO',
        'role': 'docente',
        'telefono': '999888783'
    },
    {
        'email': 'padre.demo@gmail.com',
        'dni': '00000008',
        'nombre_completo': 'PADRE DEMO',
        'role': 'padre',
        'telefono': '999888784'
    }
]

def generar_password_hash(password: str) -> str:
    """Genera hash bcrypt de una contraseña"""
    salt = bcrypt.gensalt(rounds=12)
    password_bytes = password.encode('utf-8')
    hash_bytes = bcrypt.hashpw(password_bytes, salt)
    return hash_bytes.decode('utf-8')

print("=" * 80)
print("🔄 RECREANDO USUARIOS DEMO CON SUPABASE AUTH")
print("=" * 80)
print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"🌐 URL: {SUPABASE_URL}")
print(f"🔑 Contraseña común: {PASSWORD}")
print("=" * 80)

# Paso 1: Eliminar usuarios DEMO existentes
print("\n🗑️  PASO 1: Eliminando usuarios DEMO antiguos...")
print("-" * 80)

dnis_demo = [u['dni'] for u in usuarios_demo]

try:
    response = supabase.table('users').delete().in_('dni', dnis_demo).execute()
    print(f"✅ Usuarios DEMO eliminados de tabla 'users'")
except Exception as e:
    print(f"⚠️  Error al eliminar (puede ser que no existan): {e}")

print("\n" + "=" * 80)

# Paso 2: Crear usuarios en Supabase Auth + tabla users
print("\n✨ PASO 2: Creando usuarios DEMO con Supabase Auth...")
print("-" * 80)

password_hash = generar_password_hash(PASSWORD)
print(f"🔐 Hash generado: {password_hash[:50]}...\n")

creados = 0
errores = 0

for usuario in usuarios_demo:
    try:
        # 1. Crear usuario en Supabase Auth
        auth_response = supabase.auth.admin.create_user({
            "email": usuario['email'],
            "password": PASSWORD,
            "email_confirm": True,  # Auto-confirmar email
            "user_metadata": {
                "dni": usuario['dni'],
                "nombre_completo": usuario['nombre_completo'],
                "role": usuario['role']
            }
        })
        
        user_id = auth_response.user.id
        
        # 2. Crear usuario en tabla users
        user_data = {
            'id': user_id,  # Usar mismo ID de Auth
            'email': usuario['email'],
            'password_hash': password_hash,
            'role': usuario['role'],
            'nombre_completo': usuario['nombre_completo'],
            'dni': usuario['dni'],
            'telefono': usuario['telefono'],
            'activo': True,
            'activado': True,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        
        supabase.table('users').insert(user_data).execute()
        
        print(f"✅ {usuario['role'].upper():12} | {usuario['dni']} | {usuario['email']:35} | CREADO")
        creados += 1
        
    except Exception as e:
        print(f"❌ {usuario['role'].upper():12} | {usuario['dni']} | ERROR: {str(e)}")
        errores += 1

print("\n" + "=" * 80)
print("📊 RESUMEN")
print("=" * 80)
print(f"✅ Creados:        {creados}")
print(f"❌ Errores:        {errores}")
print(f"📋 Total:          {len(usuarios_demo)}")
print("=" * 80)

if creados > 0:
    print("\n🎉 USUARIOS DEMO LISTOS PARA USAR")
    print("\n📝 CREDENCIALES DE ACCESO:")
    print("-" * 80)
    print(f"{'ROL':<15} {'EMAIL':<40} {'DNI':<10} {'PASSWORD'}")
    print("-" * 80)
    for usuario in usuarios_demo:
        print(f"{usuario['role']:<15} {usuario['email']:<40} {usuario['dni']:<10} {PASSWORD}")
    print("-" * 80)
    print("\n💡 TIP: Puedes iniciar sesión con EMAIL o DNI")
    print(f"   Ejemplo 1: {usuarios_demo[0]['email']} / {PASSWORD}")
    print(f"   Ejemplo 2: {usuarios_demo[0]['dni']} / {PASSWORD}")
