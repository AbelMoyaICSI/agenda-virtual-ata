// ============================================================================
// SERVICIO DE INCIDENCIAS - REAL CON SUPABASE
// ============================================================================

import { supabase } from '../config/supabase';

/**
 * Crear nueva incidencia
 * @param {Object} incidenciaData - Datos de la incidencia
 * @returns {Object} { incidencia, error }
 */
export const createIncidencia = async (incidenciaData) => {
  try {
    const { data, error } = await supabase
      .from('incidencias')
      .insert([incidenciaData])
      .select()
      .single();

    if (error) throw error;

    return { incidencia: data, error: null };

  } catch (error) {
    console.error('Error al crear incidencia:', error);
    return { incidencia: null, error: error.message };
  }
};

/**
 * Obtener historial de incidencias con filtros
 * @param {Object} filters - Filtros de búsqueda
 * @returns {Array} Lista de incidencias
 */
export const getIncidencias = async (filters = {}) => {
  try {
    let query = supabase
      .from('incidencias')
      .select(`
        *,
        estudiante:estudiantes(id, nombre_completo, grado, seccion, dni),
        reportado_por:users!incidencias_reportado_por_fkey(id, nombre_completo, role)
      `)
      .order('fecha_hora', { ascending: false });

    // Aplicar filtros
    if (filters.estudianteId) {
      query = query.eq('estudiante_id', filters.estudianteId);
    }

    if (filters.severidad) {
      query = query.eq('severidad', filters.severidad);
    }

    if (filters.grado) {
      query = query.eq('estudiante.grado', filters.grado);
    }

    if (filters.seccion) {
      query = query.eq('estudiante.seccion', filters.seccion);
    }

    if (filters.fechaInicio) {
      query = query.gte('fecha_hora', filters.fechaInicio);
    }

    if (filters.fechaFin) {
      query = query.lte('fecha_hora', filters.fechaFin);
    }

    if (filters.tipo) {
      query = query.eq('tipo', filters.tipo);
    }

    const { data, error } = await query.limit(filters.limit || 100);

    if (error) throw error;

    return { incidencias: data || [], error: null };

  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    return { incidencias: [], error: error.message };
  }
};

/**
 * Obtener incidencia por ID
 * @param {string} incidenciaId - UUID de la incidencia
 * @returns {Object} Datos de la incidencia
 */
export const getIncidenciaById = async (incidenciaId) => {
  try {
    const { data, error } = await supabase
      .from('incidencias')
      .select(`
        *,
        estudiante:estudiantes(*),
        reportado_por:users!incidencias_reportado_por_fkey(*)
      `)
      .eq('id', incidenciaId)
      .single();

    if (error) throw error;

    return { incidencia: data, error: null };

  } catch (error) {
    console.error('Error al obtener incidencia:', error);
    return { incidencia: null, error: error.message };
  }
};

/**
 * Actualizar estado de incidencia
 * @param {string} incidenciaId - UUID de la incidencia
 * @param {string} nuevoEstado - Nuevo estado
 * @returns {Object} { success, error }
 */
export const updateEstadoIncidencia = async (incidenciaId, nuevoEstado) => {
  try {
    const { error } = await supabase
      .from('incidencias')
      .update({ estado: nuevoEstado })
      .eq('id', incidenciaId);

    if (error) throw error;

    return { success: true, error: null };

  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener estadísticas de incidencias
 * @param {Object} filters - Filtros opcionales
 * @returns {Object} Estadísticas
 */
export const getEstadisticasIncidencias = async (filters = {}) => {
  try {
    let query = supabase
      .from('incidencias')
      .select('severidad, tipo, fecha_hora, estudiante_id');

    // Aplicar filtros de fecha si existen
    if (filters.fechaInicio) {
      query = query.gte('fecha_hora', filters.fechaInicio);
    }

    if (filters.fechaFin) {
      query = query.lte('fecha_hora', filters.fechaFin);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Calcular estadísticas
    const stats = {
      total: data.length,
      porSeveridad: {
        leves: data.filter(i => i.severidad === 'leve').length,
        graves: data.filter(i => i.severidad === 'grave').length,
        muy_graves: data.filter(i => i.severidad === 'muy_grave').length
      },
      estudiantesUnicos: new Set(data.map(i => i.estudiante_id)).size
    };

    return { stats, error: null };

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { stats: null, error: error.message };
  }
};

export default {
  createIncidencia,
  getIncidencias,
  getIncidenciaById,
  updateEstadoIncidencia,
  getEstadisticasIncidencias
};
