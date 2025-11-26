"""
SCRIPT DE IMPORTACIÓN DE DATOS A SUPABASE
==========================================
I.E. N° 80002 "Antonio Torres Araujo"
Agenda Digital ATA - MVP (Solo Secundaria)

Este script importa los datos del archivo CSV limpio a la base de datos Supabase.

REQUISITOS:
- Python 3.8+
- pip install supabase pandas python-dotenv

EJECUCIÓN:
python database/scripts/importar_a_supabase.py
"""

import os
import sys
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime
import hashlib

# Cargar variables de entorno
load_dotenv()

# Configuración de Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ ERROR: Faltan credenciales de Supabase en .env")
    print("\n💡 Crea un archivo .env con:")
    print("   SUPABASE_URL=https://tu-proyecto.supabase.co")
    print("   SUPABASE_SERVICE_KEY=tu-clave-servicio")
    sys.exit(1)

# Crear cliente de Supabase
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    print("✅ Conexión a Supabase establecida")
except Exception as e:
    print(f"❌ Error al conectar con Supabase: {e}")
    sys.exit(1)

# Ruta del archivo CSV limpio
CSV_PATH = 'database/data/estudiantes_apoderados_2025_LIMPIO.csv'

# ============================================================================
# FUNCIONES AUXILIARES
# ============================================================================

def generar_email_temporal(nombre_completo, dni):
    """Genera email temporal para usuarios sin correo"""
    # Limpiar nombre: eliminar espacios, tildes, ñ
    nombre_limpio = nombre_completo.lower()
    nombre_limpio = nombre_limpio.replace(' ', '.').replace('ñ', 'n')
    nombre_limpio = nombre_limpio.replace('á', 'a').replace('é', 'e').replace('í', 'i')
    nombre_limpio = nombre_limpio.replace('ó', 'o').replace('ú', 'u')
    # Truncar si es muy largo
    if len(nombre_limpio) > 30:
        nombre_limpio = nombre_limpio[:30]
    return f"{nombre_limpio}.{dni}@padres.ata.edu.pe"

def generar_password_hash(dni):
    """Genera hash de contraseña temporal basada en DNI"""
    # Por ahora usamos SHA256, en producción usar bcrypt
    password_temporal = f"ATA{dni}2025"  # Contraseña: ATAxxxxxxxx2025
    return hashlib.sha256(password_temporal.encode()).hexdigest()

def normalizar_sexo(sexo):
    """Normaliza valores de sexo"""
    if pd.isna(sexo):
        return 'NA'
    sexo = str(sexo).upper().strip()
    if sexo in ['M', 'MASCULINO', 'HOMBRE', 'H']:
        return 'M'
    elif sexo in ['F', 'FEMENINO', 'MUJER']:
        return 'F'
    return 'NA'

def limpiar_telefono(telefono):
    """Limpia número de teléfono"""
    if pd.isna(telefono):
        return None
    tel = str(telefono).strip().replace(' ', '').replace('-', '')
    # Eliminar parte decimal si existe
    if '.' in tel:
        tel = tel.split('.')[0]
    # Validar que tenga 9 dígitos
    if len(tel) == 9 and tel.isdigit():
        return tel
    return None

def limpiar_dni(dni):
    """Limpia DNI"""
    if pd.isna(dni):
        return None
    dni_str = str(dni).strip().replace(' ', '')
    # Eliminar parte decimal si existe (formato Excel: 12345678.0)
    if '.' in dni_str:
        dni_str = dni_str.split('.')[0]
    # Validar que tenga 8 dígitos
    if len(dni_str) == 8 and dni_str.isdigit():
        return dni_str
    return None

def convertir_grado(valor):
    """Convierte grados textuales a formato numérico SIN símbolo ° (1, 2, 3, 4, 5)"""
    if pd.isna(valor):
        return None
    valor = str(valor).strip().upper()
    
    mapeo_grados = {
        'PRIMERO': '1',
        'PRIMER': '1',
        'PRIMERO DE SECUNDARIA': '1',
        'SEGUNDO': '2',
        'SEGUNDO DE SECUNDARIA': '2',
        'TERCERO': '3',
        'TERCER': '3',
        'TERCERO DE SECUNDARIA': '3',
        'CUARTO': '4',
        'CUARTO DE SECUNDARIA': '4',
        'QUINTO': '5',
        'QUINTO DE SECUNDARIA': '5',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5'
    }
    
    return mapeo_grados.get(valor, valor)

# ============================================================================
# LECTURA DE DATOS
# ============================================================================

print("=" * 80)
print("📚 IMPORTACIÓN DE DATOS A SUPABASE - AGENDA DIGITAL ATA")
print("=" * 80)

# Leer CSV limpio
print(f"\n📂 Leyendo archivo: {CSV_PATH}")
try:
    df = pd.read_csv(CSV_PATH, encoding='utf-8', sep=',', low_memory=False)
    print(f"   ✅ Archivo leído correctamente: {len(df):,} registros")
except Exception as e:
    print(f"   ❌ Error al leer archivo: {e}")
    sys.exit(1)

# ============================================================================
# VALIDACIÓN DE COLUMNAS
# ============================================================================

print("\n🔍 Validando estructura del CSV...")
columnas_requeridas = [
    'ESTUDIANTE_NUMERO_DE_DOCUMENTO',
    'ESTUDIANTE_APELLIDO_PATERNO',
    'ESTUDIANTE_APELLIDO_MATERNO',
    'ESTUDIANTE_NOMBRES',
    'ESTUDIANTE_SEXO',
    'ESTUDIANTE_FECHA_DE_NACIMIENTO',
    'ESTUDIANTE_EDAD_AL_31_DE_MARZO',
    'ESTUDIANTE_GRADO',
    'ESTUDIANTE_SECCION',
    'PADRE_NUMERO_DE_DOCUMENTO',
    'PADRE_APELLIDOS_NOMBRES',
    'MADRE_NUMERO_DE_DOCUMENTO',
    'MADRE_APELLIDOS_NOMBRES',
    'APODERADO_NUMERO_DE_DOCUMENTO',
    'APODERADO_APELLIDOS_NOMBRES'
]

columnas_faltantes = [col for col in columnas_requeridas if col not in df.columns]
if columnas_faltantes:
    print(f"   ❌ Columnas faltantes: {columnas_faltantes}")
    sys.exit(1)

print("   ✅ Estructura validada correctamente")

# ============================================================================
# FUNCIÓN AUXILIAR: OBTENER O CREAR USUARIO
# ============================================================================

def obtener_o_crear_usuario(nombre, dni, celular):
    """Crea usuario o devuelve el existente si ya existe (búsqueda por DNI)"""
    
    # Si ya lo procesamos en esta ejecución, retornar el ID guardado
    if dni in usuarios_importados:
        return usuarios_importados[dni]
    
    try:
        # Intentar crear usuario nuevo
        usuario_data = {
            'email': generar_email_temporal(nombre, dni),
            'password_hash': generar_password_hash(dni),
            'role': 'padre',
            'nombre_completo': nombre,
            'dni': dni,
            'telefono': celular,
            'activo': True
        }
        
        resultado = supabase.table('users').insert(usuario_data).execute()
        
        # Verificar que la respuesta tenga datos
        if not resultado.data or len(resultado.data) == 0:
            print(f"   ⚠️  ADVERTENCIA: No se retornó ID para usuario {dni} - {nombre}")
            return None
            
        user_id = resultado.data[0]['id']
        usuarios_importados[dni] = user_id
        print(f"   ✅ Usuario creado: {nombre[:30]} (DNI: {dni}) -> UUID: {user_id[:8]}...")
        return user_id
        
    except Exception as e:
        # Si hay error de duplicado, buscar el usuario existente
        if 'duplicate key' in str(e).lower():
            print(f"   🔍 Usuario duplicado, buscando existente: DNI {dni}")
            try:
                # Buscar por DNI
                response = supabase.table('users').select('id').eq('dni', dni).execute()
                
                if response.data and len(response.data) > 0:
                    user_id = response.data[0]['id']
                    usuarios_importados[dni] = user_id
                    print(f"   ✅ Usuario encontrado: {nombre[:30]} (DNI: {dni}) -> UUID: {user_id[:8]}...")
                    return user_id
                else:
                    # Buscar por email si no encontró por DNI
                    email = generar_email_temporal(nombre, dni)
                    response = supabase.table('users').select('id').eq('email', email).execute()
                    
                    if response.data and len(response.data) > 0:
                        user_id = response.data[0]['id']
                        usuarios_importados[dni] = user_id
                        print(f"   ✅ Usuario encontrado por email: {nombre[:30]} -> UUID: {user_id[:8]}...")
                        return user_id
            except Exception as search_error:
                print(f"   ❌ Error al buscar usuario {dni}: {search_error}")
                return None
        else:
            # Error diferente a duplicado
            print(f"   ❌ Error al crear usuario {dni} ({nombre[:30]}): {str(e)[:100]}")
            return None
    
    return None

# ============================================================================
# IMPORTACIÓN: PASO 1 - USUARIOS (PADRES/MADRES/APODERADOS)
# ============================================================================

print("\n" + "=" * 80)
print("👥 PASO 1: OBTENIENDO/CREANDO USUARIOS (PADRES/MADRES/APODERADOS)")
print("=" * 80)

usuarios_importados = {}  # DNI -> user_id
contador_usuarios = 0
errores_usuarios = 0

for idx, row in df.iterrows():
    # ========================================================================
    # PADRE
    # ========================================================================
    padre_dni = limpiar_dni(row.get('PADRE_NUMERO_DE_DOCUMENTO'))
    
    if padre_dni and padre_dni not in usuarios_importados:
        padre_nombre = str(row['PADRE_APELLIDOS_NOMBRES']).strip().upper() if pd.notna(row.get('PADRE_APELLIDOS_NOMBRES')) else None
        padre_celular = limpiar_telefono(row.get('PADRE_NUMERO_CELULAR'))
        
        if padre_nombre:
            user_id = obtener_o_crear_usuario(padre_nombre, padre_dni, padre_celular)
            if user_id:
                contador_usuarios += 1
                if contador_usuarios % 50 == 0:
                    print(f"   ✅ Procesados {contador_usuarios} usuarios...")
            else:
                errores_usuarios += 1
    
    # ========================================================================
    # MADRE
    # ========================================================================
    madre_dni = limpiar_dni(row.get('MADRE_NUMERO_DE_DOCUMENTO'))
    
    if madre_dni and madre_dni not in usuarios_importados:
        madre_nombre = str(row['MADRE_APELLIDOS_NOMBRES']).strip().upper() if pd.notna(row.get('MADRE_APELLIDOS_NOMBRES')) else None
        madre_celular = limpiar_telefono(row.get('MADRE_NUMERO_CELULAR'))
        
        if madre_nombre:
            user_id = obtener_o_crear_usuario(madre_nombre, madre_dni, madre_celular)
            if user_id:
                contador_usuarios += 1
                if contador_usuarios % 50 == 0:
                    print(f"   ✅ Procesados {contador_usuarios} usuarios...")
            else:
                errores_usuarios += 1
    
    # ========================================================================
    # APODERADO
    # ========================================================================
    apoderado_dni = limpiar_dni(row.get('APODERADO_NUMERO_DE_DOCUMENTO'))
    
    if apoderado_dni and apoderado_dni not in usuarios_importados:
        apoderado_nombre = str(row['APODERADO_APELLIDOS_NOMBRES']).strip().upper() if pd.notna(row.get('APODERADO_APELLIDOS_NOMBRES')) else None
        apoderado_celular = limpiar_telefono(row.get('APODERADO_NUMERO_CELULAR'))
        
        if apoderado_nombre:
            user_id = obtener_o_crear_usuario(apoderado_nombre, apoderado_dni, apoderado_celular)
            if user_id:
                contador_usuarios += 1
                if contador_usuarios % 50 == 0:
                    print(f"   ✅ Procesados {contador_usuarios} usuarios...")
            else:
                errores_usuarios += 1

print(f"\n📊 Total de usuarios obtenidos/creados: {contador_usuarios}")
if errores_usuarios > 0:
    print(f"⚠️  Errores encontrados: {errores_usuarios}")

# ============================================================================
# IMPORTACIÓN: PASO 2 - ESTUDIANTES
# ============================================================================

print("\n" + "=" * 80)
print("🎓 PASO 2: IMPORTANDO ESTUDIANTES")
print("=" * 80)

contador_estudiantes = 0
errores_estudiantes = 0

for idx, row in df.iterrows():
    try:
        # Datos del estudiante
        dni = limpiar_dni(row.get('ESTUDIANTE_NUMERO_DE_DOCUMENTO'))
        
        nombre_completo = f"{row['ESTUDIANTE_APELLIDO_PATERNO']} {row['ESTUDIANTE_APELLIDO_MATERNO']} {row['ESTUDIANTE_NOMBRES']}"
        nombre_completo = nombre_completo.strip().upper()
        
        sexo = normalizar_sexo(row.get('ESTUDIANTE_SEXO'))
        
        fecha_nacimiento = row.get('ESTUDIANTE_FECHA_DE_NACIMIENTO') if pd.notna(row.get('ESTUDIANTE_FECHA_DE_NACIMIENTO')) else None
        
        edad = int(row['ESTUDIANTE_EDAD_AL_31_DE_MARZO']) if pd.notna(row.get('ESTUDIANTE_EDAD_AL_31_DE_MARZO')) else None
        
        grado = convertir_grado(row['ESTUDIANTE_GRADO'])
        seccion = str(row['ESTUDIANTE_SECCION']).strip().upper()
        
        # Relaciones con apoderados
        padre_dni = limpiar_dni(row.get('PADRE_NUMERO_DE_DOCUMENTO'))
        madre_dni = limpiar_dni(row.get('MADRE_NUMERO_DE_DOCUMENTO'))
        apoderado_dni = limpiar_dni(row.get('APODERADO_NUMERO_DE_DOCUMENTO'))
        
        estudiante_data = {
            'nombre_completo': nombre_completo,
            'dni': dni,
            'sexo': sexo,
            'fecha_nacimiento': fecha_nacimiento,
            'edad_al_31_marzo': edad,
            'nivel': 'secundaria',
            'grado': grado,
            'seccion': seccion,
            'padre_id': usuarios_importados.get(padre_dni),
            'madre_id': usuarios_importados.get(madre_dni),
            'apoderado_id': usuarios_importados.get(apoderado_dni),
            'activo': True
        }
        
        supabase.table('estudiantes').insert(estudiante_data).execute()
        contador_estudiantes += 1
        
        if contador_estudiantes % 50 == 0:
            print(f"   ✅ Importados {contador_estudiantes} estudiantes...")
        
    except Exception as e:
        errores_estudiantes += 1
        if errores_estudiantes <= 5:
            print(f"   ⚠️  Error al importar estudiante fila {idx + 1}: {e}")

print(f"\n📊 Total de estudiantes importados: {contador_estudiantes}")
if errores_estudiantes > 0:
    print(f"⚠️  Errores encontrados: {errores_estudiantes}")

# ============================================================================
# RESUMEN FINAL
# ============================================================================

print("\n" + "=" * 80)
print("✅ IMPORTACIÓN COMPLETADA")
print("=" * 80)
print(f"\n📊 RESUMEN:")
print(f"   • Usuarios (padres/madres/apoderados): {contador_usuarios}")
print(f"   • Estudiantes: {contador_estudiantes}")
print(f"   • Errores usuarios: {errores_usuarios}")
print(f"   • Errores estudiantes: {errores_estudiantes}")
print(f"\n🎯 PRÓXIMOS PASOS:")
print(f"   1. Verificar datos en Supabase Dashboard")
print(f"   2. Ejecutar seeds de periodos, méritos y deméritos")
print(f"   3. Configurar políticas RLS")
print(f"   4. Probar acceso desde frontend")
print("\n" + "=" * 80)
