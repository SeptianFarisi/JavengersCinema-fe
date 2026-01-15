import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin'; // Optional prop to specify required role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken'); // Assuming admin token is stored separately

  if (requiredRole === 'admin') {
    if (!adminToken) {
      // Admin not authenticated, redirect to login page
      return <Navigate to="/login" replace />;
    }
  } else {
    if (!userToken) {
      // User not authenticated, redirect to login page
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
