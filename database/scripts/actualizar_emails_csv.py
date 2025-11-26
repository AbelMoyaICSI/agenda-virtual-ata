"""
SCRIPT: ACTUALIZAR EMAILS DESDE CSV (SIN CREAR DUPLICADOS)
===========================================================
Este script SOLO actualiza los emails en la tabla 'users' de Supabase
basándose en los emails REALES que existen en el CSV original.

NO crea usuarios nuevos, NO genera emails ficticios.
Solo actualiza los emails donde:
- El usuario ya existe en Supabase (por DNI)
- El CSV tiene un email real para ese DNI
- El email en Supabase está NULL o es ficticio (@padres.ata.edu.pe)

EJECUCIÓN:
python database/scripts/actualizar_emails_csv.py
"""

import os
import sys
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ ERROR: Faltan credenciales de Supabase en .env")
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

def limpiar_dni(dni):
    """Limpia DNI"""
    if pd.isna(dni):
        return None
    dni_str = str(dni).strip().replace(' ', '')
    if '.' in dni_str:
        dni_str = dni_str.split('.')[0]
    if len(dni_str) == 8 and dni_str.isdigit():
        return dni_str
    return None

def validar_email(email):
    """Valida que sea un email real (no ficticio)"""
    if pd.isna(email):
        return None
    email_str = str(email).strip().lower()
    
    # Rechazar emails vacíos o inválidos
    if not email_str or '@' not in email_str:
        return None
    
    # Rechazar emails ficticios
    if '@padres.ata.edu.pe' in email_str:
        return None
    
    # Aceptar solo si tiene dominio válido
    if '@' in email_str and '.' in email_str.split('@')[1]:
        return email_str
    
    return None

# ============================================================================
# LEER CSV
# ============================================================================

print("\n" + "=" * 80)
print("📧 ACTUALIZACIÓN DE EMAILS DESDE CSV")
print("=" * 80)

print(f"\n📂 Leyendo archivo: {CSV_PATH}")
try:
    df = pd.read_csv(CSV_PATH, encoding='utf-8', sep=',', low_memory=False)
    print(f"   ✅ Archivo leído correctamente: {len(df):,} registros")
except Exception as e:
    print(f"   ❌ Error al leer archivo: {e}")
    sys.exit(1)

# ============================================================================
# PROCESAR EMAILS POR TIPO (PADRE, MADRE, APODERADO)
# ============================================================================

emails_actualizados = 0
emails_omitidos = 0
errores = 0

print("\n🔄 Procesando emails del CSV...")

# Diccionario para almacenar DNI -> Email del CSV
emails_csv = {}

# PASO 1: Extraer todos los emails válidos del CSV
print("\n📋 Extrayendo emails del CSV...")

for idx, row in df.iterrows():
    # === PADRE ===
    # Nota: El CSV tiene problema de encoding (ELECTRÃ"NICO en lugar de ELECTRÓNICO)
    padre_dni = limpiar_dni(row.get('PADRE_NUMERO_DE_DOCUMENTO'))
    
    # Intentar con diferentes variantes del nombre de columna
    padre_email_col = (
        row.get('PADRE_CORREO_ELECTRÓNICO') or 
        row.get('PADRE_CORREO_ELECTRONICO') or
        row.get('PADRE_CORREO_ELECTRÃ"NICO')
    )
    
    if padre_dni and padre_email_col:
        padre_email = validar_email(padre_email_col)
        if padre_email and padre_dni not in emails_csv:
            emails_csv[padre_dni] = padre_email
            print(f"   ✅ Padre DNI {padre_dni}: {padre_email}")
    
    # === MADRE ===
    madre_dni = limpiar_dni(row.get('MADRE_NUMERO_DE_DOCUMENTO'))
    
    madre_email_col = (
        row.get('MADRE_CORREO_ELECTRÓNICO') or
        row.get('MADRE_CORREO_ELECTRONICO')
    )
    
    if madre_dni and madre_email_col:
        madre_email = validar_email(madre_email_col)
        if madre_email and madre_dni not in emails_csv:
            emails_csv[madre_dni] = madre_email
            print(f"   ✅ Madre DNI {madre_dni}: {madre_email}")
    
    # === APODERADO ===
    apod_dni = limpiar_dni(row.get('APODERADO_NUMERO_DE_DOCUMENTO'))
    
    apod_email_col = (
        row.get('APODERADO_CORREO_ELECTRÓNICO') or
        row.get('APODERADO_CORREO_ELECTRONICO') or
        row.get('APODERADO_CORREO_ELECTRÃ"NICO')
    )
    
    if apod_dni and apod_email_col:
        apod_email = validar_email(apod_email_col)
        if apod_email and apod_dni not in emails_csv:
            emails_csv[apod_dni] = apod_email
            print(f"   ✅ Apoderado DNI {apod_dni}: {apod_email}")

print(f"\n📊 Total emails válidos encontrados en CSV: {len(emails_csv)}")

if len(emails_csv) == 0:
    print("\n⚠️  ADVERTENCIA: No se encontraron emails válidos en el CSV")
    print("   Verifica los nombres de las columnas:")
    print(f"   Columnas disponibles: {list(df.columns)}")
    sys.exit(0)

# PASO 2: Actualizar emails en Supabase
print("\n🔄 Actualizando emails en Supabase...")

for dni, email in emails_csv.items():
    try:
        # Buscar usuario por DNI
        response = supabase.table('users').select('id, email').eq('dni', dni).execute()
        
        if not response.data or len(response.data) == 0:
            print(f"   ⚠️  Usuario con DNI {dni} no existe en Supabase (se omite)")
            emails_omitidos += 1
            continue
        
        user_id = response.data[0]['id']
        email_actual = response.data[0].get('email')
        
        # Solo actualizar si:
        # 1. Email actual es NULL
        # 2. Email actual es ficticio (@padres.ata.edu.pe)
        # 3. Email del CSV es diferente al actual
        
        if email_actual and '@padres.ata.edu.pe' not in email_actual and email_actual == email:
            print(f"   ℹ️  DNI {dni}: Email ya es correcto ({email})")
            emails_omitidos += 1
            continue
        
        # Actualizar email
        update_result = supabase.table('users').update({
            'email': email
        }).eq('id', user_id).execute()
        
        if update_result.data:
            emails_actualizados += 1
            print(f"   ✅ DNI {dni}: Email actualizado a {email}")
        else:
            errores += 1
            print(f"   ❌ DNI {dni}: Error al actualizar")
            
    except Exception as e:
        errores += 1
        print(f"   ❌ DNI {dni}: Error - {str(e)[:100]}")

# ============================================================================
# RESUMEN FINAL
# ============================================================================

print("\n" + "=" * 80)
print("📊 RESUMEN DE ACTUALIZACIÓN")
print("=" * 80)
print(f"✅ Emails actualizados:  {emails_actualizados}")
print(f"ℹ️  Emails omitidos:      {emails_omitidos}")
print(f"❌ Errores:              {errores}")
print(f"📋 Total procesados:     {len(emails_csv)}")
print("=" * 80)

if emails_actualizados > 0:
    print("\n✅ Actualización completada exitosamente")
else:
    print("\n⚠️  No se actualizó ningún email. Revisa los nombres de columnas del CSV.")
