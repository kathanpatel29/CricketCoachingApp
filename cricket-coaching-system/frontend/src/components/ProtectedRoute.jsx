// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If the user is not authorized for the requested route, redirect to home page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
