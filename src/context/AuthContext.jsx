// FILE: client/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'public' or 'private'

  useEffect(() => {
    // On initial load, check if user info is in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Optional: Check if token is expired
      const decodedToken = jwtDecode(userData.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout(); // Token is expired, log them out
      } else {
        setUser(userData);
        setUserType(userData.userType || 'public'); // Default to public if type isn't set
      }
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    const userData = { ...data, userType: 'public' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setUserType('public');
    return userData;
  };

  const portalLogin = async (email, password) => {
    const { data } = await API.post('/portal/auth/login', { email, password });
    // This is the crucial part: we add the userType before saving
    const userData = { ...data, userType: 'private' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setUserType('private');
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserType(null);
  };

  const value = {
    user,
    userType,
    login,
    portalLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
