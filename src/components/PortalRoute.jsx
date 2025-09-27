// FILE: client/src/components/PortalRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component protects routes that require a logged-in 'private' user
const PortalRoute = ({ adminOnly = false }) => {
    const { user, userType } = useAuth();

    if (!user || userType !== 'private') {
        // If not logged in or not a private user, redirect to portal login
        return <Navigate to="/portal/login" />;
    }

    if (adminOnly && user.role !== 'college-admin') {
        // If it's an admin-only route but user is not an admin, redirect to student dashboard
        return <Navigate to="/portal/student/dashboard" />;
    }

    return <Outlet />;
};

export default PortalRoute;