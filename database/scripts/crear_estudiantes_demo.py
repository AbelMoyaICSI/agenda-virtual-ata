#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
SCRIPT: CREAR ESTUDIANTES DEMO EN SUPABASE
============================================================================
Crea estudiantes de prueba para que los usuarios DEMO (docente, tutor, etc.)
puedan registrar incidencias de ejemplo.

Los estudiantes DEMO:
- NO tienen cuenta (los estudiantes no hacen login)
- Tienen un padre DEMO asociado para probar la sincronización
- Son fáciles de identificar por el nombre "ESTUDIANTE DEMO"

Cantidad recomendada: 5 estudiantes
- 3 de grados diferentes (1°, 2°, 3°)
- Distribución: 2 hombres, 3 mujeres (o similar)
- Vinculados al padre.demo para probar el portal de padres

Fecha: 26 de noviembre de 2025
============================================================================
"""

import os
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime
import uuid

# Cargar variables de entorno
load_dotenv('../.env')
load_dotenv('../../.env')

# Configuración de Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://jbdjlivrfkrcivkrnuio.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDk4OCwiZXhwIjoyMDc4NzE2OTg4fQ.mGDHYyOnfBS4vAE26KMG4bCU3TXwNA672dXQuQYWynI')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================================
# ESTUDIANTES DEMO A CREAR (5 estudiantes)
# ============================================================================
ESTUDIANTES_DEMO = [
    {
        'nombre_completo': 'ESTUDIANTE DEMO JUAN CARLOS',
        'dni': 'DEMO0001',
        'sexo': 'M',
        'fecha_nacimiento': '2012-05-15',
        'edad_al_31_marzo': 13,
        'nivel': 'secundaria',
        'grado': 1,
        'seccion': 'A',
    },
    {
        'nombre_completo': 'ESTUDIANTE DEMO MARIA FERNANDA',
        'dni': 'DEMO0002',
        'sexo': 'F',
        'fecha_nacimiento': '2011-08-22',
        'edad_al_31_marzo': 14,
        'nivel': 'secundaria',
        'grado': 2,
        'seccion': 'B',
    },
    {
        'nombre_completo': 'ESTUDIANTE DEMO PEDRO ALEJANDRO',
        'dni': 'DEMO0003',
        'sexo': 'M',
        'fecha_nacimiento': '2010-03-10',
        'edad_al_31_marzo': 15,
        'nivel': 'secundaria',
        'grado': 3,
        'seccion': 'A',
    },
    {
        'nombre_completo': 'ESTUDIANTE DEMO ANA LUCIA',
        'dni': 'DEMO0004',
        'sexo': 'F',
        'fecha_nacimiento': '2012-11-05',
        'edad_al_31_marzo': 13,
        'nivel': 'secundaria',
        'grado': 1,
        'seccion': 'B',
    },
    {
        'nombre_completo': 'ESTUDIANTE DEMO CARLOS ALBERTO',
        'dni': 'DEMO0005',
        'sexo': 'M',
        'fecha_nacimiento': '2009-07-18',
        'edad_al_31_marzo': 16,
        'nivel': 'secundaria',
        'grado': 4,
        'seccion': 'A',
    },
]

def verificar_estudiantes_demo():
    """Verifica si ya existen estudiantes DEMO"""
    try:
        response = supabase.table('estudiantes').select('*').ilike('nombre_completo', '%DEMO%').execute()
        return response.data or []
    except Exception as e:
        print(f"❌ Error verificando estudiantes: {e}")
        return []

def obtener_padre_demo():
    """Obtiene el ID del padre DEMO para asociar los estudiantes"""
    try:
        # Buscar padre demo por DNI
        response = supabase.table('users').select('id, nombre_completo').eq('dni', '00000008').execute()
        if response.data:
            return response.data[0]
        
        # Si no existe, buscar por email
        response = supabase.table('users').select('id, nombre_completo').eq('email', 'padre.demo@gmail.com').execute()
        if response.data:
            return response.data[0]
        
        return None
    except Exception as e:
        print(f"❌ Error buscando padre demo: {e}")
        return None

def crear_estudiantes_demo():
    """Crea los estudiantes DEMO en Supabase"""
    
    print("=" * 80)
    print("🎓 CREAR/VERIFICAR ESTUDIANTES DEMO EN SUPABASE")
    print("=" * 80)
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 URL: {SUPABASE_URL}")
    print("=" * 80)
    print()
    
    # Verificar si ya existen
    existentes = verificar_estudiantes_demo()
    if existentes:
        print(f"✅ Ya existen {len(existentes)} estudiantes DEMO:\n")
        for est in existentes:
            print(f"   • {est['nombre_completo']} - {est['grado']}°{est['seccion']}")
        print()
        
        opcion = input("¿Desea eliminarlos y recrearlos? (s/N): ").strip().lower()
        if opcion != 's':
            print("\n⏹️ Operación cancelada. Los estudiantes existentes se mantienen.")
            return existentes
        else:
            # Eliminar existentes
            print("\n🗑️ Eliminando estudiantes DEMO existentes...")
            for est in existentes:
                supabase.table('estudiantes').delete().eq('id', est['id']).execute()
            print("✅ Eliminados.\n")
    
    # Obtener padre demo
    padre_demo = obtener_padre_demo()
    if padre_demo:
        print(f"👨‍👧 Padre DEMO encontrado: {padre_demo['nombre_completo']} (ID: {padre_demo['id'][:8]}...)")
    else:
        print("⚠️ No se encontró padre DEMO. Los estudiantes se crearán sin padre asociado.")
        print("   💡 Ejecuta 'python crear_usuarios_demo.py' primero.\n")
    
    print()
    
    # Crear estudiantes
    creados = 0
    errores = 0
    
    print("📝 Creando estudiantes DEMO:\n")
    
    for est in ESTUDIANTES_DEMO:
        try:
            data = {
                'nombre_completo': est['nombre_completo'],
                'dni': est['dni'],
                'sexo': est['sexo'],
                'fecha_nacimiento': est['fecha_nacimiento'],
                'edad_al_31_marzo': est['edad_al_31_marzo'],
                'nivel': est['nivel'],
                'grado': est['grado'],
                'seccion': est['seccion'],
                'activo': True,
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat(),
            }
            
            # Asociar con padre demo si existe
            if padre_demo:
                data['padre_id'] = padre_demo['id']
                data['apoderado_id'] = padre_demo['id']
            
            result = supabase.table('estudiantes').insert(data).execute()
            
            print(f"   ✅ {est['nombre_completo'][:35]:35} | {est['grado']}°{est['seccion']} | {est['dni']}")
            creados += 1
            
        except Exception as e:
            print(f"   ❌ {est['nombre_completo'][:35]:35} | ERROR: {str(e)[:40]}")
            errores += 1
    
    # Resumen
    print()
    print("=" * 80)
    print("📊 RESUMEN")
    print("=" * 80)
    print(f"   ✅ Creados:  {creados}")
    print(f"   ❌ Errores:  {errores}")
    print(f"   📋 Total:    {len(ESTUDIANTES_DEMO)}")
    print("=" * 80)
    
    if creados > 0:
        print("\n🎉 ¡Estudiantes DEMO creados exitosamente!")
        print("\n📋 Puedes buscarlos escribiendo 'DEMO' en el buscador de estudiantes.")
        if padre_demo:
            print(f"\n👨‍👧 El padre DEMO ({padre_demo['nombre_completo']}) puede ver sus incidencias.")

def main():
    """Función principal"""
    print("\n" + "="*80)
    print("📚 GESTIÓN DE ESTUDIANTES DEMO - AGENDA VIRTUAL ATA")
    print("="*80)
    print("\nOpciones:")
    print("  1. Verificar estudiantes DEMO existentes")
    print("  2. Crear estudiantes DEMO (5 estudiantes)")
    print("  3. Eliminar todos los estudiantes DEMO")
    print("  0. Salir")
    
    opcion = input("\n👉 Seleccione una opción: ").strip()
    
    if opcion == '1':
        existentes = verificar_estudiantes_demo()
        if existentes:
            print(f"\n✅ Existen {len(existentes)} estudiantes DEMO:\n")
            for est in existentes:
                print(f"   • {est['nombre_completo']} - {est['grado']}°{est['seccion']} ({est['dni']})")
        else:
            print("\n⚠️ No hay estudiantes DEMO. Ejecuta opción 2 para crearlos.")
    
    elif opcion == '2':
        crear_estudiantes_demo()
    
    elif opcion == '3':
        existentes = verificar_estudiantes_demo()
        if existentes:
            confirmar = input(f"\n⚠️ ¿Eliminar {len(existentes)} estudiantes DEMO? (s/N): ").strip().lower()
            if confirmar == 's':
                for est in existentes:
                    supabase.table('estudiantes').delete().eq('id', est['id']).execute()
                print(f"✅ Eliminados {len(existentes)} estudiantes DEMO.")
            else:
                print("⏹️ Operación cancelada.")
        else:
            print("\n⚠️ No hay estudiantes DEMO para eliminar.")
    
    elif opcion == '0':
        print("\n👋 ¡Hasta luego!")
    
    else:
        print("\n❌ Opción no válida.")
    
    print()

if __name__ == '__main__':
    main()
