#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para listar TODOS los usuarios de Supabase Auth
"""

from supabase import create_client

# Configuración
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI'

def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    print("\n" + "="*80)
    print("🔐 USUARIOS EN SUPABASE AUTH")
    print("="*80 + "\n")
    
    try:
        # Listar usuarios de Auth (solo service_role puede hacer esto)
        response = supabase.auth.admin.list_users()
        users = response
        
        print(f"📊 Total usuarios en Auth: {len(users)}\n")
        
        # Filtrar usuarios DEMO
        demo_users = [u for u in users if '@ata.edu.pe' in u.email or '.demo@' in u.email]
        
        if demo_users:
            print(f"✅ USUARIOS DEMO ENCONTRADOS ({len(demo_users)}):\n")
            for i, user in enumerate(demo_users, 1):
                print(f"{i}. ID: {user.id}")
                print(f"   Email: {user.email}")
                print(f"   Email confirmed: {user.email_confirmed_at is not None}")
                print(f"   Created: {user.created_at}")
                if hasattr(user, 'user_metadata') and user.user_metadata:
                    print(f"   Metadata: {user.user_metadata}")
                print()
        else:
            print("⚠️ No se encontraron usuarios DEMO en Supabase Auth\n")
            
        # Mostrar primeros 5 usuarios normales
        print("\n" + "-"*80)
        print("📋 PRIMEROS 5 USUARIOS (muestra):\n")
        for i, user in enumerate(users[:5], 1):
            print(f"{i}. {user.email} - ID: {user.id}")
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}\n")
    
    print("="*80 + "\n")

if __name__ == '__main__':
    main()
