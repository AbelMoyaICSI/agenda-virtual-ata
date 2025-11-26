import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solicitarRegistro } from '../services/authService';
import '../styles/globals.css';
import '../styles/components.css';

const SolicitarRegistroPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    dni: '',
    nombre_completo: '',
    email: '',
    telefono: '',
    rol: 'padre',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'dni') {
      setFormData(prev => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 8)
      }));
    } else if (name === 'nombre_completo') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await solicitarRegistro(formData);
      setSuccess(true);
      
      // Limpiar formulario
      setFormData({
        dni: '',
        nombre_completo: '',
        email: '',
        telefono: '',
        rol: 'padre',
        mensaje: ''
      });

      // Redirigir después de 3 segundos
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img 
              src="/assets/images/logo-ata.png" 
              alt="I.E. Antonio Torres Araujo" 
              className="logo-image"
            />
          </div>

          <div className="alert alert-success" style={{ marginTop: '30px' }}>
            <span className="alert-icon" style={{ fontSize: '3rem' }}>✓</span>
            <h2 style={{ margin: '15px 0' }}>¡Solicitud Enviada!</h2>
            <p style={{ marginBottom: '10px' }}>
              Tu solicitud de registro ha sido enviada correctamente.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              El administrador revisará tu solicitud y te contactará pronto.
            </p>
          </div>

          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/login')}
            style={{ marginTop: '20px' }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

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
        <h1 className="login-title">Solicitar Registro</h1>
        <p className="login-subtitle">I.E. 80002 Antonio Torres Araujo</p>

        <div className="alert alert-info" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span className="alert-icon">ℹ️</span>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>
            Si no estás registrado en el sistema, completa este formulario.
            El administrador revisará tu solicitud.
          </p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="dni">DNI *</label>
            <input
              type="text"
              id="dni"
              name="dni"
              className="form-input"
              value={formData.dni}
              onChange={handleChange}
              placeholder="12345678"
              maxLength="8"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre_completo">Nombre Completo (MAYÚSCULAS) *</label>
            <input
              type="text"
              id="nombre_completo"
              name="nombre_completo"
              className="form-input"
              value={formData.nombre_completo}
              onChange={handleChange}
              placeholder="APELLIDO PATERNO APELLIDO MATERNO NOMBRES"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Tipo de Cuenta *</label>
            <select
              id="rol"
              name="rol"
              className="form-input"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="padre">Padre/Madre/Apoderado</option>
              <option value="docente">Docente</option>
              <option value="tutor">Tutor</option>
              <option value="auxiliar">Auxiliar</option>
              <option value="toe">TOE</option>
              <option value="direccion">Dirección</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico (opcional)</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono/Celular (opcional)</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="form-input"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="999999999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="form-input"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cualquier información adicional que desees compartir..."
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || formData.dni.length !== 8 || !formData.nombre_completo.trim()}
          >
            {loading ? 'Enviando solicitud...' : 'Enviar Solicitud'}
          </button>

          <div className="form-footer">
            <button 
              type="button" 
              className="link-button"
              onClick={() => navigate('/login')}
            >
              ← Volver al inicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitarRegistroPage;
