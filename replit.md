# PawConnect

## Overview

PawConnect is a pet care marketplace that connects pet owners with trusted pet companions. The application facilitates browsing available pets, booking pet care sessions with flexible subscription options (hourly, daily, weekly), and managing the entire booking lifecycle including safety checklists and reviews. The platform features a modern, visually appealing interface with glassmorphic design elements inspired by Airbnb and Rover.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type safety and component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for server state management and caching
- Tailwind CSS for utility-first styling with custom design system

**UI Component Library:**
- shadcn/ui components based on Radix UI primitives
- Custom theme with "new-york" style variant
- Glassmorphic design system with backdrop blur effects
- Responsive design with mobile-first approach

**Design System:**
- Primary font: Poppins (from Google Fonts) for modern, friendly aesthetics
- Custom color scheme using HSL color space for easy theming
- Spacing system based on Tailwind's 4-unit scale (4px increments)
- Component variants using class-variance-authority for consistent styling

**State Management:**
- Local storage for client-side persistence of user data, pets, bookings, and reviews
- Booking flow state managed through a multi-step wizard pattern
- No server-side state synchronization in current implementation

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript for type-safe server code
- Custom Vite integration for development with HMR support

**Storage Layer:**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) for future database integration
- Drizzle ORM configured for PostgreSQL migration path
- Schema defined with support for users, pets, bookings, and reviews tables

**Database Schema Design:**
- Users table: Supports both "owner" and "companion" roles
- Pets table: Stores pet profiles with images, breed, age, behavior traits
- Bookings table: Links users to pets with subscription types and scheduling
- Reviews table: Captures ratings and feedback tied to specific bookings
- UUID-based primary keys using PostgreSQL's gen_random_uuid()

**API Structure:**
- RESTful API pattern with `/api` prefix convention
- Request/response logging middleware for debugging
- JSON body parsing with raw body preservation for webhooks
- Currently using placeholder routes (to be implemented)

### External Dependencies

**UI & Styling:**
- Radix UI component primitives for accessible, unstyled components
- Tailwind CSS with PostCSS for styling and autoprefixer
- Google Fonts (Poppins) for typography
- Custom CSS variables for theming with light/dark mode support

**Database & ORM:**
- Drizzle ORM for type-safe database queries and schema management
- @neondatabase/serverless for PostgreSQL connectivity (configured but not yet active)
- Drizzle Zod for schema validation
- connect-pg-simple for session storage (installed but not implemented)

**Development Tools:**
- Replit-specific plugins for runtime error overlay, dev banner, and cartographer
- tsx for running TypeScript server code in development
- esbuild for production server bundling

**Utilities:**
- date-fns for date manipulation
- nanoid for generating unique IDs
- react-hook-form with Zod resolvers for form validation
- embla-carousel-react for image galleries

**Current Implementation Notes:**
- Storage is entirely client-side using localStorage wrapper
- No authentication/authorization implementation yet
- Database schema defined but not connected to active database
- API routes registered but not yet implemented
- Session management dependencies installed but not configured