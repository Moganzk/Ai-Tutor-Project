import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Optionally, show a loading spinner
  return user ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute; 