import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Clock,
  User,
  FileText,
  CheckCircle,
  X
} from 'lucide-react';

const IncidenciaPage = ({ user }) => {
  const [step, setStep] = useState(1); // 1: Buscar estudiante, 2: Seleccionar incidencia, 3: Confirmar
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [incidenciaData, setIncidenciaData] = useState({
    tipo: '',
    severidad: '',
    descripcion: '',
    evidencia: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Datos simulados de estudiantes
  const estudiantes = [
    { id: 1, nombre: 'Juan Pérez Martínez', aula: '3°A', dni: '12345678', reincidencias: 2 },
    { id: 2, nombre: 'María López García', aula: '3°A', dni: '87654321', reincidencias: 0 },
    { id: 3, nombre: 'Carlos Ruiz Sánchez', aula: '1°B', dni: '11223344', reincidencias: 1 },
    { id: 4, nombre: 'Ana García Torres', aula: '2°C', dni: '44332211', reincidencias: 3 },
    { id: 5, nombre: 'Luis Morales Cruz', aula: '3°A', dni: '55667788', reincidencias: 0 }
  ];

  // Catálogo de incidencias leves (checklist rápido)
  const incidenciasLeves = [
    { codigo: 'A', tipo: 'Tardanza', descripcion: 'Llega tarde a la I.E./aula' },
    { codigo: 'N', tipo: 'No porta agenda', descripcion: 'No porta la agenda/diario' },
    { codigo: 'T', tipo: 'Uniforme incompleto', descripcion: 'Uniforme incompleto o prendas ajenas' },
    { codigo: 'W', tipo: 'Cabello fuera de norma', descripcion: 'Cabello fuera de norma institucional' },
    { codigo: 'V', tipo: 'Falta de higiene', descripcion: 'Falta de higiene personal' },
    { codigo: 'F', tipo: 'No cumple tareas', descripcion: 'No cumple tareas educativas' },
    { codigo: 'G', tipo: 'Interrumpe clase', descripcion: 'Interrumpe al maestro en sesiones' },
    { codigo: 'P', tipo: 'Incumple normas del aula', descripcion: 'Incumple normas de convivencia' }
  ];

  // Tipos de incidencias graves
  const incidenciasGraves = [
    'Falta de respeto grave a autoridad',
    'Bullying o ciberbullying',
    'Daño a infraestructura/mobiliario',
    'Fraude en evaluaciones',
    'Agresión física o psicológica',
    'Amenazas o intimidación',
    'Consumo de sustancias prohibidas',
    'Otro (especificar en descripción)'
  ];

  const filteredStudents = estudiantes.filter(student =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.dni.includes(searchTerm) ||
    student.aula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStep(2);
  };

  const handleIncidenciaSelect = (tipo, severidad) => {
    setIncidenciaData({
      ...incidenciaData,
      tipo,
      severidad
    });
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envío a API
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Reset después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        setSelectedStudent(null);
        setSearchTerm('');
        setIncidenciaData({
          tipo: '',
          severidad: '',
          descripcion: '',
          evidencia: null
        });
      }, 3000);
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedStudent(null);
    setSearchTerm('');
    setIncidenciaData({
      tipo: '',
      severidad: '',
      descripcion: '',
      evidencia: null
    });
  };

  // Pantalla de éxito
  if (showSuccess) {
    return (
      <div className="main-container">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-ata-verde rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ata-negro mb-4">
            ¡Incidencia Registrada!
          </h1>
          <p className="text-gray-600 mb-6">
            La incidencia ha sido registrada exitosamente y se ha notificado automáticamente al padre/madre de {selectedStudent?.nombre}.
          </p>
          <div className="alert alert-success">
            <CheckCircle className="w-5 h-5" />
            El sistema aplicará las reglas de reincidencia automáticamente.
          </div>
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
            Registrar Nueva Incidencia
          </h1>
          <p className="text-gray-600">
            Docente: {user.nombre} {user.aula && `- ${user.aula}`}
          </p>
        </div>
        
        {step > 1 && (
          <button
            onClick={handleReset}
            className="btn-outline"
          >
            <X className="w-4 h-4" />
            Reiniciar
          </button>
        )}
      </div>

      {/* Indicador de progreso */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-ata-verde text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-ata-verde' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-ata-verde text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-ata-verde' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-ata-verde text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
      </div>

      {/* Step 1: Buscar estudiante */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold text-ata-negro mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Paso 1: Seleccionar Estudiante
            </h2>
            
            <div className="mb-6">
              <label className="form-label">Buscar por nombre, DNI o aula</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Ej: Juan Pérez, 12345678, 3°A"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-ata-azul transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-ata-negro">{student.nombre}</h3>
                        <p className="text-sm text-gray-600">
                          DNI: {student.dni} • Aula: {student.aula}
                        </p>
                      </div>
                      {student.reincidencias > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-600">
                            {student.reincidencias} reincidencias
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  {searchTerm ? 'No se encontraron estudiantes' : 'Ingresa un término de búsqueda'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Seleccionar tipo de incidencia */}
      {step === 2 && selectedStudent && (
        <div className="max-w-4xl mx-auto">
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-ata-negro">{selectedStudent.nombre}</h3>
                <p className="text-gray-600">DNI: {selectedStudent.dni} • Aula: {selectedStudent.aula}</p>
              </div>
              {selectedStudent.reincidencias > 0 && (
                <div className="alert alert-warning inline-flex">
                  <AlertTriangle className="w-4 h-4" />
                  {selectedStudent.reincidencias} reincidencias previas
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Incidencias Leves - Checklist rápido */}
            <div className="card">
              <h2 className="text-xl font-bold text-ata-verde mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Incidencias Leves (Checklist)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Selecciona una incidencia del catálogo institucional
              </p>
              
              <div className="space-y-2">
                {incidenciasLeves.map((incidencia) => (
                  <button
                    key={incidencia.codigo}
                    onClick={() => handleIncidenciaSelect(incidencia.tipo, 'leve')}
                    className="w-full text-left p-3 border rounded-lg hover:border-ata-verde hover:bg-green-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-ata-verde text-white rounded text-sm flex items-center justify-center font-bold">
                        {incidencia.codigo}
                      </span>
                      <div>
                        <h4 className="font-bold text-ata-negro">{incidencia.tipo}</h4>
                        <p className="text-xs text-gray-600">{incidencia.descripcion}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Incidencias Graves */}
            <div className="card">
              <h2 className="text-xl font-bold text-ata-rojo mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Incidencias Graves
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Requieren descripción detallada y derivación a TOE
              </p>
              
              <div className="space-y-2">
                {incidenciasGraves.map((incidencia, index) => (
                  <button
                    key={index}
                    onClick={() => handleIncidenciaSelect(incidencia, 'grave')}
                    className="w-full text-left p-3 border rounded-lg hover:border-ata-rojo hover:bg-red-50 transition-all"
                  >
                    <h4 className="font-bold text-ata-negro">{incidencia}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmar y detalles */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold text-ata-negro mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Paso 3: Confirmar Registro
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Resumen */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-ata-negro mb-2">Resumen de la Incidencia</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Estudiante:</strong> {selectedStudent.nombre}</p>
                  <p><strong>Aula:</strong> {selectedStudent.aula}</p>
                  <p><strong>Tipo:</strong> {incidenciaData.tipo}</p>
                  <p><strong>Severidad:</strong> 
                    <span className={`ml-2 badge ${incidenciaData.severidad === 'leve' ? 'badge-leve' : 'badge-grave'}`}>
                      {incidenciaData.severidad}
                    </span>
                  </p>
                  <p><strong>Fecha/Hora:</strong> {new Date().toLocaleString('es-PE')}</p>
                </div>
              </div>

              {/* Descripción adicional */}
              {incidenciaData.severidad === 'grave' && (
                <div className="form-group">
                  <label className="form-label">Descripción detallada *</label>
                  <textarea
                    value={incidenciaData.descripcion}
                    onChange={(e) => setIncidenciaData({...incidenciaData, descripcion: e.target.value})}
                    className="form-input"
                    rows="4"
                    placeholder="Describe detalladamente lo ocurrido, contexto, consecuencias, etc."
                    required={incidenciaData.severidad === 'grave'}
                  />
                </div>
              )}

              {incidenciaData.severidad === 'leve' && (
                <div className="form-group">
                  <label className="form-label">Observaciones adicionales (opcional)</label>
                  <textarea
                    value={incidenciaData.descripcion}
                    onChange={(e) => setIncidenciaData({...incidenciaData, descripcion: e.target.value})}
                    className="form-input"
                    rows="3"
                    placeholder="Agrega cualquier observación adicional..."
                  />
                </div>
              )}

              {/* Información sobre consecuencias automáticas */}
              <div className="alert alert-info mb-6">
                <Clock className="w-5 h-5" />
                <div>
                  <strong>El sistema aplicará automáticamente:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Notificación inmediata al padre/madre</li>
                    {incidenciaData.severidad === 'leve' && (
                      <li>• Seguimiento de reincidencias (alerta a las 3, citación a las 5)</li>
                    )}
                    {incidenciaData.severidad === 'grave' && (
                      <li>• Derivación automática a TOE para citación</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline flex-1"
                  disabled={isLoading}
                >
                  Regresar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={isLoading || (incidenciaData.severidad === 'grave' && !incidenciaData.descripcion.trim())}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Registrando...
                    </div>
                  ) : (
                    'Registrar Incidencia'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidenciaPage;