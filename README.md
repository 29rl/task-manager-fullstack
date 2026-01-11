# Task Manager – Full-Stack Application

A production-style full-stack task management platform built with **Django REST Framework** and **React**.  
This project demonstrates real-world architecture: authentication, protected APIs, frontend-backend separation, and a modern UI.

Unlike basic CRUD demos, this application includes **authentication, authorization, token-based security and real API integration** between a real backend and a real frontend.

---

## 🚀 What this project demonstrates

This project was built to show:

• How a real backend API is designed  
• How authentication works using JWT tokens  
• How a React frontend communicates with a Django backend  
• How to structure a professional full-stack repository  
• How to protect user data using permissions  

This is **not** a tutorial project.  
This is a **real-world junior → mid-level portfolio system**.

---

## ✨ Core Features

### 🔐 Authentication
- User registration
- Secure login
- JWT access & refresh tokens
- Token-protected API endpoints
- Logout & token invalidation

### 📋 Task Management
- Create, edit, delete tasks
- Toggle task completion
- Each user only sees their own tasks
- Server-side validation

### 🔒 Security
- Task ownership enforced in backend
- JWT authentication for every request
- Protected endpoints
- CORS configuration

### 🎨 Frontend
- React interface
- API driven (no fake data)
- Real login flow
- Real time updates after API calls
- Clean UI and layout

---

## 🧠 Tech Stack

### Backend
- Django
- Django REST Framework
- SimpleJWT
- SQLite (dev) / PostgreSQL ready
- Django CORS Headers

### Frontend
- React
- Axios
- TailwindCSS
- JavaScript ES6+

---

## ▶ How to Run

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at  
`http://localhost:8000`

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at  
`http://localhost:3000`
