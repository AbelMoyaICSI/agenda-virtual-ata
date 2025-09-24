import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const getNavLinks = () => {
    if (!user) return [];

    const baseLinks = [
      { path: '/dashboard', label: 'Inicio', roles: ['all'] },
    ];

    switch (user.rol) {
      case 'docente':
      case 'auxiliar':
        return [
          ...baseLinks,
          { path: '/incidencias/nueva', label: 'Registrar Incidencia', roles: ['docente', 'auxiliar'] },
          { path: '/historial', label: 'Mi Historial', roles: ['docente', 'auxiliar'] },
        ];
      
      case 'tutor':
        return [
          ...baseLinks,
          { path: '/incidencias/nueva', label: 'Registrar Incidencia', roles: ['tutor'] },
          { path: '/mi-aula', label: 'Mi Aula', roles: ['tutor'] },
          { path: '/historial', label: 'Historial', roles: ['tutor'] },
        ];
      
      case 'toe':
      case 'direccion':
        return [
          ...baseLinks,
          { path: '/casos', label: 'Casos Derivados', roles: ['toe', 'direccion'] },
          { path: '/reportes', label: 'Reportes', roles: ['toe', 'direccion'] },
          { path: '/historial', label: 'Historial Completo', roles: ['toe', 'direccion'] },
          ...(user.rol === 'direccion' ? [{ path: '/configuracion', label: 'Configuración', roles: ['direccion'] }] : []),
        ];
      
      case 'padre':
        return [
          { path: '/notificaciones', label: 'Notificaciones', roles: ['padre'] },
          { path: '/historial-hijo', label: 'Historial', roles: ['padre'] },
        ];
      
      default:
        return baseLinks;
    }
  };

  const navLinks = getNavLinks();

  const getRoleDisplayName = (role) => {
    const roleNames = {
      'docente': 'Docente',
      'auxiliar': 'Auxiliar',
      'tutor': 'Tutor',
      'toe': 'TOE',
      'direccion': 'Dirección',
      'padre': 'Padre de Familia'
    };
    return roleNames[role] || role;
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo y nombre institucional */}
        <Link to="/dashboard" className="nav-logo">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-ata-verde font-bold text-sm">ATA</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg">Agenda Virtual</div>
            <div className="text-sm opacity-90">I.E. Antonio Torres Araujo</div>
          </div>
        </Link>

        {/* Navegación desktop */}
        <div className="hidden md:flex nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Info del usuario y logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold text-sm">{user.nombre}</div>
                <div className="text-xs opacity-90">{getRoleDisplayName(user.rol)}</div>
              </div>
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            </div>
          )}

          {/* Botón logout */}
          <button
            onClick={onLogout}
            className="btn-outline text-white border-white hover:bg-white hover:text-ata-verde p-2 rounded"
            title="Cerrar Sesión"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline ml-2">Salir</span>
          </button>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ata-verde-oscuro border-t border-white border-opacity-20">
          <div className="px-4 py-2">
            {user && (
              <div className="flex items-center gap-3 py-3 border-b border-white border-opacity-20 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{user.nombre}</div>
                  <div className="text-xs text-white opacity-90">{getRoleDisplayName(user.rol)}</div>
                </div>
              </div>
            )}
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-3 rounded ${isActive(link.path) ? 'bg-ata-verde-oscuro font-bold' : ''} text-white`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;