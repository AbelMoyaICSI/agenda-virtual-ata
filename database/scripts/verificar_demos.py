#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para verificar usuarios DEMO en Supabase
"""

from supabase import create_client

# Configuración - USANDO SERVICE_KEY para consultas completas
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI'

def main():
    # Conectar a Supabase
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    print("\n" + "="*70)
    print("🔍 VERIFICACIÓN DE USUARIOS DEMO EN SUPABASE")
    print("="*70 + "\n")
    
    # Buscar usuarios con email .demo@
    try:
        response = supabase.table('users').select('*').like('email', '%.demo@%').execute()
        demos = response.data
        
        print(f"📊 TOTAL USUARIOS DEMO ENCONTRADOS: {len(demos)}\n")
        
        if len(demos) > 0:
            print("✅ USUARIOS DEMO EN LA BASE DE DATOS:\n")
            for i, user in enumerate(demos, 1):
                print(f"  {i}. Email: {user.get('email', 'N/A')}")
                print(f"     Rol: {user.get('role', 'N/A')}")
                print(f"     DNI: {user.get('dni', 'N/A')}")
                print(f"     Activado: {user.get('activado', 'N/A')}")
                print(f"     Tiene password: {'✅' if user.get('password_hash') else '❌'}")
                print()
        else:
            print("⚠️ NO SE ENCONTRARON USUARIOS DEMO EN LA BASE DE DATOS\n")
            print("📝 Usuarios DEMO esperados:")
            print("   - docente.demo@gmail.com")
            print("   - tutor.demo@gmail.com")
            print("   - auxiliar.demo@gmail.com")
            print("   - toe.demo@gmail.com")
            print("   - direccion.demo@gmail.com")
            print("   - padre.demo@gmail.com")
            print("   - admin@ata.edu.pe")
            print("\n💡 Ejecuta: python recrear_usuarios_demo_con_auth.py")
        
        # Verificar usuarios por DNI (00000001-00000007)
        print("\n" + "-"*70)
        print("🔢 VERIFICANDO USUARIOS POR DNI DEMO (00000001-00000007)")
        print("-"*70 + "\n")
        
        dni_demos = []
        for i in range(1, 8):
            dni = f"{i:08d}"
            response = supabase.table('users').select('*').eq('dni', dni).execute()
            if response.data:
                dni_demos.extend(response.data)
        
        if dni_demos:
            print(f"✅ Encontrados {len(dni_demos)} usuarios con DNI DEMO:\n")
            for user in dni_demos:
                print(f"  • DNI: {user.get('dni')} - {user.get('nombre_completo')} ({user.get('role')})")
                print(f"    Email: {user.get('email', 'SIN EMAIL')}")
                print(f"    Activado: {user.get('activado', False)}")
                print()
        else:
            print("⚠️ No se encontraron usuarios con DNI DEMO\n")
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}\n")
    
    print("="*70 + "\n")

if __name__ == '__main__':
    main()
