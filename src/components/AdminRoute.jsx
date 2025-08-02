import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function AdminRoute({ children }) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // 1. If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // 2. Decode the token to check the user's role
  const user = jwtDecode(token);
  
  // 3. If the user's role is NOT 'ROLE_ADMIN', redirect to the main dashboard
  if (user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  // 4. If all checks pass, show the admin page
  return children;
}