import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user } = useAuth();

  // 1. Check if a user is logged in and if their role is 'admin'.
  if (user && user.role === 'admin') {
    // 2. If they are an admin, render the child components (e.g., the AdminDashboard).
    // The <Outlet /> component is a placeholder for the child routes.
    return <Outlet />;
  } else {
    // 3. If they are not an admin, redirect them to the homepage.
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
