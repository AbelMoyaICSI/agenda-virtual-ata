import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  Calendar,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const HistorialPage = ({ user }) => {
  const [incidencias, setIncidencias] = useState([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    severidad: '',
    aula: '',
    estudiante: '',
    tipo: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIncidencia, setSelectedIncidencia] = useState(null);

  useEffect(() => {
    loadHistorial();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [filters, incidencias]);

  const loadHistorial = async () => {
    setIsLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      const mockIncidencias = [
        {
          id: 1,
          estudiante: 'Juan Pérez Martínez',
          aula: '3°A',
          tipo: 'Tardanza',
          severidad: 'leve',
          descripcion: 'Llegó 10 minutos tarde',
          fecha: '2025-09-24T08:15:00',
          docente: 'María González',
          estado: 'notificado',
          padre_confirmo: true,
          reincidencia: 2
        },
        {
          id: 2,
          estudiante: 'Ana García Torres',
          aula: '2°C',
          tipo: 'Falta de respeto grave',
          severidad: 'grave',
          descripcion: 'Respondió de manera irrespetuosa al docente durante la clase de matemáticas',
          fecha: '2025-09-23T14:30:00',
          docente: 'Carlos López',
          estado: 'derivado_toe',
          padre_confirmo: false,
          reincidencia: 1
        },
        {
          id: 3,
          estudiante: 'Luis Morales Cruz',
          aula: '3°A',
          tipo: 'Uniforme incompleto',
          severidad: 'leve',
          descripcion: 'No portaba corbata',
          fecha: '2025-09-23T07:45:00',
          docente: 'María González',
          estado: 'notificado',
          padre_confirmo: true,
          reincidencia: 1
        },
        {
          id: 4,
          estudiante: 'Carlos Ruiz Sánchez',
          aula: '1°B',
          tipo: 'Bullying',
          severidad: 'muy-grave',
          descripcion: 'Agresión física hacia compañero durante el recreo',
          fecha: '2025-09-22T10:15:00',
          docente: 'Ana Pérez',
          estado: 'derivado_direccion',
          padre_confirmo: true,
          reincidencia: 1
        },
        {
          id: 5,
          estudiante: 'María López García',
          aula: '3°A',
          tipo: 'No porta agenda',
          severidad: 'leve',
          descripcion: 'Tercera vez en la semana',
          fecha: '2025-09-22T08:00:00',
          docente: 'María González',
          estado: 'alerta_reincidencia',
          padre_confirmo: false,
          reincidencia: 3
        }
      ];

      // Filtrar según el rol del usuario
      let filteredData = mockIncidencias;
      
      if (user.rol === 'docente' && user.aula) {
        filteredData = mockIncidencias.filter(inc => 
          inc.aula === user.aula || inc.docente === user.nombre
        );
      } else if (user.rol === 'tutor' && user.aula) {
        filteredData = mockIncidencias.filter(inc => inc.aula === user.aula);
      }

      setIncidencias(filteredData);
      setIsLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...incidencias];

    if (filters.fechaInicio) {
      filtered = filtered.filter(inc => 
        new Date(inc.fecha) >= new Date(filters.fechaInicio)
      );
    }

    if (filters.fechaFin) {
      filtered = filtered.filter(inc => 
        new Date(inc.fecha) <= new Date(filters.fechaFin)
      );
    }

    if (filters.severidad) {
      filtered = filtered.filter(inc => inc.severidad === filters.severidad);
    }

    if (filters.aula) {
      filtered = filtered.filter(inc => 
        inc.aula.toLowerCase().includes(filters.aula.toLowerCase())
      );
    }

    if (filters.estudiante) {
      filtered = filtered.filter(inc => 
        inc.estudiante.toLowerCase().includes(filters.estudiante.toLowerCase())
      );
    }

    if (filters.tipo) {
      filtered = filtered.filter(inc => 
        inc.tipo.toLowerCase().includes(filters.tipo.toLowerCase())
      );
    }

    setFilteredIncidencias(filtered);
  };

  const clearFilters = () => {
    setFilters({
      fechaInicio: '',
      fechaFin: '',
      severidad: '',
      aula: '',
      estudiante: '',
      tipo: ''
    });
  };

  const getSeverityBadge = (severity) => {
    const classes = {
      'leve': 'badge-leve',
      'grave': 'badge-grave',
      'muy-grave': 'badge-muy-grave'
    };
    return classes[severity] || 'badge-leve';
  };

  const getStatusBadge = (estado) => {
    const estados = {
      'notificado': { class: 'badge-completado', text: 'Notificado' },
      'derivado_toe': { class: 'badge-grave', text: 'En TOE' },
      'derivado_direccion': { class: 'badge-muy-grave', text: 'En Dirección' },
      'alerta_reincidencia': { class: 'badge-pendiente', text: 'Alerta' }
    };
    
    const status = estados[estado] || { class: 'badge-leve', text: estado };
    return (
      <span className={`badge ${status.class}`}>
        {status.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportarDatos = () => {
    // Simular exportación
    const dataStr = JSON.stringify(filteredIncidencias, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historial_incidencias_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando historial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ata-negro mb-2">
            Historial de Incidencias
          </h1>
          <p className="text-gray-600">
            {user.rol === 'docente' && `Mis registros${user.aula ? ` - ${user.aula}` : ''}`}
            {user.rol === 'tutor' && `Mi aula - ${user.aula}`}
            {user.rol === 'toe' && 'Casos derivados a TOE'}
            {user.rol === 'direccion' && 'Vista institucional completa'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${showFilters ? 'bg-ata-azul-oscuro' : ''}`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button
            onClick={exportarDatos}
            className="btn-outline"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-ata-negro">Filtros</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-ata-azul hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Fecha inicio</label>
              <input
                type="date"
                value={filters.fechaInicio}
                onChange={(e) => setFilters({...filters, fechaInicio: e.target.value})}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Fecha fin</label>
              <input
                type="date"
                value={filters.fechaFin}
                onChange={(e) => setFilters({...filters, fechaFin: e.target.value})}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Severidad</label>
              <select
                value={filters.severidad}
                onChange={(e) => setFilters({...filters, severidad: e.target.value})}
                className="form-select"
              >
                <option value="">Todas</option>
                <option value="leve">Leve</option>
                <option value="grave">Grave</option>
                <option value="muy-grave">Muy Grave</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Aula</label>
              <input
                type="text"
                value={filters.aula}
                onChange={(e) => setFilters({...filters, aula: e.target.value})}
                className="form-input"
                placeholder="Ej: 3°A"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Estudiante</label>
              <input
                type="text"
                value={filters.estudiante}
                onChange={(e) => setFilters({...filters, estudiante: e.target.value})}
                className="form-input"
                placeholder="Nombre del estudiante"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tipo de incidencia</label>
              <input
                type="text"
                value={filters.tipo}
                onChange={(e) => setFilters({...filters, tipo: e.target.value})}
                className="form-input"
                placeholder="Ej: Tardanza"
              />
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-ata-azul">{filteredIncidencias.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ata-verde">
            {filteredIncidencias.filter(i => i.severidad === 'leve').length}
          </div>
          <div className="text-sm text-gray-600">Leves</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredIncidencias.filter(i => i.severidad === 'grave').length}
          </div>
          <div className="text-sm text-gray-600">Graves</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ata-rojo">
            {filteredIncidencias.filter(i => i.severidad === 'muy-grave').length}
          </div>
          <div className="text-sm text-gray-600">Muy Graves</div>
        </div>
      </div>

      {/* Tabla de incidencias */}
      <div className="card">
        {filteredIncidencias.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Aula</th>
                  <th>Tipo</th>
                  <th>Severidad</th>
                  <th>Fecha/Hora</th>
                  <th>Estado</th>
                  <th>Reincidencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidencias.map((incidencia) => (
                  <tr key={incidencia.id}>
                    <td className="font-medium">{incidencia.estudiante}</td>
                    <td>{incidencia.aula}</td>
                    <td>{incidencia.tipo}</td>
                    <td>
                      <span className={`badge ${getSeverityBadge(incidencia.severidad)}`}>
                        {incidencia.severidad}
                      </span>
                    </td>
                    <td className="text-sm">{formatDate(incidencia.fecha)}</td>
                    <td>{getStatusBadge(incidencia.estado)}</td>
                    <td className="text-center">
                      {incidencia.reincidencia > 1 && (
                        <div className="flex items-center justify-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{incidencia.reincidencia}</span>
                        </div>
                      )}
                      {incidencia.reincidencia === 1 && (
                        <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedIncidencia(incidencia)}
                        className="btn-outline p-2"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              No hay incidencias
            </h3>
            <p className="text-gray-500">
              {Object.values(filters).some(f => f) 
                ? 'No se encontraron incidencias con los filtros aplicados'
                : 'No hay incidencias registradas aún'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedIncidencia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-ata-negro">
                  Detalles de la Incidencia
                </h3>
                <button
                  onClick={() => setSelectedIncidencia(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Estudiante:</label>
                    <p>{selectedIncidencia.estudiante}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Aula:</label>
                    <p>{selectedIncidencia.aula}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Tipo:</label>
                    <p>{selectedIncidencia.tipo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Severidad:</label>
                    <span className={`badge ${getSeverityBadge(selectedIncidencia.severidad)}`}>
                      {selectedIncidencia.severidad}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Docente:</label>
                    <p>{selectedIncidencia.docente}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Fecha/Hora:</label>
                    <p>{formatDate(selectedIncidencia.fecha)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-gray-700">Descripción:</label>
                  <p className="mt-1">{selectedIncidencia.descripcion}</p>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-gray-700">Estado:</label>
                  <div className="mt-1">{getStatusBadge(selectedIncidencia.estado)}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Padre confirmó:</label>
                    <p className="flex items-center gap-2">
                      {selectedIncidencia.padre_confirmo ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Sí
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-500" />
                          No
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Reincidencia:</label>
                    <p className="flex items-center gap-2">
                      {selectedIncidencia.reincidencia > 1 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      {selectedIncidencia.reincidencia}° vez
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedIncidencia(null)}
                  className="btn-primary w-full"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialPage;