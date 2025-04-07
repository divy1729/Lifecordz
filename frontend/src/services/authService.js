import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Add request interceptor to inject token
api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('user');
    window.location = '/login';
  }
  return Promise.reject(error);
});

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, null, {
      params: { email, otp }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, null, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  verifyOtp,
  resendOtp,
  logout,
  getCurrentUser,
};

export default authService; 