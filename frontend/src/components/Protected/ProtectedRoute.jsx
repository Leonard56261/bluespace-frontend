// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if a user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Adjust to match how you store the token
  return token ? true : false; // Simplified check for token presence
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
