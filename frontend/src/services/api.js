import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  getAllUsers: () => api.get('/auth/users'),
  toggleUserStatus: (userId) =>
    api.patch(`/auth/users/${userId}/toggle-status`),
  deleteUser: (userId) => api.delete(`/auth/users/${userId}`),
};


export const dashboardAPI = {
  getAdminData: () => api.get('/dashboard/admin'),
  getRecruiterData: () => api.get('/dashboard/recruiter'),
  getDeliveryData: () => api.get('/dashboard/delivery'),
  getFinanceData: () => api.get('/dashboard/finance'),
};

export default api;