# Documentación Detallada: Plataforma Open Fiber

## 1. Introducción

Open Fiber es una plataforma web colaborativa diseñada para funcionar como un repositorio de proyectos maker, enfocada principalmente en la documentación y compartición de máquinas, tecnologías y conocimientos dentro de la comunidad maker. La plataforma pertenece al FabLab Santa Cruz y busca crear un ecosistema donde creadores, estudiantes y entusiastas puedan compartir, aprender y colaborar en diversos proyectos tecnológicos.

## 2. Visión General del Sistema

### 2.1 Propósito Principal

Open Fiber funciona como un repositorio centralizado de proyectos maker donde los usuarios pueden:
- Documentar máquinas y proyectos tecnológicos
- Crear versiones derivadas de proyectos existentes
- Compartir conocimientos a través de cursos
- Formar comunidades en torno a intereses similares
- Establecer conexiones entre diferentes organizaciones y fabricantes

### 2.2 Elementos Clave del Sistema

La plataforma está estructurada en torno a los siguientes elementos fundamentales:

1. **Proyectos y Máquinas**: El núcleo del sistema, donde se documenta el conocimiento técnico
2. **Usuarios y Roles**: Un sistema de permisos graduales para diferentes niveles de participación
3. **Comunidades y Organizaciones**: Entidades que agrupan usuarios y proyectos
4. **Sistema Educativo**: Cursos y materiales formativos
5. **Interacción Social**: Mecanismos para comunicación entre usuarios

## 3. Estructura de la Plataforma

### 3.1 Landing (Página Principal)

La landing es la primera vista que recibe tanto a usuarios autenticados como no autenticados. Incluye:

- **Presentación General**: Información sobre el propósito de Open Fiber
- **Destacados**: Proyectos y máquinas relevantes 
- **Novedades**: Actualizaciones recientes en la plataforma
- **Acceso a Autenticación**: Opciones para registro e inicio de sesión
- **Vista Previa de Contenido**: Proyectos y cursos accesibles sin autenticación

### 3.2 Sistema de Autenticación

Permite a los usuarios crear cuentas y acceder a funcionalidades avanzadas:

- **Registro de Usuarios**: Proceso para creación de cuentas individuales
- **Creación de Organizaciones**: Proceso especial para entidades colectivas, sujeto a aprobación
- **Sistema de Roles**: Asignación y gestión de permisos
- **Perfiles de Usuarios**: Información personal y profesional

### 3.3 Nosotros

Sección institucional que presenta al FabLab Santa Cruz como entidad responsable de la plataforma:

- **Historia**: Trayectoria del FabLab Santa Cruz
- **Misión y Visión**: Propósitos de la organización
- **Equipo**: Miembros y colaboradores clave
- **Infraestructura**: Instalaciones y equipamiento
- **Valores**: Principios que guían el proyecto

### 3.4 Aprende

#### 3.4.1 Proyectos (Repositorio de Máquinas)

El componente central de la plataforma, funciona como un repositorio de máquinas y proyectos:

- **Listado de Máquinas**: Catálogo principal de proyectos
- **Ficha de Máquina**: Vista detallada con:
  - Información básica (título, descripción, objetivos)
  - Materiales necesarios
  - Pasos de construcción
  - Tecnologías utilizadas
  - Documentación técnica
  - Imágenes y recursos visuales
  - Casos de uso y aplicaciones
  - Historial y evolución

- **Sistema de Versiones**: 
  - Visualización de versiones derivadas por diferentes usuarios
  - Información del creador original y contribuyentes
  - Diferencias entre versiones
  - Estado de aprobación

#### 3.4.2 Cursos

Sistema educativo integrado con contenido externo:

- **Catálogo de Cursos**: Listado organizado por categorías
- **Cursos Multimedia**: Integración con contenido de plataformas como YouTube
- **Cursos en Markdown**: Documentación escrita en formato estructurado
- **Recursos Complementarios**: Papers, enlaces y materiales adicionales
- **Sistema de Seguimiento**: Control de progreso del usuario

### 3.5 Comunidad

Espacio para la interacción social entre usuarios:

- **Feed de Actividad**: Actualizaciones de proyectos y usuarios
- **Directorio de Comunidades**: Listado de organizaciones participantes
- **Mecanismos de Interacción**: Comentarios, valoraciones, seguimiento
- **Eventos y Anuncios**: Información sobre actividades relevantes
- **Sistema de Notificaciones**: Alertas sobre interacciones de interés

## 4. Modelo de Usuarios y Roles

### 4.1 Tipos de Cuentas

El sistema contempla dos tipos fundamentales de cuentas:

#### 4.1.1 Usuarios Individuales
Personas físicas que interactúan con la plataforma a nivel individual.

#### 4.1.2 Organizaciones
Entidades colectivas que requieren un proceso especial de creación y aprobación:
- Solicitud inicial con documentación verificable
- Revisión por administradores
- Aprobación o rechazo de la solicitud
- En caso de rechazo, eliminación de la cuenta temporal

### 4.2 Roles y Permisos

La plataforma implementa un sistema escalonado de roles con diferentes niveles de permisos:

#### 4.2.1 Usuario Sin Autenticación
**Permisos:**
- Visualizar landing y contenido público
- Ver información básica de máquinas y cursos
- Consultar sección "Nosotros"

**Restricciones:**
- No puede interactuar con contenido (comentar, valorar)
- No puede crear versiones ni proyectos
- No puede acceder a funcionalidades de comunidad

#### 4.2.2 Usuario Normal (Autenticado)
**Permisos:**
- Todo lo que puede hacer un usuario sin autenticación
- Comentar en proyectos y cursos
- Valorar contenido
- Crear versiones derivadas de máquinas existentes (pendientes de aprobación)
- Seguir a comunidades
- Personalizar perfil
- Acceder a todas las funcionalidades de comunidad

**Restricciones:**
- No puede crear máquinas nuevas desde cero
- No puede crear cursos
- No puede aprobar versiones de otros usuarios

#### 4.2.3 Maker
**Permisos:**
- Todo lo que puede hacer un usuario normal
- Crear nuevas máquinas desde cero
- Aprobar versiones derivadas de sus máquinas
- Crear y publicar cursos
- Acceso a herramientas avanzadas de documentación

**Asignación:**
El rol de Maker puede ser otorgado por:
- Administradores del sistema
- Comunidades (para sus miembros)

#### 4.2.4 Administrador
**Permisos:**
- Control total sobre el sistema
- Aprobar solicitudes de organizaciones
- Gestionar roles de usuarios
- Moderar contenido
- Acceso a métricas y analíticas

### 4.3 Organizaciones y Comunidades

Las entidades colectivas en la plataforma tienen características especiales:

- **Proceso de Creación**: Requiere verificación por administradores
- **Estructura Interna**: Pueden tener miembros con diferentes roles
- **Capacidades Especiales**: Pueden otorgar el rol de Maker a sus miembros
- **Gestión de Contenido**: Pueden poseer máquinas y cursos a nivel organizacional
- **Identidad Visual**: Perfiles especiales con elementos de branding
- **Conexión con Otras Organizaciones**: Establecimiento de redes entre entidades

## 5. Sistema de Versionado de Máquinas

Open Fiber implementa un sistema de versionado que permite la evolución colaborativa de los proyectos:

### 5.1 Proceso de Versionado

1. **Máquina Original**: Creada por un Maker y publicada en la plataforma
2. **Creación de Versión Derivada**:
   - Un usuario (normal o Maker) copia la máquina a su cuenta
   - Realiza modificaciones (materiales, pasos, mejoras)
   - Documenta los cambios realizados
   - Solicita aprobación del creador original

3. **Proceso de Aprobación**:
   - El creador original recibe notificación
   - Revisa los cambios propuestos
   - Decide aprobar o rechazar la versión

4. **Publicación de la Versión**:
   - Si es aprobada, la versión se hace visible para todos los usuarios
   - Se establece relación entre versión original y derivada
   - Se acredita tanto al creador original como al autor de la versión

### 5.2 Características del Sistema de Versiones

- **Independencia de Versiones**: Cada versión es independiente y pertenece a su creador
- **No es Control de Versiones Técnico**: A diferencia de Git, no almacena historial de cambios incrementales
- **Trazabilidad de Evolución**: Muestra relaciones entre versiones y creadores
- **Control de Calidad**: Sistema de aprobación para mantener estándares
- **Visibilidad Selectiva**: Las versiones solo son públicas tras aprobación

## 6. Flujos de Interacción Principal

### 6.1 Registro y Onboarding

**Usuario Individual:**
1. Registro con información básica
2. Configuración de perfil personal
3. Exploración inicial de la plataforma
4. Seguimiento a comunidades de interés

**Organización:**
1. Solicitud con documentación verificable
2. Revisión administrativa
3. En caso de aprobación, configuración de perfil organizacional
4. Inicio de actividades como entidad colectiva

### 6.2 Exploración y Consumo de Contenido

1. Navegación por catálogo de máquinas
2. Visualización detallada de proyectos de interés
3. Acceso a cursos formativos
4. Interacción mediante comentarios y valoraciones
5. Seguimiento a comunidades y usuarios relevantes

### 6.3 Creación de Versiones Derivadas

1. Identificación de máquina de interés
2. Copia a cuenta personal
3. Modificación según necesidades específicas
4. Documentación de cambios realizados
5. Solicitud de aprobación al creador original
6. Publicación tras aprobación

### 6.4 Creación de Nuevas Máquinas (Makers)

1. Planificación del proyecto
2. Documentación paso a paso del proceso
3. Recopilación de recursos necesarios
4. Publicación en la plataforma
5. Gestión de versiones derivadas por otros usuarios
6. Actualización según retroalimentación

### 6.5 Creación y Gestión de Cursos

1. Preparación de material formativo (YouTube/documentación)
2. Estructuración en la plataforma
3. Vinculación con proyectos relevantes
4. Publicación y difusión
5. Seguimiento de participación y retroalimentación

### 6.6 Interacción Comunitaria

1. Descubrimiento de comunidades afines
2. Solicitud de participación o seguimiento
3. Acceso a contenido especializado
4. Colaboración en proyectos comunitarios
5. Participación en actividades y eventos

## 7. Arquitectura Técnica

### 7.1 Componentes Principales del Sistema

El modelo de datos refleja una arquitectura centrada en:

- **Gestión de Usuarios**: Sistema completo de autenticación y roles
- **Sistema de Proyectos**: Repositorio estructurado para máquinas y versiones
- **Plataforma Educativa**: Integración de contenido formativo externo e interno
- **Red Social Interna**: Mecanismos de interacción y comunicación
- **Gestión Organizacional**: Estructura para entidades colectivas

### 7.2 Características Técnicas Destacadas

- **Sistema de Versionado**: Mecanismo para gestionar derivaciones de proyectos
- **Integración Multimedia**: Soporte para contenido de plataformas externas
- **Editor Markdown**: Para documentación técnica estructurada
- **Sistema de Comentarios**: Comunicación contextual sobre proyectos
- **Gestión de Recursos**: Almacenamiento y organización de archivos complementarios
- **Notificaciones**: Sistema de alertas para interacciones relevantes
- **Buscador Integrado**: Mecanismo para localizar contenido específico

## 8. Consideraciones de Implementación

### 8.1 Frontend

- **Diseño Responsivo**: Adaptable a diferentes dispositivos
- **Interfaz Intuitiva**: Facilitar la navegación entre secciones
- **Visualización de Relaciones**: Mostrar claramente vínculos entre versiones
- **Editor Enriquecido**: Para documentación técnica detallada
- **Integración de Contenido Externo**: Especialmente para cursos

### 8.2 Backend

- **Sistema de Permisos Robusto**: Para gestionar la complejidad de roles
- **Gestión Eficiente de Recursos**: Especialmente para contenido multimedia
- **Sistema de Aprobaciones**: Para versiones y organizaciones
- **Seguridad**: Protección de contenido privado
- **Escalabilidad**: Capacidad para crecer en usuarios y proyectos

### 8.3 Integración con Servicios Externos

- **Plataformas de Video**: Principalmente YouTube para cursos
- **Repositorios de Documentación**: Para papers y recursos complementarios
- **Redes Sociales**: Para compartir contenido y amplificar alcance

## 9. Roadmap de Desarrollo Sugerido

### 9.1 Fase 1: Fundamentales

- Implementación del sistema de usuarios y roles
- Creación del repositorio básico de máquinas
- Desarrollo de la landing y sección "Nosotros"
- Sistema básico de perfiles

### 9.2 Fase 2: Funcionalidades Core

- Sistema completo de versionado
- Documentación detallada de máquinas
- Implementación del sistema de cursos
- Mecanismos básicos de interacción (comentarios, valoraciones)

### 9.3 Fase 3: Aspectos Comunitarios

- Sistema de organizaciones y comunidades
- Funcionalidades sociales avanzadas
- Integración con plataformas externas
- Herramientas avanzadas para Makers

### 9.4 Fase 4: Refinamiento y Expansión

- Mejoras en experiencia de usuario
- Herramientas analíticas
- Optimización de rendimiento
- Funcionalidades adicionales según retroalimentación

## 10. Conclusión

Open Fiber se posiciona como una plataforma innovadora que combina elementos de repositorio técnico, red social y sistema educativo, creando un ecosistema integral para la comunidad maker. Su enfoque en la documentación estructurada, la colaboración mediante versiones y la validación por pares la convierten en una herramienta valiosa para compartir y evolucionar el conocimiento técnico.

La plataforma prioriza la creación de comunidad y la democratización del conocimiento, permitiendo que proyectos tecnológicos puedan ser replicados, mejorados y adaptados por diferentes usuarios en diversos contextos, fomentando así la innovación distribuida y la colaboración global.