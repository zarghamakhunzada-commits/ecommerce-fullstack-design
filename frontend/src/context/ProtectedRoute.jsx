import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // 🔥 Agar user logged in nahi hai, ya logged in hai par admin nahi hai -> redirect to home/login
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}