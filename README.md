# Smart Task Manager with AI

A modern Next.js application for managing tasks with AI-powered suggestions.

## Features

- ✅ User Authentication (Sign up, Sign in)
- 📋 Task Management (Create, Read, Update, Delete)
- 🎯 Priority Levels (Low, Medium, High, Urgent)
- 📅 Due Date Tracking
- ✨ AI-powered Task Suggestions
- 🎨 Beautiful UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (we recommend Neon)

### Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Create `.env.local` file:**
```bash
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-key" # Optional for AI features
```

3. **Generate NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

4. **Setup database:**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server:**
```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
app/
├── (dashboard)/          # Protected dashboard
├── auth/                 # Authentication pages
├── api/                  # API endpoints
└── layout.tsx            # Root layout

components/
├── ui/                   # UI components
└── task-form.tsx         # Task creation form

lib/
├── auth.ts               # NextAuth configuration
├── prisma.ts             # Prisma client
└── utils.ts              # Utilities

prisma/
└── schema.prisma         # Database schema
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database

Uses PostgreSQL with Prisma ORM. Models include:
- User (authentication)
- Task (task management)
- Account, Session (NextAuth)

## Technologies

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL, Prisma
- **Auth:** NextAuth.js
- **AI:** OpenAI SDK
- **Forms:** React Hook Form, Zod
