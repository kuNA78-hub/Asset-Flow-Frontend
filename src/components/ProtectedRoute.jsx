import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token exists, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token exists, show the component that was requested
  return children;
}