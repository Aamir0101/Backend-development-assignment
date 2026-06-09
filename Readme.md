# Backend Intern Assignment

A secure Node.js and Express.js backend application implementing **JWT Authentication** and **Role-Based Access Control (RBAC)** with MongoDB and Mongoose.

## Features

- User Registration
- User Login
- Password Hashing using bcryptjs
- JWT Authentication
- Role-Based Access Control (Admin/User)
- Protected Routes
- EJS Views
- MongoDB Database Integration
- Swagger API Documentation
- Secure HTTP-only Cookies

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- EJS
- dotenv

---

## Project Structure

```text
src/
│
├── controller/
│   └── authController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── views/
│   └── users/
│       ├── signup.ejs
│       └── login.ejs
│
├── public/
│   └── css/
│
├── app.js
└── .env
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd backend-intern-assignment
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8008

MONGO_URI=mongodb://127.0.0.1:27017/backend-assignment

JWT_SECRET=your_super_secret_key

NODE_ENV=development
```

### Run Application

```bash
npm start
```

or

```bash
npm run dev
```

---

## Authentication Flow

```text
User Registration
        ↓
User Login
        ↓
JWT Token Generated
        ↓
Token Stored in HTTP-only Cookie
        ↓
Access Protected Routes
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /signup
```

Request Body:

```json
{
  "username": "john",
  "password": "password123",
  "role": "user"
}
```

Success Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login User

```http
POST /login
```

Request Body:

```json
{
  "username": "john",
  "password": "password123"
}
```

Success Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

## Protected Routes

Authentication Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

### Admin Route

```http
GET /admin
```

Access:

```text
Admin Only
```

Response:

```json
{
  "message": "welcome admin"
}
```

---

### User Route

```http
GET /user
```

Access:

```text
Admin and User
```

Response:

```json
{
  "message": "welcome user"
}
```

---

## Middleware

### Authentication Middleware

Validates JWT token before allowing access to protected routes.

### Role Middleware

Restricts access based on user roles.

Supported Roles:

- admin
- user

---

## Security Features

### Password Hashing

Passwords are hashed using bcryptjs before storing in the database.

### JWT Authentication

JWT tokens are generated upon successful login and verified for protected routes.

### HTTP-only Cookies

Authentication tokens are stored in secure HTTP-only cookies.

### Role-Based Authorization

Users can access resources based on assigned roles.

---

## Testing with Postman

### Register

```http
POST /signup
```

### Login

```http
POST /login
```

Copy the JWT token.

### Access Protected Route

```http
GET /admin
```

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Future Improvements

- Refresh Tokens
- Email Verification
- Password Reset Functionality
- User Profile Management
- Rate Limiting
- Input Validation using Joi
- Logging and Monitoring
- Docker Support

---

## Author

**Mohd Aamir**

Backend Developer Intern Assignment

Built with Node.js, Express.js, MongoDB, JWT Authentication, and RBAC.
