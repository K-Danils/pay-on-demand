import axios from 'axios';

const username = 'admin';
const password = 'admin';
const token = btoa(`${username}:${password}`);

// Create an Axios instance with common config
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust the base path to your API root
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  },
  timeout: 5000, // optional: set timeout for requests
});

// // Optional: Add request interceptor (e.g., add auth token)
// api.interceptors.request.use(
//   (config) => {
//     // For example, if you store token in localStorage:
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default api;
