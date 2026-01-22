import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:4000/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Call refresh endpoint
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        // Store new tokens
        localStorage.setItem('accessToken', data.accessToken)
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
        toast.error('Session expired. Please login again.')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
