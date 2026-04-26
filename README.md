# Subscription Tracker API (Backend)

A RESTful backend API for managing users and subscriptions. Built with Node.js, Express, and MongoDB. It includes authentication, role-based access control, background workflows, and security middleware.

---

# Features

## Authentication
- User signup, signin, and signout
- JWT-based authentication
- Password hashing using bcryptjs
- Protected routes using middleware

## User Management (Admin only)
- Get all users
- Get single user by ID
- Update user
- Delete user
- Role-based access control (user / admin)

## Subscription Management
- Create subscription
- Get all subscriptions (admin only)
- Get subscriptions for a specific user
- Update subscription
- Cancel subscription
- Delete subscription
- Upcoming renewal tracking

## Background Workflows
- Subscription reminder system using Upstash Workflow (QStash)
- Automated workflow triggers on subscription creation

## Email System
- Nodemailer integration using Gmail SMTP
- Used for subscription reminder emails

## Security
- JWT authentication middleware
- Admin-only authorization middleware
- Ownership validation for user-specific data
- Arcjet protection for:
  - Rate limiting
  - Bot detection
  - Request shielding

## Error Handling
- Centralized error middleware
- Handles:
  - MongoDB CastError
  - Duplicate key errors
  - Validation errors
  - General server errors

---

# Tech Stack

- Node.js
- Express.js
- MongoDB and Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Nodemailer
- Arcjet
- Upstash Workflow (QStash)
- dotenv

---

## Instructions

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**
Create a new file named `.env.development.local` in the root of your project with the following variables:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```


```bash
npm run dev
```

Open http://localhost:5500](http://localhost:5500 in your browser or an HTTP client to test.
