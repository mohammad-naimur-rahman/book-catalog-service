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

GET - https://book-catalog-service-production.up.railway.app/api/v1/users/7f289ff9-cab9-485f-a86c-bd81f0887bbf

(Need admin bearer token)

**Update User**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/users/7f289ff9-cab9-485f-a86c-bd81f0887bbf

(Need admin bearer token)

**Delete User**

DELETE - https://book-catalog-service-production.up.railway.app/api/v1/users/7f289ff9-cab9-485f-a86c-bd81f0887bbf

(Need admin bearer token)

**Get User Own Profile**

GET - https://book-catalog-service-production.up.railway.app/api/v1/users/profile

(Need bearer token)

**Make a user admin**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/users/make-admin/7f289ff9-cab9-485f-a86c-bd81f0887bbf

(Need admin bearer token)

### Categories

**Create Category**

POST - https://book-catalog-service-production.up.railway.app/api/v1/categories/create-category

(Need admin bearer token)

**Get All Categories**

GET - https://book-catalog-service-production.up.railway.app/api/v1/categories

**Get Single Category**

GET - https://book-catalog-service-production.up.railway.app/api/v1/categories/c617fc8c-f32f-457e-8bcc-8e58526ddc38

**Update Category**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/categories/c617fc8c-f32f-457e-8bcc-8e58526ddc38

(Need admin bearer token)

**Delete Category**

https://book-catalog-service-production.up.railway.app/api/v1/categories/c617fc8c-f32f-457e-8bcc-8e58526ddc38

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
GET - https://book-catalog-service-production.up.railway.app/api/v1/books/9ce8cee1-98e5-435a-8d74-44601c9d5401

**Get a book by category**
https://book-catalog-service-production.up.railway.app/api/v1/books/c617fc8c-f32f-457e-8bcc-8e58526ddc38/category

**Update book**

PATCH - https://book-catalog-service-production.up.railway.app/api/v1/books/9ce8cee1-98e5-435a-8d74-44601c9d5401

(Need admin bearer token)

**Delete a book**

DELETE - https://book-catalog-service-production.up.railway.app/api/v1/books/9ce8cee1-98e5-435a-8d74-44601c9d5401

(Need admin bearer token)

### Order

**Place Order**

POST - https://book-catalog-service-production.up.railway.app/api/v1/orders/create-order

(Need bearer token)

**GEt single order**

GET - https://book-catalog-service-production.up.railway.app/api/v1/orders/9d7b782f-6311-46a7-9775-92def0409323

(Admin needs his bearer token, and user needs his own bearer token)

**Get all orders**

GET - https://book-catalog-service-production.up.railway.app/api/v1/orders/

(Need admin bearer token)

Thanks for visiting this project!
