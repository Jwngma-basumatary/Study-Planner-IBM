#  Study Planner

A full-stack **MERN-style Study Planner web application** designed to
help students organize their academic life in one place.

The project combines a **React + Vite frontend**, an **Express + Node.js
backend**, and **MongoDB/Mongoose** for persistent data storage. It
includes authentication, courses/subjects, chapters, schedules,
assignments, todo tasks, exams, dashboard summaries, study activity, and
profile settings.

------------------------------------------------------------------------
## UI
### Login / Register Page

<img width="1313" height="778" alt="Screenshot 2026-08-28 214744" src="https://github.com/user-attachments/assets/5d911946-7613-4532-a564-b1e58cb757e9" />

### Dashboard
<img width="1900" height="897" alt="Screenshot 2026-08-28 214719" src="https://github.com/user-attachments/assets/24e7de50-64fc-4c9e-b7d6-8a66ee7d11e0" />


<img width="1910" height="900" alt="Screenshot 2026-08-28 214731" src="https://github.com/user-attachments/assets/0323c4d6-8e7d-476c-a49c-c587ea5c2954" />


## ✨ Features

### 1. Authentication

* **User Registration** – Create a new account using name, email, and password.
* **Login & Logout** – Securely access and leave the application.
* **JWT Authentication** – Protects user-specific API requests.
* **Password Hashing** – Passwords are secured using `bcryptjs`.
* **Profile Management** – Users can update their account information.

### 2. Dashboard

The dashboard provides a quick view of the student's academic activities.

* Today's study schedule
* Upcoming assignments
* Priority tasks
* Todo list
* Calendar
* Upcoming exam countdown
* Study activity
* Personalized user information

### 3. Courses

Students can organize their subjects and chapters.

* Create, edit, and delete subjects
* Add chapters to subjects
* Edit and delete chapters
* Mark chapters as completed
* Organize subjects by individual chapters

### 4. Study Schedule

Students can plan their study sessions by adding:

* Study title
* Subject
* Topic
* Date
* Start and end time
* Duration
* Description
* Completion status

Study sessions can be **created, edited, deleted, and marked as completed**.

### 5.  Assignments

Students can manage academic assignments and deadlines.

* Assignment title
* Subject
* Topic
* Due date
* Priority
* Description
* Completion status

Assignments can be **created, edited, deleted, and marked as completed**.

### 6. Todo List

The Todo List is used for general tasks.

* Create tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Assign tasks to subjects
* Set task priority

Priority levels:

* 🔴 **High**
* 🟡 **Medium**
* 🟢 **Low**

### 7. Exams

Students can keep track of upcoming examinations.

* Exam name
* Subject
* Date
* Time
* Location
* Status
* Notes
* Exam countdown

Exams can be **created, edited, deleted, and updated**.

### 8. Profile & Settings

Users can manage their account information.

* First name
* Last name
* Email
* Password
* Profile picture

---

## 10. Tech Stack

| Part                  | Technology          |
| --------------------- | ------------------- |
| **Frontend**          | React, Vite         |
| **Styling**           | CSS                 |
| **Backend**           | Node.js, Express.js |
| **Database**          | MongoDB             |
| **ODM**               | Mongoose            |
| **Authentication**    | JWT                 |
| **Password Security** | bcryptjs            |
| **API**               | REST API            |
| **Deployment**        | Render              |

---

## 11. Project Structure

```text
STUDY-PLANNER/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── ItemList.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Schedule.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── Exams.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Goals.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── examStorage.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── subjectController.js
│   │   ├── scheduleController.js
│   │   ├── assignmentController.js
│   │   ├── todoController.js
│   │   └── examController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Schedule.js
│   │   ├── Assignment.js
│   │   ├── Todo.js
│   │   └── Exam.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── todoRoutes.js
│   │   └── examRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

##  12. How the Application Works

The application is divided into three main parts:

### Frontend

The **React frontend** handles:

* User interface
* Forms
* Navigation
* Dashboard
* User interaction
* Sending API requests

### Backend

The **Node.js + Express backend** handles:

* Authentication
* API requests
* Application logic
* Data processing
* Database operations

### Database

**MongoDB** stores the application's user and academic data.

The basic flow is:

```text
User
  ↓
React Frontend
  ↓
Express REST API
  ↓
Controllers
  ↓
Mongoose
  ↓
MongoDB
```

---

## 13. Authentication

The application uses **JWT (JSON Web Token)** authentication.

When a user logs in:

```text
Email + Password
       ↓
Backend verifies credentials
       ↓
Password checked using bcrypt
       ↓
JWT token generated
       ↓
Token sent to frontend
       ↓
Token stored in localStorage
```

The token is then sent with protected API requests:

```text
Authorization: Bearer <token>
```

This allows the backend to identify the logged-in user and keep each user's academic data separate.

---

## 14. API Overview

The backend provides REST API endpoints for the main features.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Subjects

```text
GET    /api/subjects
POST   /api/subjects
PUT    /api/subjects/:id
DELETE /api/subjects/:id
```

### Schedule

```text
GET    /api/schedules
POST   /api/schedules
PUT    /api/schedules/:id
DELETE /api/schedules/:id
PATCH  /api/schedules/:id/toggle
```

### Assignments

```text
GET    /api/assignments
POST   /api/assignments
PUT    /api/assignments/:id
DELETE /api/assignments/:id
PATCH  /api/assignments/:id/toggle
```

### Todo

```text
GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
DELETE /api/todos/:id
PATCH  /api/todos/:id/toggle
```

### Exams

```text
GET    /api/exams
POST   /api/exams
PUT    /api/exams/:id
DELETE /api/exams/:id
PATCH  /api/exams/:id/status
```

---

## 15. Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB or MongoDB Atlas

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd STUDY-PLANNER
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create:

```text
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

## 16. Future Improvements

Some features planned for future versions:

* Study goals and progress tracking
* Study streaks
* Notifications and reminders
* Pomodoro timer
* Recurring study sessions
* Calendar synchronization
* Password reset and email verification
* Assignment file uploads
* Improved mobile experience

---

##  Author

**Jwngma Basumatary** ,**Muskan Tamang** , **Nisha Sah** 

### Study Planner

A full-stack academic planning application built to help students organize their **courses, study schedules, assignments, tasks, and exams** in one place.
