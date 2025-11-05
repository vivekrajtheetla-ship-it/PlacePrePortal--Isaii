import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove it
      localStorage.removeItem('token');
      // Optionally redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Quiz API
export const quizAPI = {
  getAll: (params = {}) => api.get('/api/quiz', { params }),
  getById: (id) => api.get(`/api/quiz/${id}`),
  submit: (id, data) => api.post(`/api/quiz/${id}/submit`, data),
  getResults: () => api.get('/api/quiz/results/me')
};

// Interview API
export const interviewAPI = {
  getAll: () => api.get('/api/interview'),
  create: (data) => api.post('/api/interview', data),
  getById: (id) => api.get(`/api/interview/${id}`),
  update: (id, data) => api.put(`/api/interview/${id}`, data),
  delete: (id) => api.delete(`/api/interview/${id}`),
  getPublicExperiences: (params = {}) => api.get('/api/interview/public/experiences', { params })
};

// Upload API
export const uploadAPI = {
  uploadResume: (formData) => api.post('/api/upload/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getResume: () => api.get('/api/upload/resume', { responseType: 'blob' }),
  deleteResume: () => api.delete('/api/upload/resume')
};

export default api;