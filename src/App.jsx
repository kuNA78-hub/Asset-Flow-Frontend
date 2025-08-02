import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminBookingsPage } from './pages/AdminBookingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes for All Logged-in Users */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
        />
        <Route 
          path="/assets/:id" 
          element={<ProtectedRoute><AssetDetailPage /></ProtectedRoute>} 
        />
        <Route 
          path="/my-bookings" 
          element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} 
        />
        
        {/* Admin-Only Routes */}
        <Route 
          path="/admin" 
          element={<AdminRoute><AdminDashboardPage /></AdminRoute>} 
        />
        <Route 
          path="/admin/bookings" 
          element={<AdminRoute><AdminBookingsPage /></AdminRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
