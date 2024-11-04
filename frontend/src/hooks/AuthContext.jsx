// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Ensure this is correctly imported

// Create and export the AuthContext
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Add state for email

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decodedToken.name);
        setUserEmail(decodedToken.email); // Extract email from the token
      } catch (error) {
        // Handle invalid token error (optional)
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    setIsLoggedIn(true);
    const decodedToken = jwtDecode(token);
    setUserName(decodedToken.name);
    setUserEmail(decodedToken.email); // Extract email from the token
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail(''); // Reset email on logout
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
