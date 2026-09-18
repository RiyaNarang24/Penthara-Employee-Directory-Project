# Penthara Employee Directory

A full-stack Employee Directory web application built using React, Node.js, Express, and MongoDB. The application allows users to view and search employee records, while employee management actions such as adding, editing, and deleting employees are protected through backend-verified secret-key authentication and JWT-based authorization.

## Live Demo

**Frontend:** https://penthara-employee-directory-project.vercel.app

**Backend API:** https://penthara-employee-api.onrender.com

## GitHub Repository

https://github.com/RiyaNarang24/Penthara-Employee-Directory-Project

## Features

- View employees in a clean card-based directory
- Search employees by name, role, or department
- Server-side pagination for employee records
- Add new employees
- Edit existing employee details
- Delete employees with confirmation
- Secret-key verification before Add, Edit, and Delete actions
- JWT-based authorization for protected employee management APIs
- Automatic re-authentication when an authentication token expires or becomes invalid
- Prevent duplicate employee records
- Responsive design for different screen sizes
- Loading and error states
- RESTful backend API
- MongoDB database integration
- React Router based navigation
- Separate frontend and backend architecture
- Deployed frontend and backend
- Penthara-inspired modern user interface
- Lucide React icons for a consistent interface

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Fetch API
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JSON Web Token (JWT)
- dotenv
- CORS

### Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

## Project Structure

```text
Penthara-Employee-Directory-Project/

│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       │
│       ├── components/
│       │   ├── BookCover.jsx
│       │   ├── EmployeeCard.jsx
│       │   ├── EmployeeForm.jsx
│       │   ├── EmployeeList.jsx
│       │   ├── SearchBar.jsx
│       │   └── SecretKeyModal.jsx
│       │
│       ├── pages/
│       │   └── EmployeeDirectory.jsx
│       │
│       ├── services/
│       │   └── employeeService.js
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── Employee.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── vercel.json
└── README.md
```

## Employee Data

Each employee record contains:

- Name
- Role
- Department
- Created date
- Updated date

## Authentication

Employee management actions are protected using a simple backend-verified secret-key authentication system.

The application does not use a traditional login or registration system. Instead, users are asked to enter a secret key whenever they attempt to:

- Add an employee
- Edit an employee
- Delete an employee

The secret key is verified by the backend. If the key is correct, the backend generates a JWT token that is temporarily stored in the frontend application state and used to authorize protected employee operations.

### Authentication Flow

1. User clicks Add, Edit, or Delete.
2. A secret-key popup is displayed.
3. The user enters the secret key.
4. The frontend sends the key to the backend.
5. The backend compares the key with the `ADMIN_SECRET` environment variable.
6. If the key is correct, the backend generates a JWT.
7. The frontend temporarily stores the JWT.
8. The JWT is sent with protected POST, PUT, and DELETE requests.
9. Backend authentication middleware verifies the JWT before allowing the requested operation.
10. If the JWT is expired or invalid, the backend returns a `401 Unauthorized` response.
11. The frontend clears the old token and asks the user to enter the secret key again.
12. A new JWT is generated after successful verification.

### Protected Operations

| Action | Authentication Required |
|--------|--------------------------|
| View employees | No |
| Search employees | No |
| Add employee | Yes |
| Edit employee | Yes |
| Delete employee | Yes |

The JWT is stored only in frontend application state and is not persisted across page refreshes.

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| GET | `/api/employees` | Not required | Get employees with pagination and search |
| POST | `/api/employees` | JWT required | Create a new employee |
| PUT | `/api/employees/:id` | JWT required | Update an existing employee |
| DELETE | `/api/employees/:id` | JWT required | Delete an employee |
| POST | `/api/auth/verify-key` | Not required | Verify the admin secret key and generate a JWT |

## Search and Pagination

The employee listing API supports server-side search and pagination using query parameters.

Example:

```text
GET /api/employees?page=1&limit=6&search=developer
```

The search checks the employee's:

- Name
- Role
- Department

The backend performs the search before applying pagination, so pagination works on the complete set of matching employee records.

The frontend displays six employees per page.

## Duplicate Prevention

The backend prevents duplicate employee records when the same combination of:

- Name
- Role
- Department

already exists.

A `409 Conflict` response is returned when a duplicate employee is submitted.

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

### Clone the Repository

```bash
git clone https://github.com/RiyaNarang24/Penthara-Employee-Directory-Project.git
```

Move into the project directory:

```bash
cd Penthara-Employee-Directory-Project
```

### Backend Setup

Open a terminal and move into the server directory:

```bash
cd server
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_secret
JWT_SECRET=your_jwt_secret
```

The environment variables are used for:

- `PORT` - Port on which the backend server runs
- `MONGO_URI` - MongoDB connection string
- `ADMIN_SECRET` - Secret key used to authorize employee management actions
- `JWT_SECRET` - Secret used to sign and verify JWT tokens

Start the backend server:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal and move into the client directory:

```bash
cd client
```

Install the frontend dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api/employees
```

Start the frontend development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

The backend requires the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_secret
JWT_SECRET=your_jwt_secret
```

### Frontend

The frontend requires:

```env
VITE_API_URL=http://localhost:5000/api/employees
```

For production deployment, the frontend API URL should point to the deployed backend API.

Actual secret values should never be committed to the repository. Environment variables should be configured separately for local development and production deployment.

## How It Works

1. The user opens the Employee Directory.
2. The React frontend requests employee data from the Express backend.
3. The backend queries MongoDB using Mongoose.
4. The backend returns employee records along with pagination information.
5. Users can search employees by name, role, or department.
6. Search requests are processed on the server.
7. Users can request Add, Edit, or Delete actions.
8. A secret-key popup appears before each protected action.
9. The backend verifies the provided secret key.
10. A JWT is generated when the secret key is valid.
11. The frontend temporarily stores the JWT.
12. The JWT is sent with protected employee management requests.
13. Backend middleware verifies the JWT before allowing the operation.
14. Employee data is created, updated, or deleted in MongoDB.
15. The frontend updates the displayed data after successful operations.
16. If the JWT expires or becomes invalid, the frontend asks the user to verify the secret key again.

## User Interface

The application includes:

- Dedicated opening page for the Employee Directory
- Responsive employee cards
- Search functionality
- Add and edit employee forms
- Secret-key authentication popup
- Show/hide secret-key functionality
- Delete confirmation
- Pagination controls
- Loading feedback
- Error messages
- Responsive layouts for different screen sizes
- Lucide React icons for search, visibility, and interface actions

The design uses purple, blue, and pink visual accents inspired by Penthara's branding while maintaining an original layout and interface.

## Error Handling

The application handles common API and user interaction errors, including:

- Failed employee loading
- Failed employee creation
- Failed employee updates
- Failed employee deletion
- Invalid secret key
- Missing secret key
- Invalid JWT
- Expired JWT
- Unauthorized protected requests
- Duplicate employee records
- Employee not found
- Backend connection errors

User-friendly error messages are displayed when an operation fails.

## Security Considerations

- Secret keys are stored in environment variables rather than source code.
- The actual `ADMIN_SECRET` is never exposed in the frontend.
- JWT signing uses a server-side secret stored in `JWT_SECRET`.
- Employee management APIs are protected by JWT authentication.
- Backend middleware verifies JWTs before allowing protected operations.
- View and search operations remain publicly accessible.
- The JWT is stored only in frontend application state.
- Expired or invalid JWTs are rejected by the backend.
- The frontend requests secret-key verification again when authentication expires.
- `.env` files are excluded from version control.

## Deployment

### Frontend

The React frontend is deployed using Vercel.

**Production URL:**

https://penthara-employee-directory-project.vercel.app

The frontend uses the deployed backend API through the `VITE_API_URL` environment variable.

### Backend

The Node.js and Express backend is deployed using Render.

**Production API:**

https://penthara-employee-api.onrender.com

The Render deployment requires the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_secret
JWT_SECRET=your_jwt_secret
```

The application uses the platform-provided port when deployed on Render.

### Database

Employee data is stored in MongoDB Atlas.

## Future Improvements

The project can be further extended with:

- Full login and logout functionality
- Role-based access control
- Profile images
- Advanced filtering and sorting
- Improved notification system
- Debounced search
- Automated testing
- Unit and integration tests
- More detailed employee profiles
- Admin dashboard and analytics

## Learning Outcomes

This project provided practical experience with:

- Building reusable React components
- Managing state using React Hooks
- Working with REST APIs
- Connecting a React frontend with a Node.js backend
- Creating Express routes and controllers
- Working with MongoDB and Mongoose
- Implementing CRUD operations
- Implementing server-side search and pagination
- Implementing backend authentication and JWT authorization
- Protecting API routes using middleware
- Handling expired and invalid authentication tokens
- Handling API errors
- Managing environment variables
- Using reusable UI components
- Using Lucide React icons
- Deploying a full-stack application
- Structuring a full-stack project with separate frontend and backend directories

## Author

**Riya Narang**

B.Tech Computer Science Engineering

Full-Stack Development & DevOps

GitHub: https://github.com/RiyaNarang24