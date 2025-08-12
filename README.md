# 🚀 FocusTrail – Smart Personal Dashboard for Productivity & Wellness

> **Live Demo:** [https://focustrail-frontends.up.railway.app](https://focustrail-frontends.up.railway.app)  
> Built to help students, freelancers, and working professionals balance **productivity** and **mental wellness**.

---

## 📌 Overview

FocusTrail is a **smart personal dashboard** that combines **task management**, **emotional wellness tracking**, and **AI-powered productivity tips** in one platform.  

Unlike typical productivity tools that focus only on deadlines, FocusTrail ensures you **feel good while getting things done**.

---

## 📸 Screenshots

| Dashboard | Task Management | Event Management |
|-----------|----------------|------------------|
| ![Dashboard](https://drive.google.com/uc?id=1uJcVW0scSVMT9D9DhpdKWd_NxFcmrZAE) | ![Task](https://drive.google.com/uc?id=1zQIm48eRuOurKq7x5ADX5yON_0bStBrR) | ![Event](https://drive.google.com/uc?id=1fOxNXjVK_MnAkhMFoo1oaSqxMzONi75Z) |

| Mood Tracker | Insights (Daily Report) |
|--------------|-------------------------|
| ![Mood Tracker](https://drive.google.com/uc?id=1sDDkaHLKagcx6cgXy6u8aE4yJEL0gvcw) | ![Insights](https://drive.google.com/uc?id=1cXmb3NaZEKFHJzGW1vNpc5Vr6UPhj5Na) |



## ✨ Features

- **🧠 Mood Tracking** – Log your daily mood & identify patterns over time.
- **📅 Task & Event Management** – Organize, prioritize, and visualize your day.
- **⏳ Work & Break Logging** – Structured Pomodoro-style focus tracking.
- **🤖 AI Suggestions** – Personalized productivity & wellness tips via Google Gemini API.
- **🔑 Secure Auth Flow** – JWT + OTP Email Verification for a smooth login experience.
- **📊 Analytics Dashboard** – Visual insights with charts & stats.

---

## 🔐 Authentication Flow

1. **Sign Up** → Name, title, email, and password.  
2. **Email Verification** → 6-digit OTP sent via email.  
3. **OTP Entry** → Backend verifies & marks account as verified.  
4. **Mood Check-In** → User logs their first mood of the day immediately after verification.  
5. **Instant Login** → Zustand store updates without refresh.  
6. **Session Persistence** → JWT stored securely; user stays logged in until logout.

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Zustand (State Management)
- Tailwind CSS
- Chart.js

**Backend**
- Node.js + Express.js
- MongoDB
- JWT + bcrypt (Authentication)
- Nodemailer (Email Service)
- Google Gemini API (AI Suggestions)

**Deployment**
- Backend → Railway  
- Frontend → Railway  

---

## 🧩 Architecture & Logic Flow

**Frontend**
- Login / Signup → Sends credentials to backend via Zustand store.
- OTP Verification → Ensures email validation before granting access.
- Dashboard → Mood tracker, task list, productivity charts, AI suggestions.

**Backend**
- **Auth Controller** → Handles signup, login, OTP, and JWT generation.  
- **Mood Controller** → Stores moods, fetches weekly mood data.  
- **Task Controller** → Full CRUD for tasks/events.  
- **Clock Session Controller** → Tracks work/break times for charts.  
- **AI Controller** → Generates advice using Gemini API.  



## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/rushoptimus/FocusTrail.git

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
Note :--- Backend is in the root 
npm install

# Create a .env file in backend with:
# MONGO_URI=
# JWT_SECRET=
# EMAIL_USER=
# EMAIL_PASS=
# GEMINI_API_KEY=

# Run backend
npm run dev

# Run frontend
cd ../frontend
npm run dev
