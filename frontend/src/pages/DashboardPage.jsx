import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Users, 
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const DashboardPage = ({ user }) => {
  const [stats, setStats] = useState({
    incidenciasHoy: 0,
    incidenciasSemana: 0,
    alertasReincidencia: 0,
    casosDerivados: 0,
    estudiantesTotal: 0,
    incidenciasPendientes: 0
  });

  const [recentIncidencias, setRecentIncidencias] = useState([]);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    // Simular carga de datos según el rol
    loadDashboardData();
  }, [user]);

  const loadDashboardData = () => {
    // Datos simulados según el rol
    const mockStats = {
      docente: {
        incidenciasHoy: 3,
        incidenciasSemana: 12,
        alertasReincidencia: 1,
        estudiantesTotal: 35
      },
      tutor: {
        incidenciasHoy: 5,
        incidenciasSemana: 18,
        alertasReincidencia: 3,
        estudiantesTotal: 35,
        casosDerivados: 2
      },
      toe: {
        casosDerivados: 8,
        incidenciasPendientes: 5,
        alertasReincidencia: 12,
        estudiantesTotal: 850
      },
      direccion: {
        incidenciasHoy: 25,
        incidenciasSemana: 89,
        casosDerivados: 8,
        estudiantesTotal: 850,
        alertasReincidencia: 12
      },
      padre: {
        incidenciasHijo: 2,
        notificacionesPendientes: 1
      }
    };

    setStats(mockStats[user.rol] || {});

    // Incidencias recientes simuladas
    setRecentIncidencias([
      {
        id: 1,
        estudiante: 'Juan Pérez',
        tipo: 'Tardanza',
        severidad: 'leve',
        fecha: '2025-09-24T08:15:00',
        aula: '3°A'
      },
      {
        id: 2,
        estudiante: 'María López',
        tipo: 'Uniforme incompleto',
        severidad: 'leve',
        fecha: '2025-09-24T07:45:00',
        aula: '1°B'
      },
      {
        id: 3,
        estudiante: 'Carlos Ruiz',
        tipo: 'Falta de respeto',
        severidad: 'grave',
        fecha: '2025-09-23T14:30:00',
        aula: '2°C'
      }
    ]);

    // Alertas simuladas
    setAlertas([
      {
        id: 1,
        tipo: 'reincidencia',
        mensaje: 'Ana García tiene 3 tardanzas esta semana',
        urgencia: 'media'
      },
      {
        id: 2,
        tipo: 'derivacion',
        mensaje: 'Nuevo caso derivado: Luis Morales - Bullying',
        urgencia: 'alta'
      }
    ]);
  };

  const renderStatsCards = () => {
    const getStatsForRole = () => {
      switch (user.rol) {
        case 'docente':
        case 'auxiliar':
          return [
            { 
              title: 'Incidencias Hoy', 
              value: stats.incidenciasHoy, 
              icon: FileText, 
              color: 'bg-ata-azul' 
            },
            { 
              title: 'Esta Semana', 
              value: stats.incidenciasSemana, 
              icon: Calendar, 
              color: 'bg-ata-verde' 
            },
            { 
              title: 'Alertas Reincidencia', 
              value: stats.alertasReincidencia, 
              icon: AlertTriangle, 
              color: 'bg-yellow-500' 
            },
            { 
              title: 'Total Estudiantes', 
              value: stats.estudiantesTotal, 
              icon: Users, 
              color: 'bg-gray-500' 
            }
          ];

        case 'tutor':
          return [
            { 
              title: 'Incidencias Hoy', 
              value: stats.incidenciasHoy, 
              icon: FileText, 
              color: 'bg-ata-azul' 
            },
            { 
              title: 'Esta Semana', 
              value: stats.incidenciasSemana, 
              icon: Calendar, 
              color: 'bg-ata-verde' 
            },
            { 
              title: 'Casos Derivados', 
              value: stats.casosDerivados, 
              icon: TrendingUp, 
              color: 'bg-ata-rojo' 
            },
            { 
              title: 'Mi Aula', 
              value: stats.estudiantesTotal, 
              icon: Users, 
              color: 'bg-ata-dorado' 
            }
          ];

        case 'toe':
        case 'direccion':
          return [
            { 
              title: 'Casos Pendientes', 
              value: stats.casosDerivados, 
              icon: Clock, 
              color: 'bg-ata-rojo' 
            },
            { 
              title: 'Alertas Reincidencia', 
              value: stats.alertasReincidencia, 
              icon: AlertTriangle, 
              color: 'bg-yellow-500' 
            },
            { 
              title: 'Total Estudiantes', 
              value: stats.estudiantesTotal, 
              icon: Users, 
              color: 'bg-ata-verde' 
            },
            { 
              title: 'Incidencias Semana', 
              value: stats.incidenciasSemana || 89, 
              icon: TrendingUp, 
              color: 'bg-ata-azul' 
            }
          ];

        case 'padre':
          return [
            { 
              title: 'Incidencias de mi hijo/a', 
              value: stats.incidenciasHijo, 
              icon: FileText, 
              color: 'bg-ata-azul' 
            },
            { 
              title: 'Notificaciones Pendientes', 
              value: stats.notificacionesPendientes, 
              icon: AlertCircle, 
              color: 'bg-yellow-500' 
            }
          ];

        default:
          return [];
      }
    };

    return getStatsForRole().map((stat, index) => (
      <div key={index} className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-ata-negro">{stat.value}</p>
          </div>
          <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
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

  return (
    <div className="main-container">
      {/* Bienvenida */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ata-negro mb-2">
          ¡Bienvenido/a, {user.nombre}!
        </h1>
        <p className="text-gray-600">
          {user.rol === 'docente' && `Docente${user.aula ? ` - ${user.aula}` : ''}`}
          {user.rol === 'auxiliar' && `Auxiliar${user.area ? ` - ${user.area}` : ''}`}
          {user.rol === 'tutor' && `Tutor${user.aula ? ` - ${user.aula}` : ''}`}
          {user.rol === 'toe' && 'Coordinador TOE'}
          {user.rol === 'direccion' && user.cargo}
          {user.rol === 'padre' && `Padre de familia${user.hijo ? ` - ${user.hijo}` : ''}`}
        </p>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {renderStatsCards()}
      </div>

      {/* Alertas importantes */}
      {alertas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-ata-negro mb-4">Alertas Importantes</h2>
          <div className="space-y-3">
            {alertas.map((alerta) => (
              <div 
                key={alerta.id} 
                className={`alert ${alerta.urgencia === 'alta' ? 'alert-danger' : 'alert-warning'}`}
              >
                <AlertTriangle className="w-5 h-5" />
                {alerta.mensaje}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incidencias recientes */}
      {recentIncidencias.length > 0 && user.rol !== 'padre' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ata-negro">Incidencias Recientes</h2>
            <button className="btn-outline text-sm">
              Ver todas
            </button>
          </div>
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Tipo</th>
                    <th>Severidad</th>
                    <th>Fecha/Hora</th>
                    <th>Aula</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncidencias.map((incidencia) => (
                    <tr key={incidencia.id}>
                      <td className="font-medium">{incidencia.estudiante}</td>
                      <td>{incidencia.tipo}</td>
                      <td>
                        <span className={`badge ${getSeverityBadge(incidencia.severidad)}`}>
                          {incidencia.severidad}
                        </span>
                      </td>
                      <td className="text-sm">{formatDate(incidencia.fecha)}</td>
                      <td>{incidencia.aula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-ata-negro mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(user.rol === 'docente' || user.rol === 'auxiliar' || user.rol === 'tutor') && (
            <button className="card hover:shadow-lg transition-all text-left p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ata-verde rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-ata-negro">Nueva Incidencia</h3>
                  <p className="text-sm text-gray-600">Registrar nueva incidencia</p>
                </div>
              </div>
            </button>
          )}
          
          <button className="card hover:shadow-lg transition-all text-left p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ata-azul rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-ata-negro">Ver Historial</h3>
                <p className="text-sm text-gray-600">Consultar incidencias anteriores</p>
              </div>
            </div>
          </button>

          {(user.rol === 'toe' || user.rol === 'direccion') && (
            <button className="card hover:shadow-lg transition-all text-left p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ata-rojo rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-ata-negro">Generar Reportes</h3>
                  <p className="text-sm text-gray-600">Crear reportes institucionales</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;