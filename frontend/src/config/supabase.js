// ============================================================================
// CONFIGURACIÓN CLIENTE SUPABASE - FRONTEND
// ============================================================================
// Este archivo configura la conexión a Supabase desde el navegador
// SOLO usa la clave ANON (pública) - NUNCA la service_role key
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que existan las variables de entorno
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ ERROR: Faltan credenciales de Supabase.\n' +
    'Verifica que exista el archivo .env con:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  );
}

// Crear cliente Supabase con configuración de autenticación
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,        // Renovar token automáticamente
    persistSession: true,           // Mantener sesión en navegador
    detectSessionInUrl: true,       // Detectar sesión desde URL (para magic links)
    storage: window.localStorage,   // Usar localStorage para sesión (NO para datos)
    storageKey: 'ata-auth-token',  // Clave única para esta app
  },
  db: {
    schema: 'public'                // Esquema de BD
  },
  global: {
    headers: {
      'X-Client-Info': 'agenda-virtual-ata-frontend'
    }
  }
});

// ============================================================================
// FUNCIONES DE AYUDA PARA AUTENTICACIÓN
// ============================================================================

/**
 * Obtener sesión actual
 */
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

/**
 * Obtener usuario actual autenticado
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

/**
 * Escuchar cambios de autenticación
 * @param {Function} callback - Función a ejecutar cuando cambie el estado de auth
 */
export const onAuthStateChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
};

/**
 * Cerrar sesión
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================
export default supabase;
