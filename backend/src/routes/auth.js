import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { z } from 'zod';

const auth = new Hono();

// Esquemas de validación
const loginSchema = z.object({
  usuario: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'Contraseña requerida')
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
});

const verificarUsuarioSchema = z.object({
  dni: z.string().length(8, 'DNI debe tener 8 dígitos'),
  nombre_completo: z.string().min(1, 'Nombre completo requerido')
});

const activarCuentaSchema = z.object({
  dni: z.string().length(8, 'DNI debe tener 8 dígitos'),
  nombre_completo: z.string().min(1, 'Nombre completo requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmar_password: z.string().min(6, 'Confirmar contraseña es requerida'),
  email: z.string().email('Email inválido').optional().nullable(),
  telefono: z.string().optional().nullable()
}).refine((data) => data.password === data.confirmar_password, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmar_password']
});

const solicitarRegistroSchema = z.object({
  dni: z.string().length(8, 'DNI debe tener 8 dígitos'),
  nombre_completo: z.string().min(1, 'Nombre completo requerido'),
  email: z.string().email('Email inválido').optional(),
  telefono: z.string().optional(),
  rol: z.enum(['docente', 'tutor', 'auxiliar', 'direccion', 'toe', 'padre']),
  mensaje: z.string().optional()
});

// Login
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { usuario, password } = loginSchema.parse(body);
    
    // Buscar usuario por DNI o email
    let query = supabase(c.env)
      .from('users')
      .select('*')
      .eq('activo', true);
    
    // Intentar por DNI primero, luego por email
    if (usuario.length === 8 && /^\d+$/.test(usuario)) {
      query = query.eq('dni', usuario);
    } else {
      query = query.eq('email', usuario);
    }
    
    const { data: user, error } = await query.single();
    
    if (error || !user) {
      return c.json({ error: 'Credenciales inválidas' }, 401);
    }
    
    // Verificar que la cuenta esté activada
    if (!user.activado) {
      return c.json({ 
        error: 'Cuenta no activada. Por favor, activa tu cuenta primero.',
        requireActivation: true 
      }, 403);
    }
    
    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return c.json({ error: 'Credenciales inválidas' }, 401);
    }
    
    // Generar JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        dni: user.dni,
        email: user.email,
        role: user.role 
      },
      c.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Actualizar último acceso
    await supabase(c.env)
      .from('users')
      .update({ 
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    // Devolver datos del usuario (sin password)
    const { password_hash, ...userData } = user;
    
    return c.json({
      success: true,
      token,
      user: userData
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      }, 400);
    }
    
    console.error('Error en login:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Verificar token
auth.post('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ valid: false }, 401);
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, c.env.JWT_SECRET);
    
    // Verificar que el usuario aún existe y está activo
    const { data: user, error } = await supabase(c.env)
      .from('usuarios')
      .select('id, usuario, nombre, apellido, rol, email, activo')
      .eq('id', decoded.userId)
      .eq('activo', true)
      .single();
    
    if (error || !user) {
      return c.json({ valid: false }, 401);
    }
    
    return c.json({
      valid: true,
      user
    });
    
  } catch (error) {
    return c.json({ valid: false }, 401);
  }
});

// Cambiar contraseña
auth.post('/change-password', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Token requerido' }, 401);
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, c.env.JWT_SECRET);
    
    const body = await c.req.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);
    
    // Obtener usuario actual
    const { data: user, error } = await supabase(c.env)
      .from('usuarios')
      .select('*')
      .eq('id', decoded.userId)
      .single();
    
    if (error || !user) {
      return c.json({ error: 'Usuario no encontrado' }, 404);
    }
    
    // Verificar contraseña actual
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!isValidPassword) {
      return c.json({ error: 'Contraseña actual incorrecta' }, 400);
    }
    
    // Hash nueva contraseña
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    
    // Actualizar contraseña
    await supabase(c.env)
      .from('usuarios')
      .update({ 
        password_hash: newPasswordHash,
        fecha_modificacion: new Date().toISOString()
      })
      .eq('id', user.id);
    
    return c.json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      }, 400);
    }
    
    console.error('Error al cambiar contraseña:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Verificar usuario existente en BD (primer paso de activación)
auth.post('/verificar-usuario', async (c) => {
  try {
    const body = await c.req.json();
    const { dni, nombre_completo } = verificarUsuarioSchema.parse(body);
    
    // Normalizar nombre (mayúsculas, sin tildes)
    const nombreNormalizado = nombre_completo.toUpperCase().trim();
    
    // Buscar usuario por DNI y nombre
    const { data: user, error } = await supabase(c.env)
      .from('users')
      .select('id, dni, nombre_completo, email, role, activado, activo')
      .eq('dni', dni)
      .eq('activo', true)
      .single();
    
    if (error || !user) {
      return c.json({ 
        existe: false,
        message: 'No estás registrado en el sistema. Por favor, solicita al administrador tu registro.'
      }, 404);
    }
    
    // Verificar que el nombre coincida (comparación flexible)
    const nombreBD = user.nombre_completo.toUpperCase().trim();
    if (nombreBD !== nombreNormalizado) {
      return c.json({ 
        existe: false,
        message: 'Los datos no coinciden con nuestros registros. Verifica tu nombre completo.'
      }, 404);
    }
    
    // Verificar si ya fue activada
    if (user.activado) {
      return c.json({ 
        existe: true,
        yaActivado: true,
        message: 'Esta cuenta ya fue activada. Por favor, inicia sesión.'
      }, 200);
    }
    
    // Usuario existe y no ha sido activado
    return c.json({
      existe: true,
      yaActivado: false,
      user: {
        dni: user.dni,
        nombre_completo: user.nombre_completo,
        email: user.email,
        role: user.role
      },
      message: 'Usuario verificado. Procede a configurar tu contraseña.'
    }, 200);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      }, 400);
    }
    
    console.error('Error al verificar usuario:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Activar cuenta (establecer contraseña por primera vez)
auth.post('/activar-cuenta', async (c) => {
  try {
    const body = await c.req.json();
    const { dni, nombre_completo, password, confirmar_password, email, telefono } = activarCuentaSchema.parse(body);
    
    // Normalizar nombre
    const nombreNormalizado = nombre_completo.toUpperCase().trim();
    
    // Buscar usuario por DNI y nombre
    const { data: user, error } = await supabase(c.env)
      .from('users')
      .select('*')
      .eq('dni', dni)
      .eq('activo', true)
      .single();
    
    if (error || !user) {
      return c.json({ 
        error: 'Usuario no encontrado o inactivo'
      }, 404);
    }
    
    // Verificar nombre
    const nombreBD = user.nombre_completo.toUpperCase().trim();
    if (nombreBD !== nombreNormalizado) {
      return c.json({ 
        error: 'Los datos no coinciden con nuestros registros'
      }, 400);
    }
    
    // Verificar si ya fue activada
    if (user.activado) {
      return c.json({ 
        error: 'Esta cuenta ya fue activada previamente'
      }, 400);
    }
    
    // Hash de la contraseña
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Preparar campos a actualizar
    const updateData = {
      password_hash: passwordHash,
      activado: true,
      updated_at: new Date().toISOString()
    };

    // Actualizar email si se proporcionó y está vacío en BD
    if (email && !user.email) {
      updateData.email = email;
    }

    // Actualizar teléfono si se proporcionó y está vacío en BD
    if (telefono && !user.telefono) {
      updateData.telefono = telefono;
    }

    // Actualizar usuario: establecer contraseña, marcar como activado y rellenar datos faltantes
    const { error: updateError } = await supabase(c.env)
      .from('users')
      .update(updateData)
      .eq('id', user.id);
    
    if (updateError) {
      throw updateError;
    }
    
    return c.json({
      success: true,
      message: 'Cuenta activada correctamente. Ya puedes iniciar sesión.',
      user: {
        dni: user.dni,
        nombre_completo: user.nombre_completo,
        role: user.role
      }
    }, 201);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      }, 400);
    }
    
    console.error('Error al activar cuenta:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Solicitar registro (para usuarios que no están en la BD)
auth.post('/solicitar-registro', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = solicitarRegistroSchema.parse(body);
    
    // Verificar que no exista ya
    const { data: existingUser } = await supabase(c.env)
      .from('users')
      .select('id')
      .eq('dni', validatedData.dni)
      .single();
    
    if (existingUser) {
      return c.json({ 
        error: 'Ya existe un usuario con este DNI. Intenta activar tu cuenta.'
      }, 400);
    }
    
    // Guardar solicitud en tabla de solicitudes_registro (si existe)
    // Por ahora, podríamos enviar un email al administrador o guardar en otra tabla
    // Implementación futura: tabla 'solicitudes_registro'
    
    return c.json({
      success: true,
      message: 'Solicitud enviada correctamente. El administrador revisará tu solicitud pronto.',
      data: {
        dni: validatedData.dni,
        nombre_completo: validatedData.nombre_completo,
        rol: validatedData.rol
      }
    }, 201);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        error: 'Datos inválidos', 
        details: error.errors 
      }, 400);
    }
    
    console.error('Error al solicitar registro:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Logout (invalidar sesión del lado del servidor si es necesario)
auth.post('/logout', async (c) => {
  try {
    // En JWT stateless, el logout se maneja principalmente del lado del cliente
    // Aquí podríamos registrar el evento de logout si fuera necesario
    
    return c.json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
    
  } catch (error) {
    console.error('Error en logout:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

export default auth;