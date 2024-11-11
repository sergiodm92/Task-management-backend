# Task Management Application - Backend

This project is the backend for a task management application that allows users to register, log in, and manage tasks in an organized way. Built with Node.js, Express.js, TypeScript, TypeORM, Jest, and SQLite, this backend is designed to be modular, scalable, and easy to maintain, following SOLID principles and clean code practices.

## Features

- **Authentication and Authorization**: Secure authentication with JWT and hashed password storage.
- **Task Management**: Full CRUD operations for tasks, with filtering and sorting options.
- **Advanced Filtering**: Efficient task search by tags, designed for handling large volumes of data.
- **Efficiency and Performance**: Optimized for high-performance queries.
- **Modular and Scalable Code**: Architecture based on SOLID principles and modularity.
- **Unit Testing**: Coverage for critical functions with Jest.
- **DTO Data Validation**: Uses **class-validator** and DTOs to ensure data integrity on the backend.

## Technologies Used

- **Node.js** and **Express.js**: Backend development and RESTful API creation.
- **TypeORM**: ORM to manage the database, compatible with multiple engines (SQLite, PostgreSQL, MySQL).
- **SQLite**: Relational database used in development. Easily adaptable to other engines.
- **TypeScript**: Strong typing for more robust and readable code.
- **class-validator** and **class-transformer**: Validation and transformation of DTOs.
- **bcrypt**: Secure password encryption.
- **JSON Web Tokens (JWT)**: For authentication and access control.
- **Jest**: For unit testing.

## Project Structure

```plaintext
├──  node_modules
├──  src
│    ├── modules                      # Main directory containing the application's key modules.
│    │   ├── auth                     # Authentication and authorization module.
│    │   │   ├── dtos                 # Contains the Data Transfer Objects (DTOs) for authentication.
│    │   │   │   ├── login.dto.ts     # DTO for validating login input data.
│    │   │   │   └── register.dto.ts  # DTO for validating user registration input data.
│    │   │   ├── auth.routes.ts       # Defines routes related to authentication (registration and login).
│    │   │   ├── auth.controller.ts   # Controller that handles HTTP requests for authentication.
│    │   │   ├── auth.service.ts      # Contains business logic for authentication (registration, login).
│    │   │   ├── auth.repository.ts   # Manages database interactions for authentication.
│    │   │   └── auth.entity.ts       # User entity, defines the data structure for users.
│    │   ├── tasks                    # Module for managing user tasks.
│    │   │   ├── dtos                 # Contains the DTOs for validating task input data.
│    │   │   │   └── task.dto.ts      # DTO for task creation and update.
│    │   │   ├── tasks.routes.ts      # Defines routes for task operations (CRUD).
│    │   │   ├── tasks.controller.ts  # Controller that handles HTTP requests for tasks.
│    │   │   ├── tasks.service.ts     # Business logic for task management (creation, reading, updating, deleting).
│    │   │   ├── tasks.repository.ts  # Interacts with the database to manage tasks.
│    │   │   └── tasks.entity.ts      # Task entity, defines the data structure for a task.
│    │   ├── tags                     # Module for managing tags associated with tasks.
│    │   │   ├── dtos                 # Contains the DTOs for validating tag input data.
│    │   │   │   └── tag.dto.ts       # DTO for creating and updating tags.
│    │   │   ├── tags.routes.ts       # Defines routes for tag operations (CRUD).
│    │   │   ├── tags.controller.ts   # Controller that handles HTTP requests for tags.
│    │   │   ├── tags.service.ts      # Business logic for tag management.
│    │   │   ├── tags.repository.ts   # Interacts with the database to manage tags.
│    │   │   └── tags.entity.ts       # Tag entity, defines the data structure for a tag.
│    ├── config                       # Application configuration folder.
│    │   └── database.ts              # TypeORM configuration for database connection.
│    │   └── envs.ts                  # Environment variable configuration.
│    ├── middleware                   # Custom middlewares for the application.
│    │   ├── auth.middleware.ts       # Middleware to protect routes, ensuring only authenticated users access them.
│    │   └── validation.middleware.ts # Middleware to validate input data using DTOs.
│    ├── routes                       # Routes.
│    │   └── index.ts                 # Main application routes.
│    ├── tests                        # Folder containing unit and integration tests.
│    │   ├── auth.test.ts             # Authentication tests, including registration, login, and protected routes.
│    │   ├── tasks.test.ts            # Task CRUD tests, including input data validation and task operations.
│    │   └── security.test.ts         # Security tests, including token validation.
│    ├── utils                        # Utility functions and response templates.
│    │   ├── responseTemplates.ts     # Response templates to standardize HTTP responses (success and error).
│    │   └── setupTest.ts             # Database setup for tests.
│    ├── app.ts                       # General application configuration (middlewares, routes, etc.).
│    └── server.ts                    # Main file to start the server and listen on the configured port.
├── .env                              # Environment variables file (sensitive config like JWT_SECRET and DATABASE_URL).
├── .gitignore                        # Git ignored files.
├── database.sqlite                   # Test database.
├── eslint.config.json                # ESLint configuration.
├── jest.config.json                  # Jest configuration.
├── package.json                      # Project dependencies and scripts file.
├── tsconfig.json                     # TypeScript configuration.
├── readme.es.md                      # readme in spanish.
└── readme.md                         # This file.
              
```

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

### 2. Install Dependencies

Ensure you have Node.js and npm installed. Then, run:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root with the following variables:

```plaintext
# Server port configuration
PORT=3000

# JWT Configuration
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h

# Database Configuration (SQLite in development)
DATABASE_TYPE=sqlite
DATABASE_NAME=./database.sqlite   
```

### 4. Database Configuration with TypeORM

Set up TypeORM in `src/config/database.ts` to connect to the database specified in `.env`.

To change the database engine (e.g., to PostgreSQL in production), adjust `DATABASE_TYPE` and other values in `.env` without modifying the main code.

### 5. Run Migrations

Run the following command to create the tables in the database:

```bash
npm run typeorm migration:run
```

### 6. Start the Server

To start the server in development mode:

```bash
npm run dev
```

The server should be available at `http://localhost:3000`.

## API Usage

### Endpoints

Here is the completed table with **data models** where applicable.

---

#### Auth

| Method | Endpoint         | Description                       | Data Model                           |
|--------|------------------|-----------------------------------|--------------------------------------|
| POST   | `/api/register`  | Register a new user              | `{email: string, password: string}`  |
| POST   | `/api/login`     | Log in and get a JWT             | `{email: string, password: string}`  |

#### Tasks

| Method | Endpoint                      | Description                          | Data Model                                                              |
|--------|--------------------------------|--------------------------------------|-------------------------------------------------------------------------|
| GET    | `/api/tasks`                  | Get all tasks                        | -                                                                       |
| GET    | `/api/tasks?tags=tag1&tags=tag2` | Filter tasks by tags                 | query: `{tags: string[]}`                                               |
| POST   | `/api/tasks`                  | Create a new task                    | `{title: string, description?: string, dueDate?: Date, status?: string, tags: number[]}` |
| PUT    | `/api/tasks/:id`              | Update an existing task              | `{title?: string, description?: string, dueDate?: Date, status?: string}`               |
| DELETE | `/api/tasks/:id`              | Delete an existing task              | -                                                                       |

#### Tags

| Method | Endpoint               | Description                           | Data Model                                       |
|--------|-------------------------|---------------------------------------|--------------------------------------------------|
| GET    | `/api/tags/all`        | Get all tags                          | -                                                |
| GET    | `/api/tags`            | Get all tags for a user               | -                                                |
| POST   | `/api/tags`            | Create a new tag                      | `{name: string, color?: string}`                 |
| PUT    | `/api/tags/:id`        | Update an existing tag                | `{name?: string, color?: string}`                |
| DELETE | `/api/tags/:id`        |

 Delete an existing tag                | -                                                |

---

### Data Model Explanation:

- **Tasks (POST and PUT)**:
  - `title`: Required during creation; represents the task title.
  - `description`: Optional, a brief task description.
  - `dueDate`: Optional, the task due date.
  - `status`: Optional, can be `pending`, `in_progress`, or `completed`.
  - `tags`: Array of tag IDs associated with the task.

- **Tags (POST and PUT)**:
  - `name`: Required during creation, represents the tag name.
  - `color`: Optional, represents a color associated with the tag.

Each endpoint is designed to address the specific needs of the API, ensuring that relevant data is sent and received in a clear and structured manner.

## Testing

### Jest Configuration

Jest is configured for unit testing on the backend. Run the tests with:

```bash
npm test
```

### Performed Tests

- **Authentication**: Registration and login tests, ensuring secure password hashing and JWT generation.
- **Task Management**: Tests for task creation, editing, deletion, and filtering.
- **Filtering and Queries**: Performance tests for task filtering, evaluating efficiency and accuracy.