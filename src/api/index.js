// FILE: client/src/api/index.js

import axios from 'axios';

// Get the base URL from the environment variable for flexibility
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

// --- THIS IS THE CRUCIAL FIX ---
// This interceptor will run before every single request is sent.
API.interceptors.request.use(
  (config) => {
    // 1. Get the user info from localStorage
    const userInfo = localStorage.getItem('user');

    if (userInfo) {
      // 2. If the user info exists, parse it to get the token
      const token = JSON.parse(userInfo).token;
      
      // 3. If a token exists, add it to the request headers
      // This is the "ID card" that proves to the backend that you are logged in.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // 4. Return the modified config so the request can proceed
    return config;
  },
  (error) => {
    // If an error occurs before the request is sent, reject the promise
    return Promise.reject(error);
  }
);

export default API;
