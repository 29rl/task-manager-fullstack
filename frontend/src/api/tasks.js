// API Service Module - Backend Integration
// Handles all HTTP communication with Django REST API
// Features: JWT token management, automatic token refresh, error handling

import axios from 'axios';

/**
 * API Configuration
 * - Base URL: http://localhost:8000/api
 * - Timeout: 10 seconds
 * - Default headers: application/json
 * - Interceptors: Auto JWT token injection & refresh
 */
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * Automatically adds JWT access token to all requests
 * Token is read from localStorage['access'] set during login
 * Header format: Authorization: Bearer <token>
 */
API.interceptors.request.use(config => {
  const access = localStorage.getItem('access');
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

/**
 * RESPONSE INTERCEPTOR
 * Handles 401 Unauthorized responses by:
 * 1. Using refresh token to get new access token
 * 2. Retrying original request with new token
 * 3. Clearing auth if refresh fails (requires new login)
 * 
 * Error Types Handled:
 * - 401: Token expired → Try refresh
 * - 400+: Invalid refresh token → Clear auth & redirect to login
 * - Network errors: Passed to caller for UI handling
 */
API.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from storage
        const refresh = localStorage.getItem('refresh');
        if (!refresh) throw new Error('No refresh token available');

        // Request new access token from backend
        const res = await axios.post(
          'http://localhost:8000/api/token/refresh/',
          { refresh },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        // Store new access token
        localStorage.setItem('access', res.data.access);
        
        // Update original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        // Retry original request with new token
        return API(originalRequest);

      } catch (refreshError) {
        // Refresh failed - user needs to login again
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * TASK API - REST endpoints for task management
 * 
 * Endpoints:
 * - GET /api/tasks/ - List all user tasks
 * - POST /api/tasks/ - Create new task
 * - GET /api/tasks/{id}/ - Get single task
 * - PUT /api/tasks/{id}/ - Update task (full replace)
 * - PATCH /api/tasks/{id}/ - Update task (partial)
 * - DELETE /api/tasks/{id}/ - Delete task
 * 
 * Response Format:
 * Success (200): { id, title, description, status, created_at, updated_at }
 * Error: { detail: "error message" } or { field: ["error message"] }
 */
export const taskAPI = {
  /**
   * Get all tasks for authenticated user
   * Backend filters by user automatically via JWT token
   * Returns array, handles both direct array and paginated responses
   */
  getAll: () => 
    API.get('/tasks/').then(r =>
      Array.isArray(r.data) ? r.data : r.data?.results || []
    ),
  
  /**
   * Create new task
   * POST /api/tasks/
   * Body: { title, description?, status? }
   * Returns: Created task object with ID
   */
  create: (data) => 
    API.post('/tasks/', data).then(r => r.data),
  
  /**
   * Update existing task
   * PUT /api/tasks/{id}/
   * Body: { title, description?, status? }
   * Returns: Updated task object
   */
  update: (id, data) => 
    API.put(`/tasks/${id}/`, data).then(r => r.data),
  
  /**
   * Delete task by ID
   * DELETE /api/tasks/{id}/
   * Returns: HTTP 204 (no content) on success
   */
  delete: (id) => 
    API.delete(`/tasks/${id}/`)
};

/**
 * AUTH API - Authentication endpoints
 * 
 * Endpoints:
 * - POST /api/token/ - Get JWT tokens (login)
 * - POST /api/token/refresh/ - Refresh access token
 * - POST /api/auth/register/ - Create new user account
 */
export const authAPI = {
  /**
   * Get JWT tokens using credentials
   * POST /api/token/
   * Body: { username, password }
   * Returns: { access: "token", refresh: "token" }
   */
  login: (username, password) =>
    API.post('/token/', { username, password }).then(r => r.data),
  
  register: (data) =>
    API.post('/auth/register/', data).then(r => r.data),
  
  getMe: () =>
    API.get('/auth/me/').then(r => r.data),
  
  updateMe: (data) =>
    API.put('/auth/me/', data).then(r => r.data),
};

export default API;
