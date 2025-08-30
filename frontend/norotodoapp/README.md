# Todo App Frontend

## Overview
Next.js 15 frontend for the Nooro Todo application with TypeScript, Tailwind CSS, and modern React features.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd frontend/norotodoapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

Update the `.env.local` file:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:3000`


## Project Structure
```
frontend/norotodoapp/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   └── tasks/
│   │       ├── new/page.tsx         # Create task
│   │       └── [id]/page.tsx        # Edit task
│   ├── components/
│   │   ├── Header.tsx               # Reusable header
│   │   ├── TaskSummary.tsx          # Task counts
│   │   ├── ActionButton.tsx         # Floating button
│   │   └── EmptyState.tsx           # Tasks state
│   └── lib/
│       └── api.ts                   # API functions
├── .env.local
├── package.json
└── README.md
```

## API Integration

### Endpoints Used
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server


## Troubleshooting

#### API Connection Failed
1. Ensure backend is running on port 4000
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS settings in backend


## Environment Setup

### Required Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:4000  # Backend API URL
```
