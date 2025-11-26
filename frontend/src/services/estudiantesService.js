// ============================================================================
// SERVICIO DE ESTUDIANTES - REAL CON SUPABASE
// ============================================================================

import { supabase } from '../config/supabase';

/**
 * Buscar estudiantes por término (nombre, DNI, aula)
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Lista de estudiantes encontrados
 */
export const searchEstudiantes = async (searchTerm) => {
  try {
    let query = supabase
      .from('estudiantes')
      .select(`
        *,
        padre:users!estudiantes_padre_id_fkey(id, nombre_completo, email, telefono),
        madre:users!estudiantes_madre_id_fkey(id, nombre_completo, email, telefono),
        apoderado:users!estudiantes_apoderado_id_fkey(id, nombre_completo, email, telefono)
      `)
      .eq('activo', true);

    // Si hay término de búsqueda
    if (searchTerm && searchTerm.trim() !== '') {
      query = query.or(
        `nombre_completo.ilike.%${searchTerm}%,` +
        `dni.ilike.%${searchTerm}%,` +
        `grado.eq.${searchTerm},` +
        `seccion.eq.${searchTerm.toUpperCase()}`
      );
    }

    const { data, error } = await query
      .order('nombre_completo', { ascending: true })
      .limit(50);

    if (error) throw error;

    return { estudiantes: data || [], error: null };

  } catch (error) {
    console.error('Error al buscar estudiantes:', error);
    return { estudiantes: [], error: error.message };
  }
};

/**
 * Obtener estudiante por ID
 * @param {string} estudianteId - UUID del estudiante
 * @returns {Object} Datos del estudiante
 */
export const getEstudianteById = async (estudianteId) => {
  try {
    const { data, error } = await supabase
      .from('estudiantes')
      .select(`
        *,
        padre:users!estudiantes_padre_id_fkey(*),
        madre:users!estudiantes_madre_id_fkey(*),
        apoderado:users!estudiantes_apoderado_id_fkey(*)
      `)
      .eq('id', estudianteId)
      .single();

    if (error) throw error;

    return { estudiante: data, error: null };

  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    return { estudiante: null, error: error.message };
  }
};

/**
 * Obtener estudiantes por aula
 * @param {string} grado - Grado (1-5)
 * @param {string} seccion - Sección (A-E)
 * @returns {Array} Lista de estudiantes del aula
 */
export const getEstudiantesByAula = async (grado, seccion) => {
  try {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*')
      .eq('grado', grado)
      .eq('seccion', seccion)
      .eq('activo', true)
      .order('nombre_completo', { ascending: true });

    if (error) throw error;

    return { estudiantes: data || [], error: null };

  } catch (error) {
    console.error('Error al obtener estudiantes por aula:', error);
    return { estudiantes: [], error: error.message };
  }
};

/**
 * Contar incidencias de un estudiante
 * @param {string} estudianteId - UUID del estudiante
 * @returns {Object} Contadores de incidencias
 */
export const getEstudianteIncidenciasCount = async (estudianteId) => {
  try {
    const { data, error } = await supabase
      .from('incidencias')
      .select('severidad')
      .eq('estudiante_id', estudianteId);

    if (error) throw error;

    const counts = {
      total: data.length,
      leves: data.filter(i => i.severidad === 'leve').length,
      graves: data.filter(i => i.severidad === 'grave').length,
      muy_graves: data.filter(i => i.severidad === 'muy_grave').length
    };

    return { counts, error: null };

  } catch (error) {
    console.error('Error al contar incidencias:', error);
    return { counts: { total: 0, leves: 0, graves: 0, muy_graves: 0 }, error: error.message };
  }
};

export default {
  searchEstudiantes,
  getEstudianteById,
  getEstudiantesByAula,
  getEstudianteIncidenciasCount
};
