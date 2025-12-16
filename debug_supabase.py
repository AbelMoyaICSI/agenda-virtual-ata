"""
Script para consultar directamente Supabase y verificar datos reales
"""
import requests
import json

# Credenciales de Supabase (del proyecto)
SUPABASE_URL = 'https://jbdjlivrfkrcivkrnuio.supabase.co'
SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGpsaXZyZmtyY2l2a3JudWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDA5ODgsImV4cCI6MjA3ODcxNjk4OH0.eZnzV0EJgVtYe_evH-xQX5gmT8T6uKI09D3PRUB0fcI'

headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'count=exact'
}

def query_table(table_name, select='*', limit=10):
    """Consulta una tabla y devuelve datos + conteo total"""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select={select}&limit={limit}"
    
    response = requests.get(url, headers=headers)
    
    # El conteo total viene en el header Content-Range
    content_range = response.headers.get('Content-Range', 'N/A')
    
    if response.status_code == 200:
        data = response.json()
        return {
            'status': 'OK',
            'count_header': content_range,
            'returned_rows': len(data),
            'sample_data': data[:3] if data else []
        }
    else:
        return {
            'status': 'ERROR',
            'code': response.status_code,
            'message': response.text
        }

def count_by_role():
    """Cuenta usuarios por rol"""
    url = f"{SUPABASE_URL}/rest/v1/users?select=role"
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        roles = {}
        for user in data:
            role = user.get('role', 'sin_rol')
            roles[role] = roles.get(role, 0) + 1
        return roles
    return {}

def main():
    print("=" * 60)
    print("DIAGNÓSTICO DE SUPABASE - AGENDA VIRTUAL ATA")
    print("=" * 60)
    
    # 1. Tabla USERS
    print("\n📊 TABLA: users")
    print("-" * 40)
    result = query_table('users', 'id,role,activo,nombre_completo,email,created_at')
    print(f"  Status: {result['status']}")
    print(f"  Content-Range: {result.get('count_header', 'N/A')}")
    print(f"  Filas devueltas: {result.get('returned_rows', 0)}")
    if result.get('sample_data'):
        print("  Muestra (3 primeros):")
        for u in result['sample_data']:
            print(f"    - {u.get('nombre_completo', 'N/A')} | Rol: {u.get('role', 'N/A')} | Activo: {u.get('activo', 'N/A')}")
    
    # Conteo por rol
    print("\n  📈 DISTRIBUCIÓN POR ROL:")
    roles = count_by_role()
    for role, count in sorted(roles.items(), key=lambda x: -x[1]):
        print(f"    - {role}: {count}")
    print(f"    TOTAL: {sum(roles.values())}")
    
    # 2. Tabla ESTUDIANTES
    print("\n📊 TABLA: estudiantes")
    print("-" * 40)
    result = query_table('estudiantes', 'id,nombre_completo,activo,grado,seccion')
    print(f"  Status: {result['status']}")
    print(f"  Content-Range: {result.get('count_header', 'N/A')}")
    print(f"  Filas devueltas: {result.get('returned_rows', 0)}")
    if result.get('sample_data'):
        print("  Muestra (3 primeros):")
        for e in result['sample_data']:
            print(f"    - {e.get('nombre_completo', 'N/A')} | Grado: {e.get('grado', 'N/A')} | Activo: {e.get('activo', 'N/A')}")
    
    # 3. Tabla INCIDENCIAS
    print("\n📊 TABLA: incidencias")
    print("-" * 40)
    result = query_table('incidencias', 'id,tipo,descripcion,fecha,created_at')
    print(f"  Status: {result['status']}")
    print(f"  Content-Range: {result.get('count_header', 'N/A')}")
    print(f"  Filas devueltas: {result.get('returned_rows', 0)}")
    if result.get('sample_data'):
        print("  Muestra (3 primeros):")
        for i in result['sample_data']:
            print(f"    - Tipo: {i.get('tipo', 'N/A')} | Fecha: {i.get('fecha', 'N/A')} | {i.get('descripcion', 'N/A')[:50]}...")
    
    # 4. Tabla SOLICITUDES_REGISTRO
    print("\n📊 TABLA: solicitudes_registro")
    print("-" * 40)
    result = query_table('solicitudes_registro', 'id,estado,nombre_completo,email,created_at')
    print(f"  Status: {result['status']}")
    print(f"  Content-Range: {result.get('count_header', 'N/A')}")
    print(f"  Filas devueltas: {result.get('returned_rows', 0)}")
    
    # 5. Lista de todas las tablas disponibles
    print("\n📋 VERIFICANDO OTRAS TABLAS...")
    print("-" * 40)
    
    otras_tablas = ['meritos', 'demeritos', 'tipos_demerito', 'tipos_merito', 'actividad_admin']
    for tabla in otras_tablas:
        result = query_table(tabla)
        status = '✅' if result['status'] == 'OK' else '❌'
        print(f"  {status} {tabla}: {result.get('count_header', result.get('message', 'N/A')[:50])}")
    
    print("\n" + "=" * 60)
    print("FIN DEL DIAGNÓSTICO")
    print("=" * 60)

if __name__ == "__main__":
    main()
