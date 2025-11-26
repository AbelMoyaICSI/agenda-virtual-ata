import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Usuarios de prueba (en producción vendrían de la API)
  const usuariosPrueba = [
    { usuario: 'docente01', password: '123456', nombre: 'María González', rol: 'docente', aula: '3°A' },
    { usuario: 'auxiliar01', password: '123456', nombre: 'Carlos Ruiz', rol: 'auxiliar', area: 'Ingreso' },
    { usuario: 'tutor01', password: '123456', nombre: 'Ana Pérez', rol: 'tutor', aula: '1°B' },
    { usuario: 'toe01', password: '123456', nombre: 'Luis Morales', rol: 'toe', area: 'TOE' },
    { usuario: 'direccion', password: '123456', nombre: 'Rosa Villareal', rol: 'direccion', cargo: 'Directora' },
    { usuario: 'padre01', password: '123456', nombre: 'Juan Martínez', rol: 'padre', hijo: 'Pedro Martínez' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular llamada a API
    setTimeout(() => {
      const user = usuariosPrueba.find(u => 
        u.usuario === formData.usuario && u.password === formData.password
      );

      if (user) {
        onLogin({
          id: user.usuario,
          nombre: user.nombre,
          rol: user.rol,
          aula: user.aula,
          area: user.area,
          cargo: user.cargo,
          hijo: user.hijo
        });
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ata-verde to-ata-azul p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-ata-verde font-black text-2xl">ATA</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Agenda Virtual
          </h1>
          <p className="text-white opacity-90 text-lg">
            I.E. 80002 Antonio Torres Araujo
          </p>
          <p className="text-white opacity-75 text-sm mt-2">
            Sistema de Gestión de Incidencias Escolares
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label text-ata-negro">
                Usuario
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
                  placeholder="Ingresa tu usuario"
                  required
                  disabled={isLoading}
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

          {/* Usuarios de prueba */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              Usuarios de Prueba:
            </h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Docente:</strong> docente01 / 123456</div>
              <div><strong>Auxiliar:</strong> auxiliar01 / 123456</div>
              <div><strong>Tutor:</strong> tutor01 / 123456</div>
              <div><strong>TOE:</strong> toe01 / 123456</div>
              <div><strong>Dirección:</strong> direccion / 123456</div>
              <div><strong>Padre:</strong> padre01 / 123456</div>
            </div>
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