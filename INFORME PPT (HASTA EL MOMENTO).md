**UNIVERSIDAD PRIVADA ANTENOR ORREGO FACULTAD DE INGENIERÍA**

**PROGRAMA DE ESTUDIO DE INGENIERÍA DE COMPUTACIÓN Y SISTEMAS**

![](media/image43.png){width="1.7520909886264218in"
height="2.2539041994750657in"}

**INFORME DE PRÁCTICAS PRE-PROFESIONALES EN:**

**I.E ANTONIO TORRES ARAUJO.**

**PERIODO DE PRÁCTICAS**

**01/09/2025 al 05/12/2025**

**POR:**

**ABEL JESÚS MOYA ACOSTA**

**000245493**

**X ciclo**

**  
  
  
  
  
  
Trujillo -- Perú  
10/10/2025**

**ÍNDICE DE CONTENIDO**

[**I. LA INSTITUCIÓN 2**](#i.-la-institución)

[**II. RELACIÓN DE LAS ACTIVIDADES REALIZADAS
7**](#ii.-relación-de-las-actividades-realizadas)

[**III. DESCRIPCIÓN DE LAS ACTIVIDADES REALIZADAS
9**](#iii.-descripción-de-las-actividades-realizadas)

[**IV. LECCIONES APRENDIDAS 15**](#iv.-lecciones-aprendidas)

[**V. CONCLUSIONES Y RECOMENDACIONES
15**](#v.-conclusiones-y-recomendaciones)

[**VI. REFERENCIAS BIBLIOGRÁFICAS (opcional, ISO 690:2023) \[Solo es
referencia si se cita, si solo se pone la fuente se pone bibliografía\]
15**](#vi.-referencias-bibliográficas-opcional-iso-6902023-solo-es-referencia-si-se-cita-si-solo-se-pone-la-fuente-se-pone-bibliografía)

[**VII. ANEXOS 15**](#vii.-anexos)

> **ÍNDICE DE TABLAS**

[Tabla 1: Plan de trabajo resumido (5 actividades principales)
9](#tabla-1-plan-de-trabajo-resumido-5-actividades-principales)

[Fuente: Elaboración propia (2025). 9](#fuente-elaboración-propia-2025.)

[Tabla 2: Tabla de reglamento méritos del estudiantes
18](#tabla-2-tabla-del-reglamento-de-méritos-del-estudiante)

[Fuente:"Diario de Comportamiento" -- Evidencia institucional.
18](#fuentediario-de-comportamiento-evidencia-institucional.)

[Tabla 3: Tabla de reglamento deméritos del estudiantes
20](#tabla-3-tabla-del-reglamento-de-deméritos-del-estudiante)

[Fuente:"Diario de Comportamiento" -- Evidencia institucional.
20](#fuentediario-de-comportamiento-evidencia-institucional.-1)

[Tabla 4: Tabla de faltas graves del estudiantes
21](#tabla-4-tabla-de-faltas-graves-del-estudiante)

[Fuente:"Diario de Comportamiento" -- Evidencia institucional.
21](#fuentediario-de-comportamiento-evidencia-institucional.-2)

[Tabla 5: Tabla de faltas muy graves del estudiantes
22](#tabla-5-tabla-de-faltas-muy-graves-del-estudiante)

[Fuente:"Diario de Comportamiento" -- Evidencia institucional.
22](#fuentediario-de-comportamiento-evidencia-institucional.-3)

[Tabla 6: Tabla de requisitos funcionales
24](#tabla-6-tabla-de-requisitos-funcionales)

[Fuente: Elaboración propia (2025).
24](#fuente-elaboración-propia-2025.-1)

[Tabla 7 : Tabla de requisitos no funcionales
25](#tabla-7-tabla-de-requisitos-no-funcionales)

[Fuente: Elaboración propia (2025).
25](#fuente-elaboración-propia-2025.-2)

[Tabla 8 : Tabla de Alcance funcional
28](#tabla-8-tabla-de-alcance-funcional)

[Fuente: Elaboración propia (2025).
28](#fuente-elaboración-propia-2025.-3)

[Tabla 8 : Tabla de Exclusiones del MVP
29](#tabla-8-tabla-de-exclusiones-del-mvp)

[Fuente: Elaboración propia (2025) 29](#fuente-elaboración-propia-2025)

[Tabla 9 : Tabla de Actores 29](#tabla-9-tabla-de-actores)

[Fuente: Elaboración propia (2025).
29](#fuente-elaboración-propia-2025.-4)

[Tabla 9 : Reglas generales de registro y flujo de incidencias en el
sistema "Agenda Digital ATA"
31](#tabla-9-reglas-generales-de-registro-y-flujo-de-incidencias-en-el-sistema-agenda-digital-ata)

[Fuente: Elaboración propia (2025).
31](#fuente-elaboración-propia-2025.-5)

[Tabla 10:Reglas de negocio para clasificación y reincidencias de faltas
31](#tabla-10reglas-de-negocio-para-clasificación-y-reincidencias-de-faltas)

[Fuente: Elaboración propia (2025).
31](#fuente-elaboración-propia-2025.-6)

[Tabla 11:Reglas de negocio para notificaciones y comunicación
institucional
32](#tabla-11reglas-de-negocio-para-notificaciones-y-comunicación-institucional)

[Fuente: Elaboración propia (2025).
32](#fuente-elaboración-propia-2025.-7)

[Tabla 12:Reglas de negocio específicas por tipo de falta (Leve, Grave y
Muy Grave)
32](#tabla-12reglas-de-negocio-específicas-por-tipo-de-falta-leve-grave-y-muy-grave)

[Fuente: Elaboración propia (2025).
32](#fuente-elaboración-propia-2025.-8)

[Tabla 13:Reglas de negocio de escalamiento y cierre de casos en la
Agenda Digital ATA
33](#tabla-13reglas-de-negocio-de-escalamiento-y-cierre-de-casos-en-la-agenda-digital-ata)

[Fuente: Elaboración propia (2025).
33](#fuente-elaboración-propia-2025.-9)

> **ÍNDICE DE FIGURAS**

[Figura 1: Patio de la I.E "Antonio Torres Araujo"
4](#figura-1-patio-de-la-i.e-antonio-torres-araujo)

[Figura 2: Organigrama de la Institución
5](#figura-2-organigrama-de-la-institución)

[Figura 3: Taller de Computación e Informática
6](#figura-3-taller-de-computación-e-informática)

[Figura 4: Aula de Innovación Pedagógica (AIP)
7](#figura-4-aula-de-innovación-pedagógica-aip)

[Figura 5: Aula de Innovación Pedagógica horarios (AIP)
7](#figura-5-aula-de-innovación-pedagógica-horarios-aip)

[Figura 6: Fotografía con supervisora en oficina de dirección
15](#figura-6-fotografía-con-supervisora-en-oficina-de-dirección)

[Figura 7. Diagrama BPMN del proceso as-is de notificación de
incidencias del estudiante
16](#figura-7.-diagrama-bpmn-del-proceso-actual-as-is-de-notificación-de-incidencias-del-estudiante)

[Figura 8. Agenda Escolar 17](#figura-8.-agenda-escolar)

[Figura 7: Ilustración representativa objetivo del MVP
27](#figura-7-ilustración-representativa-objetivo-del-mvp)

[Figura 8: Arquitectura lógica de la solución "Agenda Virtual ATA"
34](#figura-8-arquitectura-lógica-de-la-solución-agenda-virtual-escolar-ata)

[Figura 9: Diagrama de contexto del sistema "Agenda Digital ATA"
35](#figura-9-diagrama-de-contexto-del-sistema-agenda-virtual-escolar-ata)

> **ANEXOS**

[Anexo 1: Entrevista con supervisora
14](#anexo-1-entrevista-con-supervisora)

# I. LA INSTITUCIÓN {#i.-la-institución}

> **I.1. Aspectos generales**
>
> La **Institución Educativa N.° 80002 "Antonio Torres Araujo"** se
> ubica en la calle Guatemala N.° 500, urbanización Torres Araujo,
> distrito y provincia de Trujillo, región La Libertad. Se encuentra
> bajo la jurisdicción de la **UGEL N.° 04 -- Trujillo Este** y brinda
> servicios educativos en los niveles de inicial, primaria y secundaria
> de menores, en turnos de mañana y tarde.
>
> Cuenta con una población escolar aproximada de 1328 estudiantes y con
> un plantel docente conformado por profesores nombrados y contratados
> en los distintos niveles. Dispone de código local escolar 0249835 y
> códigos modulares para inicial (1417013), primaria (0366989) y
> secundaria (0757955). Su correo institucional es **ie80002@gmail.com**
> y actualmente la dirección está a cargo del profesor **Juan Antonio
> Yañez Díaz**, acompañado por un equipo de subdirectores y
> coordinadores de áreas.
>
> **I.2. Reseña histórica**
>
> La institución fue fundada el **13 de noviembre de 1962** como Escuela
> de Varones N.° 2480. Posteriormente, en 1971, se consolidó como
> Escuela Primaria Mixta N.° 80002 "Antonio Torres Araujo". En 1989
> amplió su oferta educativa al nivel secundaria mediante la R.D.R. N.°
> 00271 y en 1999 incorporó el nivel inicial con R.M. N.° 5340. A lo
> largo de su historia ha sido reconocida por su contribución a la
> formación integral de niños y adolescentes, y ha desarrollado
> infraestructura moderna con aulas de innovación pedagógica,
> laboratorios, talleres y biblioteca.

![](media/image1.jpg){width="4.054708005249344in"
height="1.8421391076115485in"}

#### Figura 1: Patio de la I.E "Antonio Torres Araujo" {#figura-1-patio-de-la-i.e-antonio-torres-araujo}

***Fuente:* *Proyecto Educativo Institucional* de la I.E. N.° 80002
"Antonio Torres Araujo" (PEI**

**2025--2028).**

> **I.3. Actividades y macroprocesos de la institución**
>
> La institución se dedica al servicio educativo integral en los niveles
> de inicial, primaria y secundaria, siguiendo el currículo nacional.
> Sus macroprocesos se organizan en:

- **Procesos estratégicos:** planeamiento institucional, gestión
  > comunitaria y evaluación de la gestión.

- **Procesos pedagógicos:** matrícula, gestión de aprendizajes, tutoría,
  > convivencia escolar e innovación pedagógica.

- **Procesos de soporte:** gestión de recursos humanos, infraestructura,
  > bienes y servicios educativos, así como seguridad y gestión del
  > riesgo.

> **I.4. Organigrama**

![](media/image33.png){width="6.20714457567804in" height="5.09375in"}

#### Figura 2: Organigrama de la Institución

***Fuente:* *Proyecto Educativo Institucional* de la I.E. N.° 80002
"Antonio Torres Araujo" (PEI**

**2025--2028).**

> **I.5. Funciones del área donde se realizaron las prácticas**
>
> El área de **Taller de Computación e Informática y Aula de Innovación
> Pedagógica (AIP)** tiene como propósito fortalecer los procesos
> pedagógicos mediante el uso de recursos tecnológicos. Dentro de sus
> funciones principales destacan:

- Brindar soporte técnico y pedagógico a docentes y estudiantes en el
  > uso de equipos de cómputo, software educativo y recursos digitales.

- Diseñar y gestionar proyectos de innovación tecnológica que mejoren la
  > enseñanza y el aprendizaje.

- Apoyar en la implementación de herramientas digitales que complementen
  > la gestión académica y la convivencia escolar.

- Coordinar con áreas pedagógicas y de tutoría la integración de
  > plataformas virtuales y sistemas de información educativa.

- Promover el uso de las TIC en la comunidad educativa como medio para
  > optimizar procesos institucionales.

![](media/image41.jpg){width="5.905511811023622in"
height="2.6527777777777777in"}

#### Figura 3: Taller de Computación e Informática

***Fuente:* I.E. N.° 80002 "Antonio Torres Araujo".**

![](media/image35.jpg){width="5.905511811023622in"
height="2.6527777777777777in"}

#### Figura 4: Aula de Innovación Pedagógica (AIP)

***Fuente:* I.E. N.° 80002 "Antonio Torres Araujo".**

![](media/image2.jpg){width="5.905511811023622in"
height="2.6527777777777777in"}

#### Figura 5: Aula de Innovación Pedagógica horarios (AIP)

***Fuente:* I.E. N.° 80002 "Antonio Torres Araujo".**

> **I.6. Datos de contacto del supervisor**

- **Nombre:** Kelly Salas Pereda

- **Cargo:** Jefe de Taller y encargada del laboratorio de Computación
  > (AIP/Innovación Pedagógica)

- **Correo electrónico:** nesaper23@gmail.com

- **Teléfono de contacto:** +51 955 065 512

# II. RELACIÓN DE LAS ACTIVIDADES REALIZADAS {#ii.-relación-de-las-actividades-realizadas}

> **II.1. Objetivo General**
>
> Desarrollar un **Sistema de Agenda Virtual Escolar** que permita a
> docentes, tutores, auxiliares, TOE (Tutoría y Orientación Educativa) y
> directivos registrar citaciones, observaciones y comunicados sobre las
> incidencias cometidas por los estudiantes, asegurando que esta
> información llegue de forma automatizada, garantizando la trazabilidad
> y eficiencia en la comunicación con los padres de familia,
> contribuyendo de esta forma, a la gestión de tutoría y convivencia en
> la institución..
>
> **II.2. Objetivos Específicos**

1.  Familiarizarme con la institución (**inducción**), los sistemas y
    > tecnologías utilizadas por la empresa.

2.  Identificar las limitaciones (**problema**) en el proceso de
    > notificación de incidencias cometidas por los estudiantes a los
    > padres de familia mediante la agenda escolar.

3.  Levantar y analizar los requisitos del proceso de comunicación entre
    > colegio y padres de familia sobre las incidencias.

4.  Diseñar el prototipado de las pantallas, diagramas de procesos, la
    > base de datos del sistema de agenda virtual.

5.  Desarrollar el módulo de registro, envío de avisos y consulta de
    > historial.

6.  Implementar un módulo de notificaciones Web Push (Web Push
    > Notifications) y correo electrónico que asegure la entrega
    > oportuna de incidencias.

7.  Realizar pruebas piloto con docentes y tutores para validar el
    > funcionamiento.

8.  Implementar el sistema en la institución, capacitar a los usuarios y
    > entregar documentación técnica y de usuario.

9.  Generar reportes básicos y establecer un plan de mantenimiento
    > inicial.

> **II.3. Tareas Del Plan de Trabajo**

<table style="width:100%;">
<colgroup>
<col style="width: 2%" />
<col style="width: 15%" />
<col style="width: 13%" />
<col style="width: 19%" />
<col style="width: 12%" />
<col style="width: 23%" />
<col style="width: 13%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Nº</strong></th>
<th><strong>Actividad principal</strong></th>
<th><strong>Objetivo de la actividad</strong></th>
<th><strong>Desarrollo o tareas clave</strong></th>
<th><strong>Participantes</strong></th>
<th><strong>Técnicas, herramientas, métodos, etc.</strong></th>
<th><strong>Entregable principal</strong></th>
</tr>
<tr class="odd">
<th>1</th>
<th>Levantamiento y análisis<br />
de requisitos</th>
<th>Identificar las necesidades reales<br />
del colegio y los procesos a digitalizar.</th>
<th>Realizar entrevistas a docentes y AIP/TOE;<br />
observar el registro de incidencias manual; documentar reglas y
flujos.</th>
<th>Practicante,<br />
AIP/TOE, tutores.</th>
<th><strong>Técnica:</strong> Entrevistas semiestructuradas observación
directa.<br />
<strong>Método</strong>: Análisis de procesos actual (as-is);
elicitación de requisitos<br />
<strong>Herramienta:</strong> Google Docs, bpmn.io(borrador), Bizagi
Modeler.<br />
<strong>Marco:</strong> BPMN 2.0.</th>
<th>Documento de requisitos<br />
y diagrama de procesos.</th>
</tr>
<tr class="header">
<th>2</th>
<th>Diseño de la Agenda Digital ATA</th>
<th>Estructurar la arquitectura y<br />
los modelos del sistema según requisitos.</th>
<th>Elaborar prototipos UI;<br />
diseñar el DER; definir la arquitectura PWA + Edge + BD; validar con el
supervisor.</th>
<th>Practicante,Docentes,tutores,directivos,supervisor.</th>
<th><strong>Técnica</strong>: Entrevistas, observación directa.<br />
<strong>Método:</strong> Elicitación de requisitos.<br />
<strong>Herramienta:</strong> Google Docs, bpmn.io,Bizagi Modeler.<br />
<strong>Marco:</strong> BPMN 2.0.</th>
<th>Bocetos aprobados, Prototipos<br />
y modelo de datos (DER).</th>
</tr>
<tr class="odd">
<th>3</th>
<th>Desarrollo e implementación<br />
del MVP</th>
<th>Construir y conectar los módulos<br />
esenciales del sistema (incidencias, notificaciones, usuarios).</th>
<th>Programar componentes en React PWA;<br />
configurar Supabase; integrar notificaciones Push; aplicar CI/CD.</th>
<th>Practicante.</th>
<th><strong>Técnica:</strong> Control de versiones.<br />
<strong>Método:</strong> Desarrollo iterativo.<br />
<strong>Herramienta:</strong> React,Supabase, GitHub.<br />
<strong>Marco:</strong> CI/CD, DevOps.</th>
<th>MVP funcional desplegado<br />
en entorno de prueba.</th>
</tr>
<tr class="header">
<th>4</th>
<th>Pruebas, validación<br />
y mejora del sistema</th>
<th>Comprobar la operatividad<br />
y usabilidad del sistema con usuarios reales.</th>
<th>Ejecutar pruebas internas;<br />
recopilar feedback de docentes y tutores; corregir errores; optimizar
interfaz.</th>
<th>Practicante,<br />
docentes, tutores, AIP/TOE.</th>
<th><strong>Técnica:</strong> Pruebas funcionales, usabilidad.<br />
<strong>Método:</strong> QA Checklist, validación con usuarios.<br />
<strong>Herramienta:</strong> Google Forms.<br />
<strong>Marco:</strong> PDCA.</th>
<th>Informe de validación y<br />
ajustes finales del MVP.</th>
</tr>
<tr class="odd">
<th>5</th>
<th>Despliegue, documentación<br />
mantenimiento y cierre de práctica</th>
<th>Asegurar la sostenibilidad<br />
y evidencia del trabajo realizado.</th>
<th>Publicar el sistema en Cloudflare<br />
Pages; generar documentación técnica y de usuario; elaborar informes y
constancias.</th>
<th>Practicante, director<br />
del colegio, docente asesor (supervisor).</th>
<th><strong>Técnica:</strong> Despliegue continuo, documentación.<br />
<strong>Método:</strong> Gestión de releases,control de cambios.<br />
<strong>Herramienta:</strong> Cloudflare Pages, GitHub
Actions,Word/PDF.<br />
<strong>Marco:</strong> Buenas prácticas DevOps</th>
<th>Informe final de prácticas,<br />
constancias y carta de aceptación.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

##### Tabla 1: Plan de trabajo resumido (5 actividades principales)

##### Fuente: Elaboración propia (2025). {#fuente-elaboración-propia-2025.}

# III. DESCRIPCIÓN DE LAS ACTIVIDADES REALIZADAS {#iii.-descripción-de-las-actividades-realizadas}

> **III.1. Actividad 1**: Levantamiento y análisis de requisitos
>
> **1. Contexto general**
>
> La Institución Educativa "Antonio Torres Araujo" utiliza como medio
> principal de comunicación entre docentes, tutores y padres de familia
> la agenda escolar física. Este documento cumple la función de registro
> diario de tareas, incidencias y citaciones o llamadas telefónicas,
> especialmente en casos de urgencia.  
> El proceso se desarrolla en estrecha relación con el área de Tutoría y
> Orientación Educativa (TOE), encargada de los casos de conducta, y con
> la Dirección, que interviene en faltas graves o muy graves.
>
> **2. Descripción del proceso habitual**
>
> **2.1. Registro inicial de incidencias**

- Actor responsable: Docente o auxiliar.

- Actividad: Ante una falta leve (como tardanza, uniforme incompleto o
  > ausencia de agenda), el docente realiza una anotación en la agenda
  > escolar del estudiante.

- Evidencia: El padre o apoderado debe firmar diariamente la agenda para
  > confirmar la recepción de la observación.

- Medio: Agenda física; no existe registro digital.

- Problemas frecuentes: pérdida de agendas, firmas falsificadas, falta
  > de confirmación real.

> **2.2. Comunicación de reincidencias**

- Actor responsable: Tutor del aula.

- Actividad: Si el estudiante repite una falta varias veces, el tutor
  > revisa las anotaciones de la agenda y comunica el hecho a los
  > padres.

- Medio: Llamada telefónica o mensaje grupal de WhatsApp.

- Limitación: no hay trazabilidad ni constancia formal de la entrega del
  > mensaje.

> **2.3. Citación formal**

- Actor responsable: Tutor o TOE.

- Actividad: Cuando las reincidencias superan los límites establecidos
  > (p. ej., 5 faltas iguales en un bimestre), el tutor deriva el caso
  > al TOE para la citación formal del padre.

- Medio: Documento físico entregado al estudiante o llamada.

- Evidencia: Acta de compromiso firmada por el apoderado durante la
  > cita.

> **2.4. Atención de casos graves o muy graves**

- Actor responsable: TOE y Dirección.

- Actividad: Ante una falta grave (agresiones, daño a infraestructura,
  > fraude, violencia), el docente informa directamente al TOE o
  > Dirección.

- Acción inmediata: Se genera un informe físico o registro en el "Libro
  > de Incidencias", y se cita urgentemente al padre para una reunión
  > presencial.

- Derivación: El TOE gestiona el acta correspondiente y, si es
  > necesario, informa al MINEDU o UGEL según protocolo.

> **2.5. Archivo y seguimiento**

- Actor responsable: TOE y Dirección.

- Actividad: El TOE archiva las actas de compromiso y realiza
  > seguimiento de los casos reincidentes.

- Medio: Carpeta física en el área de Tutoría.

- Limitación: La información no se centraliza ni se puede consultar en
  > línea; los reportes deben hacerse manualmente.

> **2.6. Reglas y criterios aplicados**

- Leves: anotación en agenda → firma del padre.

- Reincidencias: 3 veces por semana → alerta; 5 veces por bimestre →
  > citación TOE.

- Graves: derivación inmediata al TOE.

- Muy graves: derivación directa a Dirección y reporte formal.

> **3. Entrevista con la supervisora (Prof.Kelly)**
>
> Como parte del levantamiento de información, se llevó a cabo una
> reunión con la **supervisora institucional, Prof. Kelly Salas
> Pereda**, encargada del seguimiento de prácticas preprofesionales en
> la I.E. "Antonio Torres Araujo".  
> El objetivo fue **validar los hallazgos iniciales** del análisis del
> proceso actual de comunicación de incidencias y **recoger
> observaciones** sobre las necesidades funcionales del sistema
> propuesto.
>
> A continuación, se presenta el resumen de la conversación sostenida
> entre el practicante y la supervisora institucional de la I.E.
> "Antonio Torres Araujo", **Prof. Kelly Salas Pereda**, durante la
> primera semana de prácticas (03 de septiembre de 2025).  
> El propósito de la entrevista fue **validar la información levantada**
> sobre los procesos actuales de comunicación de incidencias y **definir
> los primeros requisitos funcionales del sistema digital propuesto.**

### 🗣️ Transcripción resumida de la entrevista {#transcripción-resumida-de-la-entrevista}

> **Supervisora (Prof. Kelly):  
> **-Buenos días, Abel. Quisiera que me comentes brevemente qué has
> podido observar estos días respecto al registro de incidencias en la
> institución.
>
> **Practicante (Abel):  
> **-Buenos días, profesora. He revisado el uso que los docentes hacen
> de la agenda escolar. En general, las incidencias se anotan allí, pero
> he notado que algunos padres no firman o las agendas se pierden con
> frecuencia. Además, no hay forma de saber si el padre realmente vio el
> mensaje.
>
> **Supervisora (Prof. Kelly):  
> **-Sí, es cierto. La agenda física es nuestro medio principal, pero
> presenta varias limitaciones. Algunos padres incluso falsifican la
> firma, o los estudiantes la manipulan. Por eso, cuando se acumulan
> varias faltas, el tutor debe intervenir.
>
> **Practicante (Abel):  
> **-Entiendo. Entonces, ¿los tutores revisan las agendas de cada
> estudiante periódicamente?
>
> **Supervisora (Prof. Kelly):  
> **-Exactamente. El tutor hace un control semanal. Si detecta que un
> estudiante repite una falta ---por ejemplo, tres veces en una
> semana--- se comunica con el padre por llamada o WhatsApp. Si ya son
> varias reincidencias, el caso pasa al área de Tutoría y Orientación
> Educativa (TOE).
>
> **Practicante (Abel):  
> ** ¿Y el TOE lleva algún registro digital o todo es manual?
>
> **Supervisora (Prof. Kelly):  
> **-Todo sigue siendo manual. Tenemos un "Libro de Incidencias" en
> físico, donde se registran los casos más graves o reincidentes.
> Además, cuando el padre es citado, se firma un acta de compromiso que
> también se guarda en carpeta física. Pero no tenemos una base de datos
> ni estadísticas que nos permitan hacer seguimiento general.
>
> **Practicante (Abel):  
> **-Eso significa que el proceso depende totalmente del tiempo del
> tutor o del TOE, ¿verdad?
>
> **Supervisora (Prof. Kelly):  
> **-Así es. Y muchas veces los tutores tienen varias secciones a su
> cargo, por lo que el seguimiento se retrasa. Por eso, una herramienta
> digital que notifique automáticamente a los padres y registre las
> reincidencias sería de mucha ayuda.
>
> **Practicante (Abel):  
> **-Perfecto. En ese caso, el sistema que estoy planteando podría
> registrar las incidencias por tipo (leve, grave, muy grave), generar
> alertas al tutor y enviar notificaciones al padre en tiempo real. ¿Le
> gustaría que el sistema también guarde las actas y las citaciones?
>
> **Supervisora (Prof. Kelly):  
> **-Sería ideal. Además, nos permitiría tener constancia de cada
> comunicación, con fecha y hora. También podría incluir un contador de
> reincidencias, para que el tutor vea fácilmente si ya corresponde
> derivar al TOE.
>
> **Practicante (Abel):  
> **-¿Podría confirmarme los criterios actuales de reincidencia y
> gravedad?
>
> **Supervisora (Prof. Kelly):  
> -**Claro. Tres anotaciones por la misma falta en una semana generan
> una **alerta al tutor**. Cinco reincidencias iguales en el bimestre ya
> ameritan **citación formal** con el TOE. En casos graves (agresiones,
> violencia, faltas de respeto), la derivación es directa al TOE y
> Dirección. Los muy graves se registran en el libro y se cita
> inmediatamente al padre.
>
> **Practicante (Abel):  
> -**Perfecto, profesora. Entonces esos serán los parámetros que
> incluiré en el sistema para generar alertas automáticas y
> derivaciones.
>
> **Supervisora (Prof. Kelly):  
> -**Excelente. También te sugiero que contemples un módulo para
> reportes estadísticos, porque la Dirección siempre pide un resumen de
> incidencias por aula o tipo de falta. Eso nos ayudaría mucho para las
> reuniones mensuales.
>
> **Practicante (Abel):  
> **-De acuerdo. Lo incluiré como requerimiento funcional. Gracias por
> su tiempo y por la validación, profesora.
>
> **Supervisora (Prof. Kelly):  
> **-Gracias a ti, Abel. Tu trabajo va a ayudar bastante a mejorar la
> comunicación con los padres y el seguimiento de la conducta de los
> estudiantes.

###### ***Anexo 1***: [[Entrevista con supervisora]{.underline}](https://drive.google.com/drive/folders/1OCR0APlwPJYAI6AEQj1p9VFNoQ3MyuQG?usp=sharing)

### Conclusión del encuentro

> La entrevista permitió validar el flujo real del proceso actual, los
> criterios de gravedad y reincidencia, y las necesidades funcionales
> prioritarias para el desarrollo del sistema **"Agenda Digital
> ATA"**.  
> Se definieron los primeros requisitos oficiales y se acordó continuar
> con la siguiente fase de diseño técnico y modelado de datos en
> coordinación con el área TOE y los tutores.

![](media/image34.png){width="5.905511811023622in"
height="4.430555555555555in"}

#### Figura 6: Fotografía con supervisora en oficina de dirección

***Fuente:* I.E. N.° 80002 "Antonio Torres Araujo".**

- Las **faltas leves** se comunican por agenda, mientras que las
  > **reincidencias y casos graves** se derivan al **TOE** o a
  > **Dirección**.

- Se definieron **reglas de reincidencia**: tres anotaciones semanales →
  > alerta al tutor; cinco bimestrales → citación formal.

- Recalcó la importancia de implementar **notificaciones automáticas**,
  > **seguimiento de reincidencias** y **reportes estadísticos**.

Este intercambio permitió **validar los requisitos preliminares** y
establecer las **bases funcionales del sistema "Agenda Digital ATA"**.

> **3.1. Representación gráfica del proceso actual (BPMN)**
>
> En la siguiente figura se presenta el **diagrama BPMN del proceso
> actual de comunicación de incidencias** que realiza la Institución
> Educativa "Antonio Torres Araujo".
>
> Este modelo resume las etapas descritas en los subpuntos anteriores
> (registro inicial, comunicación, citación, atención y archivo),
> mostrando el flujo entre los actores **Docente/Auxiliar, Tutor, TOE,
> Dirección y Padre de familia**, así como los puntos de decisión en
> función de la gravedad o reincidencia del caso.

![](media/image7.png){width="7.378713910761155in"
height="2.861134076990376in"}

#### Figura 7. Diagrama BPMN del proceso actual (as-is) de notificación de incidencias del estudiante {#figura-7.-diagrama-bpmn-del-proceso-actual-as-is-de-notificación-de-incidencias-del-estudiante}

***Fuente:* *Elaboración propia (2025) basada en los datos recopilados
de la entrevista***

> **4. Problemas identificados**

- Falta de trazabilidad, comunicación y control real sobre si el padre
  > leyó o no el aviso.

- Pérdida o manipulación de la agenda física.

- Acumulación de reincidencias sin seguimiento centralizado.

- Falta de estadísticas institucionales para medir tendencias
  > conductuales.

- Procesos dependientes del tiempo del tutor o del TOE, sin
  > automatización.

> **5. Evidencia documental: Agenda Escolar y Reglamento Interno**
>
> Como evidencia complementaria del proceso de comunicación de
> incidencias, se revisó la Agenda Escolar "Diario de Comportamiento" de
> la I.E. N.° 80002 *"Antonio Torres Araujo"*, documento oficial que
> regula la conducta y comunicación entre docentes, tutores, estudiantes
> y padres de familia.
>
> En esta agenda se encuentran los artículos del Reglamento Interno del
> Estudiante, el horario institucional, los criterios de méritos y
> deméritos, así como las sanciones disciplinarias aplicadas en función
> de la gravedad de la falta.
>
> Entre los artículos más relevantes destacan:

- Art. 47 -- Deberes de los estudiantes: Portar y presentar diariamente
  > la agenda firmada por el apoderado.

- Art. 50 y 51 -- Derechos y deberes de los padres: Supervisar la
  > conducta del estudiante y firmar la agenda como constancia de
  > revisión.

- Criterios de méritos y deméritos: Clasifican las conductas en *faltas
  > leves, graves y muy graves*, asociando cada una con las respectivas
  > sanciones o reconocimientos.

> Este documento evidencia que el proceso actual es manual y dependiente
> de registros físicos, lo que refuerza la necesidad de una solución
> digital que permita automatizar la trazabilidad de incidencias,
> verificar firmas de apoderados y generar reportes estadísticos.

![](media/image12.jpg){width="1.5078324584426948in"
height="1.9370702099737533in"}

#### Figura 8. Agenda Escolar  {#figura-8.-agenda-escolar}

***Fuente:*"Diario de Comportamiento" -- Evidencia institucional.**

***I.E. N.° 80002 "Antonio Torres Araujo" (2025).***

> **5.1. Méritos**

| **MÉRITOS DEL ESTUDIANTE** |            |                                                                                                          |
|----------------------------|------------|----------------------------------------------------------------------------------------------------------|
| **Criterio**               | **Código** | **Rasgo (literal según Agenda)**                                                                         |
| **Responsabilidad**        | A          | Participación destacada en actos cívicos o cualquier otro evento interno.                                |
|                            | B          | Mantener una adecuada presentación personal durante un mes.                                              |
|                            | C          | Es puntual y asiste a sus actividades académicas.                                                        |
|                            | D          | Porta siempre su diario de comportamiento.                                                               |
|                            | E          | Cuida del mobiliario e infraestructura.                                                                  |
|                            | F          | Colabora con la limpieza del plantel educativo de forma espontánea.                                      |
|                            | G          | Mantiene la agenda de control bien conservada.                                                           |
|                            | H          | Cumple con sus compromisos establecidos.                                                                 |
| **Respeto**                | I          | Practica el saludo con cortesía como hábito a todos los miembros de la I.E. y/o personas adultas.        |
|                            | J          | Muestra respeto por las cosas de sus compañeros y devuelve los objetos y/o dinero encontrados en la I.E. |
|                            | K          | Cuida la infraestructura, áreas verdes, mobiliario, equipos de la I.E.                                   |
| **Solidaridad**            | N          | Participa en campañas en pro de la mejora institucional.                                                 |
|                            | O          | Participa en actividades comunales responsablemente.                                                     |
|                            | P          | Apoya a sus compañeros que se encuentran en dificultad.                                                  |

##### Tabla 2: Tabla del reglamento de méritos del estudiante

##### *Fuente*:"Diario de Comportamiento" -- Evidencia institucional. {#fuentediario-de-comportamiento-evidencia-institucional.}

***I.E. N.° 80002 "Antonio Torres Araujo" (2025).***

> **5.2. Deméritos**

<table>
<colgroup>
<col style="width: 13%" />
<col style="width: 12%" />
<col style="width: 62%" />
<col style="width: 11%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="4"><h2 id="deméritos-del-estudiante">DEMÉRITOS DEL
ESTUDIANTE</h2></th>
</tr>
<tr class="odd">
<th><h2 id="categoría">Categoría</h2></th>
<th><h2 id="código">Código</h2></th>
<th><h2 id="rasgo-literal-según-agenda">Rasgo (literal según
Agenda)</h2></th>
<th><h2 id="nivel">Nivel</h2></th>
</tr>
<tr class="header">
<th rowspan="4"><h2 id="asistencia-1">ASISTENCIA (1)</h2></th>
<th><h2 id="a">A</h2></th>
<th><h2
id="no-asiste-a-la-institución-educativa-ni-justifica-su-inasistencia.">No
asiste a la Institución Educativa, ni justifica su
inasistencia.</h2></th>
<th><h2 id="leve">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="b">B</h2></th>
<th><h2 id="se-evade-de-la-institución-educativa.">Se evade de la
Institución Educativa.</h2></th>
<th><h2 id="grave">Grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="c">C</h2></th>
<th><h2
id="ingresa-o-sale-de-la-institución-educativa-o-aula-sin-permiso.">Ingresa
o sale de la Institución Educativa o aula sin permiso.</h2></th>
<th><h2 id="grave-1">Grave</h2></th>
</tr>
<tr class="odd">
<th><h2 id="d">D</h2></th>
<th><h2
id="no-ingresa-a-clase-o-permanece-en-el-kiosko-baño-patio-u-otros.">No
ingresa a clase o permanece en el kiosko, baño, patio u otros.</h2></th>
<th><h2 id="leve-1">Leve</h2></th>
</tr>
<tr class="header">
<th rowspan="13"><h2 id="funciones-2">FUNCIONES (2)</h2></th>
<th><h2 id="e">E</h2></th>
<th><h2
id="incumplimiento-de-las-funciones-asignadas-brigadier-delegado-etc.">Incumplimiento
de las funciones asignadas, brigadier, delegado, etc.</h2></th>
<th><h2 id="leve-2">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="f">F</h2></th>
<th><h2 id="no-cumple-con-las-tareas-encomendadas.">No cumple con las
tareas encomendadas.</h2></th>
<th><h2 id="leve-3">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="g">G</h2></th>
<th><h2 id="interrumpe-al-profesor-durante-las-clases.">Interrumpe al
profesor durante las clases.</h2></th>
<th><h2 id="leve-4">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="h">H</h2></th>
<th><h2 id="realizar-trabajos-de-otro-curso-en-horas-de-clase.">Realizar
trabajos de otro curso en horas de clase.</h2></th>
<th><h2 id="leve-5">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="i">I</h2></th>
<th><h2
id="fomenta-el-desorden-en-los-diferentes-ambientesactividades-de-la-institución-aula-patio-corredores-etc..">Fomenta
el desorden en los diferentes ambientes/actividades de la Institución
(aula, patio, corredores, etc.).</h2></th>
<th><h2 id="leve-6">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="j">J</h2></th>
<th><h2
id="portar-o-difundir-revistas-videos-obscenos-yo-pornografía-bebidas-alcohólicas-cigarrillos-etc.">Portar
o difundir revistas, videos obscenos y/o pornografía, bebidas
alcohólicas, cigarrillos, etc.</h2></th>
<th><h2 id="muy-grave">Muy grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="k">K</h2></th>
<th><h2
id="hace-uso-de-dispositivos-tecnológicos-celulares-tablets-mp3-mp4-armas-o-réplicas-etc..">Hace
uso de dispositivos tecnológicos (celulares, tablets, mp3, mp4, armas o
réplicas, etc.).</h2></th>
<th><h2 id="grave-2">Grave</h2></th>
</tr>
<tr class="odd">
<th><h2 id="l">L</h2></th>
<th><h2 id="jala-o-empuja-a-sus-compañeros.">Jala o empuja a sus
compañeros.</h2></th>
<th><h2 id="grave-3">Grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="m">M</h2></th>
<th><h2 id="se-niega-a-realizar-una-tarea-o-actividad-encomendada.">Se
niega a realizar una tarea o actividad encomendada.</h2></th>
<th><h2 id="leve-7">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="n">N</h2></th>
<th><h2
id="no-cuida-el-material-o-los-recursos-que-le-son-proporcionados.">No
cuida el material o los recursos que le son proporcionados.</h2></th>
<th><h2 id="leve-8">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="o">O</h2></th>
<th><h2
id="no-hace-firmar-la-agenda-de-control-por-parte-del-padre-o-apoderado.">No
hace firmar la Agenda de Control por parte del padre o
apoderado.</h2></th>
<th><h2 id="leve-9">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="p">P</h2></th>
<th><h2
id="no-cumple-las-normas-y-convivencias-establecidas-en-el-aula.">No
cumple las normas y convivencias establecidas en el aula.</h2></th>
<th><h2 id="leve-10">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="q">Q</h2></th>
<th><h2
id="incumple-las-normas-y-convivencias-establecidas-en-la-institución-educativa.">Incumple
las normas y convivencias establecidas en la Institución
Educativa.</h2></th>
<th><h2 id="grave-4">Grave</h2></th>
</tr>
<tr class="odd">
<th rowspan="2"><h2 id="infraestructura-3">INFRAESTRUCTURA (3)</h2></th>
<th><h2 id="r">R</h2></th>
<th><h2
id="deteriora-el-mobiliario-carpetas-silla-pizarra-etc.-e-infraestructura.">Deteriora
el mobiliario (carpetas, silla, pizarra, etc.) e
infraestructura.</h2></th>
<th><h2 id="grave-5">Grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="s">S</h2></th>
<th><h2
id="no-colabora-yo-es-indiferente-con-la-ambientación-del-aula.">No
colabora y/o es indiferente con la ambientación del aula.</h2></th>
<th><h2 id="leve-11">Leve</h2></th>
</tr>
<tr class="odd">
<th rowspan="5"><h2 id="imagen-personal-4">IMAGEN PERSONAL (4)</h2></th>
<th><h2 id="t">T</h2></th>
<th><h2
id="viste-el-uniforme-incompleto-yo-prendas-ajenas-al-mismo.">Viste el
uniforme incompleto y/o prendas ajenas al mismo.</h2></th>
<th><h2 id="leve-12">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="u">U</h2></th>
<th><h2
id="no-usa-el-uniforme-de-educación-física-cuando-corresponde.">No usa
el uniforme de Educación Física cuando corresponde.</h2></th>
<th><h2 id="leve-13">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="v">V</h2></th>
<th><h2 id="falta-de-higiene-personal-cabello-uñas-etc..">Falta de
higiene personal (cabello, uñas, etc.).</h2></th>
<th><h2 id="leve-14">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="w">W</h2></th>
<th><h2
id="no-respeta-el-cabello-corto-varones-o-recogido-con-moño-y-lazo-mujeres.">No
respeta el cabello corto (varones) o recogido con moño y lazo
(mujeres).</h2></th>
<th><h2 id="leve-15">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="x">X</h2></th>
<th><h2
id="utiliza-adornos-piercings-aretes-color-de-uñas-etc..">Utiliza
adornos (piercings, aretes, color de uñas, etc.).</h2></th>
<th><h2 id="leve-16">Leve</h2></th>
</tr>
<tr class="header">
<th><h2 id="limpieza-5">LIMPIEZA (5)</h2></th>
<th><h2 id="y">Y</h2></th>
<th><h2
id="no-colabora-para-mantener-los-ambientes-de-la-institución-limpios-aula-patio-baños-etc..">No
colabora para mantener los ambientes de la Institución limpios (aula,
patio, baños, etc.).</h2></th>
<th><h2 id="leve-17">Leve</h2></th>
</tr>
<tr class="odd">
<th rowspan="3"><h2 id="relaciones-interpersonales-6">RELACIONES
INTERPERSONALES (6)</h2></th>
<th><h2 id="z">Z</h2></th>
<th><h2
id="agrede-verbal-física-y-moralmente-a-sus-compañeros-adentro-y-fuera-de-la-institución-educativa.">Agrede
verbal, física y moralmente a sus compañeros (adentro y fuera de la
Institución Educativa).</h2></th>
<th><h2 id="muy-grave-1">Muy grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="aa">AA</h2></th>
<th><h2
id="falta-de-respeto-a-directivos-docentes-yo-personal-de-la-institución-educativa.">Falta
de respeto a directivos, docentes y/o personal de la Institución
Educativa.</h2></th>
<th><h2 id="grave-6">Grave</h2></th>
</tr>
<tr class="odd">
<th><h2 id="ab">AB</h2></th>
<th><h2
id="provoca-discusiones-o-desorden-con-sus-compañeros-dentro-y-fuera-del-aula.">Provoca
discusiones o desorden con sus compañeros dentro y fuera del
aula.</h2></th>
<th><h2 id="grave-7">Grave</h2></th>
</tr>
<tr class="header">
<th rowspan="2"><h2 id="ciudadano-7">CIUDADANO (7)</h2></th>
<th><h2 id="ac">AC</h2></th>
<th><h2
id="no-entona-con-respeto-y-sentimiento-patriótico-el-himno-nacional-e-himno-de-la-institución-educativa.">No
entona con respeto y sentimiento patriótico el Himno Nacional e Himno de
la Institución Educativa.</h2></th>
<th><h2 id="leve-18">Leve</h2></th>
</tr>
<tr class="odd">
<th><h2 id="ad">AD</h2></th>
<th><h2
id="no-guarda-el-debido-respeto-y-compostura-durante-la-ceremonia-patriótica.">No
guarda el debido respeto y compostura durante la ceremonia
patriótica.</h2></th>
<th><h2 id="leve-19">Leve</h2></th>
</tr>
<tr class="header">
<th rowspan="3"><h2 id="honradez-8">HONRADEZ (8)</h2></th>
<th><h2 id="ae">AE</h2></th>
<th><h2
id="falta-a-la-verdad-para-eludir-responsabilidades-sanciones-yo-encubrir-a-otros.">Falta
a la verdad para eludir responsabilidades, sanciones y/o encubrir a
otros.</h2></th>
<th><h2 id="grave-8">Grave</h2></th>
</tr>
<tr class="odd">
<th><h2 id="af">AF</h2></th>
<th><h2
id="no-devuelve-objetos-encontrados-valores-dinero-útiles-etc..">No
devuelve objetos encontrados (valores, dinero, útiles, etc.).</h2></th>
<th><h2 id="grave-9">Grave</h2></th>
</tr>
<tr class="header">
<th><h2 id="ag">AG</h2></th>
<th><h2
id="daña-las-pertenencias-de-sus-compañeros-corta-raya-o-destruye-cuadernos-u-otros.">Daña
las pertenencias de sus compañeros (corta, raya o destruye cuadernos u
otros).</h2></th>
<th><h2 id="grave-10">Grave</h2></th>
</tr>
<tr class="odd">
<th><h2 id="solidaridad-9">SOLIDARIDAD (9)</h2></th>
<th><h2 id="ah">AH</h2></th>
<th><h2
id="no-ayuda-a-sus-compañeros-en-dificultades-cuando-se-le-solicita.">No
ayuda a sus compañeros en dificultades cuando se le solicita.</h2></th>
<th><h2 id="leve-20">Leve</h2></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 

##### Tabla 3: Tabla del reglamento de deméritos del estudiante

##### *Fuente*:"Diario de Comportamiento" -- Evidencia institucional. {#fuentediario-de-comportamiento-evidencia-institucional.-1}

***I.E. N.° 80002 "Antonio Torres Araujo" (2025).***

> **5.3. Faltas Graves**

| **TABLA DE FALTAS GRAVES -- I.E. "Antonio Torres Araujo"** |            |                                                                                                                                                                                                                                     |           |
|------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Categoría**                                              | **Código** | **Rasgo (literal según Agenda)**                                                                                                                                                                                                    | **Nivel** |
| **FALTAS GRAVES**                                          | **a)**     | Destruir la propiedad ajena.                                                                                                                                                                                                        | Grave     |
|                                                            | **b)**     | Deteriorar la infraestructura, mobiliario o enseres de la I.E.                                                                                                                                                                      | Grave     |
|                                                            | **c)**     | Cometer fraude en pruebas, trabajos y asignaciones.                                                                                                                                                                                 | Grave     |
|                                                            | **d)**     | Portar pornografía en general.                                                                                                                                                                                                      | Grave     |
|                                                            | **e)**     | Falta de respeto al personal directivo, jerárquico, docente, administrativo, de servicio, autoridades estudiantiles, compañeros y padres de familia.                                                                                | Grave     |
|                                                            | **f)**     | Evasión de clase / I.E. y/o actividades programadas por la I.E.                                                                                                                                                                     | Grave     |
|                                                            | **g)**     | Manchar paredes, puertas, sillas, pizarras con cualquier tipo de inscripción.                                                                                                                                                       | Grave     |
|                                                            | **h)**     | Realizar bullying o cyber bullying a los integrantes de la I.E.                                                                                                                                                                     | Grave     |
|                                                            | **i)**     | Emitir comentarios que dañen la integridad y reputación de los alumnos, personal directivo, jerárquico, docente, administrativo, de servicio, autoridades estudiantiles, compañeros, padres de familia y la institución en general. | Grave     |
|                                                            | **j)**     | Practicar juegos que pongan en riesgo la integridad física y emocional de los estudiantes.                                                                                                                                          | Grave     |

##### Tabla 4: Tabla de faltas graves del estudiante

##### *Fuente*:"Diario de Comportamiento" -- Evidencia institucional. {#fuentediario-de-comportamiento-evidencia-institucional.-2}

***I.E. N.° 80002 "Antonio Torres Araujo" (2025).***

> **5.4. Faltas Muy Graves**

| **TABLA DE FALTAS MUY GRAVES -- I.E. "Antonio Torres Araujo"** |            |                                                                                                                                    |           |
|----------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Categoría**                                                  | **Código** | **Rasgo (literal según Agenda)**                                                                                                   | **Nivel** |
| **FALTAS MUY GRAVES**                                          | **a)**     | Fomentar actos de violencia en la vía pública estando uniformado.                                                                  | Muy grave |
|                                                                | **b)**     | Agredir verbal, física y psicológicamente a sus compañeros(as).                                                                    | Muy grave |
|                                                                | **c)**     | Portar y/o usar objetos punzo cortantes o armas de fuego verdaderas o simuladas.                                                   | Muy grave |
|                                                                | **d)**     | Inducir a otros estudiantes a cometer faltas graves o muy graves.                                                                  | Muy grave |
|                                                                | **e)**     | Amenazar y/o agredir físicamente al personal de la I.E.                                                                            | Muy grave |
|                                                                | **f)**     | Realizar actividades usando el nombre de la I.E. sin la debida autorización.                                                       | Muy grave |
|                                                                | **g)**     | Introducir y/o consumir drogas, cigarrillos, bebidas alcohólicas dentro de la I.E. o portando el uniforme fuera de la I.E.         | Muy grave |
|                                                                | **h)**     | Portar equipos celulares, fotográficos para registrar videos, imágenes, subirlos a internet y compartirlos por las redes sociales. | Muy grave |

##### 

##### Tabla 5: Tabla de faltas muy graves del estudiante

##### *Fuente*:"Diario de Comportamiento" -- Evidencia institucional. {#fuentediario-de-comportamiento-evidencia-institucional.-3}

***I.E. N.° 80002 "Antonio Torres Araujo" (2025).***

> **6. Levantamiento y definición de requisitos**
>
> **6.1. Requisitos Funcionales (RF)**

| **Tabla -- Requisitos Funcionales (RF)** |                                             |                                                                                                                                                             |                                  |               |                                                                     |
|------------------------------------------|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|---------------|---------------------------------------------------------------------|
| **ID**                                   | **Requisito (qué debe hacer el sistema)**   | **Criterios de aceptación (verificables)**                                                                                                                  | **Actores**                      | **Prioridad** | **RB / Fuente / Módulo**                                            |
| RF-01                                    | Registrar incidencia con campos mínimos.    | Permite elegir alumno, fecha/hora (auto), tipo (leve, grave, muy grave), descripción, evidencia opcional (foto/pdf). Guarda usuario que registra y sección. | Docente/Auxiliar, Tutor          | Alta          | Base "Incidencias"; entrevista y proceso actual.                    |
| RF-02                                    | Clasificar severidad de la incidencia.      | Debe seleccionar una de: Leve, Grave, Muy grave. El valor controla el flujo (escalamiento).                                                                 | Docente/Auxiliar                 | Alta          | RB-SEV; BPMN del proceso.                                           |
| RF-03                                    | Contar reincidencias por alumno y tipo.     | Contadores por semana y bimestre; visibles para tutor y dirección.                                                                                          | Tutor, Dirección                 | Alta          | **RB-1:** 3 semanales ⇒ alerta; **RB-2:** 5 bimestrales ⇒ citación. |
| RF-04                                    | Generar alerta automática al tutor.         | Al guardar la 3.ª falta semanal del mismo tipo, crea alerta y notifica (push/email).                                                                        | Sistema                          | Alta          | RB-1; módulo Notificaciones.                                        |
| RF-05                                    | Emitir citación automática.                 | Al registrar la 5.ª falta bimestral del mismo tipo, genera documento de citación (PDF) con folio, fecha y hora.                                             | Tutor                            | Alta          | RB-2; módulo Citaciones.                                            |
| RF-06                                    | Notificar al padre/apoderado.               | Envía notificación web push y/o email con acuse de entrega. Si no hay confirmación en ≤24h, reintento y aviso al tutor.                                     | Sistema, Padre                   | Alta          | **RB-3:** Plazo de 24h para confirmar.                              |
| RF-07                                    | Registrar confirmación del padre.           | Guarda marca de lectura/clic (fecha/hora, IP/Navegador). Si el padre responde "Recibido", queda como firmado digital.                                       | Padre                            | Alta          | Trazabilidad; módulo Auditoría.                                     |
| RF-08                                    | Derivar casos graves.                       | Incidencia "Grave" crea notificación a Dirección; genera tarea "Citar al padre (24--48h)".                                                                  | Tutor, Dirección                 | Alta          | Reglas de proceso; módulo Derivaciones.                             |
| RF-09                                    | Derivar casos muy graves a TOE y Dirección. | Cuando "Muy grave", crea caso crítico para TOE y Dirección; exige registro en **Libro de Incidencias** y acta.                                              | Docente/Auxiliar, TOE, Dirección | Alta          | Protocolo institucional; módulo Libro.                              |
| RF-10                                    | Registrar en "Libro de Incidencias".        | Para graves y muy graves: número correlativo, hechos, medidas, firmantes; bloqueo de edición tras cierre.                                                   | Dirección, TOE                   | Alta          | Libro oficial; módulo Libro.                                        |
| RF-11                                    | Gestionar actas y constancias.              | Genera **Acta de Compromiso** y **Constancia de citación** (PDF) con firmas: digital (padre) o manual (adjunto).                                            | Tutor, Dirección, TOE, Padre     | Media         | Documentos; módulo Documentos.                                      |
| RF-12                                    | Historial por estudiante.                   | Vista de todas las incidencias, alertas, citaciones y firmas; exportable (PDF/CSV).                                                                         | Docente, Tutor, Dirección, TOE   | Alta          | Seguimiento; módulo Reportes.                                       |
| RF-13                                    | Panel de alertas del tutor.                 | Lista priorizada (semanales, sin confirmación, reintentos fallidos). Filtros por aula y tipo.                                                               | Tutor                            | Alta          | RB-1, RB-3; módulo Tablero.                                         |
| RF-14                                    | Reportes estadísticos.                      | Por aula, grado, tipo y periodo (semana/bimestre/año). Gráficos y top N de reincidencias.                                                                   | Dirección, TOE                   | Media         | Solicitud de Dirección; módulo Reportes.                            |
| RF-15                                    | Gestión de usuarios y roles.                | Roles: Docente/Auxiliar, Tutor, Dirección, TOE, Padre. Accesos por rol y por aula (RLS).                                                                    | Admin                            | Alta          | Seguridad; módulo Usuarios.                                         |
| RF-16                                    | Directorio de contactos.                    | Catálogo de alumnos ↔ padres (teléfono/email) y de docentes/tutores. Importación CSV.                                                                       | Admin                            | Media         | Soporte al envío; módulo Directorio.                                |
| RF-17                                    | Bitácora/auditoría.                         | Registra quién hizo qué y cuándo (crear/editar/cerrar, envíos, lecturas, firmas).                                                                           | Sistema                          | Alta          | Cumplimiento y trazabilidad.                                        |
| RF-18                                    | Modo offline básico (PWA).                  | Permite preparar borradores de incidencias y enviarlas al volver la conexión.                                                                               | Docente                          | Media         | PWA/Service Worker.                                                 |
| RF-19                                    | Búsqueda y filtros.                         | Por alumno, fecha, tipo, estado (pendiente, alertado, citado, cerrado).                                                                                     | Todos (según rol)                | Alta          | Usabilidad.                                                         |
| RF-20                                    | Cierre de caso.                             | Reglas de cierre: leve con firma o sin reincidencia; grave con acta y registro; muy grave con libro+medidas.                                                | Tutor, Dirección, TOE            | Alta          | BPMN; módulo Casos.                                                 |

##### Tabla 6: Tabla de requisitos funcionales

##### *Fuente*: Elaboración propia (2025)***.*** {#fuente-elaboración-propia-2025.-1}

> **6.2. Requisitos No Funcionales (RNF)**

| **Tabla -- Requisitos No Funcionales (RNF)** |                                    |                                                                                                              |               |                    |
|----------------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------|---------------|--------------------|
| **ID**                                       | **Atributo de calidad**            | **Especificación medible / Criterio de verificación**                                                        | **Prioridad** | **Alcance / Nota** |
| RNF-01                                       | Seguridad -- Autenticación y roles | Login por usuario/rol; políticas: 10 intentos fallidos ⇒ bloqueo 15 min; recuperación segura por correo.     | Alta          | Front/Back/Auth    |
| RNF-02                                       | Seguridad -- Autorización/RLS      | Acceso a datos restringido por rol y por aula (Row-Level Security). Pruebas: un docente no ve aulas ajenas.  | Alta          | BD (Supabase)      |
| RNF-03                                       | Seguridad -- Cifrado               | HTTPS en tránsito; contraseñas con hash fuerte; documentos firmados digitalmente (hash y folio).             | Alta          | Back/Infra         |
| RNF-04                                       | Auditoría                          | Logs inmutables (no editables) de operaciones clave; exportables.                                            | Alta          | Back/BD            |
| RNF-05                                       | Privacidad                         | Minimización de datos; consentimiento visible al primer uso para padres; política de retención (ver RNF-12). | Alta          | Legal/UX           |
| RNF-06                                       | Disponibilidad                     | 99% en horario escolar (L-V 07:00--20:00). Monitoreo y alerta si downtime \> 5 min.                          | Alta          | Infra              |
| RNF-07                                       | Rendimiento                        | Listados (\<50 filas) en ≤3 s; registro de incidencia en ≤2 s; envío a cola de notificaciones en ≤1 s.       | Media         | Front/Back         |
| RNF-08                                       | Capacidad                          | Soportar ≥1 800 estudiantes, ≥2 500 padres y ≥200 usuarios internos; ≥10 000 incidencias/año.                | Media         | BD                 |
| RNF-09                                       | Notificaciones confiables          | Reintentos exponenciales hasta 24 h; tasa de entrega ≥95% (push/email).                                      | Alta          | Back/Workers       |
| RNF-10                                       | Usabilidad                         | Interfaz responsive; 2 clics para registrar incidencia; accesibilidad mínima WCAG AA.                        | Media         | Front              |
| RNF-11                                       | Portabilidad                       | PWA instalable (Android/desktop); funcionar en Chrome/Edge/Firefox actuales.                                 | Media         | Front              |
| RNF-12                                       | Retención y backups                | Incidencias/actas: retención 5 años; backups diarios con 7 días de historial y 1 mensual por 1 año.          | Alta          | BD/Infra           |
| RNF-13                                       | Integridad de documentos           | PDFs con numeración/folio único y sellado de tiempo; no editables tras cierre del caso.                      | Alta          | Documentos         |
| RNF-14                                       | Internacionalización               | Fechas en formato local (PE), zona horaria America/Lima; textos en español neutro.                           | Baja          | Front/Back         |
| RNF-15                                       | Observabilidad                     | Métricas (envíos, lecturas, fallos), trazas por solicitud, tablero de estado para Dirección.                 | Media         | Back/Ops           |
| RNF-16                                       | Mantenibilidad                     | Código con CI/CD, pruebas básicas (lint + unitarias), cobertura mínima 60% en módulos críticos.              | Media         | DevOps             |
| RNF-17                                       | Soporte offline                    | Cacheo de UI y catálogos; cola local de borradores con re-envío al reconectar.                               | Media         | PWA                |
| RNF-18                                       | Interoperabilidad                  | Importación CSV (alumnos/padres); exportación CSV/PDF de reportes y libro.                                   | Media         | Front/Back         |

##### Tabla 7 : Tabla de requisitos no funcionales {#tabla-7-tabla-de-requisitos-no-funcionales}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-2}

> **7. Análisis de los requisitos**
>
> Al haber definido estos requisitos permitió consolidar una visión
> integral del sistema "Agenda Digital ATA", diferenciando las
> necesidades funcionales esenciales ---relacionadas con la
> comunicación, registro y seguimiento de incidencias--- de los aspectos
> no funcionales, centrados en la seguridad, la disponibilidad y la
> usabilidad del sistema.  
> A través de las entrevistas, observaciones y revisión documental, se
> logró validar que los requerimientos funcionales (RF) priorizan la
> automatización de la trazabilidad, la reducción de la carga manual del
> tutor y la confirmación efectiva de los padres. Estos puntos responden
> directamente a los problemas detectados durante el levantamiento:
> pérdida de agendas, ausencia de registro digital y falta de control
> sobre la comunicación de incidencias.
>
> En cuanto a los requisitos no funcionales (RNF), el análisis evidenció
> la necesidad de garantizar un sistema confiable y accesible, que
> mantenga altos niveles de seguridad, privacidad de datos y
> disponibilidad, asegurando además la compatibilidad multiplataforma
> (PWA) y la operatividad sin conexión en entornos escolares con
> limitaciones de internet.
>
> La clasificación y priorización de los requisitos se realizó de forma
> colaborativa con la supervisora institucional y el área TOE, empleando
> criterios de impacto, urgencia y factibilidad técnica. El resultado es
> un conjunto equilibrado de funcionalidades alineadas al proceso real
> de comunicación entre escuela y familia, con reglas de negocio
> precisas y verificables que permitirán medir la eficiencia del sistema
> durante su fase de implementación.  
> En conjunto, este análisis sirvió como punto de cierre de la primera
> actividad del plan de trabajo y como base sólida para el diseño
> técnico, modelado de datos y desarrollo del MVP, los cuales se
> abordarán en la siguiente etapa.
>
> **III.2. Actividad 2**: Diseño de la Agenda Digital ATA
>
> **III.2.1 Alcance del MVP y actores**
>
> **1. Introducción breve (contexto)**
>
> El diseño del sistema "Agenda Digital ATA" parte del levantamiento y
> validación de los requisitos funcionales y no funcionales realizados
> en la primera actividad.
>
> En esta etapa, se define el alcance del MVP (Minimum Viable Product),
> que corresponde a la primera versión funcional del sistema orientada a
> validar los procesos críticos de comunicación entre la institución
> educativa y los padres de familia mediante la digitalización del
> registro de incidencias y citaciones.
>
> **2. Objetivo del MVP**
>
> El MVP tiene como objetivo automatizar el flujo principal de
> comunicación de incidencias en la I.E. "Antonio Torres Araujo",
> asegurando la trazabilidad entre los actores (docente, tutor, TOE,
> dirección y padre de familia).
>
> Esta versión permitirá registrar, clasificar y notificar incidencias,
> así como generar citaciones y actas digitales, conservando las reglas
> de negocio institucionales (alertas por reincidencias, confirmaciones
> y derivaciones).

![](media/image28.png){width="2.6008147419072616in"
height="1.7292891513560804in"}

#### Figura 7: Ilustración representativa objetivo del MVP

***Fuente:* Elaboración propia (2025).**

> **3. Alcance funcional (módulos incluidos)**

| **Módulo**                         | **Descripción / Funcionalidad principal**                                                                              |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Registro de incidencias            | Permite al docente o auxiliar registrar las incidencias de los estudiantes con clasificación (leve, grave, muy grave). |
| Gestión de reincidencias y alertas | Calcula automáticamente las reincidencias semanales y bimestrales, generando alertas o citaciones.                     |
| Notificaciones automáticas         | Envío de notificaciones push o correo electrónico a los padres con acuse de recepción.                                 |
| Citaciones y actas digitales       | Generación de documentos PDF (citaciones y actas) firmados digital o manualmente.                                      |
| Libro de incidencias               | Registro consolidado de casos graves y muy graves, accesible por Dirección y TOE.                                      |
| Panel de control del tutor         | Visualización de alertas, casos pendientes, historial por alumno y confirmaciones.                                     |
| Acceso del padre                   | Recepción de notificaciones, confirmación de lectura y descarga de citaciones.                                         |
| Gestión de usuarios y roles        | Control de accesos (Docente, Tutor, Dirección, TOE, Padre) con autenticación segura.                                   |
| Reportes estadísticos              | Tablas y gráficos de incidencias por tipo, aula o periodo.                                                             |

##### 

##### Tabla 8 : Tabla de Alcance funcional {#tabla-8-tabla-de-alcance-funcional}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-3}

> **4. Alcance funcional (módulos incluidos)**

| **Elemento excluido**                          | **Motivo de exclusión (para fases futuras)**                                     |
|------------------------------------------------|----------------------------------------------------------------------------------|
| Integración con UGEL o MINEDU                  | Requiere convenios externos; se dejará para una versión institucional posterior. |
| Aplicación móvil nativa (Android/iOS)          | El MVP será PWA (instalable), priorizando navegadores web.                       |
| Módulo de analítica avanzada o IA              | Se implementará en fases posteriores, tras obtener datos históricos.             |
| Personalización de plantillas por usuario      | No crítico para la validación inicial.                                           |
| Panel administrativo de configuración avanzada | Se mantendrá básico para esta versión.                                           |

##### 

##### Tabla 8 : Tabla de Exclusiones del MVP {#tabla-8-tabla-de-exclusiones-del-mvp}

##### *Fuente*: Elaboración propia (2025) {#fuente-elaboración-propia-2025}

> **5. Actores del sistema (identificación y descripción)**

| **Actor**                             | **Rol en el sistema / Función principal**                                   |
|---------------------------------------|-----------------------------------------------------------------------------|
| Docente / Auxiliar                    | Registra incidencias en el sistema (nivel leve, grave o muy grave).         |
| Tutor                                 | Supervisa las reincidencias, genera alertas, citaciones y actas.            |
| Dirección                             | Gestiona los casos graves y muy graves; administra el libro de incidencias. |
| TOE (Tutoría y Orientación Educativa) | Interviene en faltas graves/muy graves y coordina con la Dirección.         |
| Padre / Apoderado                     | Recibe notificaciones, confirma recepción, descarga citaciones y actas.     |
| Administrador del sistema             | Gestiona usuarios, roles y control de acceso general.                       |

##### 

##### Tabla 9 : Tabla de Actores {#tabla-9-tabla-de-actores}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-4}

> **6. Cierre**
>
> En conclusión, el alcance definido para el MVP permitirá validar los
> flujos esenciales de comunicación entre la institución y los padres de
> familia, priorizando la automatización de los registros, alertas y
> notificaciones.
>
> Con esta base, en el siguiente subpunto se detallan las reglas de
> negocio que regulan el comportamiento del sistema y definen la lógica
> de las operaciones internas de la "Agenda Digital ATA".
>
> **III.2.2 Reglas de negocio consolidadas**
>
> El diseño del sistema "Agenda Digital ATA" se sustenta en un conjunto
> de reglas de negocio institucionales que definen el comportamiento de
> los actores ante cada tipo de incidencia.  
> Estas reglas fueron validadas con la supervisora institucional (Prof.
> Kelly Salas) y derivadas del análisis del Reglamento Interno de la
> Institución Educativa N.° 80002 "Antonio Torres Araujo" (2025) y del
> proceso BPMN levantado en la fase anterior.  
> Su aplicación permitirá automatizar el flujo de decisiones, asegurar
> coherencia con la normativa escolar y garantizar trazabilidad en la
> comunicación con los padres de familia.
>
> **1.Reglas generales de registro y flujo**

| **Código** | **Regla de Negocio**       | **Descripción / Lógica del Sistema**                                                                           |
|------------|----------------------------|----------------------------------------------------------------------------------------------------------------|
| **R1**     | Registro único diario      | Cada estudiante puede tener un máximo de una incidencia registrada por tipo en un mismo día.                   |
| **R2**     | Clasificación obligatoria  | Toda incidencia debe clasificarse al momento del registro como Leve, Grave o Muy Grave.                        |
| **R3**     | Control de firma del padre | En los casos leves, el sistema genera una notificación digital que el padre debe confirmar dentro de 24 horas. |
| **R4**     | Trazabilidad completa      | Cada registro genera un identificador único con fecha, hora, usuario y nivel de gravedad.                      |
| **R5**     | Escalamiento automático    | Las incidencias se derivan automáticamente al Tutor, TOE o Dirección, según el nivel de gravedad.              |
| **R6**     | Validación de duplicidad   | El sistema impide registrar la misma falta más de una vez el mismo día para un estudiante.                     |
| **R7**     | Seguimiento del caso       | Todo caso debe permanecer "abierto" hasta recibir confirmación de lectura o firma del apoderado.               |

##### 

##### Tabla 9 : Reglas generales de registro y flujo de incidencias en el sistema "Agenda Digital ATA" {#tabla-9-reglas-generales-de-registro-y-flujo-de-incidencias-en-el-sistema-agenda-digital-ata}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-5}

> **2.Reglas para clasificación y reincidencias**

| **Código** | **Condición / Criterio**                                      | **Acción del Sistema**                                                                |
|------------|---------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **R8**     | 3 faltas leves iguales en una semana                          | Generar alerta automática al tutor y cambio de estado del estudiante a "Reincidente". |
| **R9**     | 5 faltas leves iguales en un bimestre                         | Generar citación automática del tutor al padre con formato digital.                   |
| **R10**    | Faltas graves (agresión, fraude, daños, irrespeto)            | Derivar automáticamente al TOE y Dirección.                                           |
| **R11**    | Faltas muy graves (violencia física, drogas, amenazas, acoso) | Notificación inmediata a Dirección y TOE, con registro en el Libro de Incidencias.    |
| **R12**    | Falta de confirmación del padre en 24 h                       | Notificar al tutor para contacto manual (llamada o entrevista).                       |
| **R13**    | Reincidencia grave en menos de 30 días                        | Escalamiento inmediato a TOE con reporte adjunto.                                     |

##### 

##### Tabla 10:Reglas de negocio para clasificación y reincidencias de faltas

##### Fuente: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-6}

> **3.Reglas para notificaciones y comunicación**

| **Código** | **Regla**                   | **Acción automatizada del sistema**                                                                                               |
|------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **R14**    | Comunicación formal digital | Cada incidencia registrada genera una notificación automática al padre (vía Push o correo electrónico).                           |
| **R15**    | Constancia de recepción     | La lectura del mensaje por el padre queda registrada en Firestore como "Recibido".                                                |
| **R16**    | Citaciones                  | El sistema genera automáticamente un documento PDF con los datos del estudiante, tipo de falta, fecha y tutor responsable.        |
| **R17**    | Acta digital                | En casos graves o muy graves, se genera una "Acta de Compromiso" digital que puede firmarse electrónicamente o subirse escaneada. |
| **R18**    | Archivo histórico           | Las incidencias cerradas se almacenan en una base de datos histórica, accesible solo por TOE y Dirección.                         |

##### 

##### Tabla 11:Reglas de negocio para notificaciones y comunicación institucional

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-7}

> **4.Reglas específicas por tipo de falta**

| **Tipo de falta** | **Responsable principal** | **Acción inmediata del sistema**                                                |
|-------------------|---------------------------|---------------------------------------------------------------------------------|
| **Leve**          | **Docente o auxiliar**    | **Registrar incidencia → notificar padre → esperar confirmación en 24 h.**      |
| **Grave**         | **Tutor / TOE**           | **Generar citación → registrar en Libro de Incidencias → notificar Dirección.** |
| **Muy grave**     | **TOE / Dirección**       | **Derivación urgente → emisión de acta → seguimiento institucional.**           |

##### 

##### Tabla 12:Reglas de negocio específicas por tipo de falta (Leve, Grave y Muy Grave)

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-8}

> **5.Regla de escalamiento y cierre**

| **Código** | **Condición de cierre**                    | **Acción del sistema**                                                    |
|------------|--------------------------------------------|---------------------------------------------------------------------------|
| **R19**    | **Firma o confirmación digital del padre** | **Cambiar estado del caso a "Cerrado".**                                  |
| **R20**    | **Inasistencia a citación**                | **Registrar como "Pendiente de seguimiento" y generar nueva alerta TOE.** |
| **R21**    | **Acta firmada y registrada**              | **Archivar en base de datos y mover caso a histórico.**                   |

##### 

##### Tabla 13:Reglas de negocio de escalamiento y cierre de casos en la Agenda Digital ATA

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-9}

Las reglas consolidadas establecen el marco funcional que permitirá que
el sistema "Agenda Digital ATA" opere de manera automática, precisa y
conforme al reglamento institucional.

Su aplicación asegura la trazabilidad de cada comunicación, el
cumplimiento de los criterios de gravedad y la formalización de las
citaciones y actas de compromiso, contribuyendo a la transparencia y
eficiencia del proceso educativo.

> **III.2.3 Arquitectura de solución y diagrama de contexto**
>
> **1.Arquitectura de la solución**
>
> La arquitectura propuesta para el sistema "Agenda Digital ATA" se basa
> en un modelo multicapa y escalable, estructurado bajo un enfoque
> cliente--servidor con servicios distribuidos.  
> El sistema está diseñado para operar como una aplicación web
> progresiva (PWA), capaz de funcionar tanto en navegadores de
> escritorio como en dispositivos móviles, garantizando accesibilidad,
> velocidad de respuesta y funcionamiento offline básico.
>
> La capa de presentación corresponde a la interfaz PWA desarrollada
> inicialmente en HTML, CSS y JavaScript, con proyección a ser migrada a
> React + Vite, lo que permitirá un entorno modular, dinámico y
> adaptable.  
> Esta capa interactúa con el backend desplegado en Cloudflare Workers,
> un entorno serverless basado en el framework Hono, encargado de
> procesar peticiones HTTP, validar usuarios mediante JWT, aplicar las
> reglas de negocio del sistema y comunicarse con la base de datos
> mediante el ORM Drizzle.
>
> La capa de datos se implementa sobre la plataforma Supabase
> (PostgreSQL + Auth + Storage), que ofrece autenticación,
> almacenamiento de archivos y sincronización en tiempo real.  
> Además, se ha considerado un módulo de notificaciones futuras (por
> correo electrónico, WhatsApp o mensajería push) para asegurar la
> escalabilidad del sistema y su integración futura con los canales
> institucionales de comunicación.

![](media/image17.png){width="5.905511811023622in"
height="5.208333333333333in"}

#### Figura 8: Arquitectura lógica de la solución "Agenda Virtual Escolar ATA"

***Fuente:* Elaboración propia (2025).**

> **2.Diagrama de contexto**
>
> El diagrama de contexto describe la interacción entre el sistema
> Agenda Digital ATA y los actores internos y externos de la Institución
> Educativa Antonio Torres Araujo.  
> Su propósito es identificar los flujos de información principales que
> ocurren entre los distintos usuarios del sistema, así como los límites
> de responsabilidad de cada uno.
>
> En el entorno interno, los actores principales son el docente, tutor,
> auxiliar, TOE (Tutoría y Orientación Educativa) y la dirección
> institucional.  
> Cada uno cumple un rol específico en el proceso de registro,
> derivación y seguimiento de incidencias escolares (méritos y
> deméritos).  
> En el entorno externo, se considera al padre o apoderado, quien recibe
> notificaciones y puede confirmar citaciones, y a las entidades
> MINEDU/UGEL/SIAGIE, que solo se contemplan a nivel de escalabilidad o
> generación de reportes institucionales, sin integración directa en la
> versión actual del sistema.
>
> Este diagrama evidencia el flujo principal de comunicación: el docente
> registra una incidencia → el tutor revisa y deriva según las reglas de
> negocio → el TOE gestiona las citaciones y actas → el padre es
> notificado digitalmente → la dirección supervisa y consolida reportes
> para análisis institucional.  
> De esta manera, se refleja el tránsito completo de la información
> dentro del sistema digital propuesto.

![](media/image30.png){width="7.458272090988626in"
height="2.4432272528433945in"}

#### Figura 9: Diagrama de contexto del sistema "Agenda Virtual Escolar ATA"

***Fuente:* Elaboración propia (2025).**

> **III.2.4 Modelo de datos (DER) y diccionario**
>
> **1.Modelado conceptual**
>
> En esta etapa se representa de forma conceptual la estructura de los
> datos que maneja el sistema *Agenda Digital ATA*.
>
> El objetivo es identificar las entidades principales, sus atributos y
> las relaciones entre ellas, sin entrar todavía en detalles técnicos de
> implementación.
>
> Este modelo permite entender cómo se conectan los actores y los
> objetos de información (usuarios, estudiantes, incidencias, alertas,
> citaciones y actas) dentro del sistema.
>
> ![](media/image15.png){width="5.462575459317585in"
> height="5.086842738407699in"}

#### Figura 10: Diseño del Modelo conceptual de la base de datos Agenda Virtual Escolar ATA (notación Chen)

***Fuente:* Elaboración propia (2025).**

| **Relación**                                   | **Descripción**                                                         | **Cardinalidad** |
|------------------------------------------------|-------------------------------------------------------------------------|------------------|
| **USUARIO -- registra -- INCIDENCIA**          | Cada usuario (docente, tutor o TOE) puede registrar muchas incidencias. | **1:N**          |
| **ESTUDIANTE -- tiene -- INCIDENCIA**          | Un estudiante puede tener varias incidencias.                           | **1:N**          |
| **INCIDENCIA -- es_de_tipo -- TIPO_INCIDENTE** | Cada incidencia pertenece a un tipo (mérito o demérito).                | **N:1**          |
| **INCIDENCIA -- genera -- ALERTA**             | Una o más incidencias pueden generar una alerta (tutor o TOE).          | **0..N : 0..1**  |
| **ALERTA -- deriva_en -- CITACIÓN**            | Una alerta puede derivar en una citación formal.                        | **0..1 : 0..1**  |
| **CITACIÓN -- formaliza -- ACTA**              | Cada citación puede formalizarse en un acta.                            | **0..1 : 0..1**  |
| **ESTUDIANTE -- pertenece_a -- AULA**          | Cada estudiante pertenece a un aula única.                              | **N:1**          |
| **USUARIO -- es_padre_de -- ESTUDIANTE**       | Un usuario con rol "Padre" puede tener varios hijos registrados.        | **1:N**          |
| **USUARIO -- es_tutor_de -- ESTUDIANTE**       | Un usuario con rol "Tutor" puede estar asignado a varios estudiantes.   | **1:N**          |

##### Tabla 14: Descripción de las relaciones del modelo conceptual de base de datos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-10}

> **2.Diseño lógico**
>
> En esta fase se transforma el modelo conceptual en un modelo lógico
> que representa las estructuras de datos de forma normalizada e
> independiente del gestor de base de datos.  
> Se definen las entidades principales, sus atributos, tipos de datos y
> las relaciones entre ellas, asegurando la integridad referencial y
> evitando redundancias.
>
> A continuación, se presenta el modelo lógico de la base de datos del
> sistema "Agenda Digital ATA", en el cual se establecen las tablas y
> relaciones necesarias para la gestión de usuarios, estudiantes,
> incidencias, alertas, citaciones y actas.

![](media/image13.png){width="6.73001968503937in"
height="5.126595581802275in"}

#### Figura 11: Diseño Lógico Agenda Virtual Escolar ATA

***Fuente:* Elaboración propia (2025).**

> **3.Diseño físico**
>
> En esta fase se define la estructura física final de la base de datos
> "Agenda Digital ATA", implementada en PostgreSQL (a través del
> servicio Supabase).
>
> Se establecen los tipos de datos, claves primarias, foráneas, índices
> y restricciones de integridad referencial necesarias para garantizar
> la coherencia de la información.
>
> Asimismo, se contemplan las reglas de negocio identificadas en etapas
> previas, como el escalamiento automático de faltas leves y la relación
> 1:1 entre citaciones y actas.

![](media/image42.png){width="7.612327209098862in"
height="4.974391951006124in"}

#### Figura 12: Diseño físico de la base de datos del sistema "Agenda Virtual Escolar ATA"

***Fuente:* Elaboración propia (2025).**

> **4.Diccionario de datos**
>
> El diccionario de datos describe de forma detallada cada tabla, campo
> y tipo de dato de la base de datos, indicando su propósito, longitud,
> restricciones y relaciones.  
> Esta documentación permite mantener una comprensión clara y uniforme
> del modelo de datos, facilitando el mantenimiento, escalabilidad e
> implementación del sistema en el gestor de base de datos PostgreSQL
> (utilizado a través de Supabase).
>
> A continuación, se presenta el diccionario de datos correspondiente al
> sistema *Agenda Digital ATA*.
>
> **4.1.Estructura de tabla (modelo base para todas las tablas)**

| **Nombre del campo** | **Tipo de dato** | **Longitud** | **Nulidad**  | **Llave** | **Descripción / Observación**                 |
|----------------------|------------------|--------------|--------------|-----------|-----------------------------------------------|
| **nombre_campo**     | **varchar**      | **100**      | **NOT NULL** | **PK**    | **Descripción breve del propósito del campo** |

##### Tabla 15: Descripción de las relaciones del modelo conceptual de base de datos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-11}

> **4.2.Tabla users**

| **Campo**           | **Tipo**           | **Long.** | **Nulidad**  | **Llave** | **Descripción**                         |
|---------------------|--------------------|-----------|--------------|-----------|-----------------------------------------|
| **id**              | **uuid**           | **---**   | **NOT NULL** | **PK**    | **Identificador único del usuario.**    |
| **email**           | **varchar**        | **160**   | **NOT NULL** | **UQ**    | **Correo institucional (único).**       |
| **password_hash**   | **varchar**        | **200**   | **NOT NULL** | **---**   | **Hash de la contraseña.**              |
| **role**            | **enum role_enum** | **---**   | **NOT NULL** | **---**   | **Rol del usuario en el sistema.**      |
| **nombre_completo** | **varchar**        | **160**   | **NOT NULL** | **---**   | **Nombre y apellidos del usuario.**     |
| **activo**          | **boolean**        | **---**   | **NOT NULL** | **---**   | **Indicador de habilitación.**          |
| **created_at**      | **timestamp**      | **---**   | **NOT NULL** | **---**   | **Fecha/hora de creación.**             |
| **updated_at**      | **timestamp**      | **---**   | **NOT NULL** | **---**   | **Fecha/hora de última actualización.** |

##### Tabla 16: Tabla de usuarios

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-12}

> **4.3.Tabla estudiantes**

| **Campo**           | **Tipo**            | **Long.** | **Nulidad**  | **Llave**         | **Descripción**                          |
|---------------------|---------------------|-----------|--------------|-------------------|------------------------------------------|
| **id**              | **uuid**            | **---**   | **NOT NULL** | **PK**            | **Identificador del estudiante.**        |
| **nombre_completo** | **varchar**         | **160**   | **NOT NULL** | **---**           | **Nombre del estudiante.**               |
| **dni**             | **varchar**         | **12**    | **NULL**     | **UQ**            | **DNI (si está disponible).**            |
| **sexo**            | **enum sexo_enum**  | **---**   | **NULL**     | **---**           | **Sexo.**                                |
| **nivel**           | **enum nivel_enum** | **---**   | **NOT NULL** | **---**           | **Inicial/Primaria/Secundaria.**         |
| **grado**           | **varchar**         | **10**    | **NOT NULL** | **---**           | **Grado (p. ej., "3", "4", "5").**       |
| **seccion**         | **varchar**         | **3**     | **NOT NULL** | **---**           | **Sección (A/B/C...).**                  |
| **aula**            | **varchar**         | **20**    | **NULL**     | **---**           | **Pabellón/aula referencial.**           |
| **tutor_id**        | **uuid**            | **---**   | **NULL**     | **FK → users.id** | **Tutor asignado.**                      |
| **padre_id**        | **uuid**            | **---**   | **NULL**     | **FK → users.id** | **Padre/Apoderado (si usa el sistema).** |
| **activo**          | **boolean**         | **---**   | **NOT NULL** | **---**           | **Estudiante vigente.**                  |
| **created_at**      | **timestamp**       | **---**   | **NOT NULL** | **---**           | **Creación.**                            |
| **updated_at**      | **timestamp**       | **---**   | **NOT NULL** | **---**           | **Última actualización.**                |

##### Tabla 17: Tabla estudiantes

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-13}

> **4.4.Tabla periodos**

| **Campo**        | **Tipo**      | **Long.** | **Nulidad**  | **Llave** | **Descripción**                            |
|------------------|---------------|-----------|--------------|-----------|--------------------------------------------|
| **id**           | **uuid**      | **---**   | **NOT NULL** | **PK**    | **Identificador del período académico.**   |
| **nombre**       | **varchar**   | **50**    | **NOT NULL** | **UQ**    | **Nombre (p. ej., "2025 -- Bimestre I").** |
| **fecha_inicio** | **date**      | **---**   | **NOT NULL** | **---**   | **Inicio del período.**                    |
| **fecha_fin**    | **date**      | **---**   | **NOT NULL** | **---**   | **Fin del período.**                       |
| **created_at**   | **timestamp** | **---**   | **NOT NULL** | **---**   | **Creación.**                              |
| **updated_at**   | **timestamp** | **---**   | **NOT NULL** | **---**   | **Última actualización.**                  |

##### Tabla 18: Tabla periodos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-14}

> **4.5.Tabla catalogo_meritos**

| **Campo**       | **Tipo**      | **Long.** | **Nulidad**  | **Llave** | **Descripción**                  |
|-----------------|---------------|-----------|--------------|-----------|----------------------------------|
| **id**          | **uuid**      | **---**   | **NOT NULL** | **PK**    | **Identificador del mérito.**    |
| **codigo**      | **varchar**   | **20**    | **NOT NULL** | **UQ**    | **Código interno del mérito.**   |
| **nombre**      | **varchar**   | **120**   | **NOT NULL** | **---**   | **Título del mérito.**           |
| **descripcion** | **text**      | **---**   | **NULL**     | **---**   | **Descripción/criterios.**       |
| **area**        | **varchar**   | **60**    | **NOT NULL** | **---**   | **Área/criterio institucional.** |
| **vigente**     | **boolean**   | **---**   | **NOT NULL** | **---**   | **Habilitado para uso.**         |
| **created_at**  | **timestamp** | **---**   | **NOT NULL** | **---**   | **Creación.**                    |
| **updated_at**  | **timestamp** | **---**   | **NOT NULL** | **---**   | **Última actualización.**        |

##### Tabla 19: Catálogo de méritos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-15}

> **4.6.Tabla catalogo_demeritos**

| **Campo**       | **Tipo**                | **Long.** | **Nulidad**  | **Llave** | **Descripción**                           |
|-----------------|-------------------------|-----------|--------------|-----------|-------------------------------------------|
| **id**          | **uuid**                | **---**   | **NOT NULL** | **PK**    | **Identificador del demérito.**           |
| **codigo**      | **varchar**             | **20**    | **NOT NULL** | **UQ**    | **Código interno del demérito.**          |
| **nombre**      | **varchar**             | **120**   | **NOT NULL** | **---**   | **Título de la falta.**                   |
| **descripcion** | **text**                | **---**   | **NULL**     | **---**   | **Descripción/regla.**                    |
| **categoria**   | **varchar**             | **60**    | **NULL**     | **---**   | **Categoría libre (p. ej., Asistencia).** |
| **severidad**   | **enum severidad_enum** | **---**   | **NOT NULL** | **---**   | **Leve/Grave/Muy grave.**                 |
| **vigente**     | **boolean**             | **---**   | **NOT NULL** | **---**   | **Habilitado para uso.**                  |
| **created_at**  | **timestamp**           | **---**   | **NOT NULL** | **---**   | **Creación.**                             |
| **updated_at**  | **timestamp**           | **---**   | **NOT NULL** | **---**   | **Última actualización.**                 |

##### Tabla 20: Catálogo de deméritos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-16}

> **4.7.Tabla catalogo_incidencias**

| **Campo**                | **Tipo**                        | **Long.** | **Nulidad**  | **Llave**                      | **Descripción**                            |
|--------------------------|---------------------------------|-----------|--------------|--------------------------------|--------------------------------------------|
| **id**                   | **uuid**                        | **---**   | **NOT NULL** | **PK**                         | **Identificador de la incidencia.**        |
| **estudiante_id**        | **uuid**                        | **---**   | **NOT NULL** | **FK → estudiantes.id**        | **Estudiante involucrado.**                |
| **periodo_id**           | **uuid**                        | **---**   | **NOT NULL** | **FK → periodos.id**           | **Período académico.**                     |
| **tipo**                 | **enum incidencia_tipo_enum**   | **---**   | **NOT NULL** | **---**                        | **merito o demerito.**                     |
| **catalogo_merito_id**   | **uuid**                        | **---**   | **NULL**     | **FK → catalogo_meritos.id**   | **Si es mérito.**                          |
| **catalogo_demerito_id** | **uuid**                        | **---**   | **NULL**     | **FK → catalogo_demeritos.id** | **Si es demérito.**                        |
| **codigo**               | **varchar**                     | **20**    | **NULL**     | **---**                        | **Código institucional de la falta/acto.** |
| **descripcion**          | **text**                        | **---**   | **NULL**     | **---**                        | **Detalle del hecho.**                     |
| **severidad**            | **enum severidad_enum**         | **---**   | **NULL**     | **---**                        | **Solo deméritos o derivados.**            |
| **registrado_por**       | **uuid**                        | **---**   | **NOT NULL** | **FK → users.id**              | **Usuario que registra.**                  |
| **estado**               | **enum incidencia_estado_enum** | **---**   | **NOT NULL** | **---**                        | **pendiente/revisado/resuelto.**           |
| **accion_requerida**     | **varchar**                     | **200**   | **NULL**     | **---**                        | **Acción a ejecutar.**                     |
| **evidencia_url**        | **varchar**                     | **512**   | **NULL**     | **---**                        | **Archivo o imagen adjunta.**              |
| **fecha**                | **timestamp**                   | **---**   | **NOT NULL** | **---**                        | **Fecha/hora del hecho.**                  |
| **created_at**           | **timestamp**                   | **---**   | **NOT NULL** | **---**                        | **Creación.**                              |
| **updated_at**           | **timestamp**                   | **---**   | **NOT NULL** | **---**                        | **Última actualización.**                  |

##### Tabla 21: Tabla de incidencias

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-17}

> **4.7.Tabla alertas**

| **Campo**            | **Tipo**                    | **Long.** | **Nulidad**  | **Llave**               | **Descripción**                           |
|----------------------|-----------------------------|-----------|--------------|-------------------------|-------------------------------------------|
| **id**               | **uuid**                    | **---**   | **NOT NULL** | **PK**                  | **Identificador de la alerta.**           |
| **estudiante_id**    | **uuid**                    | **---**   | **NOT NULL** | **FK → estudiantes.id** | **Estudiante afectado.**                  |
| **incidencia_id**    | **uuid**                    | **---**   | **NULL**     | **FK → incidencias.id** | **Incidencia que la genera (si aplica).** |
| **tipo**             | **enum alerta_tipo_enum**   | **---**   | **NOT NULL** | **---**                 | **alerta_tutor/citacion_toe.**            |
| **motivo**           | **varchar**                 | **200**   | **NULL**     | **---**                 | **Resumen de motivo.**                    |
| **generado_por**     | **uuid**                    | **---**   | **NULL**     | **FK → users.id**       | **Usuario que genera.**                   |
| **fecha_generacion** | **timestamp**               | **---**   | **NOT NULL** | **---**                 | **Fecha/hora de generación.**             |
| **estado**           | **enum alerta_estado_enum** | **---**   | **NOT NULL** | **---**                 | **pendiente/notificado/resuelto.**        |
| **mensaje**          | **text**                    | **---**   | **NULL**     | **---**                 | **Mensaje a comunicar.**                  |
| **created_at**       | **timestamp**               | **---**   | **NOT NULL** | **---**                 | **Creación.**                             |
| **updated_at**       | **timestamp**               | **---**   | **NOT NULL** | **---**                 | **Última actualización.**                 |

##### Tabla 22: Tabla de alertas

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-18}

> **4.8.Tabla citaciones**

| **Campo**            | **Tipo**      | **Long.** | **Nulidad**  | **Llave**           | **Descripción**                     |
|----------------------|---------------|-----------|--------------|---------------------|-------------------------------------|
| **id**               | **uuid**      | **---**   | **NOT NULL** | **PK**              | **Identificador de la citación.**   |
| **alerta_id**        | **uuid**      | **---**   | **NOT NULL** | **FK → alertas.id** | **Alerta que origina la citación.** |
| **fecha_citacion**   | **timestamp** | **---**   | **NOT NULL** | **---**             | **Fecha/hora de la reunión.**       |
| **lugar**            | **varchar**   | **120**   | **NULL**     | **---**             | **Ambiente donde se realiza.**      |
| **asunto**           | **varchar**   | **160**   | **NULL**     | **---**             | **Título de la citación.**          |
| **mensaje**          | **text**      | **---**   | **NULL**     | **---**             | **Contenido del aviso.**            |
| **padre_confirmado** | **boolean**   | **---**   | **NULL**     | **---**             | **Confirmación del apoderado.**     |
| **evidencia_url**    | **varchar**   | **512**   | **NULL**     | **---**             | **Archivo (acuse, firma, etc.).**   |
| **created_at**       | **timestamp** | **---**   | **NOT NULL** | **---**             | **Creación.**                       |
| **updated_at**       | **timestamp** | **---**   | **NOT NULL** | **---**             | **Última actualización.**           |

##### Tabla 23: Tabla de citaciones

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-19}

> **4.9.Tabla actas**

| **Campo**         | **Tipo**      | **Long.** | **Nulidad**  | **Llave**              | **Descripción**                     |
|-------------------|---------------|-----------|--------------|------------------------|-------------------------------------|
| **id**            | **uuid**      | **---**   | **NOT NULL** | **PK**                 | **Identificador del acta.**         |
| **citacion_id**   | **uuid**      | **---**   | **NOT NULL** | **FK → citaciones.id** | **Citación asociada.**              |
| **contenido**     | **text**      | **---**   | **NOT NULL** | **---**                | **Texto íntegro del acta/acuerdo.** |
| **firmado_padre** | **boolean**   | **---**   | **NULL**     | **---**                | **Firma del apoderado registrada.** |
| **firmado_tutor** | **boolean**   | **---**   | **NULL**     | **---**                | **Firma del tutor registrada.**     |
| **fecha**         | **timestamp** | **---**   | **NULL**     | **---**                | **Fecha del acta.**                 |
| **evidencia_url** | **varchar**   | **512**   | **NULL**     | **---**                | **Imagen/PDF del acta firmada.**    |
| **created_at**    | **timestamp** | **---**   | **NOT NULL** | **---**                | **Creación.**                       |
| **updated_at**    | **timestamp** | **---**   | **NOT NULL** | **---**                | **Última actualización.**           |

##### Tabla 24: Tabla de actas

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-20}

> **4.10.Tabla Dominios / ENUMs (valores permitidos)**

| **ENUM**                   | **Valores válidos**                                 | **Uso**                                   |
|----------------------------|-----------------------------------------------------|-------------------------------------------|
| **role_enum**              | **docente, tutor, auxiliar, direccion, toe, padre** | **Rol de users.**                         |
| **sexo_enum**              | **M, F, NA**                                        | **Sexo del estudiante.**                  |
| **nivel_enum**             | **inicial, primaria, secundaria**                   | **Nivel educativo.**                      |
| **severidad_enum**         | **leve, grave, muy_grave**                          | **Severidad de deméritos / incidencias.** |
| **incidencia_tipo_enum**   | **merito, demerito**                                | **Tipo de incidencia.**                   |
| **incidencia_estado_enum** | **pendiente, revisado, resuelto**                   | **Estado de la incidencia.**              |
| **alerta_tipo_enum**       | **alerta_tutor, citacion_toe**                      | **Tipo de alerta.**                       |
| **alerta_estado_enum**     | **pendiente, notificado, resuelto**                 | **Estado de la alerta.**                  |

##### Tabla 25: Enumeraciones y dominios

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-21}

> **III.2.5 Casos de uso del sistema**
>
> Los casos de uso constituyen una herramienta fundamental del análisis
> de requerimientos, ya que describen las interacciones entre los
> actores y el sistema desde el punto de vista del usuario. Cada caso de
> uso expresa una funcionalidad claramente diferenciada del sistema,
> mostrando la secuencia de acciones que ejecutan los actores y las
> respuestas esperadas del sistema.
>
> En el caso de la *Agenda Digital ATA*, los casos de uso permiten
> modelar los procesos más relevantes del sistema, tales como el
> registro de incidencias, la generación de alertas, la gestión de
> citaciones y la consulta de reportes.
>
> A continuación, se presentan los principales casos de uso del sistema,
> acompañados de su tabla descriptiva (donde se detalla el propósito,
> flujo de eventos y alternativas) y su correspondiente diagrama UML.
>
> **1.Caso de Uso N°1: Registrar incidencia**

| **Elemento**                                                      | **Descripción**                                                                                                                  |     |
|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-----|
| **Caso de uso:**                                                  | Registrar Incidencia                                                                                                             |     |
| **Actores:**                                                      | Estudiante, padre                                                                                                                |     |
| **Propósito:**                                                    | Permitir al docente registrar incidencias de mérito o demérito de los estudiantes dentro del sistema.                            |     |
| **Resumen:**                                                      | El docente selecciona al estudiante, especifica el tipo y descripción de la incidencia y guarda el registro en la base de datos. |     |
|                                                                   |                                                                                                                                  |     |
|                                                                   |                                                                                                                                  |     |
| **Precondición**                                                  | El docente debe haber iniciado sesión y contar con permisos activos.                                                             |     |
| **Curso normal**                                                  |                                                                                                                                  |     |
| **Paso**                                                          | **Acción**                                                                                                                       |     |
| **1**                                                             | Inicia sesión y selecciona la opción \"Historial Académico\"                                                                     |     |
| **2**                                                             | Selecciona el periodo que desea consultar.                                                                                       |     |
| **3**                                                             | El sistema muestra el formulario de registro.                                                                                    |     |
| **4**                                                             | El docente completa los datos requeridos.                                                                                        |     |
| **5**                                                             | El sistema valida y guarda la información.                                                                                       |     |
| **6**                                                             | Se muestra confirmación de registro exitoso.                                                                                     |     |
| **Cursos alternos**                                               |                                                                                                                                  |     |
| \- Si faltan campos obligatorios, se muestra un mensaje de error. |                                                                                                                                  |     |
| \- Si ocurre un fallo de conexión, se notifica al usuario.        |                                                                                                                                  |     |
| **Postcondición**                                                 | La incidencia queda registrada y disponible para consulta por tutor y TOE.                                                       |     |
| **Notas:**                                                        | Las reincidencias generan alertas automáticas según reglas definidas                                                             |     |
| **Fuente**                                                        | Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992).                                                            |     |

##### Tabla 26: Caso de Uso N°1: Registrar incidencia

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.}

![](media/image47.png){width="5.905511811023622in"
height="3.2777777777777777in"}

#### Figura 13: Diagrama de Caso de Uso N.º 1 --- Registrar incidencia  {#figura-13-diagrama-de-caso-de-uso-n.º-1-registrar-incidencia}

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-1}

> **2.Caso de Uso N°2: Consultar historial de incidencias**

| **Elemento**                                                      | **Descripción**                                                                                                                 |     |
|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-----|
| **Caso de uso:**                                                  | Consultar historial de incidencias                                                                                              |     |
| **Actores:**                                                      | Tutor, Padre de familia                                                                                                         |     |
| **Propósito:**                                                    | Permitir visualizar el historial completo de méritos y deméritos asociados a un estudiante.                                     |     |
| **Resumen:**                                                      | El tutor o padre selecciona al estudiante, y el sistema muestra todas las incidencias registradas organizadas por fecha y tipo. |     |
|                                                                   |                                                                                                                                 |     |
|                                                                   |                                                                                                                                 |     |
| **Precondición**                                                  | El docente debe haber iniciado sesión y contar con permisos activos.                                                            |     |
| **Curso normal**                                                  |                                                                                                                                 |     |
| **Paso**                                                          | **Acción**                                                                                                                      |     |
| **1**                                                             | Inicia sesión y selecciona la opción \"Historial Académico\"                                                                    |     |
| **2**                                                             | Selecciona el periodo que desea consultar.                                                                                      |     |
| **3**                                                             | El sistema muestra el formulario de registro.                                                                                   |     |
| **4**                                                             | El docente completa los datos requeridos.                                                                                       |     |
| **5**                                                             | El sistema valida y guarda la información.                                                                                      |     |
| **6**                                                             | Se muestra confirmación de registro exitoso.                                                                                    |     |
| **Cursos alternos**                                               |                                                                                                                                 |     |
| \- Si faltan campos obligatorios, se muestra un mensaje de error. |                                                                                                                                 |     |
| \- Si ocurre un fallo de conexión, se notifica al usuario.        |                                                                                                                                 |     |
| **Postcondición**                                                 | La incidencia queda registrada y disponible para consulta por tutor y TOE.                                                      |     |
| **Notas:**                                                        | Las reincidencias generan alertas automáticas según reglas definidas                                                            |     |
| **Fuente**                                                        | Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992).                                                           |     |

##### 

##### Tabla 27: Caso de Uso N°2: Consultar historial de incidencias

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-2}

![](media/image45.png){width="3.6906561679790024in"
height="3.44245406824147in"}

#### Figura 13: Diagrama de Caso de Uso N.º 2 --- Consultar historial de incidencias  {#figura-13-diagrama-de-caso-de-uso-n.º-2-consultar-historial-de-incidencias}

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-3}

> **3.Caso de Uso N°3: Generar alerta o citación**

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 78%" />
<col style="width: 1%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Elemento</strong></th>
<th><strong>Descripción</strong></th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Caso de uso:</strong></th>
<th>Generar alerta o citación</th>
<th></th>
</tr>
<tr class="header">
<th><strong>Actores:</strong></th>
<th>Tutor, TOE, Dirección</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Propósito:</strong></th>
<th><table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>Emitir alertas o citaciones automáticas en función del número de
reincidencias registradas.</th>
</tr>
</thead>
<tbody>
</tbody>
</table></th>
<th></th>
</tr>
<tr class="header">
<th rowspan="3"><strong>Resumen:</strong></th>
<th rowspan="3">El sistema detecta reincidencias según las reglas del
reglamento institucional y genera automáticamente una alerta al tutor o
una citación formal.</th>
<th></th>
</tr>
<tr class="odd">
<th></th>
</tr>
<tr class="header">
<th></th>
</tr>
<tr class="odd">
<th><strong>Precondición</strong></th>
<th>Deben existir incidencias registradas con más de tres repeticiones
semanales o cinco bimestrales.</th>
<th></th>
</tr>
<tr class="header">
<th colspan="2"><strong>Curso normal</strong></th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Paso</strong></th>
<th><strong>Acción</strong></th>
<th></th>
</tr>
<tr class="header">
<th><strong>1</strong></th>
<th>El tutor revisa incidencias del estudiante.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>2</strong></th>
<th>El sistema calcula reincidencias.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>3</strong></th>
<th>Si el límite es superado, se genera alerta o citación.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>4</strong></th>
<th>El tutor o TOE confirma la acción.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>5</strong></th>
<th>El sistema almacena el documento o notificación.</th>
<th></th>
</tr>
<tr class="odd">
<th colspan="2"><strong>Cursos alternos</strong></th>
<th></th>
</tr>
<tr class="header">
<th colspan="2">- Si faltan campos obligatorios, se muestra un mensaje
de error.</th>
<th></th>
</tr>
<tr class="odd">
<th colspan="2">- Si ocurre un fallo de conexión, se notifica al
usuario.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>Postcondición</strong></th>
<th>La incidencia queda registrada y disponible para consulta por tutor
y TOE.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Notas:</strong></th>
<th>Las reincidencias generan alertas automáticas según reglas
definidas</th>
<th></th>
</tr>
<tr class="header">
<th><strong>Fuente</strong></th>
<th>Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson
(1992).</th>
<th></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

##### Tabla 28: Caso de Uso N°3: Generar alerta o citación

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-4}

![](media/image46.png){width="5.905511811023622in" height="3.625in"}

#### Figura 14: Diagrama de Caso de Uso N.º 3 --- Generar alerta o citación  {#figura-14-diagrama-de-caso-de-uso-n.º-3-generar-alerta-o-citación}

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-5}

> **4.Caso de Uso N°4: Consultar reportes y estadísticas**

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 78%" />
<col style="width: 1%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Elemento</strong></th>
<th><strong>Descripción</strong></th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Caso de uso:</strong></th>
<th>Consultar reportes y estadísticas</th>
<th></th>
</tr>
<tr class="header">
<th><strong>Actores:</strong></th>
<th>Dirección, TOE</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Propósito:</strong></th>
<th><table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>Permitir a la dirección o TOE generar reportes estadísticos sobre
incidencias registradas.</th>
</tr>
</thead>
<tbody>
</tbody>
</table></th>
<th></th>
</tr>
<tr class="header">
<th rowspan="3"><strong>Resumen:</strong></th>
<th rowspan="3">El usuario selecciona un período o grupo de estudiantes,
y el sistema genera un reporte visual con totales de méritos, deméritos
y reincidencias.</th>
<th></th>
</tr>
<tr class="odd">
<th></th>
</tr>
<tr class="header">
<th></th>
</tr>
<tr class="odd">
<th><strong>Precondición</strong></th>
<th><table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th>Deben existir incidencias registradas en el sistema.</th>
</tr>
</thead>
<tbody>
</tbody>
</table></th>
<th></th>
</tr>
<tr class="header">
<th colspan="2"><strong>Curso normal</strong></th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Paso</strong></th>
<th><strong>Acción</strong></th>
<th></th>
</tr>
<tr class="header">
<th><strong>1</strong></th>
<th>El usuario inicia sesión.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>2</strong></th>
<th>Accede a “Reportes”.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>3</strong></th>
<th>Selecciona parámetros (rango de fechas, nivel, tipo).</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>4</strong></th>
<th>El sistema procesa los datos.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>5</strong></th>
<th>Se muestran los resultados en pantalla o PDF.</th>
<th></th>
</tr>
<tr class="odd">
<th colspan="2"><strong>Cursos alternos</strong></th>
<th></th>
</tr>
<tr class="header">
<th colspan="2">- Si no existen datos en el rango seleccionado, se
muestra un mensaje de advertencia.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Postcondición</strong></th>
<th>El usuario obtiene un reporte consolidado y puede exportarlo o
imprimirlo.</th>
<th></th>
</tr>
<tr class="header">
<th><strong>Notas:</strong></th>
<th>El sistema calcula tasas de reincidencia y totales por aula.</th>
<th></th>
</tr>
<tr class="odd">
<th><strong>Fuente</strong></th>
<th>Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson
(1992).</th>
<th></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

##### Tabla 29: Caso de Uso N°4: Consultar reportes y estadísticas

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-6}

![](media/image18.png){width="5.905511811023622in"
height="4.069444444444445in"}

#### Figura 15: Diagrama de Caso de Uso N.º 4 --- Consultar reportes y estadísticas  {#figura-15-diagrama-de-caso-de-uso-n.º-4-consultar-reportes-y-estadísticas}

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-7}

> **5.Caso de Uso N°5: Autenticarse en el sistema**

| **Elemento**                                                                               | **Descripción**                                                                                                   |     |
|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|-----|
| **Caso de uso:**                                                                           | Autenticarse en el sistema                                                                                        |     |
| **Actores:**                                                                               | Docente, Tutor, TOE, Padre                                                                                        |     |
| **Propósito:**                                                                             | Permitir el acceso seguro al sistema mediante credenciales personales.                                            |     |
| **Resumen:**                                                                               | El usuario ingresa su correo y contraseña; el sistema valida los datos y muestra el panel correspondiente a su ro |     |
|                                                                                            |                                                                                                                   |     |
|                                                                                            |                                                                                                                   |     |
| **Precondición**                                                                           | El usuario debe estar previamente registrado en el sistema.                                                       |     |
| **Curso normal**                                                                           |                                                                                                                   |     |
| **Paso**                                                                                   | **Acción**                                                                                                        |     |
| **1**                                                                                      | El usuario abre la pantalla de inicio.                                                                            |     |
| **2**                                                                                      | Ingresa sus credenciales.                                                                                         |     |
| **3**                                                                                      | El sistema valida los datos.                                                                                      |     |
| **4**                                                                                      | El usuario es redirigido a su panel (rol específico).                                                             |     |
| **Cursos alternos**                                                                        |                                                                                                                   |     |
| \- Si el usuario ingresa credenciales incorrectas, el sistema muestra un mensaje de error. |                                                                                                                   |     |
| \- Si la cuenta está inactiva, se deniega el acceso.                                       |                                                                                                                   |     |
| **Postcondición**                                                                          | El usuario accede al sistema y puede realizar sus operaciones.                                                    |     |
| **Notas:**                                                                                 | La autenticación se implementa mediante Supabase Auth con cifrado bcrypt.                                         |     |
| **Fuente**                                                                                 | Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992).                                             |     |

##### Tabla 30: Caso de Uso N°5: Autenticarse en el sistema

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-8}

![](media/image32.png){width="5.127624671916011in"
height="4.025236220472441in"}

#### Figura 16: Diagrama de Caso de Uso N.º 5 --- Autenticarse en el sistema  {#figura-16-diagrama-de-caso-de-uso-n.º-5-autenticarse-en-el-sistema}

##### *Fuente*: Elaboración propia (2025), basada en OMG UML 2.5.1 y Jacobson (1992)*.* {#fuente-elaboración-propia-2025-basada-en-omg-uml-2.5.1-y-jacobson-1992.-9}

> **III.2.6 Diseño de navegación y wireframes**
>
> El diseño de navegación y los wireframes constituyen una etapa
> esencial dentro del proceso de diseño de sistemas, pues permiten
> definir cómo el usuario se desplaza entre las pantallas y qué
> componentes visuales conforman cada interfaz.  
> En esta fase se busca garantizar una experiencia fluida, intuitiva y
> coherente con los roles y funcionalidades definidos durante el
> análisis.
>
> Para el caso del sistema Agenda Digital ATA, la navegación se ha
> diseñado en base a los flujos reales de interacción de los usuarios
> ---docentes, tutores, TOE, dirección y padres de familia--- asegurando
> que cada uno acceda únicamente a las secciones correspondientes a su
> perfil.
>
> El objetivo es representar gráficamente el recorrido lógico que
> realiza el usuario dentro de la aplicación, desde el inicio de sesión
> hasta la consulta de reportes o la administración del sistema, y
> posteriormente plasmarlo visualmente mediante wireframes o prototipos
> de baja fidelidad que anticipen la estructura visual final.
>
> **1.Diseño de navegación**
>
> La navegación propuesta responde al flujo funcional descrito en los
> casos de uso y refleja la jerarquía de accesos y pantallas principales
> del sistema.
>
> El siguiente flujo detalla la secuencia real de interacción del
> usuario dentro de la página principal index.html de la Agenda Digital
> ATA.

### 🧭 Flujo de Navegación Real -- Agenda Digital ATA {#flujo-de-navegación-real-agenda-digital-ata}

#### 1. Pantalla de Login {#pantalla-de-login}

- **Inicio: El usuario visualiza la pantalla inicial con el logo
  > institucional.**

- **Paso 1:** Selecciona el tipo de cuenta (Docente, Tutor, Auxiliar,
  > TOE, Dirección, Padre/Madre o Administrador).

- **Paso 2:** Ingresa usuario y contraseña.

- **Resultado:** Si las credenciales son válidas y el rol coincide, se
  > redirige al panel correspondiente.

#### 2. Panel Principal (Dashboard) {#panel-principal-dashboard}

- Muestra nombre del usuario, rol activo y menú lateral.

- El menú dinámico varía según el perfil:

- Dashboard (estadísticas generales).

- Nueva Incidencia (docentes, tutores, TOE).

- Historial de Incidencias.

- Reportes e Indicadores (TOE y Dirección).

- Administración (solo administradores).

#### 3. Registro de Incidencia {#registro-de-incidencia}

- Formulario para seleccionar estudiante, grado, tipo (mérito/demérito)
  > y descripción.

- Valida datos y registra en la base de datos.

- Genera alertas automáticas si aplica reincidencia.

#### 4. Historial de Incidencias {#historial-de-incidencias}

- Muestra todas las incidencias registradas con filtros por aula, fecha
  > o tipo.

- Permite ver, editar o imprimir los reportes.

#### 5. Reportes e Indicadores {#reportes-e-indicadores}

- Panel gráfico con métricas por grado o nivel.

- Permite exportar resultados en PDF o Excel.

#### 6. Panel de Administración (solo Administrador) {#panel-de-administración-solo-administrador}

- Gestión de usuarios, aulas, tipos de incidencias y backups.

- Control completo del sistema y visualización de estadísticas globales.

#### 7. Footer {#footer}

- Enlaces de ayuda, contacto y manual de usuario.

### 🔄 Navegación Dinámica {#navegación-dinámica}

- El menú lateral cambia de acuerdo con el rol autenticado.

- Cada sección del sistema se muestra u oculta dinámicamente mediante
  > funciones JavaScript.

- Se mantiene la posibilidad de cerrar sesión desde cualquier vista.

![](media/image19.png){width="7.820553368328959in"
height="3.5451760717410323in"}

#### Figura 17: Diseño de navegación del MVP de la Agenda Virtual Escolar  {#figura-17-diseño-de-navegación-del-mvp-de-la-agenda-virtual-escolar}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-22}

> **2.Wireframes del sistema**
>
> Los wireframes son bocetos estructurales que muestran la disposición y
> jerarquía de los elementos visuales de cada pantalla antes de su
> desarrollo.  
> Su propósito es definir la interfaz de usuario (UI) y validar la
> distribución de componentes como formularios, menús y botones,
> asegurando la consistencia visual en toda la aplicación.
>
> En el caso de Agenda Digital ATA, los wireframes se elaboraron con
> base en los casos de uso y la navegación propuesta, empleando
> herramientas como Figma para representar las pantallas clave del
> sistema.
>
> Cabe aclarar que los diferentes paneles donde se visualizan los
> resultados de las incidencias cometidas por cada estudiante varían su
> interfaz y entorno en relación al tipo de cuenta elegida como
> docentes,tutores,directivos,TOE y administrador.
>
> A Continuación se presentan los siguiente wireframe del sistema de la
> Agenda Virtual ATA..

![](media/image36.png){width="5.905511811023622in"
height="3.111111111111111in"}

#### Figura 18: Wireframes generales en Figma  {#figura-18-wireframes-generales-en-figma}

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-23}

![](media/image37.png){width="5.905511811023622in" height="2.875in"}

#### Figura 19: Pantalla de Inicio de sesión para selección de tipos de cuentas (Home)

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.}

![](media/image10.png){width="5.905511811023622in" height="2.875in"}

#### Figura 20: Pantalla de Inicio de sesión para selección de tipos de cuentas (Home)

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-1}

![](media/image20.png){width="5.905511811023622in"
height="3.8194444444444446in"}

#### Figura 21: Pantalla dashboard para el docente

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-2}

![](media/image21.png){width="5.127256124234471in"
height="4.277234251968504in"}

#### Figura 22: Pantalla de registro de incidencia

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-3}

![](media/image14.png){width="5.905511811023622in"
height="3.3194444444444446in"}

#### Figura 22: Pantalla de Dashboard para el tutor

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-4}

##### 

![](media/image29.png){width="5.905511811023622in"
height="3.9027777777777777in"}

#### Figura 23: Pantalla de Dashboard para el padre

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-5}

![](media/image9.png){width="5.905511811023622in"
height="3.8055555555555554in"}

#### Figura 24: Pantalla de Historial de incidencias

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-6}

![](media/image26.png){width="5.814756124234471in"
height="2.9608880139982503in"}

#### Figura 25: Pantalla de Historial de incidencias

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-7}

![](media/image22.png){width="5.905511811023622in"
height="5.722222222222222in"}

#### Figura 26: Pantalla de dashboard de administración

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-8}

![](media/image40.png){width="5.700172790901138in"
height="4.855702099737533in"}

#### Figura 27: Pantalla de gestión de administración

##### *Fuente*: Elaboración propia hecha en Figma (2025)*.* {#fuente-elaboración-propia-hecha-en-figma-2025.-9}

> **III.2.7 Seguridad y control de accesos (roles/RLS)**
>
> La seguridad del sistema *Agenda Virtual Escolar ATA* se basa en un
> modelo de autenticación y control de accesos basado en roles
> (Role-Based Access Control, RBAC) complementado con reglas de nivel de
> fila (Row Level Security, RLS) para proteger la información sensible
> de los estudiantes y registros de incidencias.
>
> Este mecanismo garantiza que cada usuario acceda únicamente a los
> recursos y datos correspondientes a su rol dentro de la institución
> educativa.
>
> Las políticas de control se aplican tanto en la capa de la base de
> datos (Supabase/PostgreSQL) como en la capa de la aplicación (React +
> Cloudflare Workers), reforzando la integridad, confidencialidad y
> trazabilidad de la información.
>
> **1.Modelo de Roles y Permisos (RBAC)**

| **Rol**           | **Descripción del Rol**                       | **Permisos principales**                          | **Restricciones**                          |
|-------------------|-----------------------------------------------|---------------------------------------------------|--------------------------------------------|
| **Docente**       | Registra incidencias de sus estudiantes       | Crear / Editar incidencias propias                | No puede ver incidencias de otros docentes |
| **Tutor**         | Supervisa incidencias de su grupo             | Ver / Derivar / Generar alertas                   | No puede eliminar registros                |
| **TOE**           | Gestiona citaciones y alertas institucionales | Generar citaciones, reportes                      | No puede editar incidencias originales     |
| **Dirección**     | Supervisa y aprueba casos graves              | Consultar estadísticas globales                   | Solo lectura                               |
| **Auxiliar**      | Apoya en ingreso de datos                     | Crear incidencias con supervisión                 | Sin permisos de edición ni eliminación     |
| **Padre/Madre**   | Consulta incidencias de su hijo/a             | Solo lectura                                      | Solo accede a registros del hijo asignado  |
| **Administrador** | Mantiene la plataforma y usuarios             | CRUD completo (crear, leer, actualizar, eliminar) | No puede alterar logs del sistema          |

##### Tabla 31: Modelo de Roles y Permisos (RBAC)

##### *Fuente*: Elaboración propia (2025), basada en Modelo RBAC según NIST (National Institute of Standards and Technology), 1992. {#fuente-elaboración-propia-2025-basada-en-modelo-rbac-según-nist-national-institute-of-standards-and-technology-1992.}

> **2.Seguridad a nivel de filas (RLS en la base de datos)**
>
> En *Supabase (PostgreSQL)* se activó el mecanismo de Row Level
> Security (RLS) en todas las tablas sensibles (incidencias, alertas,
> citaciones, usuarios, etc.).
>
> Cada política (policy) se define según el auth.uid() del usuario
> autenticado y su role.
>
> Esto asegura que cada registro solo pueda ser leído o modificado por
> los usuarios autorizados.
>
> **Ejemplo de política (SQL / Supabase):**

![](media/image5.png){width="5.90625in" height="3.4253849518810147in"}

#### Figura 28: Ejemplo de políticas RLS -- Tabla "Incidencias" {#figura-28-ejemplo-de-políticas-rls-tabla-incidencias}

##### *Fuente*: Elaboración propia (2025), basada en PostgreSQL 15 RLS Documentation*.* {#fuente-elaboración-propia-2025-basada-en-postgresql-15-rls-documentation.}

> **3.Arquitectura de Seguridad**

![](media/image3.png){width="7.502256124234471in"
height="0.8576476377952756in"}

#### Figura 29: Diagrama de arquitectura de seguridad y control de accesos

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-24}

> **4.Medidas adicionales de seguridad**
>
> 🔐 **Cifrado**: contraseñas con bcrypt y canales HTTPS obligatorios.
>
> 🧩 **Autenticación persistente**: tokens JWT con expiración y refresh.
>
> 🧱 **Registros de auditoría:** cada acción (login, registro, edición)
> queda registrada con timestamp y usuario.
>
> 🚫 **Protección contra CSRF/XSS:** validación de entrada en frontend y
> encabezados CORS seguros.
>
> 🔄 **Control de sesiones**: cierre automático tras inactividad o
> logout manual.
>
> **III.2.8 Diseño de notificaciones y estados**
>
> El diseño de notificaciones y estados en la *Agenda Digital ATA*
> permite mantener informados a los usuarios sobre los eventos más
> relevantes del sistema, como el registro de incidencias, la generación
> de alertas o la emisión de citaciones.
>
> El objetivo es garantizar una comunicación fluida entre los actores
> (docentes, tutores, TOE, padres y dirección), así como el control del
> ciclo de vida de cada registro dentro del sistema.
>
> **1.Diseño de notificaciones**
>
> El sistema implementa un modelo de **notificaciones internas (in-app /
> web push)** que se generan automáticamente ante eventos específicos,
> de acuerdo con el nivel de severidad de la incidencia.  
> Estas notificaciones no siempre implican la intervención del área TOE
> o de la Dirección, sino que **se activan condicionalmente** según el
> tipo de falta y la cantidad de reincidencias registradas.

### Principales eventos del sistema

- Registro de una **nueva incidencia** (mérito o demérito).

- **Reincidencia leve**: genera alerta automática al tutor.

- **Reincidencia bimestral**: genera citación formal por el TOE.

- **Falta grave o muy grave**: notificación directa a TOE o Dirección.

- **Confirmación de asistencia** o cierre del caso por TOE/Dirección.

> Cada notificación se muestra en la interfaz principal con un mensaje
> breve y un enlace a la acción correspondiente (por ejemplo: *"Se ha
> generado una alerta por reincidencia para el estudiante Juan Pérez"*).
>
> En versiones futuras, se prevé ampliar las notificaciones a **correo
> electrónico o WhatsApp**, aunque la arquitectura actual ya contempla
> esta escalabilidad.

![](media/image27.png){width="7.835468066491688in"
height="1.7519630358705163in"}

#### Figura 30: Flujo general de notificaciones

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-25}

> **2.Diseño de estados**
>
> Cada registro (incidencia, alerta o citación) cuenta con un conjunto
> de estados predefinidos que reflejan su progreso en el ciclo de
> atención.  
> Estos estados permiten conocer en qué etapa se encuentra cada caso y
> facilitan la trazabilidad entre los diferentes niveles de gestión
> (Docente → Tutor → TOE → Dirección).

### a) Estados de incidencia

- Registrada: Creada por el docente o auxiliar.

- Derivada: El tutor o TOE toma conocimiento.

- Cerrada: Caso resuelto o corregido.

### b) Estados de alerta

- Generada: El sistema detecta reincidencia.

- Notificada: El tutor fue informado y actúa.

- Atendida: Se resolvió o derivó al TOE.

### c) Estados de citación

- Emitida: TOE crea la citación formal.

- Confirmada: El padre confirma asistencia.

- Sustentada / Cerrada: Caso atendido y archivado.

![](media/image4.png){width="7.9363123359580054in"
height="2.573323490813648in"}

#### Figura 31: Ciclo de estados de incidencia, alerta y citación

##### *Fuente*: Elaboración propia (2025)*.* {#fuente-elaboración-propia-2025.-26}

> **III.2.9 Capacitación y Demostración de docentes del prototipo del
> MVP**
>
> Durante la semana de gestión institucional en la I.E. *Antonio Torres
> Araujo*, se llevó a cabo una jornada de demostración práctica del
> prototipo funcional (MVP) de la *Agenda Virtual Escolar ATA*.  
> Esta actividad fue coordinada con la supervisora Prof. Kelly y el
> director quien autorizó y realizaron una reunión breve para la
> exposición ante los docentes, tutores, auxiliares y directivos de la
> institución en el salón de computación e informática.
>
> El objetivo principal fue capacitar y familiarizar brevemente a los
> usuarios principales finales en el uso del sistema y recoger
> observaciones que aportaran a la validación del diseño del producto.

### Objetivos específicos

- Presentar las principales funcionalidades del sistema (registro,
  > historial, reportes, y autenticación).

- Explicar el flujo de navegación y la distribución de roles del
  > sistema.  
  > Mostrar la operatividad del prototipo mediante el proyector
  > institucional.

- Recibir retroalimentación directa de los docentes sobre su usabilidad
  > y aplicabilidad.

### Desarrollo de la actividad

> La demostración se realizó en el aula de Innovación Pedagógica del
> colegio, utilizando el proyector institucional y una laptop con el
> prototipo desplegado localmente.  
> Los asistentes incluyeron docentes, tutores, la subdirectora, y el
> director de la institución.
>
> **Durante la exposición:**

1.  Se explicó el propósito general del sistema y su alineación con el
    > proceso de registro de incidencias.

2.  Se mostraron las pantallas principales: login, panel de control,
    > registro de incidencias, historial y reportes.

3.  Se realizó una simulación en tiempo real del flujo: *registro →
    > notificación → visualización del historial*.

4.  Se resolvieron consultas del personal docente sobre la funcionalidad
    > y posibles mejoras futuras (ejemplo: añadir módulo de
    > comunicaciones).

> La actividad permitió validar la comprensión funcional del sistema por
> parte de los usuarios finales y obtener observaciones positivas sobre
> su utilidad práctica.  
> Los docentes destacaron la simplicidad visual y la rapidez del
> registro digital comparado con el cuaderno físico de incidencias.  
> Se identificaron sugerencias menores para futuras versiones (por
> ejemplo, incluir filtro de búsqueda avanzada y resumen de incidencias
> por estudiante).

###### *Anexo 2*: Exposición de demostración del MVP

![](media/image8.jpg){width="4.493431758530184in"
height="3.368092738407699in"}

#### Figura 31: Reunión de semana de gestión en la institución

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.}

##### ![](media/image6.jpg){width="4.564756124234471in" height="3.421554024496938in"}

#### Figura 31: Preparativos previos para exposición del prototipo del MVP

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.-1}

![](media/image38.jpg){width="4.986958661417323in"
height="3.7374300087489063in"}

#### Figura 31: Explicación del Home principal a los docentes

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.-2}

![](media/image24.jpg){width="5.29194772528434in"
height="3.9666272965879266in"}

#### Figura 31: Explicación del inició de sesión

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.-3}

![](media/image23.jpg){width="4.480213254593176in"
height="3.3576760717410323in"}

#### Figura 31: Explicación del panel de control para docentes

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.-4}

![](media/image16.jpg){width="4.575172790901138in"
height="3.429362423447069in"}

#### Figura 31: Grupo de docentes participantes de la institución

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo". {#fuente-i.e.-n.-80002-antonio-torres-araujo.-5}

![](media/image44.jpg){width="5.905511811023622in"
height="4.430555555555555in"}

#### Figura 31: Explicación del registro de incidencias

##### *Fuente*: I.E. N.° 80002 "Antonio Torres Araujo" {#fuente-i.e.-n.-80002-antonio-torres-araujo}

> **III.2.10 Proceso propuesto (BPMN to-be)**
>
> El proceso propuesto (to-be) representa la **versión automatizada y
> digitalizada** del flujo de notificación de incidencias escolares en
> la Institución Educativa *Antonio Torres Araujo*, a partir de la
> automatización implementada en la *Agenda Digital ATA*.  
> Este nuevo modelo se diseñó con base en el análisis del proceso actual
> (*as-is*), las entrevistas con el personal TOE y tutores, y las reglas
> de negocio institucionales validadas en la etapa de diseño del
> sistema.  
> El objetivo es **reducir la carga manual** de docentes y tutores,
> mejorar la **trazabilidad de las comunicaciones** con los padres y
> garantizar la **atención oportuna** de las faltas leves, graves y muy
> graves.

### Objetivo del proceso to-be

> Definir y estandarizar el flujo digital de registro, clasificación y
> notificación de incidencias estudiantiles, garantizando comunicación
> inmediata entre los actores (docentes, tutores, TOE, dirección y
> padres de familia) mediante la plataforma Agenda Digital ATA.

### Participantes del proceso

- **Docente / Auxiliar:** Registra incidencias y clasifica la severidad.

- **Tutor:** Supervisa reincidencias, genera alertas y cita a los
  > padres.  
  > **TOE:** Gestiona protocolos para casos graves o muy graves.

- **Dirección:** Supervisa y aprueba citaciones o medidas
  > disciplinarias.

- **Padre / Apoderado:** Recibe notificaciones y confirma recepción o
  > firma.

### Descripción textual del flujo del proceso propuesto

1.  **Inicio -- Detección de incidencia  
    > **El proceso inicia cuando un **docente o auxiliar** detecta una
    > conducta (leve, grave o muy grave) durante la jornada escolar.

2.  **Registro digital de la incidencia  
    > **El docente accede a la *Agenda Digital ATA*, selecciona al
    > estudiante, clasifica la falta (leve, grave o muy grave) y
    > registra los detalles en el sistema.  
    > El registro se almacena automáticamente en la base de datos y
    > genera trazabilidad (usuario, fecha, hora, aula).

3.  **Clasificación de la severidad  
    > ** El sistema solicita clasificar la severidad:

    - **Leve / Moderada**

    - **Grave**

    - **Muy grave**

4.  **Derivación automática según severidad**

    - Si es **leve o moderada**, el caso se registra y se notifica
      > directamente al **padre** mediante una alerta digital (in-app /
      > push).

    - Si es **grave**, el sistema genera automáticamente una
      > **notificación al tutor y a la dirección**, quienes gestionan la
      > citación formal en un plazo de 24--48 h.

    - Si es **muy grave**, el sistema **deriva de inmediato al TOE y a
      > la Dirección**, activando el protocolo institucional de atención
      > urgente y registro en el *Libro de Incidencias*.

5.  **Confirmación de comunicación inicial  
    > **El **padre o apoderado** recibe la notificación digital y debe
    > confirmar la recepción ("leído" o "firmado").

    - Si **confirma en ≤ 24 h**, el caso continúa al cierre.

    - Si **no responde**, el tutor contacta manualmente al padre
      > (llamada o WhatsApp).  
      > En caso de persistir la falta de respuesta, se programa una
      > **entrevista breve**.

6.  **Control de reincidencias  
    > **El sistema actualiza automáticamente el historial del estudiante
    > y sus contadores de reincidencia.

    - Si el estudiante acumula **≥ 3 faltas semanales** del mismo tipo,
      > el sistema **genera una alerta automática al tutor**.

    - Si alcanza **≥ 5 faltas bimestrales**, se **emite una citación
      > formal** al padre.

7.  **Gestión de casos leves**

    - Si el padre responde y el estudiante mejora, el tutor **cierra el
      > caso leve**.

    - Si se genera citación, el tutor **archiva constancia** y registra
      > el seguimiento.

8.  **Gestión de casos graves**

    - El **tutor notifica a la Dirección** y **cita al padre** dentro de
      > 24--48 h.

    - Tras la reunión, se **registra el caso en el Libro de
      > Incidencias** y se **cierra** con las observaciones
      > correspondientes.

9.  **Gestión de casos muy graves**

    - La **Dirección y TOE** coordinan atención inmediata.

    - Se cita urgentemente al padre, se redacta el **Acta de
      > Compromiso** y se registran las medidas adoptadas.

    - El TOE da seguimiento hasta la resolución total.

10. **Cierre del caso  
    > ** Todos los casos (leves, graves, muy graves) finalizan con un
    > estado de cierre:

    - *Caso leve cerrado* (con firma digital o constancia).

    - *Caso grave cerrado* (acta archivada en el libro).

    - *Caso muy grave cerrado* (protocolo ejecutado y medidas
      > registradas).

### Notas clave del proceso mejorado

- Cada acción genera una **notificación digital**, una **bitácora de
  > registro** y un **cambio de estado** en el sistema.

- Los datos son **visibles solo según rol** (RLS: Docente, Tutor, TOE,
  > Dirección, Padre).

- La automatización permite **alertas preventivas** antes del
  > escalamiento.

- Se eliminan los cuadernos físicos y se gana **control institucional
  > centralizado**.

![](media/image11.png){width="7.585097331583552in"
height="2.8761832895888015in"}

#### Figura 31: Proceso propuesto de notificación de incidencias ATA tobe (BPMN 2.0) {#figura-31-proceso-propuesto-de-notificación-de-incidencias-ata-tobe-bpmn-2.0}

##### *Fuente*: Elaboración propia (2025) {#fuente-elaboración-propia-2025-1}

> **III.3. Actividad 3**: Desarrollo e implementación del MVP
>
> Durante esta actividad se implementó el MVP de la **Agenda Digital
> ATA**, conectando el frontend PWA (React + Vite), el backend
> serverless (Cloudflare Workers con Hono) y la base de datos gestionada
> en Supabase (PostgreSQL). Se habilitaron los flujos principales de
> registro de incidencias, historial, autenticación (RBAC),
> notificaciones Web Push y paneles de consulta. El resultado es un
> sistema funcional desplegado en entorno de pruebas, con CI/CD
> automatizado y documentación técnica básica.

## III.3.1 Desarrollo {#iii.3.1-desarrollo}

### III.3.2.1 Preparación del entorno {#iii.3.2.1-preparación-del-entorno}

### 1. Objetivo {#objetivo}

> Describir las herramientas, configuraciones y recursos utilizados para
> preparar el entorno de desarrollo, pruebas y despliegue del sistema
> **Agenda Virtual ATA**, asegurando la trazabilidad técnica y la
> coherencia con las tecnologías declaradas en el plan de trabajo.

### 2. Estructura del repositorio y entorno de trabajo {#estructura-del-repositorio-y-entorno-de-trabajo}

> Debido a que el proyecto se desarrolló en un **entorno individual**,
> se trabajó sobre una **rama única (main)** dentro del repositorio
> agenda-virtual-ata, alojado en GitHub.  
> El flujo de control de versiones se mantuvo lineal, aplicando
> **commits semánticos** (feat:, fix:, docs:) y **tags de versión**
> (v0.1, v1.0-MVP) para los hitos principales.  
> Este enfoque se justifica por la ausencia de un equipo colaborativo y
> cumple con la trazabilidad requerida para las prácticas
> preprofesionales.

### 3. Creación y configuración en Supabase {#creación-y-configuración-en-supabase}

> agenda-virtual-ata/
>
> │
>
> ├── frontend/ \# PWA en React + Vite
>
> ├── backend/ \# API serverless en Cloudflare Workers (Hono)
>
> ├── database/ \# Esquemas y migraciones Supabase
>
> ├── docs/ \# Diagramas, wireframes y evidencias
>
> └── tests/ \# Pruebas unitarias e integración

### ![](media/image31.png){width="5.905511811023622in" height="3.0972222222222223in"}

![](media/image25.png){width="5.905511811023622in"
height="3.0833333333333335in"}

### 

![](media/image39.png){width="5.905511811023622in"
height="3.138888888888889in"}

### 3. Requisitos del entorno {#requisitos-del-entorno}

<table>
<colgroup>
<col style="width: 18%" />
<col style="width: 27%" />
<col style="width: 53%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p><strong>Componente</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Versión / Herramienta</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Descripción / Uso</strong></p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>Node.js</strong></p>
</blockquote></th>
<th><blockquote>
<p>18+</p>
</blockquote></th>
<th><blockquote>
<p>Ejecución de scripts y build del frontend/backend</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p><strong>npm</strong></p>
</blockquote></th>
<th><blockquote>
<p>9+</p>
</blockquote></th>
<th><blockquote>
<p>Gestión de dependencias</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>Vite</strong></p>
</blockquote></th>
<th><blockquote>
<p>5+</p>
</blockquote></th>
<th><blockquote>
<p>Empaquetador React (modo dev y build)</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p><strong>Wrangler CLI</strong></p>
</blockquote></th>
<th><blockquote>
<p>3.x</p>
</blockquote></th>
<th><blockquote>
<p>Despliegue de Cloudflare Workers</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>Supabase CLI</strong></p>
</blockquote></th>
<th><blockquote>
<p>1.x</p>
</blockquote></th>
<th><blockquote>
<p>Migraciones, seeds y pruebas de conexión</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p><strong>Git / GitHub</strong></p>
</blockquote></th>
<th><blockquote>
<p>Última</p>
</blockquote></th>
<th><blockquote>
<p>Control de versiones</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>VS Code</strong></p>
</blockquote></th>
<th><blockquote>
<p>1.8+</p>
</blockquote></th>
<th><blockquote>
<p>Entorno de desarrollo principal</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### 4. Configuración inicial {#configuración-inicial}

> **Clonado del repositorio  
>   
> ** git clone https://github.com/abelmoya/agenda-virtual-ata.git
>
> cd agenda-virtual-ata

1.  

> **Variables de entorno  
> ** Copiar .env.example → .env y completar:  
>   
> SUPABASE_URL=\<tu-url\>
>
> SUPABASE_KEY=\<api-key\>
>
> VAPID_PUBLIC_KEY=\<clave-pública\>
>
> VAPID_PRIVATE_KEY=\<clave-privada\>
>
> JWT_SECRET=\<clave-secreta\>

2.  

> **Instalación de dependencias  
>   
> ** cd frontend && npm install
>
> cd ../backend && npm install

3.  

4.  **Ejecución local  
    > **

    - Frontend (PWA): npm run dev → [[http://localhost:5173  
      > ]{.underline}](http://localhost:5173)

    - Backend (Worker): npx wrangler dev

### 5. Configuración de la base de datos (Supabase -- PostgreSQL) {#configuración-de-la-base-de-datos-supabase-postgresql}

1.  Creación del proyecto en **Supabase**.

2.  Ejecución de scripts en /database/migrations para crear tablas y
    > relaciones.

3.  Inserción de catálogos iniciales (seeds/roles.sql,
    > seeds/faltas.sql).

4.  Activación de **Row Level Security (RLS)** según roles definidos.

5.  Pruebas de conexión con config/supabase.js.

### 6. Entorno de despliegue {#entorno-de-despliegue}

<table>
<colgroup>
<col style="width: 23%" />
<col style="width: 30%" />
<col style="width: 45%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p><strong>Componente</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Servicio utilizado</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Estado</strong></p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>Frontend (PWA)</strong></p>
</blockquote></th>
<th><blockquote>
<p>Cloudflare Pages</p>
</blockquote></th>
<th><blockquote>
<p>Desplegado</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p><strong>Backend (API)</strong></p>
</blockquote></th>
<th><blockquote>
<p>Cloudflare Workers</p>
</blockquote></th>
<th><blockquote>
<p>Desplegado con Wrangler</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p><strong>Base de datos</strong></p>
</blockquote></th>
<th><blockquote>
<p>Supabase (PostgreSQL)</p>
</blockquote></th>
<th><blockquote>
<p>Activa</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p><strong>Notificaciones</strong></p>
</blockquote></th>
<th><blockquote>
<p>Web Push API (VAPID)</p>
</blockquote></th>
<th><blockquote>
<p>Activa (correo pendiente para fase 2)</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### 7. Control de calidad y CI/CD {#control-de-calidad-y-cicd}

- **Integración continua (CI):** GitHub Actions ejecuta lint, build y
  > test.

- **Despliegue continuo (CD):  
  > **

  - wrangler publish → publica Worker.

  - Cloudflare Pages → actualiza frontend tras merge o tag.

- **Backups:** scripts automáticos en /scripts/backup.

### 8. Conclusión {#conclusión}

> La preparación del entorno se completó garantizando interoperabilidad
> entre componentes y despliegue reproducible.  
> El uso combinado de **React (frontend)**, **Cloudflare Workers
> (backend)** y **Supabase (base de datos)** permitió configurar una
> arquitectura moderna, ligera y segura para la etapa de desarrollo.  
> El sistema quedó operativo tanto en local como en entorno de pruebas,
> sirviendo como base para las fases de validación y despliegue
> institucional.

### III.3.2.2 Estructura del proyecto {#iii.3.2.2-estructura-del-proyecto}

> A continuación, se presenta la estructura **final** del código,
> organizada por capas (presentación, lógica y datos):
>
> agenda-virtual-ata/
>
> ├── .env.example
>
> ├── .gitignore
>
> ├── index.html
>
> ├── package.json
>
> ├── README.md
>
> ├── temp_backup.html
>
> │
>
> ├── assets/ \# Recursos globales (imágenes, íconos, avatares)
>
> │ ├── avatars/
>
> │ ├── icons/
>
> │ └── images/
>
> │
>
> ├── backend/ \# Backend serverless (Cloudflare Workers + Hono)
>
> │ ├── package.json
>
> │ ├── wrangler.toml \# Configuración del Worker
>
> │ └── src/
>
> │ ├── index.js \# Punto de entrada del Worker (bootstrap Hono)
>
> │ ├── config/
>
> │ │ └── supabase.js \# Conexión/SDK Supabase
>
> │ ├── handlers/ \# Lógica de negocio por caso de uso
>
> │ ├── middleware/
>
> │ │ └── auth.js \# Validación JWT/RBAC/CORS
>
> │ ├── routes/
>
> │ │ └── auth.js \# Endpoints de autenticación
>
> │ ├── services/ \# Servicios (Web Push, auditoría, etc.)
>
> │ └── utils/ \# Utilidades (helpers, validaciones)
>
> │
>
> ├── database/ \# Artefactos de datos (diseño e implementación)
>
> │ ├── migrations/ \# Migraciones SQL (creación/alter de tablas)
>
> │ ├── schemas/ \# Definición de esquemas (modelo lógico/físico)
>
> │ └── seeds/ \# Datos semilla (catálogos, roles, pruebas)
>
> │
>
> ├── docs/ \# Documentación técnica y visual
>
> │ ├── diagramas/ \# Arquitectura, contexto, BPMN, DER (diseño)
>
> │ └── wireframes/ \# Prototipos de interfaz
>
> │
>
> ├── frontend/ \# Frontend PWA (React + Vite)
>
> │ ├── package.json
>
> │ ├── vite.config.js
>
> │ ├── assets/ \# Recursos UI específicos del frontend
>
> │ ├── public/
>
> │ │ └── manifest.json \# Manifest PWA
>
> │ └── src/
>
> │ ├── App.jsx
>
> │ ├── main.jsx
>
> │ ├── components/
>
> │ │ ├── common/ \# Header, Footer, Loading
>
> │ │ ├── forms/ \# Formularios (registro incidencia, etc.)
>
> │ │ ├── notifications/ \# UI de notificaciones
>
> │ │ └── tables/ \# Tablas y grillas
>
> │ ├── hooks/ \# Custom hooks (auth, datos)
>
> │ ├── pages/ \# Páginas principales
>
> │ │ ├── DashboardPage.jsx
>
> │ │ ├── HistorialPage.jsx
>
> │ │ ├── IncidenciaPage.jsx
>
> │ │ ├── LoginPage.jsx
>
> │ │ └── ReportesPage.jsx
>
> │ ├── services/ \# Consumo de API (fetch/axios)
>
> │ ├── styles/ \# CSS global y por componente
>
> │ │ ├── components.css
>
> │ │ └── globals.css
>
> │ └── utils/ \# Helpers del frontend
>
> │
>
> ├── scripts/ \# Automatizaciones (build/deploy/backup)
>
> │
>
> └── tests/ \# Pruebas
>
> ├── integration/
>
> └── unit/

**Tabla A -- Carpeta ↔ Responsabilidad (resumen)**

<table>
<colgroup>
<col style="width: 16%" />
<col style="width: 83%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p><strong>Carpeta</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Responsabilidad principal</strong></p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>frontend/</p>
</blockquote></th>
<th><blockquote>
<p>UI PWA, rutas, estado, formularios, consumo de API</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>backend/</p>
</blockquote></th>
<th><blockquote>
<p>API REST serverless, auth, RBAC, reglas de negocio, Web Push</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>database/</p>
</blockquote></th>
<th><blockquote>
<p>Migraciones, esquemas y datos semilla (soporte a III.2.4)</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>docs/</p>
</blockquote></th>
<th><blockquote>
<p>Evidencia de diseño (arquitectura, DER, BPMN, wireframes)</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>tests/</p>
</blockquote></th>
<th><blockquote>
<p>Pruebas unitarias e integración (UI/API)</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>scripts/</p>
</blockquote></th>
<th><blockquote>
<p>Automatizaciones de build/deploy/mantenimiento</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### III.3.2.3 Frontend (PWA -- React + Vite) {#iii.3.2.3-frontend-pwa-react-vite}

- **Rutas:** /login, /incidencias, /historial, /reportes, / (dashboard).

- **Estado y servicios:** hooks para auth y datos; services/ para
  > contratos de API.

- **Accesibilidad y usabilidad:** interfaz responsive, mensajes de
  > validación y loading states.

- **PWA:** manifest.json y Service Worker para cache estática y soporte
  > offline básico.

### III.3.2.4 Backend (Cloudflare Workers + Hono) {#iii.3.2.4-backend-cloudflare-workers-hono}

- **Worker único** que expone la API REST y centraliza la lógica de
  > negocio.

- **Middlewares:** auth.js (JWT Supabase), RBAC, CORS, logging.

- **Servicios:** Web Push (VAPID), auditoría (logs), validadores.

- **Contratos de API (resumen):  
  > **

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 31%" />
<col style="width: 56%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p><strong>Método</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Endpoint</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Propósito</strong></p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>POST</p>
</blockquote></th>
<th><blockquote>
<p>/api/incidencias</p>
</blockquote></th>
<th><blockquote>
<p>Registrar incidencia (validación de usuario/rol y reglas)</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>GET</p>
</blockquote></th>
<th><blockquote>
<p>/api/incidencias/:id</p>
</blockquote></th>
<th><blockquote>
<p>Detalle de incidencia</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>GET</p>
</blockquote></th>
<th><blockquote>
<p>/api/historial/:usuarioId</p>
</blockquote></th>
<th><blockquote>
<p>Historial por usuario/rol (docente/tutor/dirección)</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>POST</p>
</blockquote></th>
<th><blockquote>
<p>/api/notificar</p>
</blockquote></th>
<th><blockquote>
<p>Enviar notificación Web Push (VAPID)</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>GET</p>
</blockquote></th>
<th><blockquote>
<p>/api/roles</p>
</blockquote></th>
<th><blockquote>
<p>Listar roles y permisos activos</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

> **Nota:** No se implementan integraciones de correo ni WhatsApp. Las
> notificaciones se limitan a **Web Push** firmadas en el Worker y
> entregadas al **Service Worker** del PWA.

### III.3.2.5 Seguridad (Auth, RBAC y datos) {#iii.3.2.5-seguridad-auth-rbac-y-datos}

- **Autenticación:** Supabase Auth (JWT).

- **Autorización:** RBAC con roles: Docente, Tutor, Dirección, TOE,
  > Admin.

- **Protección de datos:** cifrado en tránsito (HTTPS), control de
  > acceso por rol, auditoría de eventos críticos.

### III.3.2.6 Notificaciones (Web Push) {#iii.3.2.6-notificaciones-web-push}

- **Flujo:** suscripción en el navegador → Worker firma (VAPID) y envía
  > al Push Service → Service Worker muestra la notificación.

- **Eventos de disparo:** registro de incidencia relevante, citación,
  > actualización de estado.

### III.3.2.7 Integración preliminar con datos {#iii.3.2.7-integración-preliminar-con-datos}

- Conexión a Supabase vía SDK, pruebas de lectura/escritura con **RLS
  > planificado**.

- Preparación de **migraciones y seeds** (catálogos, roles, ejemplos),
  > que se formalizarán en **III.2.4 Modelo de Datos y Diccionario**.

### III.3.2.8 Pruebas y validación {#iii.3.2.8-pruebas-y-validación}

- **Unitarias:** componentes clave y utilidades; handlers del backend.

- **Integración:** registro → notificación → consulta de historial.

- **UAT:** piloto con usuarios clave (docente/tutor) y checklist de
  > aceptación.

- **Resultados:** flujo principal validado sin errores críticos.

### III.3.2.9 CI/CD y despliegue {#iii.3.2.9-cicd-y-despliegue}

- **CI:** GitHub Actions (lint, build, test).

- **CD:** Deploy automático a Cloudflare Pages (frontend) y wrangler
  > publish (backend).

- **Variables de entorno:** SUPABASE_URL, SUPABASE_KEY,
  > VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY.

### III.3.2.10 Riesgos y mitigación {#iii.3.2.10-riesgos-y-mitigación}

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 12%" />
<col style="width: 47%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p><strong>Riesgo</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Impacto</strong></p>
</blockquote></th>
<th><blockquote>
<p><strong>Mitigación</strong></p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>Error de entrega de Push</p>
</blockquote></th>
<th><blockquote>
<p>Medio</p>
</blockquote></th>
<th><blockquote>
<p>Reintentos y registro de fallas en Worker</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>Caducidad JWT</p>
</blockquote></th>
<th><blockquote>
<p>Alto</p>
</blockquote></th>
<th><blockquote>
<p>Refresh token y validación en middleware</p>
</blockquote></th>
</tr>
<tr class="odd">
<th><blockquote>
<p>Cambios en políticas del navegador</p>
</blockquote></th>
<th><blockquote>
<p>Medio</p>
</blockquote></th>
<th><blockquote>
<p>Revisión periódica y fallback en UI</p>
</blockquote></th>
</tr>
<tr class="header">
<th><blockquote>
<p>Latencia de API</p>
</blockquote></th>
<th><blockquote>
<p>Bajo</p>
</blockquote></th>
<th><blockquote>
<p>Cache ligero en frontend y paginación</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## III.3.3 Entregables de la actividad {#iii.3.3-entregables-de-la-actividad}

- Código fuente (frontend y backend), PRs y releases etiquetados.

- **Tabla de endpoints** y contratos (swagger o markdown técnico).

- Evidencia de pruebas (screenshots, checklist UAT).

- MVP desplegado en entorno de pruebas (Pages + Workers).

- Documentación técnica en docs/ (diagramas, wireframes, flujos).

## III.3.4 Lecciones aprendidas {#iii.3.4-lecciones-aprendidas}

- La combinación **PWA + Worker + Supabase** simplificó despliegue y
  > seguridad.

- **Web Push** resultó suficiente para la fase MVP, reduciendo
  > complejidad y costos.

- La separación por **handlers/services** en el Worker facilitó las
  > pruebas y la trazabilidad.

- Se recomienda ampliar la documentación de contratos de API y
  > monitoreo.

> **III.4. Actividad 4**: Pruebas, validación y mejora del sistema
>
> **III.5. Actividad 5**: Despliegue, documentación, mantenimiento y
> cierre de práctica

# IV. LECCIONES APRENDIDAS {#iv.-lecciones-aprendidas}

# V. CONCLUSIONES Y RECOMENDACIONES {#v.-conclusiones-y-recomendaciones}

## Conclusiones

## Recomendaciones

# VI. REFERENCIAS BIBLIOGRÁFICAS (opcional, ISO 690:2023) \[Solo es referencia si se cita, si solo se pone la fuente se pone bibliografía\] {#vi.-referencias-bibliográficas-opcional-iso-6902023-solo-es-referencia-si-se-cita-si-solo-se-pone-la-fuente-se-pone-bibliografía}

# VII. ANEXOS {#vii.-anexos}

## 
