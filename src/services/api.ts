// frontend/src/services/api.ts
import axios from 'axios';
import supabase from '../utils/supabaseClient';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && config.headers) {
      console.log('Access Token:', session.access_token);
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error fetching chatbots:', error);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
