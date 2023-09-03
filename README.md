# Book Catalog Service

**A Robust Backend Service for Managing Your Book Catalog with Authentication and Authorization**

Ripository Link: https://github.com/mohammad-naimur-rahman/book-catalog-service
Server Link: https://book-catalog-service-production.up.railway.app

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

## Documentations

Postmane documentation link: https://documenter.getpostman.com/view/16774147/2s9Y5cuLzH

## Available API endpoints:

### Authentication

**Signup User**

POST - https://book-catalog-service-production.up.railway.app/api/v1/auth/signup

**Login User**

POST - https://book-catalog-service-production.up.railway.app/api/v1/auth/signin

**_For Admin access: Login with this credentials:_**

```json
  {
    "email" "naimur@gmail.com",
    "password: "iamnaeem"
  }
```

### Users

**Get all users**

GET - https://book-catalog-service-production.up.railway.app/api/v1/users

(Need admin bearer token)
Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNGJmNWM4ZC0xZTIzLTQ1ZjctYTA2Yi1iMDI5MjQ5ZDAxOTMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTM2ODI5MjQsImV4cCI6MTY5Mzc2OTMyNH0.Wwcng_OCbyBFrkeJTSk5YmZVozG9IoePqUmDwQ2OMHQ`

**Get a single user**

GET - https://book-catalog-service-production.up.railway.app/api/v1/users/eaa471f4-11a2-4b36-87a5-8b175712bb0e

(Need admin bearer token)

**Update User**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/users/eaa471f4-11a2-4b36-87a5-8b175712bb0e

(Need admin bearer token)

**Delete User**

DELETE - https://book-catalog-service-production.up.railway.app/api/v1/users/eaa471f4-11a2-4b36-87a5-8b175712bb0e

(Need admin bearer token)

**Get User Own Profile**

GET - https://book-catalog-service-production.up.railway.app/api/v1/users/profile

(Need bearer token)

**Make a user admin**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/users/make-admin/5b615551-d5a3-40b8-8546-6dd3fd661c36

(Need admin bearer token)

### Categories

**Create Category**

POST - https://book-catalog-service-production.up.railway.app/api/v1/categories/create-category

(Need admin bearer token)

**Get All Categories**

GET - https://book-catalog-service-production.up.railway.app/api/v1/categories

**Get Single Category**

GET - https://book-catalog-service-production.up.railway.app/api/v1/categories/3ff62ea1-5f64-432f-915c-074801c5c76b

**Update Category**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/categories/8a9bc47a-5eeb-45f7-b7a4-ac085853f7c6

(Need admin bearer token)

**Delete Category**

https://book-catalog-service-production.up.railway.app/api/v1/categories/8a9bc47a-5eeb-45f7-b7a4-ac085853f7c6

(Need admin bearer token)

### Books

**Get all books**

GET - https://book-catalog-service-production.up.railway.app/api/v1/books

PARAMS EXAMPLE
| params | Value |
|-------------|-------------------|
| page | 1 |
| size | 10 |
| sortBy | price |
| sortOrder | desc |
| search | Kazi Nazrul Islam |
| category | fab37c7e-dd70-4466-9a9f-c30706b5ba6a |
| minPrice | 9.9 |
| maxPrice | 49.9 |

**Create book**

POST - https://book-catalog-service-production.up.railway.app/api/v1/books/create-book

(Need admin bearer token)

**Get a single book**
GET - https://book-catalog-service-production.up.railway.app/api/v1/books/1bf1c9c0-4468-4414-a585-7288ec437525

**Get a book by category**
https://book-catalog-service-production.up.railway.app/api/v1/books/3ff62ea1-5f64-432f-915c-074801c5c76b/category

**Update book**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/books/1bf1c9c0-4468-4414-a585-7288ec437525

(Need admin bearer token)

**Delete a book**

DELETE - https://book-catalog-service-production.up.railway.app/api/v1/books/1bf1c9c0-4468-4414-a585-7288ec437525

(Need admin bearer token)

### Order

**Place Order**

POST - https://book-catalog-service-production.up.railway.app/api/v1/orders/create-order

(Need bearer token)

**GEt single order**

GET - https://book-catalog-service-production.up.railway.app/api/v1/orders/8a2db2af-5f1a-4125-8c07-68da1ee908ca

(Admin needs his bearer token, and user needs his own bearer token)

**Get all orders**

GET - https://book-catalog-service-production.up.railway.app/api/v1/orders/

(Need admin bearer token)

Thanks for visiting this project!
