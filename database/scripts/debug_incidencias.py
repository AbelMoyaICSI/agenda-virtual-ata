 """
Script para debuggear el problema de sincronización de incidencias
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

# Configurar cliente Supabase
SUPABASE_URL = "https://jbdjlivrfkrcivkrnuio.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDA5ODgsImV4cCI6MjA3ODcxNjk4OH0.eZnzV0EJgVtYe_evH-xQX5gmT8T6uKI09D3PRUB0fcI"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("🔍 DEBUG - DIAGNÓSTICO COMPLETO DE INCIDENCIAS")
print("=" * 80)

# 1. Ver TODAS las incidencias
print("\n1️⃣ TODAS LAS INCIDENCIAS EN LA BASE DE DATOS:")
print("-" * 80)
try:
    response = supabase.table('incidencias').select('*').execute()
    incidencias = response.data
    
    if incidencias:
        print(f"✅ Total de incidencias encontradas: {len(incidencias)}")
        for inc in incidencias:
            print(f"\n   ID: {inc['id']}")
            print(f"   Fecha: {inc['fecha']}")
            print(f"   Tipo: {inc['tipo']}")
            print(f"   Estado: {inc['estado']}")
            print(f"   Registrado por (UUID): {inc['registrado_por']}")
            print(f"   Estudiante ID: {inc['estudiante_id']}")
    else:
        print("⚠️ No hay incidencias en la base de datos")
except Exception as e:
    print(f"❌ Error al obtener incidencias: {e}")

# 2. Ver TODOS los usuarios
print("\n\n2️⃣ TODOS LOS USUARIOS EN LA TABLA 'users':")
print("-" * 80)
try:
    response = supabase.table('users').select('id, email, nombre_completo, role, activo').execute()
    usuarios = response.data
    
    if usuarios:
        print(f"✅ Total de usuarios encontrados: {len(usuarios)}")
        for user in usuarios:
            print(f"\n   UUID: {user['id']}")
            print(f"   Email: {user['email']}")
            print(f"   Nombre: {user['nombre_completo']}")
            print(f"   Role: {user['role']}")
            print(f"   Activo: {user['activo']}")
    else:
        print("⚠️ No hay usuarios en la tabla 'users'")
except Exception as e:
    print(f"❌ Error al obtener usuarios: {e}")

# 3. Verificar usuario docente.matematica@ata.edu.pe
print("\n\n3️⃣ VERIFICAR USUARIO DOCENTE MATEMÁTICA:")
print("-" * 80)
try:
    response = supabase.table('users').select('*').eq('email', 'docente.matematica@ata.edu.pe').execute()
    docente = response.data
    
    if docente and len(docente) > 0:
        user = docente[0]
        print(f"✅ Usuario encontrado:")
        print(f"   UUID: {user['id']}")
        print(f"   Email: {user['email']}")
        print(f"   Nombre: {user['nombre_completo']}")
        print(f"   DNI: {user.get('dni', 'N/A')}")
        print(f"   Role: {user['role']}")
        print(f"   Activo: {user['activo']}")
        
        # Buscar incidencias de este usuario
        print(f"\n   🔍 Buscando incidencias de este usuario...")
        inc_response = supabase.table('incidencias').select('*').eq('registrado_por', user['id']).execute()
        mis_incidencias = inc_response.data
        
        if mis_incidencias:
            print(f"   ✅ Tiene {len(mis_incidencias)} incidencia(s) registradas:")
            for inc in mis_incidencias:
                print(f"      - Fecha: {inc['fecha']}, Tipo: {inc['tipo']}, Estado: {inc['estado']}")
        else:
            print(f"   ⚠️ Este usuario NO tiene incidencias registradas")
            print(f"\n   💡 POSIBLE PROBLEMA: El registrado_por de las incidencias no coincide con el UUID del usuario")
    else:
        print(f"❌ Usuario docente.matematica@ata.edu.pe NO encontrado en la tabla 'users'")
        print(f"   💡 Debes crear este usuario en Supabase")
except Exception as e:
    print(f"❌ Error: {e}")

# 4. Ver usuarios en Supabase Auth
print("\n\n4️⃣ VERIFICAR USUARIOS EN SUPABASE AUTH:")
print("-" * 80)
print("⚠️ Nota: La API pública no permite listar usuarios de Auth directamente")
print("   Debes revisar en el Dashboard de Supabase > Authentication > Users")

# 5. Verificar incidencias de hoy
print("\n\n5️⃣ INCIDENCIAS DE HOY (2025-11-26):")
print("-" * 80)
hoy = "2025-11-26"
try:
    response = supabase.table('incidencias').select('*').eq('fecha', hoy).execute()
    incidencias_hoy = response.data
    
    if incidencias_hoy:
        print(f"✅ Hay {len(incidencias_hoy)} incidencia(s) para la fecha {hoy}:")
        for inc in incidencias_hoy:
            print(f"\n   ID: {inc['id']}")
            print(f"   Registrado por: {inc['registrado_por']}")
            print(f"   Tipo: {inc['tipo']}")
            print(f"   Estado: {inc['estado']}")
    else:
        print(f"⚠️ No hay incidencias para la fecha {hoy}")
except Exception as e:
    print(f"❌ Error: {e}")

# 6. DIAGNÓSTICO FINAL
print("\n\n" + "=" * 80)
print("📋 DIAGNÓSTICO Y RECOMENDACIONES:")
print("=" * 80)

try:
    response_inc = supabase.table('incidencias').select('*').execute()
    response_users = supabase.table('users').select('*').execute()
    
    total_incidencias = len(response_inc.data) if response_inc.data else 0
    total_usuarios = len(response_users.data) if response_users.data else 0
    
    print(f"\n📊 Resumen:")
    print(f"   - Total incidencias: {total_incidencias}")
    print(f"   - Total usuarios en 'users': {total_usuarios}")
    
    if total_incidencias == 0:
        print(f"\n❌ PROBLEMA: No hay incidencias en la base de datos")
        print(f"   💡 SOLUCIÓN: Debes registrar una incidencia desde el sistema")
    
    if total_usuarios == 0:
        print(f"\n❌ PROBLEMA: No hay usuarios en la tabla 'users'")
        print(f"   💡 SOLUCIÓN: Ejecuta el script de usuarios demo:")
        print(f"      python database/scripts/crear_usuarios_demo.py")
    
    # Verificar coincidencia de IDs
    if total_incidencias > 0 and total_usuarios > 0:
        incidencias = response_inc.data
        usuarios = response_users.data
        
        usuarios_ids = {u['id'] for u in usuarios}
        registradores = {inc['registrado_por'] for inc in incidencias}
        
        registradores_sin_usuario = registradores - usuarios_ids
        
        if registradores_sin_usuario:
            print(f"\n❌ PROBLEMA CRÍTICO: Hay incidencias con registrado_por que no existe en users:")
            for uuid in registradores_sin_usuario:
                print(f"   - UUID huérfano: {uuid}")
            print(f"\n   💡 SOLUCIÓN: Necesitas:")
            print(f"      1. Crear los usuarios faltantes en la tabla 'users'")
            print(f"      2. O actualizar las incidencias con UUIDs válidos")
        else:
            print(f"\n✅ Todos los registrado_por coinciden con usuarios existentes")
    
except Exception as e:
    print(f"❌ Error en diagnóstico: {e}")

print("\n" + "=" * 80)
print("✅ Diagnóstico completado")
print("=" * 80)
