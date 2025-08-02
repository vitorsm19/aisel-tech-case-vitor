# Aisel Health - Patient Management Frontend

A Next.js frontend application for the Aisel Health patient management system challenge.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Backend Integration

This frontend is designed to work with the NestJS backend running on `http://localhost:3001`.

Make sure to start the backend server first:
```bash
cd ../server
npm run start:dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
client/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/                 # Static assets
├── components.json         # Shadcn/ui configuration
└── package.json
```

## Development Notes

- Uses Next.js App Router (not Pages Router)
- Configured with TypeScript for type safety
- Tailwind CSS with custom design system
- Shadcn/ui components ready to use
- Axios installed for API communication

This is a minimal setup ready for implementing the patient management features.
