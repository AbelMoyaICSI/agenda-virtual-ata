#!/usr/bin/env python3
"""Script rápido para crear incidencia de prueba"""
from supabase import create_client
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv('../.env')
load_dotenv('../../.env')
load_dotenv('../../backend/.env')

SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://jbdjlivrfkrcivkrnuio.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

print('='*70)
print('CREANDO INCIDENCIA DE PRUEBA')
print('='*70)

# 1. Obtener estudiante DEMO
est = supabase.table('estudiantes').select('id, nombre_completo, grado, seccion').ilike('nombre_completo', '%DEMO%').limit(1).execute()
estudiante = est.data[0] if est.data else None

# 2. Obtener periodo activo
per = supabase.table('periodos').select('id, nombre').eq('activo', True).execute()
periodo = per.data[0] if per.data else None

# 3. Obtener docente demo
doc = supabase.table('users').select('id, nombre_completo').eq('dni', '00000006').execute()
docente = doc.data[0] if doc.data else None

# 4. Obtener demerito leve
dem = supabase.table('catalogo_demeritos').select('id, codigo, nombre, severidad').eq('severidad', 'leve').limit(1).execute()
demerito = dem.data[0] if dem.data else None

if estudiante and periodo and docente and demerito:
    print(f"Estudiante: {estudiante['nombre_completo']}")
    print(f"Periodo: {periodo['nombre']}")
    print(f"Docente: {docente['nombre_completo']}")
    print(f"Demerito: [{demerito['codigo']}] {demerito['nombre']}")
    print('-'*70)
    
    # Crear incidencia
    incidencia = {
        'estudiante_id': estudiante['id'],
        'periodo_id': periodo['id'],
        'tipo': 'demerito',
        'catalogo_demerito_id': demerito['id'],
        'codigo': demerito['codigo'],
        'descripcion': 'INCIDENCIA DE PRUEBA - Creada desde terminal para verificar funcionamiento del sistema.',
        'severidad': demerito['severidad'],
        'registrado_por': docente['id'],
        'estado': 'pendiente',
        'fecha': datetime.now().strftime('%Y-%m-%d')
    }
    
    result = supabase.table('incidencias').insert(incidencia).execute()
    
    if result.data:
        print('='*70)
        print('✅ INCIDENCIA CREADA EXITOSAMENTE!')
        print('='*70)
        inc = result.data[0]
        print(f"ID: {inc['id']}")
        print(f"Fecha: {inc['fecha']}")
        print(f"Estado: {inc['estado']}")
        print(f"Tipo: {inc['tipo']}")
        print(f"Severidad: {inc['severidad']}")
        print('='*70)
    else:
        print('❌ Error al crear incidencia')
else:
    print('❌ Faltan datos necesarios:')
    if not estudiante: print('   - No hay estudiante DEMO')
    if not periodo: print('   - No hay periodo activo')
    if not docente: print('   - No hay docente DEMO')
    if not demerito: print('   - No hay demerito en catalogo')
