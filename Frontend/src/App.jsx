import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MoodPage from './pages/MoodPage';
import TasksPage from './pages/TasksPage';
import EventsPage from './pages/EventsPage';
import MoodTracker from './pages/MoodTracker';
import Insights from './pages/Insights';

const RedirectAuthenticatedUser = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) return null;
  if (isAuthenticated && user.isVerified) {
    return navigate('/dashboard', { replace: true });
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) return null;
  if (!isAuthenticated) {
    return navigate('/login', { replace: true });
  }
  if (!user.isVerified) {
    return navigate('/verify-email', { replace: true });
  }

  return children;

};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])


  if (isCheckingAuth) return <h1>.....Loading</h1> // Show a loading state while checking authentication
  return (

    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="*"
          element={
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              Page Not Found
            </div>
          }  
        />


        <Route path="/" element={

  <SignUp />

        } />

        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>} />

        <Route path='/verify-email' element={<VerifyEmail />} />

        <Route path='/moodPage' element={
          <ProtectedRoute>
            <MoodPage />
          </ProtectedRoute>}
        />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/Moodtracker" element={
          <ProtectedRoute>
            <MoodTracker />
          </ProtectedRoute>
        } />

        <Route path="/Insights" element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } />


        <Route path="/tasks" element={<ProtectedRoute>
          <TasksPage />
        </ProtectedRoute>} />

        <Route path="/Events" element={<ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>} />


        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>} />

        <Route path='reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
