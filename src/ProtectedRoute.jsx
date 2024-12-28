import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the requested page
    return children;
};

export default ProtectedRoute;
