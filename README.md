# Aisel Health - Patient Management System

https://vitor-aisel-tech-case.netlify.app/login

A complete patient management system built for the Aisel Health frontend developer position challenge. Features a React/Next.js frontend with NestJS backend, implementing JWT authentication, role-based access control, and full CRUD operations for patient management.

## 🚀 Tech Stack

### Frontend (client/)
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS v4** - Modern utility-first styling
- **Shadcn/ui** - Beautiful, accessible component library
- **Axios** - HTTP client for API communication
- **React Hook Form + Zod** - Form handling and validation
- **Jest + Testing Library** - Unit testing

### Backend (server/)
- **NestJS** - Node.js framework with TypeScript
- **JWT Authentication** - Secure token-based auth
- **Role-based Access Control** - Admin/User permissions
- **Class Validator** - Request validation

## 🏃‍♂️ Quick Start

### Option 1: Manual Setup
```bash
# Backend
cd server
npm install
npm run start:dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

### Option 2: Docker
```bash
# Install Docker Desktop first, then:
docker-compose up --build

# Access the applications:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## 🏗️ Project Structure

```
aisel-patients-challenge/
├── client/                    # Frontend Application
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── login/        # Authentication page
│   │   │   ├── patient/      # Patient CRUD pages
│   │   │   │   ├── [id]/     # Patient detail/edit
│   │   │   │   └── new/      # Create patient
│   │   │   └── home/         # Dashboard
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Shadcn/ui components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── header.tsx    # Navigation header
│   │   │   └── patients-list.tsx
│   │   ├── contexts/         # React Context providers
│   │   │   └── auth-context.tsx
│   │   └── hooks/            # Custom React hooks
│   │       └── usePermissions.ts
│   ├── __tests__/            # Unit tests
│   └── Dockerfile
├── server/                   # Backend API
└── docker-compose.yml       # Container orchestration
```

## ✨ Features

### Authentication & Authorization
- JWT-based authentication with localStorage persistence
- Role-based access control (Admin/User)
- Protected routes and API endpoints
- Automatic token validation and refresh

### Patient Management
- **View Patients**: Responsive grid layout with patient cards
- **Create Patient**: Form with validation for new patient registration
- **Edit Patient**: Update existing patient information
- **Delete Patient**: Admin-only soft delete with confirmation dialog
- **Patient Details**: Comprehensive view with edit capabilities

### UI/UX
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- 🎨 **Professional Design**: Clean, healthcare-focused interface
- ♿ **Accessibility**: ARIA labels and keyboard navigation
- 🔄 **Loading States**: Smooth user experience with proper feedback
- ❌ **Error Handling**: Comprehensive error management and display

### Technical Features
- **Custom Hooks**: `usePermissions()` for role-based UI control
- **Layout System**: Consistent header across protected pages
- **Form Validation**: Zod schemas with React Hook Form
- **API Integration**: Centralized axios configuration
- **Testing**: Jest unit tests for components and contexts

## 🔐 Default Users

```javascript
// Admin User (full access)
email: admin@aisel.health
password: admin123

// Regular User (read-only)
email: user@aisel.health  
password: user123
```

## 🧪 Testing

```bash
# Frontend tests
cd client
npm run test
npm run test:coverage

# Backend tests
cd server
npm run test
```

## 📝 Available Scripts

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run test        # Run Jest tests
```

### Backend
```bash
npm run start:dev   # Start development server
npm run build       # Build TypeScript
npm run start:prod  # Start production server
npm run test        # Run tests
```

## 🌟 Technical Highlights

- **Modern React Patterns**: Hooks, Context API, and functional components
- **TypeScript Throughout**: Full type safety across frontend and backend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Security Best Practices**: JWT tokens, role validation, input sanitization
- **Performance Optimized**: Next.js optimizations and efficient state management
- **Developer Experience**: Hot reload, TypeScript, ESLint, and comprehensive testing

## 📋 Challenge Requirements Fulfilled

✅ **Authentication**: JWT-based login system  
✅ **Patient CRUD**: Complete create, read, update, delete operations  
✅ **Role-based Access**: Admin/User permission system  
✅ **Responsive Design**: Mobile-optimized interface  
✅ **Error Handling**: Comprehensive error management  
✅ **Testing**: Unit tests for components and services  
✅ **Docker**: Complete containerization setup  
✅ **TypeScript**: Full type safety implementation  

## 🔧 Environment Setup

The application uses environment variables for configuration. In development, default values are used.

### For Production Deployment:

**Backend (Heroku/Railway):**
```bash
cd server
# Deploy to your preferred platform
# Make sure to set PORT environment variable (automatically set on Heroku)
```

**Frontend (Netlify):**
Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

### CORS Configuration
The backend is configured to allow requests from:
- `http://localhost:3000` (development)  
- `https://vitor-aisel-tech-case.netlify.app` (production)

Update `server/src/main.ts` with your frontend URL if different.

---

**Built for Aisel Health Frontend Developer Position**  
*Demonstrating modern React development practices and healthcare application design*
