# Ascent Trade - Banking Operations Platform

## Overview

Ascent Trade is a professional enterprise banking operations platform designed for Union Bank Nigeria. It provides comprehensive trade finance management including Form M/A processing, FX trading, import letters of credit, bills for collection, and regulatory compliance workflows. The platform handles complex multi-step banking transactions with CBN compliance, SWIFT integration, and real-time FX rates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Theming**: Dark/light mode with CSS custom properties
- **Build Tool**: Vite with HMR support

The frontend follows a page-based architecture with reusable components. Key patterns include:
- Compound components for complex UI (TransactionTable, TransactionModal)
- Context providers for auth and theming
- Custom hooks for business logic (use-auth, use-upload)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Build**: esbuild for production bundling with selective dependency bundling

The server uses a simple route registration pattern with storage abstraction. Currently implements in-memory storage with interface designed for easy database migration.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between client/server
- **Migrations**: Drizzle Kit with `db:push` command
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

The database schema includes:
- Users table with Replit Auth integration
- Sessions table for authentication persistence
- Transaction-related tables following banking domain model

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Session**: Express session with PostgreSQL store
- **Middleware**: Passport.js with custom OIDC strategy

Authentication flow uses Replit's identity provider with automatic user upsert on login.

### File Storage
- **Provider**: Google Cloud Storage via Replit Object Storage
- **Upload Pattern**: Presigned URL flow with Uppy client library
- **ACL**: Custom object-level access control system

## External Dependencies

### Third-Party Services
- **Replit Auth**: OpenID Connect identity provider for user authentication
- **Replit Object Storage**: Google Cloud Storage wrapper for file uploads
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)

### Key NPM Packages
- **UI**: Radix UI primitives, shadcn/ui components, Lucide icons
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **File Upload**: Uppy with AWS S3 plugin (configured for GCS)
- **Date Handling**: date-fns

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Express session encryption key
- `REPL_ID`: Replit deployment identifier (auto-set)
- `ISSUER_URL`: OIDC issuer URL (defaults to Replit)