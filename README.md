# Book Catalog Service

**A Robust Backend Service for Managing Your Book Catalog with Authentication and Authorization**

## Tech Stack:

- **Server**: Node.js, Express.js
- **Database and ORM**: PostgreSQL (Supabase), Prisma
- **Type Safety and Validation**: TypeScript, Zod
- **Authentication and Authorization**: JSON Web Token, Bcrypt
- **Linters and Formatters**: ESLint, Prettier
- **Pre-commit Hooks**: Husky, Lint Staged

## Highlighted Features:

- **User Authentication and Authorization**: Secure your application with user-specific access controls.
- **Admin and User Distinction**: Differentiate between admin and user roles for enhanced security and functionality.
- **Book Management**: Create, search, filter, sort, and paginate your book catalog effortlessly.
- **Order Processing**: Streamline order creation and access your own orders efficiently.

## Getting Started:

1. Clone the repository:

   ```bash
   git clone https://github.com/mohammad-naimur-rahman/book-catalog-service
   ```

2. Install the dependencies:

   ```bash
   yarn
   ```

3. Configure environment variables (Refer to `.env.example`).

4. Migrate the database:

   ```bash
   yarn migrate
   ```

5. Run locally at `http://localhost:PORT`:

   ```bash
   yarn dev
   ```

6. Build the application:

   ```bash
   yarn build
   ```

Get started with your Book Catalog Service today and experience a seamless and secure book management system!

## Available API endpoints:
