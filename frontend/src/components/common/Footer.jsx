import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ata-negro text-white py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Información institucional */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-ata-dorado">
              I.E. 80002 Antonio Torres Araujo
            </h3>
            <p className="text-sm opacity-90 mb-2">
              Institución Educativa Pública
            </p>
            <p className="text-sm opacity-90 mb-2">
              Trujillo, La Libertad, Perú
            </p>
            <p className="text-sm opacity-90">
              Código Modular: 80002
            </p>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-ata-dorado">
              Enlaces Útiles
            </h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm opacity-90 hover:text-ata-dorado transition-colors"
              >
                Portal Institucional
              </a>
              <a 
                href="#" 
                className="block text-sm opacity-90 hover:text-ata-dorado transition-colors"
              >
                Reglamento Interno
              </a>
              <a 
                href="#" 
                className="block text-sm opacity-90 hover:text-ata-dorado transition-colors"
              >
                Manual de Convivencia
              </a>
            </div>
          </div>

          {/* Información del sistema */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-ata-dorado">
              Sistema de Agenda Virtual
            </h3>
            <p className="text-sm opacity-90 mb-2">
              Versión 1.0.0
            </p>
            <p className="text-sm opacity-90 mb-2">
              Gestión de incidencias escolares
            </p>
            <p className="text-sm opacity-90">
              Desarrollado para TOE - ATA
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-75">
              © {currentYear} I.E. 80002 Antonio Torres Araujo. Todos los derechos reservados.
            </p>
            <p className="text-sm opacity-75 mt-2 md:mt-0">
              Desarrollado por Abel Jesús Moya Acosta - Prácticas Preprofesionales UPAO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;