import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Retrieve the token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Store the token in both context and localStorage
  const storeToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setToken(accessToken);
  };

  // Clear the token from both context and localStorage
  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, storeToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};