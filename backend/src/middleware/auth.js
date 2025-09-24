import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const authMiddleware = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Token de acceso requerido' }, 401);
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, c.env.JWT_SECRET);
    
    // Verificar que el usuario existe y está activo
    const { data: usuario, error } = await supabase(c.env)
      .from('usuarios')
      .select('*')
      .eq('id', decoded.userId)
      .eq('activo', true)
      .single();
    
    if (error || !usuario) {
      return c.json({ error: 'Token inválido o usuario inactivo' }, 401);
    }
    
    // Agregar usuario al contexto
    c.set('user', usuario);
    
    await next();
  } catch (error) {
    return c.json({ 
      error: 'Token inválido',
      details: c.env?.ENVIRONMENT === 'development' ? error.message : undefined
    }, 401);
  }
};

export const roleMiddleware = (...allowedRoles) => {
  return async (c, next) => {
    const user = c.get('user');
    
    if (!allowedRoles.includes(user.rol)) {
      return c.json({ 
        error: 'Permisos insuficientes',
        required: allowedRoles,
        current: user.rol
      }, 403);
    }
    
    await next();
  };
};