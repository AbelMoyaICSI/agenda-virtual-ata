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

// Login
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { usuario, password } = loginSchema.parse(body);
    
    // Buscar usuario
    const { data: user, error } = await supabase(c.env)
      .from('usuarios')
      .select('*')
      .eq('usuario', usuario)
      .eq('activo', true)
      .single();
    
    if (error || !user) {
      return c.json({ error: 'Credenciales inválidas' }, 401);
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
        usuario: user.usuario, 
        rol: user.rol 
      },
      c.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Actualizar último acceso
    await supabase(c.env)
      .from('usuarios')
      .update({ 
        ultimo_acceso: new Date().toISOString(),
        fecha_modificacion: new Date().toISOString()
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