# Organization Chart Builder

![Demo](https://imgur.com/Jpdm3d2)


## Overview
This project is a minimal, interactive organization chart application built using **FastAPI** for the backend and **React** for the frontend. It allows users to view an employee hierarchy, update reporting relationships via drag-and-drop, and persist data changes through an API.

---

## Features
### Backend (FastAPI)
- Provides an API endpoint to retrieve employee data.
- Allows updating an employee's manager via an API request.
- Uses **SQLite** as the database for employee records.
- Implements **CORS middleware** for secure communication between frontend and backend.
- Authentication system using **OAuth2 and JWT**.
- Data models using **SQLAlchemy**.

### Frontend (React)
- Displays an interactive organization chart.
- Implements drag-and-drop functionality using **react-beautiful-dnd**.
- Handles API interactions with feedback (loading indicators and success/error messages).
- Uses **Bootstrap** for styling.
- Authentication with login and signup pages.

---

## Tech Stack
### Backend
- **FastAPI** (API framework)
- **SQLite** (database)
- **SQLAlchemy** (ORM for database operations)
- **JWT** (authentication)
- **Passlib** (password hashing)
- **CORS Middleware** (handling cross-origin requests)
- **Python** (programming language)

### Frontend
- **React** (UI framework)
- **react-beautiful-dnd** (drag-and-drop functionality)
- **styled-components** (CSS-in-JS styling)
- **Bootstrap** (UI styling)
- **React Router** (client-side navigation)

---

## Setup Instructions
### Backend (FastAPI)
#### Prerequisites
- Install **Python 3.9+**
- Install dependencies using **pip**

#### Installation & Running the Server
```bash
# Clone the repository
git clone https://github.com/yourusername/organization-chart-builder.git
cd organization-chart-builder/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.main:app --reload
```
- The API will be available at: `http://127.0.0.1:8000`

---

### Frontend (React)
#### Prerequisites
- Install **Node.js (v16+)** and **npm**

#### Installation & Running the App
```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the React app
npm start
```
- The frontend will be available at: `http://localhost:3000`

---

## Time Log
| Task                | Time Spent |
|---------------------|------------|
| Backend API setup  | ~40 mins    |
| Database setup     | ~20 mins    |
| Login Tokezination | ~50 mins    |
| Frontend UI        | ~40 mins    |
| Drag-and-drop      | ~40 mins    |
| API integration    | ~30 mins    |
| Testing & Debugging| ~20 mins    |
| Documentation      | ~10 mins    |
| **Total**          | **~4:10 hours** |

---

## AI Collaboration Experience
During development, AI was used to:
- Generate the initial project structure.
- Provide suggestions for handling API error responses.
- Optimize SQLAlchemy ORM models.
- Debug minor issues with `react-beautiful-dnd`.
- Improve CORS settings and authentication logic.

---

## Future Improvements
- Implement CRUD to sustain solution.
- Implement role-based access control for API endpoints.
- Make protected routes active for different roles.
- Handle injection prevention.
- Possibly implement all side menu features.
- Improve UI styling for better visualization of hierarchy.
- Add unit tests for both frontend and backend.
- Deploy the application using Docker.

---

## Repository
[GitHub Repository](https://github.com/Birajhow/The-Biz-Conquest/tree/master)

---

## License
MIT License

