import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '../services/authService';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { user, error: loginError } = await login(formData.usuario, formData.password);

      if (loginError) {
        setError(loginError);
        setIsLoading(false);
        return;
      }

      if (user) {
        onLogin(user);
      } else {
        setError('Usuario o contraseña incorrectos');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión. Intenta nuevamente.');
      setIsLoading(false);
    }
  };

  const handleActivarCuenta = () => {
    navigate('/activar-cuenta');
  };

  const handleSolicitarRegistro = () => {
    navigate('/solicitar-registro');
  };

  // Pantalla de login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ata-verde to-ata-azul p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo y título */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/assets/images/logo-ata.png" 
              alt="I.E. Antonio Torres Araujo" 
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span 
              className="text-ata-verde font-black text-2xl"
              style={{ display: 'none' }}
            >
              ATA
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Agenda Virtual ATA
          </h1>
          <p className="text-white opacity-90 text-lg">
            I.E. 80002 Antonio Torres Araujo
          </p>
          <p className="text-white opacity-75 text-sm mt-1">
            Sistema de Gestión de Incidencias
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label text-ata-negro">
                DNI o Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="DNI (8 dígitos) o email"
                  required
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="form-label text-ata-negro">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Ingresa tu contraseña"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.usuario || !formData.password}
              className="w-full btn-primary py-3 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">¿Primera vez?</span>
            </div>
          </div>

          {/* Botones adicionales */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleActivarCuenta}
              className="w-full py-3 px-4 border-2 border-ata-verde text-ata-verde rounded-lg hover:bg-green-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <span>🔓</span>
              Activar mi Cuenta
            </button>

            <button
              type="button"
              onClick={handleSolicitarRegistro}
              className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <span>📝</span>
              Solicitar Registro
            </button>
          </div>
        </div>

        {/* Footer del login */}
        <div className="text-center text-white text-sm opacity-75">
          <p>© 2025 I.E. 80002 Antonio Torres Araujo</p>
          <p>Desarrollado por Abel Moya - Prácticas UPAO</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;