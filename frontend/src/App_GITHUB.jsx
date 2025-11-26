import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';

// Páginas (las crearemos después)
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import IncidenciaPage from './pages/IncidenciaPage';
import HistorialPage from './pages/HistorialPage';
import ReportesPage from './pages/ReportesPage';
import ReportesPage from './pages/ReportesPage';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulación de verificación de sesión al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('agenda_ata_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        localStorage.removeItem('agenda_ata_user');
      } finally {
        setIsLoading(false);
      }
    };

    // Simular carga inicial
    setTimeout(checkAuth, 1000);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('agenda_ata_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agenda_ata_user');
    navigate('/login');
  };

  // Componente para rutas protegidas
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
      return (
        <div className="main-container">
          <div className="alert alert-danger">
            <strong>Acceso Denegado:</strong> No tienes permisos para acceder a esta página.
          </div>
        </div>
      );
    }

    return children;
  };

  // Pantalla de carga inicial
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-ata-verde rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">ATA</span>
          </div>
          <Loading message="Cargando Agenda Virtual ATA..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header solo si está logueado */}
      {user && <Header user={user} onLogout={handleLogout} />}

      {/* Contenido principal */}
      <main className="flex-1">
        <Routes>
          {/* Ruta de login */}
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />

          {/* Dashboard - todos los roles autenticados */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage user={user} />
              </ProtectedRoute>
            } 
          />

          {/* Registro de incidencias - docentes, auxiliares, tutores */}
          <Route 
            path="/incidencias/nueva" 
            element={
              <ProtectedRoute allowedRoles={['docente', 'auxiliar', 'tutor']}>
                <IncidenciaPage user={user} />
              </ProtectedRoute>
            } 
          />

          {/* Historial - todos excepto padres */}
          <Route 
            path="/historial" 
            element={
              <ProtectedRoute allowedRoles={['docente', 'auxiliar', 'tutor', 'toe', 'direccion']}>
                <HistorialPage user={user} />
              </ProtectedRoute>
            } 
          />

          {/* Reportes - solo TOE y Dirección */}
          <Route 
            path="/reportes" 
            element={
              <ProtectedRoute allowedRoles={['toe', 'direccion']}>
                <ReportesPage user={user} />
              </ProtectedRoute>
            } 
          />

          {/* Notificaciones para padres */}
          <Route 
            path="/notificaciones" 
            element={
              <ProtectedRoute allowedRoles={['padre']}>
                <div className="main-container">
                  <h1>Notificaciones</h1>
                  <p>Vista de notificaciones para padres - En desarrollo</p>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Historial para padres */}
          <Route 
            path="/historial-hijo" 
            element={
              <ProtectedRoute allowedRoles={['padre']}>
                <div className="main-container">
                  <h1>Historial de mi hijo/a</h1>
                  <p>Vista de historial para padres - En desarrollo</p>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Redirección por defecto */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Página 404 */}
          <Route 
            path="*" 
            element={
              <div className="main-container text-center">
                <h1 className="text-4xl font-bold text-ata-rojo mb-4">404</h1>
                <p className="text-xl mb-6">Página no encontrada</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary"
                >
                  Volver al Inicio
                </button>
              </div>
            } 
          />
        </Routes>
      </main>

      {/* Footer solo si está logueado */}
      {user && <Footer />}
    </div>
  );
}

export default App;