import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { supabase } from './config/supabase.js';
import { authMiddleware } from './middleware/auth.js';

// Rutas
import authRoutes from './routes/auth.js';
import estudiantesRoutes from './routes/estudiantes.js';
import incidenciasRoutes from './routes/incidencias.js';
import notificacionesRoutes from './routes/notificaciones.js';
import reportesRoutes from './routes/reportes.js';
import usuariosRoutes from './routes/usuarios.js';

const app = new Hono();

// Middleware global
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://agenda-virtual-ata.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Total-Count'],
  credentials: true,
}));

app.use('*', logger());
app.use('*', prettyJSON());

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Agenda Virtual ATA - Backend API',
    institution: 'I.E. 80002 Antonio Torres Araujo',
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: c.env?.ENVIRONMENT || 'development'
  });
});

app.get('/health', async (c) => {
  try {
    // Test conexión a Supabase
    const { data, error } = await supabase(c.env).from('usuarios').select('id').limit(1);
    
    return c.json({
      status: 'healthy',
      database: error ? 'error' : 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    }, 500);
  }
});

// Rutas públicas
app.route('/auth', authRoutes);

// Rutas protegidas
app.use('/api/*', authMiddleware);
app.route('/api/usuarios', usuariosRoutes);
app.route('/api/estudiantes', estudiantesRoutes);
app.route('/api/incidencias', incidenciasRoutes);
app.route('/api/notificaciones', notificacionesRoutes);
app.route('/api/reportes', reportesRoutes);

// Manejo de errores 404
app.notFound((c) => {
  return c.json({
    error: 'Endpoint no encontrado',
    path: c.req.path,
    method: c.req.method
  }, 404);
});

// Manejo global de errores
app.onError((err, c) => {
  console.error('Error:', err);
  
  return c.json({
    error: 'Error interno del servidor',
    message: c.env?.ENVIRONMENT === 'development' ? err.message : undefined,
    timestamp: new Date().toISOString()
  }, 500);
});

export default app;