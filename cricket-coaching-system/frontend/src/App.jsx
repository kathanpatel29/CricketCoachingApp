import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import CoachList from './pages/client/CoachList';
import BookingFlow from './pages/client/BookingFlow';
import ClientReviews from './pages/client/Reviews';

// Coach Pages
import CoachDashboard from './pages/coach/Dashboard';
import CoachAppointment from './pages/coach/Appointment';
import CoachProfile from './pages/coach/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';

// Shared Pages
import Home from './pages/Home';
import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Client Routes */}
            <Route path="/client">
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="coaches" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <CoachList />
                </ProtectedRoute>
              } />
              <Route path="book/:coachId" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <BookingFlow />
                </ProtectedRoute>
              } />
              <Route path="reviews" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientReviews />
                </ProtectedRoute>
              } />
            </Route>

            {/* Coach Routes */}
            <Route path="/coach">
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachDashboard />
                </ProtectedRoute>
              } />
              <Route path="appointments" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachAppointment />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachProfile />
                </ProtectedRoute>
              } />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
            </Route>

            {/* Shared Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
