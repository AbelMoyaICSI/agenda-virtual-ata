// ============================================================================
// SERVICIO DE AUTENTICACIÓN - REAL CON SUPABASE
// ============================================================================
// Maneja todo el flujo de autenticación con Supabase Auth
// ============================================================================

import { supabase } from '../config/supabase';

/**
 * Iniciar sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Object} { user, session, error }
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Obtener datos completos del usuario desde la tabla users
    if (data.user) {
      const userData = await getUserData(data.user.id);
      return {
        user: userData,
        session: data.session,
        error: null
      };
    }

    return { user: null, session: null, error: 'Usuario no encontrado' };

  } catch (error) {
    console.error('Error en login:', error);
    return { 
      user: null, 
      session: null, 
      error: error.message || 'Error al iniciar sesión' 
    };
  }
};

/**
 * Obtener datos completos del usuario desde la tabla users
 * @param {string} userId - UUID del usuario
 * @returns {Object} Datos del usuario
 */
export const getUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;

  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};

/**
 * Cerrar sesión
 * @returns {Object} { error }
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Error en logout:', error);
    return { error: error.message };
  }
};

/**
 * Verificar sesión actual
 * @returns {Object} { session, user, error }
 */
export const checkSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;

    if (session?.user) {
      const userData = await getUserData(session.user.id);
      return {
        session,
        user: userData,
        error: null
      };
    }

    return { session: null, user: null, error: null };

  } catch (error) {
    console.error('Error al verificar sesión:', error);
    return { 
      session: null, 
      user: null, 
      error: error.message 
    };
  }
};

/**
 * Cambiar contraseña
 * @param {string} newPassword - Nueva contraseña
 * @returns {Object} { error }
 */
export const changePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    return { error };

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return { error: error.message };
  }
};

/**
 * Solicitar recuperación de contraseña
 * @param {string} email - Email del usuario
 * @returns {Object} { error }
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    return { error };

  } catch (error) {
    console.error('Error al solicitar recuperación:', error);
    return { error: error.message };
  }
};

/**
 * Verificar si un usuario existe en la BD (primer paso de activación)
 * @param {string} dni - DNI del usuario
 * @param {string} nombreCompleto - Nombre completo del usuario
 * @returns {Object} { existe, yaActivado, user, message }
 */
export const verificarUsuario = async (dni, nombreCompleto) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, dni, nombre_completo, email, role, activado, activo')
      .eq('dni', dni.trim())
      .eq('activo', true)
      .single();

    if (error || !data) {
      throw new Error('No estás registrado en el sistema. Solicita al administrador tu registro.');
    }

    // Verificar que el nombre coincida (comparación flexible)
    const nombreBD = data.nombre_completo.toUpperCase().trim();
    const nombreIngresado = nombreCompleto.toUpperCase().trim();
    
    if (nombreBD !== nombreIngresado) {
      throw new Error('Los datos no coinciden con nuestros registros. Verifica tu nombre completo.');
    }

    // Verificar si ya fue activada
    if (data.activado) {
      return {
        existe: true,
        yaActivado: true,
        message: 'Esta cuenta ya fue activada. Por favor, inicia sesión.'
      };
    }

    // Usuario existe y no ha sido activado
    return {
      existe: true,
      yaActivado: false,
      user: {
        dni: data.dni,
        nombre_completo: data.nombre_completo,
        email: data.email,
        role: data.role
      },
      message: 'Usuario verificado. Procede a configurar tu contraseña.'
    };

  } catch (error) {
    console.error('Error al verificar usuario:', error);
    throw error;
  }
};

/**
 * Activar cuenta (establecer contraseña por primera vez)
 * @param {string} dni - DNI del usuario
 * @param {string} nombreCompleto - Nombre completo del usuario
 * @param {string} password - Contraseña nueva
 * @param {string} confirmarPassword - Confirmación de contraseña
 * @param {string} email - Email del usuario (opcional)
 * @param {string} telefono - Teléfono del usuario (opcional)
 * @returns {Object} { success, message, user }
 */
export const activarCuenta = async (dni, nombreCompleto, password, confirmarPassword, email = '', telefono = '') => {
  try {
    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Llamar al endpoint del backend
    const response = await fetch('/api/auth/activar-cuenta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dni.trim(),
        nombre_completo: nombreCompleto.toUpperCase().trim(),
        password,
        confirmar_password: confirmarPassword,
        email: email.trim() || null,
        telefono: telefono.trim() || null
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al activar la cuenta');
    }

    return {
      success: true,
      message: data.message,
      user: data.user
    };

  } catch (error) {
    console.error('Error al activar cuenta:', error);
    throw error;
  }
};

/**
 * Solicitar registro (para usuarios que no están en la BD)
 * @param {Object} datos - { dni, nombre_completo, email, telefono, rol, mensaje }
 * @returns {Object} { success, message }
 */
export const solicitarRegistro = async (datos) => {
  try {
    // Validar DNI
    if (datos.dni.length !== 8) {
      throw new Error('El DNI debe tener 8 dígitos');
    }

    // Llamar al endpoint del backend
    const response = await fetch('/api/auth/solicitar-registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: datos.dni.trim(),
        nombre_completo: datos.nombre_completo.toUpperCase().trim(),
        email: datos.email?.trim() || undefined,
        telefono: datos.telefono?.trim() || undefined,
        rol: datos.rol,
        mensaje: datos.mensaje?.trim() || undefined
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al solicitar registro');
    }

    return {
      success: true,
      message: data.message
    };

  } catch (error) {
    console.error('Error al solicitar registro:', error);
    throw error;
  }
};

export default {
  login,
  logout,
  checkSession,
  getUserData,
  changePassword,
  resetPassword,
  verificarUsuario,
  activarCuenta,
  solicitarRegistro
};
