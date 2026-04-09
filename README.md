# Code Studio ATS -- Authentication & Role-Based Access Control

A full-stack authentication system with Role-Based Access Control (RBAC)
built for Code Studio ATS.

This project demonstrates secure authentication using JWT, role-based
dashboards, and protected routes using a React + Node.js + MongoDB tech
stack.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React 18
-   React Router
-   Axios
-   React Toastify
-   Tailwind CSS

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT Authentication
-   bcrypt password hashing

------------------------------------------------------------------------

## Features

### 1. Signup

Users can register with: - Name - Email - Password - Confirm Password -
Role

Features: - Email validation - Password strength validation - Duplicate
email check - Password hashing using bcrypt

### 2. Login

Users can login with: - Email - Password

Features: - JWT token generation - Token expiry: 1 hour - Token contains
userId, email, role - Invalid credential handling

------------------------------------------------------------------------

## Role-Based Access Control (RBAC)

Supported roles:

-   Admin -- Manage users
-   Recruiter -- View "My Requirements"
-   Delivery Manager -- View "Team Overview"
-   Finance / HR Ops -- Read-only dashboard

------------------------------------------------------------------------

## Dashboards

### Admin Dashboard

Admin can: - View all users - Activate users - Deactivate users - Delete
users - View statistics (Total Users, Active Users, Inactive Users,
Roles)

### Recruiter Dashboard

Recruiters can view: My Requirements

### Delivery Manager Dashboard

Delivery Managers can view: Team Overview

### Finance / HR Dashboard

Finance users have read-only access.

------------------------------------------------------------------------

## Security

### Backend

-   JWT authentication middleware
-   Role-based middleware
-   Password hashing with bcrypt

### Frontend

-   Protected routes
-   Unauthorized users redirected to 403 page
-   Not logged in users redirected to login

------------------------------------------------------------------------

## Logout

Logout functionality: - Clears JWT token - Redirects to login page -
Navbar shows user name and role

------------------------------------------------------------------------

## Project Structure

Exercise-1 │ ├── backend │ ├── config │ ├── controllers │ ├── middleware
│ ├── models │ ├── routes │ └── server.js │ ├── frontend │ ├── src │ ├──
components │ ├── context │ └── pages │ └── README.md

------------------------------------------------------------------------

## Installation & Setup

### 1. Clone Repository

git clone https://github.com/yourusername/code-studio-ats.git cd
code-studio-ats

### 2. Backend Setup

cd backend npm install

Create .env file:

PORT=5000 MONGO_URI=mongodb://localhost:27017/ats
JWT_SECRET=your_secret_key

Start backend server:

npm start

Backend runs on: http://localhost:5000

### 3. Frontend Setup

cd frontend npm install npm run dev

Frontend runs on: http://localhost:5173

------------------------------------------------------------------------

## API Endpoints

Signup POST /api/auth/signup

Login POST /api/auth/login

Get Users (Admin) GET /api/users

Activate User PATCH /api/users/:id/activate

Deactivate User PATCH /api/users/:id/deactivate

Delete User DELETE /api/users/:id

------------------------------------------------------------------------

## Future Improvements

-   Refresh tokens
-   Password reset
-   Email verification
-   User profile management

------------------------------------------------------------------------

## Live Demo

https://authentication-role-based-access-git-main-siri9876s-projects.vercel.app/login

## Author

Full Stack Developer Project built for Code Studio ATS assignment.
