# Refactoring Plan: Migrating to Vercel Postgres

This document outlines the plan for refactoring the Pathfinder Cards application to use Vercel Postgres instead of localStorage for data persistence.

## Current State

The application currently:
- Uses localStorage for all data persistence
- Manages state with Zustand
- Is built with Next.js
- Has no server-side data handling
- Stores projects and cards in the client's browser

## Goals

1. Migrate from localStorage to Vercel Postgres
2. Enable user authentication
3. Maintain the current functionality
4. Improve data persistence and reliability
5. Enable sharing of projects between users (future enhancement)

## Technology Stack

- **Next.js**: Continue using as the framework
- **Vercel Postgres**: For database storage
- **Prisma**: As the ORM for database interactions
- **NextAuth.js**: For authentication
- **Zustand**: Continue using for client-side state management
- **Vercel**: For hosting

## Database Schema

```prisma
// schema.prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  projects  Project[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Project {
  id          String    @id @default(cuid())
  projectName String
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  cards       Card[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([userId, projectName])
}

model Card {
  id            String   @id @default(cuid())
  name          String
  type          String
  level         String
  traits        String
  actions       String
  body          String
  tags          String?
  plain         Int?
  numberToPrint Int      @default(1)
  projectId     String
  project       Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Meta information
  public        Boolean  @default(false)
  url           String?
}
```

## Folder Structure

```
/
├── prisma/
│   └── schema.prisma       # Prisma schema definition
├── src/
│   ├── app/                # Next.js app router
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication API routes
│   │   │   ├── projects/   # Project API routes
│   │   │   └── cards/      # Card API routes
│   ├── components/         # React components (keep existing)
│   ├── lib/                # Shared utilities
│   │   ├── auth.ts         # Authentication utilities
│   │   ├── db.ts           # Database client
│   │   └── prisma.ts       # Prisma client
│   ├── services/           # Business logic
│   │   ├── projectService.ts  # Project-related operations
│   │   └── cardService.ts     # Card-related operations
│   ├── stores/             # Zustand stores (refactor existing)
│   │   ├── projectStore.ts    # Updated to use API
│   │   └── authStore.ts       # New store for auth state
│   └── types/              # TypeScript type definitions
└── .env                    # Environment variables
```

## Implementation Plan

### 1. Setup Vercel Postgres and Prisma

1. Install required dependencies:
   ```bash
   npm install @prisma/client @vercel/postgres
   npm install prisma --save-dev
   ```

2. Initialize Prisma:
   ```bash
   npx prisma init
   ```

3. Configure the database connection in `.env`:
   ```
   DATABASE_URL="postgres://..."
   ```

4. Create the Prisma schema as defined above

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Create database client in `src/lib/db.ts`:
   ```typescript
   import { PrismaClient } from '@prisma/client'

   const prismaClientSingleton = () => {
     return new PrismaClient()
   }

   type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClientSingleton | undefined
   }

   export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
   ```

### 2. Implement Authentication

1. Install NextAuth.js:
   ```bash
   npm install next-auth
   ```

2. Create authentication configuration in `src/lib/auth.ts`

3. Set up API routes for authentication in `src/app/api/auth/[...nextauth]/route.ts`

4. Create an auth store with Zustand in `src/stores/authStore.ts`

5. Add login/signup UI components

### 3. Create API Routes

1. Create project API routes:
   - `GET /api/projects` - List user's projects
   - `GET /api/projects/:id` - Get a specific project
   - `POST /api/projects` - Create a new project
   - `PUT /api/projects/:id` - Update a project
   - `DELETE /api/projects/:id` - Delete a project

2. Create card API routes:
   - `GET /api/projects/:projectId/cards` - List cards in a project
   - `GET /api/projects/:projectId/cards/:id` - Get a specific card
   - `POST /api/projects/:projectId/cards` - Create a new card
   - `PUT /api/projects/:projectId/cards/:id` - Update a card
   - `DELETE /api/projects/:projectId/cards/:id` - Delete a card

### 4. Update Zustand Stores

1. Refactor `projectStore.ts` to use the API instead of localStorage:
   - Replace localStorage calls with API fetch calls
   - Handle loading states and errors
   - Maintain optimistic updates for better UX

2. Example of updated store:
   ```typescript
   const useProjectStore = create<ProjectStore>((set, get) => ({
     project: getInitialProject(),
     isLoading: false,
     error: null,

     actions: {
       addCard: async (card: CardData) => {
         set({ isLoading: true });
         try {
           const response = await fetch(`/api/projects/${get().project.id}/cards`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(card),
           });

           if (!response.ok) throw new Error('Failed to add card');

           const newCard = await response.json();
           set((state) => ({
             project: {
               ...state.project,
               cards: [...state.project.cards, newCard],
             },
             isLoading: false,
           }));
         } catch (error) {
           set({ error: error.message, isLoading: false });
         }
       },
       // Other actions similarly updated
     },
   }));
   ```

### 5. Update UI Components

1. Add authentication UI (login/signup/profile)
2. Add loading states to existing components
3. Handle errors gracefully in the UI
4. Update any components that directly reference localStorage

### 6. Migration Strategy

1. Create a migration utility to help users move their localStorage data to the database:
   ```typescript
   // src/utils/migrateLocalStorage.ts
   export async function migrateLocalStorageToDb(userId: string) {
     // Get all projects from localStorage
     const projectKeys = Object.keys(localStorage).filter(key =>
       key.startsWith('rpgCards_project_')
     );

     for (const key of projectKeys) {
       const projectData = JSON.parse(localStorage.getItem(key));

       // Create project in database
       const project = await fetch('/api/projects', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           projectName: projectData.projectName,
         }),
       }).then(res => res.json());

       // Create cards in database
       for (const card of projectData.cards) {
         await fetch(`/api/projects/${project.id}/cards`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(card),
         });
       }
     }
   }
   ```

2. Offer this migration to users after they log in for the first time

### 7. Testing

1. Create unit tests for API routes
2. Create integration tests for database operations
3. Test the migration utility
4. Test the application with various user scenarios

## Deployment

1. Set up Vercel Postgres in the Vercel dashboard
2. Configure environment variables in Vercel
3. Deploy the application to Vercel

## Future Enhancements

1. Implement project sharing between users
2. Add public/private visibility for projects
3. Create a card marketplace or library
4. Add versioning for cards and projects
5. Implement advanced search and filtering

## Implementation Timeline

1. **Week 1**: Setup Vercel Postgres, Prisma, and database schema
2. **Week 2**: Implement authentication and basic API routes
3. **Week 3**: Update Zustand stores and UI components
4. **Week 4**: Create migration utility and test the application
5. **Week 5**: Deploy to production and monitor

## Conclusion

This refactoring will significantly improve the application by:
- Providing persistent storage across devices
- Enabling user accounts and authentication
- Laying the groundwork for collaborative features
- Improving reliability and data integrity

The plan maintains the current functionality while enhancing the application's capabilities and preparing it for future growth.