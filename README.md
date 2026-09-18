# Penthara Employee Directory

A full-stack Employee Directory web application built using React, Node.js, Express, and MongoDB. The application allows users to view, search, add, edit, and delete employee records through a clean, responsive, and user-friendly interface.

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
- Prevent duplicate employee records
- Responsive design for different screen sizes
- Loading and error states
- RESTful backend API
- MongoDB database integration
- React Router based navigation
- Separate frontend and backend architecture
- Deployed frontend and backend
- Penthara-inspired modern user interface

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB - Database

## Project Structure

```text
Penthara-Employee-Directory-Project/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── BookCover.jsx
│       │   ├── EmployeeCard.jsx
│       │   ├── EmployeeForm.jsx
│       │   ├── EmployeeList.jsx
│       │   └── SearchBar.jsx
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
│   │   └── employeeController.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## Employee Data

Each employee record contains:

- Name
- Role
- Department
- Created date
- Updated date

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get employees with pagination and search |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update an existing employee |
| DELETE | `/api/employees/:id` | Delete an employee |

### Search and Pagination

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
```

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
```

### Frontend

The frontend requires:

```env
VITE_API_URL=http://localhost:5000/api/employees
```

For production deployment, the frontend API URL should point to the deployed backend API.

## How It Works

1. The user opens the Employee Directory.
2. The React frontend requests employee data from the Express backend.
3. The backend queries MongoDB using Mongoose.
4. The backend returns employee records along with pagination information.
5. Users can search employees by name, role, or department.
6. Search requests are processed on the server.
7. Users can add a new employee through the employee form.
8. Existing employees can be edited.
9. Employees can be deleted after confirmation.
10. The frontend updates the displayed data after successful operations.

## User Interface

The application includes:

- A dedicated opening page for the Employee Directory
- Responsive employee cards
- Search functionality
- Add and edit employee forms
- Delete confirmation
- Pagination controls
- Loading feedback
- Error messages
- Responsive layouts for different screen sizes

The design uses purple, blue, and pink visual accents inspired by Penthara's branding while maintaining an original layout and interface.

## Error Handling

The application handles common API and user interaction errors, including:

- Failed employee loading
- Failed employee creation
- Failed employee updates
- Failed employee deletion
- Duplicate employee records
- Employee not found
- Backend connection errors

User-friendly error messages are displayed when an operation fails.

## Deployment

### Frontend

The React frontend is deployed using Vercel.

**Production URL:**  
https://penthara-employee-directory-project.vercel.app

### Backend

The Node.js and Express backend is deployed using Render.

**Production API:**  
https://penthara-employee-api.onrender.com

### Database

Employee data is stored in MongoDB.

## Future Improvements

The project can be further extended with:

- Authentication and authorization
- Admin-only employee management
- Profile images
- Advanced filtering and sorting
- Improved notification system
- Debounced search
- Automated testing
- Role-based access control

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
- Handling API errors
- Managing environment variables
- Deploying a full-stack application
- Structuring a full-stack project with separate frontend and backend directories

## Author

**Riya Narang**

B.Tech Computer Science Engineering  
Full-Stack Development & DevOps

GitHub: https://github.com/RiyaNarang24