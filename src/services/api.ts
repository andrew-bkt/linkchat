// frontend/src/services/api.ts
import axios from 'axios';
import supabase from '../utils/supabaseClient';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000, // Increased to 60 seconds
  maxRedirects: 5,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add this before your interceptors
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && config.headers) {
      console.log(`Authorization: Bearer ${session.access_token}`);
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Error in API call:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      if (error.response.status >= 300 && error.response.status < 400) {
        console.error('Redirect location:', error.response.headers.location);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;