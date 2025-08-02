# Aisel Health - Patient Management Backend

A NestJS-based mock backend API for the frontend developer challenge at Aisel Health. This server provides REST API endpoints for patient management with JWT-based authentication and role-based access control.

## Features

- **Patient CRUD Operations**: Create, read, update, and delete patient records
- **JWT Authentication**: Secure authentication using JSON Web Tokens
- **Role-Based Access Control**: Admin and user roles with different permissions
- **In-Memory Data Storage**: Mock data stored in memory (no database required)
- **Input Validation**: Request validation using class-validator
- **CORS Enabled**: Ready for frontend integration

## Quick Start

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The server will start on `http://localhost:3001`

## Authentication

### Hardcoded Users

The system includes two predefined users:

| Username | Password | Role  | Permissions |
|----------|----------|-------|-------------|
| `jayanka@aisel.co`  | `123` | Admin | Full CRUD access to all endpoints |
| `vitor@aisel.co`   | `123`  | User  | Read-only access to patient data |

### How Authentication Works

1. **Login**: Send POST request to `/api/auth/login` with username/password
2. **Get Token**: Receive JWT token in response
3. **Use Token**: Include token in Authorization header: `Bearer <token>`
4. **Access Protected Routes**: Token required for all patient endpoints

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
Login with username and password to receive JWT token.

**Request Body:**
```json
{
  "username": "jayanka@aisel.co",
  "password": "123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "jayanka@aisel.co",
    "role": "admin"
  }
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "1",
  "username": "jayanka@aisel.co",
  "role": "admin"
}
```

### Patient Endpoints

All patient endpoints require authentication. Create, update, and delete operations require admin role.

#### GET /api/patients
Get all patients (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "phoneNumber": "+1-555-0123",
    "dob": "1985-03-15"
  },
  {
    "id": 2,
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice.smith@email.com",
    "phoneNumber": "+1-555-0456",
    "dob": "1992-07-22"
  }
]
```

#### GET /api/patients/:id
Get a specific patient by ID (requires authentication).

#### POST /api/patients
Create a new patient (requires admin role).

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phoneNumber": "+1-555-9999",
  "dob": "1990-05-15"
}
```

#### PATCH /api/patients/:id
Update a patient (requires admin role).

#### DELETE /api/patients/:id
Delete a patient (requires admin role).

## Sample Patient Data

The server includes 100 sample patients with the following required fields:

- **id**: Unique integer identifier (1-100)
- **firstName**: Patient's first name
- **lastName**: Patient's last name  
- **email**: Patient's email address
- **phoneNumber**: Patient's phone number
- **dob**: Date of birth (YYYY-MM-DD format)

## Project Structure

```
server/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── decorators/       # Custom decorators (roles)
│   │   ├── dto/             # Data transfer objects
│   │   ├── entities/        # User entity interface
│   │   ├── enums/           # Role enum
│   │   ├── guards/          # Auth and role guards
│   │   ├── strategies/      # JWT strategy
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── patients/            # Patients module
│   │   ├── dto/            # Create/update DTOs
│   │   ├── patient.entity.ts
│   │   ├── patients.controller.ts
│   │   ├── patients.service.ts
│   │   └── patients.module.ts
│   ├── app.module.ts        # Root module
│   └── main.ts             # Application entry point
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## Development Notes

- **No Database**: All data is stored in memory and will reset when the server restarts
- **Mock Data**: Realistic sample data for testing frontend functionality
- **CORS Enabled**: Ready for cross-origin requests from your frontend
- **Global Validation**: All requests are validated using class-validator
- **Global Prefix**: All routes are prefixed with `/api`

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with file watching
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run start:prod` - Start the production build

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

1. **Login to get a token:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "jayanka@aisel.co", "password": "123"}'
```

2. **Use the token to access patients:**
```bash
curl -X GET http://localhost:3001/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Frontend Integration

This backend is designed to work seamlessly with React/Next.js frontends. The API follows RESTful conventions and returns JSON responses suitable for modern frontend frameworks.

Key integration points:
- Authentication via JWT tokens
- CORS enabled for cross-origin requests
- Consistent JSON response format
- Proper HTTP status codes
- Input validation with detailed error messages

## Security Notes

⚠️ **This is a mock backend for development/challenge purposes only:**

- Uses hardcoded JWT secret (change for production)
- No rate limiting
- No input sanitization beyond validation
- No logging or monitoring
- In-memory storage only

For production use, implement proper security measures, database integration, and monitoring.