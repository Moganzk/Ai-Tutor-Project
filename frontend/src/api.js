import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Chat API
export const chatAPI = {
  ask: async (question, context = '', userId = 'anonymous') => {
    const response = await api.post('/ask', {
      question,
      context,
      user_id: userId
    });
    return response.data;
  },

  getTopics: async () => {
    const response = await api.get('/topics');
    return response.data;
  }
};

// Quiz API
export const quizAPI = {
  generate: async (topic, difficulty = 'medium', numQuestions = 5) => {
    const response = await api.post('/quiz/generate', {
      topic,
      difficulty,
      num_questions: numQuestions
    });
    return response.data;
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
