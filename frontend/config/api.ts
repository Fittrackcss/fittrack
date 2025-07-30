// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Development vs Production
export const isDevelopment = __DEV__;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
  },
  USER: {
    ME: '/users/me',
  },
  FOOD: {
    LIBRARY: '/api/food/library',
    LOG: '/api/food/log',
    LOGS: '/api/food/logs',
  },
  EXERCISE: {
    LIBRARY: '/api/exercise/library',
    LOG: '/api/exercise/log',
    LOGS: '/api/exercise/logs',
  },
  PROGRESS: {
    OVERVIEW: '/api/progress',
    WEIGHT: '/api/progress/weight',
    WEIGHT_LOGS: '/api/progress/weight/logs',
  },
}; 