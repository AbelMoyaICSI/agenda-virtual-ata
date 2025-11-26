import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarUsuario, activarCuenta } from '../services/authService';
import '../styles/globals.css';
import '../styles/components.css';

const ActivarCuentaPage = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1); // 1: verificación, 2: configuración
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Datos del formulario paso 1
  const [dni, setDni] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  
  // Datos del formulario paso 2
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  
  // Datos del usuario verificado
  const [usuarioVerificado, setUsuarioVerificado] = useState(null);

  // Paso 1: Verificar usuario
  const handleVerificar = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const resultado = await verificarUsuario(dni.trim(), nombreCompleto.toUpperCase().trim());
      
      if (resultado.yaActivado) {
        setError('Esta cuenta ya fue activada. Por favor, inicia sesión.');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      if (resultado.existe) {
        setUsuarioVerificado(resultado.user);
        setSuccessMessage('✓ Usuario verificado correctamente');
        setTimeout(() => {
          setPaso(2);
          setSuccessMessage('');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'No estás registrado en el sistema. Solicita al administrador tu registro.');
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: Activar cuenta
  const handleActivar = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validaciones
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      await activarCuenta(
        dni, 
        nombreCompleto.toUpperCase().trim(), 
        password, 
        confirmarPassword,
        email.trim(),
        telefono.trim()
      );
      setSuccessMessage('¡Cuenta activada exitosamente! Redirigiendo al login...');
      
      // Limpiar formularios
      setDni('');
      setNombreCompleto('');
      setPassword('');
      setConfirmarPassword('');
      setEmail('');
      setTelefono('');
      setUsuarioVerificado(null);
      
      // Redirigir al login
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Error al activar la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    setPaso(1);
    setPassword('');
    setConfirmarPassword('');
    setEmail('');
    setTelefono('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img 
            src="/assets/images/logo-ata.png" 
            alt="I.E. Antonio Torres Araujo" 
            className="logo-image"
          />
        </div>

        {/* Título */}
        <h1 className="login-title">Agenda Virtual ATA</h1>
        <p className="login-subtitle">I.E. 80002 Antonio Torres Araujo</p>
        <p className="login-subtitle">Sistema de Gestión de Incidencias</p>

        {/* Indicador de pasos */}
        <div className="steps-indicator" style={{ margin: '20px 0' }}>
          <div className={`step ${paso === 1 ? 'active' : paso > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Verificar Identidad</span>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${paso === 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Configurar Contraseña</span>
          </div>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            {successMessage}
          </div>
        )}

        {/* Paso 1: Verificación */}
        {paso === 1 && (
          <form onSubmit={handleVerificar} className="login-form">
            <h2 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>
              🔍 Verificar tu Identidad
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Ingresa tus datos tal como aparecen en el sistema
            </p>

            <div className="form-group">
              <label htmlFor="dni">DNI (8 dígitos)</label>
              <input
                type="text"
                id="dni"
                className="form-input"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="12345678"
                maxLength="8"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombreCompleto">Nombre Completo (en MAYÚSCULAS)</label>
              <input
                type="text"
                id="nombreCompleto"
                className="form-input"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value.toUpperCase())}
                placeholder="APELLIDO PATERNO APELLIDO MATERNO NOMBRES"
                required
              />
              <small style={{ fontSize: '0.8rem', color: '#666' }}>
                Ejemplo: PEREZ GARCIA JUAN CARLOS
              </small>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || dni.length !== 8 || !nombreCompleto.trim()}
            >
              {loading ? 'Verificando...' : 'Verificar Datos'}
            </button>

            <div className="form-footer">
              <button 
                type="button" 
                className="link-button"
                onClick={() => navigate('/login')}
              >
                ← Volver al inicio de sesión
              </button>
            </div>
          </form>
        )}

        {/* Paso 2: Configuración de contraseña */}
        {paso === 2 && usuarioVerificado && (
          <form onSubmit={handleActivar} className="login-form">
            <h2 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>
              🔒 Configura tu Contraseña
            </h2>
            
            {/* Información del usuario */}
            <div className="user-info-card" style={{ 
              backgroundColor: '#f0f9ff', 
              padding: '15px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                <strong>Nombre:</strong> {usuarioVerificado.nombre_completo}
              </p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                <strong>DNI:</strong> {usuarioVerificado.dni}
              </p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                <strong>Rol:</strong> {usuarioVerificado.role}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico (opcional)</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@ejemplo.com"
                autoFocus
              />
              <small style={{ fontSize: '0.8rem', color: '#666' }}>
                Se usará para recuperación de contraseña y notificaciones
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono/Celular (opcional)</label>
              <input
                type="tel"
                id="telefono"
                className="form-input"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, '').slice(0, 9))}
                placeholder="987654321"
                maxLength="9"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Nueva Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                minLength="6"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmarPassword"
                className="form-input"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="Repite la contraseña"
                minLength="6"
                required
              />
            </div>

            {/* Indicador de fortaleza de contraseña */}
            {password && (
              <div style={{ marginTop: '-10px', marginBottom: '15px' }}>
                <small style={{ 
                  color: password.length >= 8 ? 'green' : password.length >= 6 ? 'orange' : 'red'
                }}>
                  {password.length >= 8 ? '✓ Contraseña fuerte' : 
                   password.length >= 6 ? '⚠ Contraseña aceptable' : 
                   '✗ Contraseña débil'}
                </small>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !password || !confirmarPassword}
            >
              {loading ? 'Activando cuenta...' : 'Activar Cuenta'}
            </button>

            <div className="form-footer">
              <button 
                type="button" 
                className="link-button"
                onClick={handleVolver}
                disabled={loading}
              >
                ← Volver a verificación
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ActivarCuentaPage;
