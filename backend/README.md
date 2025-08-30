# Todo App Backend

## Overview
Express.js backend API for the Nooro Todo application with Prisma ORM and PostgreSQL database.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- mySQL 
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
# Database
DATABASE_URL="mysql://root:{mysql password}@localhost:3306/{db schema name}"

# Server
PORT=4000
NODE_ENV=development

# CORS (Frontend URL)
FRONTEND_URL="http://localhost:3000"
```

### 4. Database Setup with Prisma

#### Initialize Prisma
```bash
npx prisma init
```

#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request/Response Examples

#### Create Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Feed Paimon",
  "color": "#3b82f6",
  "completed": false
}
```

#### Update Task
```bash
PUT /api/tasks/1
Content-Type: application/json

{
  "title": "Do your Genshin dalies",
  "completed": true
}
```

## Database Schema

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  color     String   @default("#3b82f6")
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run build` - Build for production
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma Client


## Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env
├── package.json
└── README.md
```