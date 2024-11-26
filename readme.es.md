# Aplicación de Gestión de Tareas - Backend

Este proyecto es el backend de una aplicación de gestión de tareas que permite a los usuarios registrarse, iniciar sesión y gestionar tareas de forma organizada. Desarrollado en Node.js, Express.js, TypeScript, TypeORM , Jest y SQLite, este backend está diseñado para ser modular, escalable y fácil de mantener, siguiendo los principios de SOLID y código limpio.

## Características

- **Autenticación y Autorización**: Autenticación segura con JWT y almacenamiento de contraseñas con hash.
- **Gestión de Tareas**: CRUD completo para tareas, con opciones de filtrado y ordenación.
- **Filtrado Avanzado**: Búsqueda eficiente de tareas por etiquetas, diseñado para grandes volúmenes de datos.
- **Eficiencia y Rendimiento**: Optimización para consultas de alto rendimiento.
- **Código Modular y Escalable**: Arquitectura siguiendo principios de SOLID y modularidad.
- **Pruebas Unitarias**: Cobertura de funciones críticas con Jest.
- **Validación de Datos DTOs**: Uso de **class-validator** y DTOs para asegurar la integridad de datos en el backend.

## Tecnologías Utilizadas

- **Node.js** y **Express.js**: Creación del backend y API RESTful.
- **TypeORM**: ORM para manejar la base de datos, compatible con varios motores (SQLite, PostgreSQL, MySQL).
- **SQLite**: Base de datos relacional en desarrollo. Adaptable a otros motores.
- **TypeScript**: Tipado estático para un código más robusto y legible.
- **class-validator** y **class-transformer**: Validación y transformación de DTOs.
- **bcrypt**: Para encriptar contraseñas de forma segura.
- **JSON Web Tokens (JWT)**: Para autenticación y control de acceso.
- **Jest**: Para realizar pruebas unitarias.

## Estructura del Proyecto

```plaintext

├──  node_modules
├──  src
│    ├── modules                      # Directorio principal que contiene los módulos clave de la aplicación.
│    │   ├── auth                     # Módulo de autenticación y autorización.
│    │   │   ├── dtos                 # Contiene los objetos de transferencia de datos (DTOs) para la autenticación.
│    │   │   │   ├── login.dto.ts     # DTO para validar los datos de entrada de inicio de sesión.
│    │   │   │   └── register.dto.ts  # DTO para validar los datos de entrada de registro de usuario.
│    │   │   ├── auth.routes.ts       # Define las rutas relacionadas con la autenticación (registro e inicio de sesión).
│    │   │   ├── auth.controller.ts   # Controlador que maneja las solicitudes HTTP para la autenticación.
│    │   │   ├── auth.service.ts      # Contiene la lógica de negocio de autenticación (registro, inicio de sesión).
│    │   │   ├── auth.repository.ts   # Gestiona las interacciones de la autenticación con la base de datos.
│    │   │   └── auth.entity.ts       # Entidad de usuario, define la estructura de datos para los usuarios.
│    │   ├── tasks                    # Módulo para la gestión de tareas de los usuarios.
│    │   │   ├── dtos                 # Contiene los DTOs para validar los datos de entrada de las tareas.
│    │   │   │   └── task.dto.ts      # DTO para la creación y actualización de tareas.
│    │   │   ├── tasks.routes.ts      # Define las rutas para las operaciones de tareas (CRUD).
│    │   │   ├── tasks.controller.ts  # Controlador que maneja las solicitudes HTTP para las tareas.
│    │   │   ├── tasks.service.ts     # Lógica de negocio para la gestión de tareas (creación, lectura, actualización, eliminación).
│    │   │   ├── tasks.repository.ts  # Interactúa con la base de datos para el manejo de las tareas.
│    │   │   └── tasks.entity.ts      # Entidad de tarea, define la estructura de datos para una tarea.
│    │   ├── tags                     # Módulo para la gestión de etiquetas asociadas a las tareas.
│    │   │   ├── dtos                 # Contiene los DTOs para validar los datos de entrada de las etiquetas.
│    │   │   │   └── tag.dto.ts       # DTO para la creación y actualización de etiquetas.
│    │   │   ├── tags.routes.ts       # Define las rutas para las operaciones de etiquetas (CRUD).
│    │   │   ├── tags.controller.ts   # Controlador que maneja las solicitudes HTTP para las etiquetas.
│    │   │   ├── tags.service.ts      # Lógica de negocio para la gestión de etiquetas.
│    │   │   ├── tags.repository.ts   # Interactúa con la base de datos para el manejo de etiquetas.
│    │   │   └── tags.entity.ts       # Entidad de etiqueta, define la estructura de datos para una etiqueta.
│    ├── config                       # Carpeta para la configuración de la aplicación.
│    │   └── database.ts              # Configuración de TypeORM para la conexión a la base de datos.
│    │   └── envs.ts                  # Configuración de variables de entorno.
│    ├── middleware                   # Middlewares personalizados para la aplicación.
│    │   ├── auth.middleware.ts       # Middleware para proteger rutas, asegurando que solo usuarios autenticados accedan.
│    │   └── validation.middleware.ts # Middleware para validar los datos de entrada usando los DTOs.
│    ├── routes                       # Rutas.
│    │   └── index.ts                 # Rutas principales de la aplicación.
│    ├── tests                        # Carpeta que contiene las pruebas unitarias y de integración de la aplicación.
│    │   ├── auth.test.ts             # Pruebas de autenticación, incluyendo registro, inicio de sesión y rutas protegidas.
│    │   ├── tasks.test.ts            # Pruebas CRUD de tareas, incluyendo validación de datos de entrada y operaciones de tareas.
│    │   └── security.test.ts         # Pruebas de seguridad, incluyendo validación de tokens.
│    ├── utils                        # Funciones utilitarias y plantillas de respuesta.
│    │   ├── responseTemplates.ts     # Plantillas de respuesta para estandarizar respuestas HTTP (éxito y error).
│    │   └── setupTest.ts             # Configuración de la base de datos para las pruebas.
│    ├── app.ts                       # Configuración general de la aplicación (middlewares, rutas, etc.).
│    └── server.ts                    # Archivo principal para iniciar el servidor y escuchar en el puerto configurado.
├── .env                              # Archivo de variables de entorno (configuración sensible como JWT_SECRET y DATABASE_URL).
├── .gitignore                        # Archivo de ignorados.
├── database.sqlite                   # Base de datos de prueba.
├── eslint.config.json                # Configuración de ESLint.
├── jest.config.json                  # Configuración de Jest.
├── package.json                      # Archivo de dependencias y scripts del proyecto.
├── tsconfig.json                     # Configuración de TypeScript.
├── readme.es.md                      # Este archivo.
└── readme.md                         # Readme en inglés.
              
```

## Configuración e Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 2. Instalar Dependencias

Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:

```bash
npm install
```

### 3. Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
# Configuración del puerto del servidor
PORT=3000

# Configuración de JWT
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h

# Configuración de la Base de Datos (SQLite en desarrollo)
DATABASE_TYPE=sqlite
DATABASE_NAME=./database.sqlite   
```

### 4. Configuración de la Base de Datos con TypeORM

Configura TypeORM en `src/config/database.ts` para conectarse a la base de datos indicada en `.env`.

Para cambiar el motor de base de datos (por ejemplo, a PostgreSQL en producción), ajusta `DATABASE_TYPE` y otros valores en `.env` sin modificar el código principal.

### 5. Iniciar el Servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

## Uso de la API

### Endpoints

Aquí tienes la tabla completada, incluyendo el **modelo de datos** donde se aplica.

---

#### Auth

| Método | Endpoint         | Descripción                       | Modelo de datos                   |
|--------|------------------|-----------------------------------|-----------------------------------|
| POST   | `/api/register`  | Registrar un nuevo usuario        | `{email: string, password: string}`                 |
| POST   | `/api/login`     | Iniciar sesión y obtener JWT      | `{email: string, password: string}`                 |

#### Tasks

| Método | Endpoint                      | Descripción                          | Modelo de datos                                 |
|--------|--------------------------------|--------------------------------------|-------------------------------------------------|
| GET    | `/api/tasks`                  | Obtener todas las tareas             | -                                               |
| GET    | `/api/tasks?tags=tag1&tags=tag2` | Filtrar tareas por etiquetas         | query: `{tags: string[]}`                       |
| POST   | `/api/tasks`                  | Crear una nueva tarea                | `{title: string, description?: string, dueDate?: Date, status?: string, tags: number[]}` |
| PUT    | `/api/tasks/:id`              | Actualizar una tarea existente       | `{title?: string, description?: string, dueDate?: Date, status?: string}`               |
| DELETE | `/api/tasks/:id`              | Eliminar una tarea existente         | -                                               |

#### Tags

| Método | Endpoint               | Descripción                           | Modelo de datos                                 |
|--------|-------------------------|---------------------------------------|-------------------------------------------------|
| GET    | `/api/tags/all`        | Obtener todos los tags                | -                                               |
| GET    | `/api/tags`            | Obtener todos los tags de un usuario  | -                                               |
| POST   | `/api/tags`            | Crear un nuevo tag                    | `{name: string, color?: string}`                |
| PUT    | `/api/tags/:id`        | Actualizar un tag existente           | `{name?: string, color?: string}`               |
| DELETE | `/api/tags/:id`        | Eliminar un tag existente             | -                                               |

---

### Explicación de Modelos de Datos:

- **Tasks (POST y PUT)**:
  - `title`: Obligatorio en la creación; representa el título de la tarea.
  - `description`: Opcional, una breve descripción de la tarea.
  - `dueDate`: Opcional, la fecha de vencimiento de la tarea.
  - `status`: Opcional, puede ser `pending`, `in_progress`, o `completed`.
  - `tags`: Array de IDs de etiquetas asociadas a la tarea.

- **Tags (POST y PUT)**:
  - `name`: Obligatorio en la creación, representa el nombre del tag.
  - `color`: Opcional, representa un color asociado al tag.

Cada endpoint está diseñado para responder a las necesidades específicas de la API, asegurando que los datos relevantes se envíen y reciban de forma clara y estructurada.

## Pruebas

### Configuración de Jest

Jest está configurado para pruebas unitarias en el backend. Ejecuta las pruebas con:

```bash
npm test
```

### Pruebas Realizadas

- **Autenticación**: Pruebas de registro e inicio de sesión, asegurando el hash seguro de contraseñas y generación de tokens JWT.
- **Gestión de Tareas**: Pruebas para la creación, edición, eliminación y filtrado de tareas.
- **Filtrado y Consultas**: Pruebas de rendimiento para el filtrado de tareas, evaluando eficiencia y precisión.

