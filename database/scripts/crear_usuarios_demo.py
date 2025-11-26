#!/usr/bin/env python3
"""
Script para crear usuarios DEMO/TEMPORALES en Supabase
Contraseña para todos: Demo2025!
"""

import os
import bcrypt
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime

# Cargar variables de entorno
load_dotenv('../../.env')

# Configurar cliente Supabase
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI'

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Contraseña común para todos los usuarios demo
PASSWORD = "Demo2025!"

# Generar hash de la contraseña (bcrypt con 12 rounds)
def generar_password_hash(password: str) -> str:
    """Genera hash bcrypt de una contraseña"""
    salt = bcrypt.gensalt(rounds=12)
    password_bytes = password.encode('utf-8')
    hash_bytes = bcrypt.hashpw(password_bytes, salt)
    return hash_bytes.decode('utf-8')

# Usuarios DEMO a crear
USUARIOS_DEMO = [
    {
        'email': 'admin@ata.edu.pe',
        'role': 'admin',
        'nombre_completo': 'ADMINISTRADOR SISTEMA',
        'dni': '00000001',
        'telefono': '999000001',
    },
    {
        'email': 'director@ata.edu.pe',
        'role': 'direccion',
        'nombre_completo': 'GARCIA RODRIGUEZ CARLOS ALBERTO',
        'dni': '00000002',
        'telefono': '999000002',
    },
    {
        'email': 'toe@ata.edu.pe',
        'role': 'toe',
        'nombre_completo': 'LOPEZ SILVA MARIA FERNANDA',
        'dni': '00000003',
        'telefono': '999000003',
    },
    {
        'email': 'tutor1a@ata.edu.pe',
        'role': 'tutor',
        'nombre_completo': 'MARTINEZ TORRES JUAN PABLO',
        'dni': '00000004',
        'telefono': '999000004',
    },
    {
        'email': 'auxiliar@ata.edu.pe',
        'role': 'auxiliar',
        'nombre_completo': 'RAMIREZ CASTRO ANA LUCIA',
        'dni': '00000005',
        'telefono': '999000005',
    },
    {
        'email': 'docente.matematica@ata.edu.pe',
        'role': 'docente',
        'nombre_completo': 'FLORES MENDOZA RICARDO JAVIER',
        'dni': '00000006',
        'telefono': '999000006',
    },
    {
        'email': 'docente.comunicacion@ata.edu.pe',
        'role': 'docente',
        'nombre_completo': 'SANCHEZ VEGA PATRICIA ISABEL',
        'dni': '00000007',
        'telefono': '999000007',
    },
    {
        'email': 'padre.demo@gmail.com',
        'role': 'padre',
        'nombre_completo': 'GONZALES PEREZ LUIS ENRIQUE',
        'dni': '00000008',
        'telefono': '999000008',
    },
]

def crear_usuarios_demo():
    """Crea los usuarios DEMO en la base de datos"""
    
    print("=" * 80)
    print("🚀 CREANDO USUARIOS DEMO EN SUPABASE")
    print("=" * 80)
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 URL: {SUPABASE_URL}")
    print(f"🔑 Contraseña común: {PASSWORD}")
    print("=" * 80)
    print()
    
    # Generar hash de contraseña (una sola vez para todos)
    print("🔐 Generando hash de contraseña...")
    password_hash = generar_password_hash(PASSWORD)
    print(f"✅ Hash generado: {password_hash[:50]}...")
    print()
    
    # Crear cada usuario
    creados = 0
    ya_existentes = 0
    errores = 0
    
    for usuario in USUARIOS_DEMO:
        try:
            # Verificar si ya existe
            resultado = supabase.table('users').select('dni').eq('dni', usuario['dni']).execute()
            
            if resultado.data and len(resultado.data) > 0:
                print(f"⏭️  {usuario['role'].upper():12} | {usuario['dni']} | Ya existe")
                ya_existentes += 1
                continue
            
            # Insertar usuario
            data = {
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
            
            supabase.table('users').insert(data).execute()
            print(f"✅ {usuario['role'].upper():12} | {usuario['dni']} | {usuario['email']:30} | CREADO")
            creados += 1
            
        except Exception as e:
            print(f"❌ {usuario['role'].upper():12} | {usuario['dni']} | ERROR: {str(e)}")
            errores += 1
    
    print()
    print("=" * 80)
    print("📊 RESUMEN")
    print("=" * 80)
    print(f"✅ Creados:        {creados}")
    print(f"⏭️  Ya existían:    {ya_existentes}")
    print(f"❌ Errores:        {errores}")
    print(f"📋 Total:          {len(USUARIOS_DEMO)}")
    print("=" * 80)
    print()
    
    if creados > 0 or ya_existentes > 0:
        print("🎉 USUARIOS DEMO LISTOS PARA USAR")
        print()
        print("📝 CREDENCIALES DE ACCESO:")
        print("-" * 80)
        print(f"{'ROL':<15} {'EMAIL':<35} {'DNI':<10} {'PASSWORD'}")
        print("-" * 80)
        for usuario in USUARIOS_DEMO:
            print(f"{usuario['role']:<15} {usuario['email']:<35} {usuario['dni']:<10} {PASSWORD}")
        print("-" * 80)
        print()
        print("💡 TIP: Puedes iniciar sesión con EMAIL o DNI")
        print("   Ejemplo 1: admin@ata.edu.pe / Demo2025!")
        print("   Ejemplo 2: 00000001 / Demo2025!")
        print()

if __name__ == '__main__':
    try:
        crear_usuarios_demo()
    except Exception as e:
        print(f"\n❌ ERROR CRÍTICO: {e}")
        exit(1)
