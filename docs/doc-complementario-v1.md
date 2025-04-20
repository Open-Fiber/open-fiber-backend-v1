# Documentación Complementaria: Plataforma Open Fiber

## Índice
1. [Introducción](#introducción)
2. [Diagramas de Flujo de Procesos](#diagramas-de-flujo-de-procesos)
   - [Sistema de Usuarios y Autenticación](#sistema-de-usuarios-y-autenticación)
   - [Sistema de Proyectos y Máquinas](#sistema-de-proyectos-y-máquinas)
   - [Sistema Educativo](#sistema-educativo)
3. [Diagrama de Base de Datos](#diagrama-de-base-de-datos)
4. [Diagramas de Actividad](#diagramas-de-actividad)
   - [Proceso de Registro y Onboarding](#proceso-de-registro-y-onboarding)
   - [Proceso de Creación de Versiones](#proceso-de-creación-de-versiones)
   - [Proceso de Creación de Cursos](#proceso-de-creación-de-cursos)
5. [Diagramas de Secuencia](#diagramas-de-secuencia)
   - [Interacción de Aprobación de Versiones](#interacción-de-aprobación-de-versiones)
   - [Proceso de Creación de Organizaciones](#proceso-de-creación-de-organizaciones)
6. [Diagrama de Componentes](#diagrama-de-componentes)
7. [Diagrama de Estados](#diagrama-de-estados)
   - [Estados de una Máquina/Proyecto](#estados-de-una-máquinaproyecto)
   - [Estados de una Solicitud de Organización](#estados-de-una-solicitud-de-organización)

## Introducción

Este documento complementa la documentación detallada de la plataforma Open Fiber, proporcionando diagramas técnicos y visualizaciones de los principales flujos de procesos, estructuras de datos y comportamientos del sistema. Los diagramas están en formato Mermaid para facilitar su integración en entornos GitHub y otras plataformas de documentación técnica.

Open Fiber, como repositorio colaborativo de proyectos maker, necesita una representación visual clara de sus componentes y flujos para facilitar la comprensión de su arquitectura y funcionamiento tanto para desarrolladores como para usuarios técnicos.

## Diagramas de Flujo de Procesos

### Sistema de Usuarios y Autenticación

```mermaid
flowchart TD
    A[Registro de Usuario Individual] --> B[Asignación de Rol Inicial]
    B --> C[Configuración de Perfil]
    C -.-> |Aprobación| D[Elevación a Rol Maker]
    
    E[Solicitud Organización] --> F[Revisión Administrativa]
    F -->|Aprobada| G[Configuración Organización]
    F -->|Rechazada| H[Eliminación de Solicitud]
```

### Sistema de Proyectos y Máquinas

```mermaid
flowchart TD
    A[Creación de Nueva Máquina] -->|Solo Makers| B[Documentación Detallada]
    B --> C[Publicación en Plataforma]
    
    D[Usuario Copia Máquina Existente] --> E[Modificación y Documentación]
    E --> F[Solicitud de Aprobación]
    F -->|Aprobada| G[Publicación de Versión Derivada]
    F -->|Rechazada| H[Versión No Publicada]
    
    I[Visualización de Proyectos] --> J[Comentarios y Valoraciones]
    J --> K[Exploración de Versiones]
```

### Sistema Educativo

```mermaid
flowchart LR
    A[Creación de Curso] -->|Solo Makers| B[Integración con Contenido Externo]
    B --> C[Acceso y Seguimiento]
    C --> D[Interacción con Material Educativo]
```

## Diagrama de Base de Datos

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nombre
        string apellido
        int pais
        date fecha_nacimiento
        string foto_perfil
        string celular
    }
    
    ROL {
        int id PK
        string nombre
        string descripcion
    }
    
    CUENTA {
        int id PK
        string nombre
        string apellido
        string email
        bool is_active
    }
    
    ORGANIZACION {
        int id PK
        string nombre
        string descripcion
        int direccion_fisica
        string telefono
        string pagina_url
        int pais_id
    }
    
    PROYECTO {
        int id PK
        string titulo
        string descripcion
        string objetivos
    }
    
    MAQUINA {
        int id PK
        string informacion
        array recursos
        string version
        string impacto
        string evolucion
        bool is_private
    }
    
    CURSO {
        int id PK
        string titulo
        string descripcion
        string duracion
        string nivel
    }
    
    CLASE {
        int id PK
        string titulo_seccion
        string url_video
    }
    
    RECURSO {
        int id PK
        string nombre
        string descripcion
    }
    
    PASO_CONSTRUCCION {
        int id PK
        int nro_paso
        string descripcion
        string url_imagen_guia
    }
    
    CASO_DE_USO {
        int id PK
        string descripcion
    }
    
    MITOS {
        int id PK
        string descripcion
    }
    
    CONTEXTO_DE_APLICACION {
        int id PK
        string descripcion
    }
    
    CONTRIBUYENTES {
        int id PK
        string nombre_completo
        string cargo
        string foto_url
        string perfil_linkedin
    }
    
    PROGRESO {
        int id PK
        int porcentaje
    }
    
    FABLAB {
        int id PK
        string nombre
        string historia
        string mision
        string vision
    }
    
    USUARIO ||--o{ ROL : tiene
    CUENTA ||--|| USUARIO : es
    CUENTA ||--o{ PROYECTO : crea
    CUENTA ||--o{ CURSO : crea
    ORGANIZACION ||--o{ CUENTA : tiene
    PROYECTO ||--|| MAQUINA : contiene
    CURSO ||--o{ CLASE : tiene
    CLASE ||--o{ RECURSO : utiliza
    MAQUINA ||--o{ RECURSO : utiliza
    MAQUINA ||--o{ PASO_CONSTRUCCION : contiene
    MAQUINA ||--o{ CASO_DE_USO : tiene
    MAQUINA ||--o{ MITOS : tiene
    MAQUINA ||--o{ CONTEXTO_DE_APLICACION : tiene
    MAQUINA ||--o{ CONTRIBUYENTES : tiene
    CUENTA ||--o{ PROGRESO : sigue
```

## Diagramas de Actividad

### Proceso de Registro y Onboarding

```mermaid
stateDiagram-v2
    [*] --> SolicitudRegistro
    SolicitudRegistro --> TipoUsuario
    
    state TipoUsuario <<choice>>
    TipoUsuario --> RegistroIndividual: Usuario Individual
    TipoUsuario --> RegistroOrganizacion: Organización
    
    RegistroIndividual --> ValidaciónDatos
    ValidaciónDatos --> ConfiguracionPerfil
    ConfiguracionPerfil --> ExploraciónPlataforma
    ExploraciónPlataforma --> [*]
    
    RegistroOrganizacion --> EnvioDocumentación
    EnvioDocumentación --> RevisiónAdministrativa
    
    state RevisiónAdministrativa <<choice>>
    RevisiónAdministrativa --> ConfiguraciónOrganización: Aprobada
    RevisiónAdministrativa --> EliminaciónSolicitud: Rechazada
    
    ConfiguraciónOrganización --> [*]
    EliminaciónSolicitud --> [*]
```

### Proceso de Creación de Versiones

```mermaid
stateDiagram-v2
    [*] --> VisualizaciónMáquina
    VisualizaciónMáquina --> DecisiónCopia
    
    state DecisiónCopia <<choice>>
    DecisiónCopia --> CopiaProyecto: Copia
    DecisiónCopia --> FinProceso: No copia
    
    CopiaProyecto --> ModificaciónProyecto
    ModificaciónProyecto --> DocumentaciónCambios
    DocumentaciónCambios --> SolicitudAprobación
    SolicitudAprobación --> EsperaRespuesta
    
    state EsperaRespuesta <<choice>>
    EsperaRespuesta --> PublicaciónVersión: Aprobada
    EsperaRespuesta --> RevisiónRechazada: Rechazada
    
    RevisiónRechazada --> DecisiónCorrección
    
    state DecisiónCorrección <<choice>>
    DecisiónCorrección --> ModificaciónProyecto: Corregir
    DecisiónCorrección --> VersionNoPublicada: Abandonar
    
    PublicaciónVersión --> [*]
    VersionNoPublicada --> [*]
    FinProceso --> [*]
```

### Proceso de Creación de Cursos

```mermaid
stateDiagram-v2
    [*] --> VerificaciónRol
    
    state VerificaciónRol <<choice>>
    VerificaciónRol --> AccesoDenegado: No es Maker
    VerificaciónRol --> PreparaciónContenido: Es Maker
    
    PreparaciónContenido --> EstructuraciónCurso
    EstructuraciónCurso --> IntegracionContenidoExterno
    IntegracionContenidoExterno --> VinculaciónProyectos
    VinculaciónProyectos --> PublicaciónCurso
    PublicaciónCurso --> SeguimientoParticipación
    SeguimientoParticipación --> [*]
    
    AccesoDenegado --> [*]
```

## Diagramas de Secuencia

### Interacción de Aprobación de Versiones

```mermaid
sequenceDiagram
    actor Usuario
    participant Sistema
    actor CreadorOriginal
    
    Usuario->>Sistema: Copia máquina existente
    Sistema-->>Usuario: Confirmación de copia
    
    Usuario->>Sistema: Modifica proyecto
    Usuario->>Sistema: Documenta cambios
    Usuario->>Sistema: Solicita aprobación
    
    Sistema->>CreadorOriginal: Notifica nueva versión
    CreadorOriginal->>Sistema: Revisa cambios
    
    alt Aprobación
        CreadorOriginal->>Sistema: Aprueba versión
        Sistema->>Usuario: Notifica aprobación
        Sistema->>Sistema: Publica versión derivada
    else Rechazo
        CreadorOriginal->>Sistema: Rechaza versión
        Sistema->>Usuario: Notifica rechazo
        Sistema->>Sistema: Mantiene versión privada
    end
```

### Proceso de Creación de Organizaciones

```mermaid
sequenceDiagram
    actor Solicitante
    participant Sistema
    actor Administrador
    
    Solicitante->>Sistema: Solicita registro como organización
    Sistema-->>Solicitante: Solicita documentación
    
    Solicitante->>Sistema: Envía documentación verificable
    Sistema->>Administrador: Notifica nueva solicitud
    
    Administrador->>Sistema: Revisa documentación
    
    alt Aprobación
        Administrador->>Sistema: Aprueba solicitud
        Sistema->>Solicitante: Notifica aprobación
        Sistema->>Sistema: Crea cuenta de organización
    else Rechazo
        Administrador->>Sistema: Rechaza solicitud
        Sistema->>Solicitante: Notifica rechazo
        Sistema->>Sistema: Elimina solicitud temporal
    end
```

## Diagrama de Componentes

```mermaid
flowchart TD
    subgraph "Frontend"
        UI[Interfaz de Usuario]
        AUTH[Módulo de Autenticación]
        PROJECTS[Gestor de Proyectos]
        COURSES[Módulo de Cursos]
        COMMUNITY[Espacio Comunitario]
        EDITOR[Editor Markdown]
        NOTIF[Sistema de Notificaciones]
    end
    
    subgraph "Backend"
        API[API REST]
        DB[Base de Datos]
        STORAGE[Almacenamiento]
        AUTH_SRV[Servicio de Autenticación]
        SEARCH[Motor de Búsqueda]
        MAIL[Servicio de Email]
    end
    
    subgraph "Servicios Externos"
        YOUTUBE[API YouTube]
        GITHUB[Integración GitHub]
        SOCIAL[Redes Sociales]
    end
    
    UI --> AUTH
    UI --> PROJECTS
    UI --> COURSES
    UI --> COMMUNITY
    UI --> EDITOR
    UI --> NOTIF
    
    AUTH --> AUTH_SRV
    PROJECTS --> API
    COURSES --> API
    COMMUNITY --> API
    EDITOR --> API
    NOTIF --> API
    
    API --> DB
    API --> STORAGE
    API --> SEARCH
    API --> MAIL
    
    COURSES --> YOUTUBE
    PROJECTS --> GITHUB
    COMMUNITY --> SOCIAL
```

## Diagrama de Estados

### Estados de una Máquina/Proyecto

```mermaid
stateDiagram-v2
    [*] --> Borrador
    Borrador --> Revisión: Solicita publicación
    Revisión --> Publicado: Aprobado
    Revisión --> Borrador: Requiere cambios
    
    Publicado --> EnVersionado: Usuario crea versión
    EnVersionado --> VersiónPendiente: Solicita aprobación
    
    VersiónPendiente --> VersiónPublicada: Aprobada
    VersiónPendiente --> VersiónRechazada: Rechazada
    
    VersiónRechazada --> EnVersionado: Corregir
    VersiónRechazada --> [*]: Abandonar
    
    Publicado --> Archivado: Obsoleto/Abandonado
    Archivado --> Publicado: Reactivar
```

### Estados de una Solicitud de Organización

```mermaid
stateDiagram-v2
    [*] --> Iniciada
    Iniciada --> EnProceso: Documentación subida
    EnProceso --> EnRevisión: Administrador revisa
    
    EnRevisión --> Aprobada: Documentación válida
    EnRevisión --> EnEspera: Información adicional
    EnRevisión --> Rechazada: Documentación inválida
    
    EnEspera --> EnRevisión: Nueva información
    
    Aprobada --> Configurada: Completar perfil
    Configurada --> Activa: Iniciar actividades
    
    Rechazada --> [*]: Eliminación solicitud
    Activa --> Suspendida: Violación términos
    Suspendida --> Activa: Revisión favorable
    Suspendida --> Eliminada: Violación grave
    
    Eliminada --> [*]
```