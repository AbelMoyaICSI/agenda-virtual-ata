"""
============================================================================
SCRIPT DE CONSULTAS A SUPABASE - AGENDA VIRTUAL ATA
============================================================================
Permite hacer consultas a todas las tablas de Supabase para verificar
la estructura y datos actuales.

Fecha: 25 de noviembre de 2025
Autor: Abel Moya - Sistema Agenda Virtual ATA
============================================================================
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from datetime import datetime

# Cargar variables de entorno
load_dotenv('../.env')
load_dotenv('../../backend/.env')

# Configuración de Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')  # Usamos service_role para consultas completas

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: No se encontraron las credenciales de Supabase en .env")
    exit(1)

# Crear cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("🔍 CONSULTAS A SUPABASE - AGENDA VIRTUAL ATA")
print("=" * 80)
print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"🌐 URL: {SUPABASE_URL}")
print("=" * 80)
print()

# Lista de tablas a consultar
TABLAS = [
    'users',
    'estudiantes',
    'periodos',
    'catalogo_meritos',
    'catalogo_demeritos',
    'incidencias',
    'alertas',
    'citaciones',
    'actas'
]

def contar_registros(tabla):
    """Cuenta los registros de una tabla"""
    try:
        response = supabase.table(tabla).select('*', count='exact').execute()
        return response.count
    except Exception as e:
        return f"Error: {str(e)}"

def obtener_columnas(tabla):
    """Obtiene las columnas de una tabla (obteniendo 1 registro)"""
    try:
        response = supabase.table(tabla).select('*').limit(1).execute()
        if response.data and len(response.data) > 0:
            return list(response.data[0].keys())
        else:
            # Si no hay datos, intentar con la estructura
            return "No hay registros para ver columnas"
    except Exception as e:
        return f"Error: {str(e)}"

def ver_primeros_registros(tabla, limite=5):
    """Muestra los primeros N registros de una tabla"""
    try:
        response = supabase.table(tabla).select('*').limit(limite).execute()
        return response.data
    except Exception as e:
        return f"Error: {str(e)}"

# ============================================================================
# RESUMEN GENERAL
# ============================================================================
print("📊 RESUMEN GENERAL DE TABLAS")
print("-" * 80)
print(f"{'Tabla':<25} {'Registros':<15} {'Estado'}")
print("-" * 80)

resumen = {}
for tabla in TABLAS:
    count = contar_registros(tabla)
    resumen[tabla] = count
    estado = "✅" if isinstance(count, int) and count > 0 else "⚠️" if count == 0 else "❌"
    print(f"{tabla:<25} {str(count):<15} {estado}")

print("-" * 80)
print()

# ============================================================================
# DETALLE DE CADA TABLA
# ============================================================================
print("📋 DETALLE DE CADA TABLA")
print("=" * 80)
print()

for tabla in TABLAS:
    print(f"🗂️  TABLA: {tabla.upper()}")
    print("-" * 80)
    
    # Contar registros
    count = resumen[tabla]
    print(f"📊 Total de registros: {count}")
    
    # Obtener columnas
    columnas = obtener_columnas(tabla)
    if isinstance(columnas, list):
        print(f"📝 Columnas ({len(columnas)}):")
        for i, col in enumerate(columnas, 1):
            print(f"   {i}. {col}")
    else:
        print(f"📝 Columnas: {columnas}")
    
    # Mostrar primeros registros
    if isinstance(count, int) and count > 0:
        print(f"\n📄 Primeros 3 registros:")
        registros = ver_primeros_registros(tabla, 3)
        if isinstance(registros, list):
            for i, registro in enumerate(registros, 1):
                print(f"\n   Registro {i}:")
                for key, value in registro.items():
                    # Acortar valores muy largos
                    value_str = str(value)
                    if len(value_str) > 50:
                        value_str = value_str[:47] + "..."
                    print(f"      • {key}: {value_str}")
        else:
            print(f"   {registros}")
    else:
        print("\n📄 No hay registros para mostrar")
    
    print()
    print("=" * 80)
    print()

# ============================================================================
# CONSULTAS ESPECÍFICAS ÚTILES
# ============================================================================
print("🔍 CONSULTAS ESPECÍFICAS")
print("=" * 80)

# 1. Usuarios por rol
print("\n1️⃣ USUARIOS POR ROL:")
print("-" * 40)
try:
    response = supabase.table('users').select('role').execute()
    if response.data:
        roles = {}
        for user in response.data:
            rol = user.get('role', 'sin_rol')
            roles[rol] = roles.get(rol, 0) + 1
        
        for rol, cantidad in sorted(roles.items()):
            print(f"   • {rol}: {cantidad} usuario(s)")
    else:
        print("   No hay usuarios")
except Exception as e:
    print(f"   Error: {str(e)}")

# 2. Usuarios activados vs no activados
print("\n2️⃣ ESTADO DE ACTIVACIÓN DE USUARIOS:")
print("-" * 40)
try:
    response = supabase.table('users').select('activado').execute()
    if response.data:
        activados = sum(1 for u in response.data if u.get('activado', False))
        no_activados = len(response.data) - activados
        print(f"   • Activados: {activados}")
        print(f"   • No activados: {no_activados}")
    else:
        print("   No hay usuarios")
except Exception as e:
    print(f"   Error: {str(e)}")

# 3. Períodos académicos
print("\n3️⃣ PERÍODOS ACADÉMICOS:")
print("-" * 40)
try:
    response = supabase.table('periodos').select('nombre, fecha_inicio, fecha_fin, activo').execute()
    if response.data:
        for periodo in response.data:
            estado = "✅ Activo" if periodo.get('activo') else "⏸️ Inactivo"
            print(f"   • {periodo['nombre']}: {periodo['fecha_inicio']} → {periodo['fecha_fin']} {estado}")
    else:
        print("   No hay períodos")
except Exception as e:
    print(f"   Error: {str(e)}")

# 4. Méritos y Deméritos por severidad
print("\n4️⃣ DEMÉRITOS POR SEVERIDAD:")
print("-" * 40)
try:
    response = supabase.table('catalogo_demeritos').select('severidad').execute()
    if response.data:
        severidades = {}
        for demerito in response.data:
            sev = demerito.get('severidad', 'sin_severidad')
            severidades[sev] = severidades.get(sev, 0) + 1
        
        for sev, cantidad in sorted(severidades.items()):
            print(f"   • {sev}: {cantidad} demérito(s)")
    else:
        print("   No hay deméritos")
except Exception as e:
    print(f"   Error: {str(e)}")

# 5. Estudiantes por nivel
print("\n5️⃣ ESTUDIANTES POR NIVEL:")
print("-" * 40)
try:
    response = supabase.table('estudiantes').select('nivel').execute()
    if response.data:
        niveles = {}
        for estudiante in response.data:
            nivel = estudiante.get('nivel', 'sin_nivel')
            niveles[nivel] = niveles.get(nivel, 0) + 1
        
        for nivel, cantidad in sorted(niveles.items()):
            print(f"   • {nivel}: {cantidad} estudiante(s)")
    else:
        print("   No hay estudiantes")
except Exception as e:
    print(f"   Error: {str(e)}")

print("\n" + "=" * 80)
print("✅ CONSULTA COMPLETADA")
print("=" * 80)
