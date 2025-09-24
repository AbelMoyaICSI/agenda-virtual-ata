import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  AlertCircle
} from 'lucide-react';

const ReportesPage = ({ user }) => {
  const [reportData, setReportData] = useState({
    resumenGeneral: {
      totalIncidencias: 0,
      incidenciasEstesMes: 0,
      estudiantesAfectados: 0,
      reincidenciasActivas: 0,
      casosEnTOE: 0
    },
    porSeveridad: {
      leves: 0,
      graves: 0,
      muyGraves: 0
    },
    porAula: [],
    tendenciaMensual: [],
    topIncidencias: [],
    estudiantesConMasIncidencias: []
  });

  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    aula: '',
    grado: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('general');

  useEffect(() => {
    loadReportData();
  }, [filters]);

  const loadReportData = async () => {
    setIsLoading(true);
    
    // Simular carga de datos de reportes
    setTimeout(() => {
      const mockData = {
        resumenGeneral: {
          totalIncidencias: 245,
          incidenciasEstesMes: 89,
          estudiantesAfectados: 156,
          reincidenciasActivas: 28,
          casosEnTOE: 12
        },
        porSeveridad: {
          leves: 189,
          graves: 45,
          muyGraves: 11
        },
        porAula: [
          { aula: '1°A', total: 15, leves: 12, graves: 3, muyGraves: 0 },
          { aula: '1°B', total: 22, leves: 18, graves: 3, muyGraves: 1 },
          { aula: '2°A', total: 18, leves: 14, graves: 4, muyGraves: 0 },
          { aula: '2°B', total: 28, leves: 20, graves: 6, muyGraves: 2 },
          { aula: '3°A', total: 31, leves: 24, graves: 5, muyGraves: 2 },
          { aula: '3°B', total: 25, leves: 19, graves: 4, muyGraves: 2 }
        ],
        tendenciaMensual: [
          { mes: 'Enero', total: 45, leves: 35, graves: 8, muyGraves: 2 },
          { mes: 'Febrero', total: 52, leves: 41, graves: 9, muyGraves: 2 },
          { mes: 'Marzo', total: 48, leves: 38, graves: 7, muyGraves: 3 },
          { mes: 'Abril', total: 61, leves: 47, graves: 11, muyGraves: 3 },
          { mes: 'Mayo', total: 39, leves: 28, graves: 10, muyGraves: 1 }
        ],
        topIncidencias: [
          { tipo: 'Tardanza', cantidad: 67, porcentaje: 27.3 },
          { tipo: 'Uniforme incompleto', cantidad: 45, porcentaje: 18.4 },
          { tipo: 'No porta agenda', cantidad: 38, porcentaje: 15.5 },
          { tipo: 'Cabello fuera de norma', cantidad: 28, porcentaje: 11.4 },
          { tipo: 'Falta de respeto', cantidad: 22, porcentaje: 9.0 },
          { tipo: 'Interrumpe clase', cantidad: 18, porcentaje: 7.3 }
        ],
        estudiantesConMasIncidencias: [
          { nombre: 'Ana García Torres', aula: '2°C', total: 8, reincidencias: 3 },
          { nombre: 'Carlos Ruiz Sánchez', aula: '1°B', total: 6, reincidencias: 2 },
          { nombre: 'Luis Morales Cruz', aula: '3°A', total: 5, reincidencias: 2 },
          { nombre: 'María Santos López', aula: '3°B', total: 5, reincidencias: 1 },
          { nombre: 'Pedro Méndez Díaz', aula: '2°A', total: 4, reincidencias: 1 }
        ]
      };
      
      setReportData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const exportReport = (format) => {
    // Simular exportación
    const fileName = `reporte_incidencias_${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'pdf') {
      // Simular generación de PDF
      alert(`Generando reporte PDF: ${fileName}`);
    } else if (format === 'excel') {
      // Simular generación de Excel
      alert(`Generando reporte Excel: ${fileName}`);
    }
  };

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando reportes...</p>
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
            Reportes e Indicadores
          </h1>
          <p className="text-gray-600">
            {user.rol === 'toe' ? 'Vista de coordinación TOE' : 'Vista institucional completa'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => exportReport('pdf')}
            className="btn-danger"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="btn-secondary"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-ata-azul" />
          <h3 className="text-lg font-bold text-ata-negro">Filtros de Reporte</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label className="form-label">Grado</label>
            <select
              value={filters.grado}
              onChange={(e) => setFilters({...filters, grado: e.target.value})}
              className="form-select"
            >
              <option value="">Todos</option>
              <option value="1">Primer Grado</option>
              <option value="2">Segundo Grado</option>
              <option value="3">Tercer Grado</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Aula específica</label>
            <input
              type="text"
              value={filters.aula}
              onChange={(e) => setFilters({...filters, aula: e.target.value})}
              className="form-input"
              placeholder="Ej: 3°A"
            />
          </div>
        </div>
      </div>

      {/* Indicadores principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-ata-azul mb-2">
            {reportData.resumenGeneral.totalIncidencias}
          </div>
          <div className="text-sm text-gray-600 mb-1">Total Incidencias</div>
          <div className="flex items-center justify-center text-xs">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-ata-verde mb-2">
            {reportData.resumenGeneral.incidenciasEstesMes}
          </div>
          <div className="text-sm text-gray-600 mb-1">Este Mes</div>
          <div className="flex items-center justify-center text-xs">
            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
            <span className="text-red-500">-8.2%</span>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-ata-dorado mb-2">
            {reportData.resumenGeneral.estudiantesAfectados}
          </div>
          <div className="text-sm text-gray-600 mb-1">Estudiantes</div>
          <div className="text-xs text-gray-500">18.4% del total</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {reportData.resumenGeneral.reincidenciasActivas}
          </div>
          <div className="text-sm text-gray-600 mb-1">Reincidencias</div>
          <div className="flex items-center justify-center text-xs">
            <AlertCircle className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-yellow-600">Requiere atención</span>
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-ata-rojo mb-2">
            {reportData.resumenGeneral.casosEnTOE}
          </div>
          <div className="text-sm text-gray-600 mb-1">Casos en TOE</div>
          <div className="text-xs text-gray-500">Pendientes</div>
        </div>
      </div>

      {/* Navegación de reportes */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { id: 'general', label: 'Resumen General', icon: BarChart3 },
          { id: 'aulas', label: 'Por Aulas', icon: Users },
          { id: 'tendencias', label: 'Tendencias', icon: TrendingUp },
          { id: 'estudiantes', label: 'Estudiantes', icon: FileText }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedReport(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              selectedReport === tab.id
                ? 'bg-ata-verde text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido según pestaña seleccionada */}
      {selectedReport === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución por severidad */}
          <div className="card">
            <h3 className="text-lg font-bold text-ata-negro mb-4">
              Distribución por Severidad
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-ata-verde rounded"></div>
                  Leves
                </span>
                <div className="text-right">
                  <div className="font-bold">{reportData.porSeveridad.leves}</div>
                  <div className="text-sm text-gray-500">
                    {((reportData.porSeveridad.leves / reportData.resumenGeneral.totalIncidencias) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-ata-dorado rounded"></div>
                  Graves
                </span>
                <div className="text-right">
                  <div className="font-bold">{reportData.porSeveridad.graves}</div>
                  <div className="text-sm text-gray-500">
                    {((reportData.porSeveridad.graves / reportData.resumenGeneral.totalIncidencias) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-ata-rojo rounded"></div>
                  Muy Graves
                </span>
                <div className="text-right">
                  <div className="font-bold">{reportData.porSeveridad.muyGraves}</div>
                  <div className="text-sm text-gray-500">
                    {((reportData.porSeveridad.muyGraves / reportData.resumenGeneral.totalIncidencias) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top incidencias */}
          <div className="card">
            <h3 className="text-lg font-bold text-ata-negro mb-4">
              Incidencias Más Frecuentes
            </h3>
            <div className="space-y-3">
              {reportData.topIncidencias.map((incidencia, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{incidencia.tipo}</div>
                    <div className="text-sm text-gray-500">{incidencia.porcentaje}% del total</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-ata-azul">{incidencia.cantidad}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'aulas' && (
        <div className="card">
          <h3 className="text-lg font-bold text-ata-negro mb-4">
            Incidencias por Aula
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Aula</th>
                  <th>Total</th>
                  <th>Leves</th>
                  <th>Graves</th>
                  <th>Muy Graves</th>
                  <th>Promedio por Estudiante</th>
                </tr>
              </thead>
              <tbody>
                {reportData.porAula.map((aula, index) => (
                  <tr key={index}>
                    <td className="font-bold">{aula.aula}</td>
                    <td className="font-bold text-ata-azul">{aula.total}</td>
                    <td>
                      <span className="badge badge-leve">
                        {aula.leves}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-grave">
                        {aula.graves}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-muy-grave">
                        {aula.muyGraves}
                      </span>
                    </td>
                    <td className="text-center">
                      {(aula.total / 35).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedReport === 'tendencias' && (
        <div className="card">
          <h3 className="text-lg font-bold text-ata-negro mb-4">
            Tendencia Mensual de Incidencias
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Total</th>
                  <th>Leves</th>
                  <th>Graves</th>
                  <th>Muy Graves</th>
                  <th>Variación</th>
                </tr>
              </thead>
              <tbody>
                {reportData.tendenciaMensual.map((mes, index) => {
                  const previousMonth = reportData.tendenciaMensual[index - 1];
                  const change = previousMonth ? getPercentageChange(mes.total, previousMonth.total) : 0;
                  
                  return (
                    <tr key={index}>
                      <td className="font-bold">{mes.mes}</td>
                      <td className="font-bold text-ata-azul">{mes.total}</td>
                      <td>{mes.leves}</td>
                      <td>{mes.graves}</td>
                      <td>{mes.muyGraves}</td>
                      <td>
                        {index > 0 && (
                          <div className={`flex items-center gap-1 ${
                            parseFloat(change) > 0 ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {parseFloat(change) > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {Math.abs(change)}%
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedReport === 'estudiantes' && (
        <div className="card">
          <h3 className="text-lg font-bold text-ata-negro mb-4">
            Estudiantes con Más Incidencias
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Aula</th>
                  <th>Total Incidencias</th>
                  <th>Reincidencias</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reportData.estudiantesConMasIncidencias.map((estudiante, index) => (
                  <tr key={index}>
                    <td className="font-medium">{estudiante.nombre}</td>
                    <td>{estudiante.aula}</td>
                    <td className="font-bold text-ata-azul">{estudiante.total}</td>
                    <td className="text-center">
                      {estudiante.reincidencias > 0 && (
                        <div className="flex items-center justify-center gap-1">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{estudiante.reincidencias}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {estudiante.reincidencias >= 3 ? (
                        <span className="badge badge-muy-grave">Requiere atención</span>
                      ) : estudiante.reincidencias > 0 ? (
                        <span className="badge badge-grave">Monitoreando</span>
                      ) : (
                        <span className="badge badge-leve">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportesPage;