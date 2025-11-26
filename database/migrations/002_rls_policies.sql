-- =====================================================
-- AGENDA VIRTUAL ATA - POLÍTICAS RLS
-- Row Level Security Policies
-- Versión: 1.0.0
-- =====================================================

-- =====================================================
-- FUNCIONES AUXILIARES PARA RLS
-- =====================================================
-- NOTA: Creadas en esquema public por restricciones de Supabase
-- =====================================================

-- Función para obtener el rol del usuario autenticado
CREATE OR REPLACE FUNCTION public.user_role()
RETURNS role_enum AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Función para verificar si el usuario es administrador
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Función para verificar si el usuario es personal (docente/tutor/auxiliar/etc)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role IN ('docente', 'tutor', 'auxiliar', 'direccion', 'toe', 'admin')
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- =====================================================
-- POLÍTICAS RLS - TABLA: users
-- =====================================================

-- Habilitar RLS en tabla users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT
  USING (id = auth.uid());

-- Los admins pueden ver todos los usuarios
CREATE POLICY "users_select_admin" ON public.users
  FOR SELECT
  USING (public.is_admin());

-- Los usuarios pueden actualizar su propio perfil (excepto role)
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.users WHERE id = auth.uid()));

-- Solo admins pueden crear usuarios
CREATE POLICY "users_insert_admin" ON public.users
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Solo admins pueden eliminar usuarios
CREATE POLICY "users_delete_admin" ON public.users
  FOR DELETE
  USING (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: estudiantes
-- =====================================================

-- Habilitar RLS en tabla estudiantes
ALTER TABLE public.estudiantes ENABLE ROW LEVEL SECURITY;

-- Staff puede ver todos los estudiantes
CREATE POLICY "estudiantes_select_staff" ON public.estudiantes
  FOR SELECT
  USING (public.is_staff());

-- Padres pueden ver a sus hijos
CREATE POLICY "estudiantes_select_padre" ON public.estudiantes
  FOR SELECT
  USING (
    (padre_id = auth.uid() OR madre_id = auth.uid() OR apoderado_id = auth.uid()) AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'padre')
  );

-- Staff puede insertar estudiantes
CREATE POLICY "estudiantes_insert_staff" ON public.estudiantes
  FOR INSERT
  WITH CHECK (public.is_staff());

-- Staff puede actualizar estudiantes
CREATE POLICY "estudiantes_update_staff" ON public.estudiantes
  FOR UPDATE
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- Solo admins pueden eliminar estudiantes
CREATE POLICY "estudiantes_delete_admin" ON public.estudiantes
  FOR DELETE
  USING (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: periodos
-- =====================================================

-- Habilitar RLS en tabla periodos
ALTER TABLE public.periodos ENABLE ROW LEVEL SECURITY;

-- Todos los usuarios autenticados pueden ver periodos
CREATE POLICY "periodos_select_all" ON public.periodos
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Solo admins pueden gestionar periodos
CREATE POLICY "periodos_insert_admin" ON public.periodos
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "periodos_update_admin" ON public.periodos
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "periodos_delete_admin" ON public.periodos
  FOR DELETE
  USING (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: catalogo_meritos
-- =====================================================

-- Habilitar RLS en tabla catalogo_meritos
ALTER TABLE public.catalogo_meritos ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver el catálogo de méritos
CREATE POLICY "catalogo_meritos_select_all" ON public.catalogo_meritos
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Solo admins pueden gestionar catálogo
CREATE POLICY "catalogo_meritos_modify_admin" ON public.catalogo_meritos
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: catalogo_demeritos
-- =====================================================

-- Habilitar RLS en tabla catalogo_demeritos
ALTER TABLE public.catalogo_demeritos ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver el catálogo de deméritos
CREATE POLICY "catalogo_demeritos_select_all" ON public.catalogo_demeritos
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Solo admins pueden gestionar catálogo
CREATE POLICY "catalogo_demeritos_modify_admin" ON public.catalogo_demeritos
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: incidencias
-- =====================================================

-- Habilitar RLS en tabla incidencias
ALTER TABLE public.incidencias ENABLE ROW LEVEL SECURITY;

-- Staff puede ver todas las incidencias
CREATE POLICY "incidencias_select_staff" ON public.incidencias
  FOR SELECT
  USING (public.is_staff());

-- Padres pueden ver incidencias de sus hijos
CREATE POLICY "incidencias_select_padre" ON public.incidencias
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.estudiantes 
      WHERE id = incidencias.estudiante_id 
      AND (padre_id = auth.uid() OR madre_id = auth.uid() OR apoderado_id = auth.uid())
    ) AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'padre')
  );

-- Staff puede registrar incidencias
CREATE POLICY "incidencias_insert_staff" ON public.incidencias
  FOR INSERT
  WITH CHECK (
    public.is_staff() AND
    registrado_por = auth.uid()
  );

-- Staff puede actualizar incidencias que registró
CREATE POLICY "incidencias_update_own" ON public.incidencias
  FOR UPDATE
  USING (
    public.is_staff() AND
    registrado_por = auth.uid()
  )
  WITH CHECK (
    public.is_staff() AND
    registrado_por = auth.uid()
  );

-- Dirección y TOE pueden actualizar cualquier incidencia
CREATE POLICY "incidencias_update_direccion_toe" ON public.incidencias
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('direccion', 'toe', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('direccion', 'toe', 'admin')
    )
  );

-- Solo admins pueden eliminar incidencias
CREATE POLICY "incidencias_delete_admin" ON public.incidencias
  FOR DELETE
  USING (public.is_admin());

-- =====================================================
-- POLÍTICAS RLS - TABLA: alertas
-- =====================================================

-- Habilitar RLS en tabla alertas
ALTER TABLE public.alertas ENABLE ROW LEVEL SECURITY;

-- Staff puede ver alertas
CREATE POLICY "alertas_select_staff" ON public.alertas
  FOR SELECT
  USING (public.is_staff());

-- Padres pueden ver alertas de sus hijos
CREATE POLICY "alertas_select_padre" ON public.alertas
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.estudiantes 
      WHERE id = alertas.estudiante_id 
      AND (padre_id = auth.uid() OR madre_id = auth.uid() OR apoderado_id = auth.uid())
    ) AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'padre')
  );

-- Sistema puede insertar alertas (generadas automáticamente)
CREATE POLICY "alertas_insert_system" ON public.alertas
  FOR INSERT
  WITH CHECK (public.is_staff());

-- TOE y dirección pueden actualizar alertas
CREATE POLICY "alertas_update_toe_direccion" ON public.alertas
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin')
    )
  );

-- =====================================================
-- POLÍTICAS RLS - TABLA: citaciones
-- =====================================================

-- Habilitar RLS en tabla citaciones
ALTER TABLE public.citaciones ENABLE ROW LEVEL SECURITY;

-- Staff puede ver citaciones
CREATE POLICY "citaciones_select_staff" ON public.citaciones
  FOR SELECT
  USING (public.is_staff());

-- Padres pueden ver sus citaciones
CREATE POLICY "citaciones_select_padre" ON public.citaciones
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.alertas a
      JOIN public.estudiantes e ON a.estudiante_id = e.id
      WHERE a.id = citaciones.alerta_id
      AND (e.padre_id = auth.uid() OR e.madre_id = auth.uid() OR e.apoderado_id = auth.uid())
    ) AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'padre')
  );

-- TOE puede crear citaciones
CREATE POLICY "citaciones_insert_toe" ON public.citaciones
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin')
    )
  );

-- TOE y padres pueden actualizar citaciones (confirmación)
CREATE POLICY "citaciones_update_toe_padre" ON public.citaciones
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin', 'padre')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin', 'padre')
    )
  );

-- =====================================================
-- POLÍTICAS RLS - TABLA: actas
-- =====================================================

-- Habilitar RLS en tabla actas
ALTER TABLE public.actas ENABLE ROW LEVEL SECURITY;

-- Staff puede ver actas
CREATE POLICY "actas_select_staff" ON public.actas
  FOR SELECT
  USING (public.is_staff());

-- Padres pueden ver actas de sus citaciones
CREATE POLICY "actas_select_padre" ON public.actas
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.citaciones c
      JOIN public.alertas a ON c.alerta_id = a.id
      JOIN public.estudiantes e ON a.estudiante_id = e.id
      WHERE c.id = actas.citacion_id
      AND (e.padre_id = auth.uid() OR e.madre_id = auth.uid() OR e.apoderado_id = auth.uid())
    ) AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'padre')
  );

-- TOE puede crear actas
CREATE POLICY "actas_insert_toe" ON public.actas
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin')
    )
  );

-- TOE y padres pueden actualizar actas (firmas)
CREATE POLICY "actas_update_toe_padre" ON public.actas
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin', 'padre')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('toe', 'direccion', 'admin', 'padre')
    )
  );

-- =====================================================
-- FIN DE POLÍTICAS RLS
-- =====================================================
