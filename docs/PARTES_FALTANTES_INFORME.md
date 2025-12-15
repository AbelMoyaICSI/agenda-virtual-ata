# III.3. Actividad 3: Desarrollo e implementación del MVP

Durante esta actividad se materializó la propuesta tecnológica construyendo el MVP (Producto Mínimo Viable) de la **Agenda Digital ATA**. La implementación integró tres componentes fundamentales: una interfaz moderna basada en **PWA (Progressive Web App)**, un backend eficiente tipo **Serverless**, y una gestión de datos segura y escalable.

## III.3.1 Desarrollo
El proceso de construcción siguió una metodología iterativa, permitiendo validar cada módulo funcional (autenticación, gestión de incidencias, notificaciones) de manera progresiva.

### III.3.2.1 Preparación del entorno
Para asegurar un flujo de trabajo profesional y colaborativo se estableció un ecosistema de desarrollo moderno:
*   **Control de Versiones:** Repositorio en GitHub con ramas protegidas (`main` para producción, `dev` para desarrollo).
*   **Herramientas CLI:** Uso de `npm` para dependencias, `wrangler` para el despliegue de workers y `supabase` cli para la gestión de base de datos.
*   **Convenciones:** Estandarización de commits y uso de linters para la calidad del código.

🟦 **Figura 32: Archivos de preparación de entorno**
*Fuente: Elaboración propia (2025)*
*(Nota: Insertar captura del explorador de archivos o terminal mostrando `package.json` y configuración)*

### III.3.2.2 Estructura del proyecto
El código fuente se organizó siguiendo una arquitectura limpia de capas para facilitar su mantenimiento y escalabilidad futura.
*(Referencia: Ver Anexo 3: Estructura del sistema)*

### III.3.2.3 Frontend (PWA – React + Vite)
El frontend fue desarrollado como una **PWA**, garantizando accesibilidad desde cualquier dispositivo (móvil o escritorio) y ofreciendo capacidades como instalación local y funcionamiento offline básico.

**Componentes Clave:**
*   **Rutas Seguras:** `/login` (Acceso RBAC), `/dashboard` (Métricas), `/incidencias` (Registro), `/historial`.
*   **Gestión de Estado:** Hooks personalizados (`useAuth`, `useIncidencias`) para lógica de negocio encapsulada.
*   **UX/UI:** Diseño responsivo, alertas visuales (Toast) y feedback de carga instantáneo.

🟦 **Figura 31: Implementación de PWA + Vite**
*Fuente: Elaboración propia (2025)*
*(Nota: Insertar captura de la pantalla principal de la aplicación o del dashboard)*

### III.3.2.6 Notificaciones (Web Push)
Se implementó un sistema de notificaciones push para la comunicación inmediata con los padres:
*   **Flujo:** Navegador Cliente -> Suscripción VAPID -> Cloudflare Worker -> Push Service -> Dispositivo del Padre.
*   **Impacto:** Permite alertar sobre incidencias críticas en tiempo real sin requerir que la app esté abierta.

🟦 **Figura 32: Implementación de notificaciones web push application**
*Fuente: Elaboración propia (2025)*
*(Nota: Insertar captura de una notificación real llegando al celular)*

### III.3.2.7 Integración preliminar con datos
Se estableció la conexión segura con **Supabase**, implementando políticas de seguridad a nivel de fila (RLS) para proteger la privacidad de la información de los estudiantes.

---

# III.4. Actividad 4: Pruebas, validación y mejora del sistema

Al finalizar la implementación, se realizó una fase exhaustiva de aseguramiento de la calidad (QA).

**Entregables y Resultados:**
1.  **Código Fuente Completo:** Repositorio en GitHub conteniendo Frontend, Backend y Scripts SQL.
2.  **Sistema Desplegado:** MVP operativo y accesible públicamente en `https://agenda-virtual-ata.pages.dev`.
3.  **Base de Datos Poblada:** Importación exitosa de **1328 estudiantes** y sus respectivos apoderados, listos para operación real.
4.  **Evidencia de Pruebas:** Checklist de validación funcional (registro, edición, notificación) aprobado por la supervisora.

*(Sugerencia: Puedes incluir aquí una tabla resumen de los casos de prueba ejecutados)*

---

# III.5. Actividad 5: Despliegue, documentación, mantenimiento y cierre de práctica

La fase final aseguró la transición del sistema a un entorno productivo y la capacitación de los actores clave.

**Acciones Realizadas:**

1.  **Despliegue Continuo (CI/CD):**
    Se configuró un pipeline en **Cloudflare Pages** conectado a la rama `main`. Esto garantiza que cualquier actualización en el código se refleje automáticamente en producción en minutos, asegurando disponibilidad continua.

    🟦 **Figura 33: Sistema desplegado en Cloudflare Pages & Workers**
    *Fuente: Elaboración propia (2025)*
    *(Nota: Insertar captura del panel de Cloudflare mostrando el estado "Success" del despliegue)*

2.  **Estrategia de Soporte y Mantenimiento:**
    *   **Autoservicio:** Módulos de "Recuperar Contraseña" y "Registro de Incidencias Técnicas" integrados en la app.
    *   **Material de Ayuda:** Infografías paso a paso distribuidas por canales institucionales (WhatsApp) para guiar a los padres en el primer acceso.

3.  **Transferencia y Cierre:**
    Entrega formal de credenciales administrativas y código fuente a la Dirección. Firma de la constancia de conformidad, validando que el software cumple con los requerimientos de gestión de disciplina escolar.
