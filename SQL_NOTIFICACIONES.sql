-- =====================================================
-- SQL PARA SISTEMA DE NOTIFICACIONES - Agenda Virtual ATA
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- 1. Agregar columnas a mensajes_soporte para respuestas del admin
ALTER TABLE mensajes_soporte 
ADD COLUMN IF NOT EXISTS respuesta_admin TEXT,
ADD COLUMN IF NOT EXISTS respuesta_vista BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS leido_notificado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Agregar columna a incidencias para saber si el padre ya la vio
ALTER TABLE incidencias 
ADD COLUMN IF NOT EXISTS vista_por_padre BOOLEAN DEFAULT FALSE;

-- 3. Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_mensajes_soporte_updated_at ON mensajes_soporte;
CREATE TRIGGER update_mensajes_soporte_updated_at
    BEFORE UPDATE ON mensajes_soporte
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Habilitar Realtime para las tablas necesarias
ALTER PUBLICATION supabase_realtime ADD TABLE solicitudes_registro;
ALTER PUBLICATION supabase_realtime ADD TABLE mensajes_soporte;
ALTER PUBLICATION supabase_realtime ADD TABLE incidencias;

-- 5. Políticas RLS para mensajes de soporte
-- Usuarios pueden ver sus propios mensajes y respuestas
DROP POLICY IF EXISTS "usuarios_ven_sus_mensajes" ON mensajes_soporte;
CREATE POLICY "usuarios_ven_sus_mensajes" ON mensajes_soporte
FOR SELECT USING (
    remitente_id = auth.uid() 
    OR EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('admin', 'direccion')
    )
);

-- Usuarios pueden insertar mensajes
DROP POLICY IF EXISTS "usuarios_insertan_mensajes" ON mensajes_soporte;
CREATE POLICY "usuarios_insertan_mensajes" ON mensajes_soporte
FOR INSERT WITH CHECK (true);

-- Solo admin puede actualizar (responder)
DROP POLICY IF EXISTS "admin_actualiza_mensajes" ON mensajes_soporte;
CREATE POLICY "admin_actualiza_mensajes" ON mensajes_soporte
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('admin', 'direccion')
    )
    OR remitente_id = auth.uid()
);

-- Admin puede eliminar mensajes de soporte
DROP POLICY IF EXISTS "admin_elimina_mensajes" ON mensajes_soporte;
CREATE POLICY "admin_elimina_mensajes" ON mensajes_soporte
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('admin', 'direccion')
    )
);

-- 6. Políticas para incidencias (padres ven las de sus hijos)
DROP POLICY IF EXISTS "padres_ven_incidencias_hijos" ON incidencias;
CREATE POLICY "padres_ven_incidencias_hijos" ON incidencias
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM estudiantes 
        WHERE estudiantes.id = incidencias.estudiante_id 
        AND estudiantes.apoderado_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role NOT IN ('padre')
    )
);

-- Padres pueden actualizar vista_por_padre
DROP POLICY IF EXISTS "padres_marcan_vista" ON incidencias;
CREATE POLICY "padres_marcan_vista" ON incidencias
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM estudiantes 
        WHERE estudiantes.id = incidencias.estudiante_id 
        AND estudiantes.apoderado_id = auth.uid()
    )
);

-- =====================================================
-- ¡Listo! Ejecuta este SQL en tu Supabase Dashboard
-- =====================================================
