
```
AUTH
├─ .env
├─ Backend
│  ├─ controllers
│  │  ├─ auth.conroller.js
│  │  ├─ Clock.controller.js
│  │  ├─ eventController.controller.js
│  │  ├─ gemini.controller.js
│  │  ├─ mood.controller.js
│  │  └─ taskController.controller.js
│  ├─ db
│  │  └─ connectDB.js
│  ├─ index.js
│  ├─ middlewares
│  │  └─ verifyToken.js
│  ├─ models
│  │  ├─ ClockSession.js
│  │  ├─ Event.model.js
│  │  ├─ mood.model.js
│  │  ├─ Task.model.js
│  │  └─ user.model.js
│  ├─ routes
│  │  ├─ auth.route.js
│  │  ├─ Clock.route.js
│  │  ├─ eventRoutes.route.js
│  │  ├─ imageUpload.route.js
│  │  ├─ mood.route.js
│  │  ├─ openrouter.route.js
│  │  └─ taskRoutes.route.js
│  └─ utils
│     ├─ cloudinary.js
│     ├─ generateTokenAndSetCookie.js
│     ├─ sendResetPasswordEmail.js
│     ├─ sendResetSuccessMail.js
│     ├─ sendVerificationEmail.js
│     └─ sendWelcomeEmail.js
├─ Frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ Components
│  │  │  ├─ AddEvent.jsx
│  │  │  ├─ AddTask.jsx
│  │  │  ├─ Calendar.jsx
│  │  │  ├─ Clock.jsx
│  │  │  ├─ DashboardFrame.jsx
│  │  │  ├─ Dashboard_component_frames.jsx
│  │  │  ├─ Dash_Total_Task.jsx
│  │  │  ├─ EventsMap.jsx
│  │  │  ├─ Mood.jsx
│  │  │  ├─ Nav.jsx
│  │  │  ├─ Profile.jsx
│  │  │  ├─ ProgressMap.jsx
│  │  │  ├─ SearchDateTask.jsx
│  │  │  ├─ StartInputFrame.jsx
│  │  │  ├─ TasksDash.jsx
│  │  │  ├─ UdateEvent.jsx
│  │  │  ├─ UpdateTask.jsx
│  │  │  └─ Welcome.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ MoodEmojis
│  │  │  ├─ angry.svg
│  │  │  ├─ cry.svg
│  │  │  ├─ good.svg
│  │  │  ├─ happy.svg
│  │  │  └─ sad.svg
│  │  ├─ pages
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ EventsPage.jsx
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ Insights.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ MoodPage.jsx
│  │  │  ├─ MoodTracker.jsx
│  │  │  ├─ ResetPassword.jsx
│  │  │  ├─ SignUp.jsx
│  │  │  ├─ TaskMapAll.jsx
│  │  │  ├─ TasksPage.jsx
│  │  │  └─ VerifyEmail.jsx
│  │  └─ store
│  │     ├─ authStore.js
│  │     ├─ Clock.js
│  │     ├─ eventStore.js
│  │     ├─ images.js
│  │     ├─ mood.js
│  │     └─ task.js
│  └─ vite.config.js
├─ package-lock.json
└─ package.json

```