import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- API Functions ---

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const getAssets = () => {
  return apiClient.get('/assets');
};

export const getAssetById = (id) => {
  return apiClient.get(`/assets/${id}`);
};

export const createAsset = (assetData) => {
  return apiClient.post('/assets', assetData);
};

export const updateAsset = (id, assetData) => {
  return apiClient.put(`/assets/${id}`, assetData);
};

export const deleteAsset = (id) => {
  return apiClient.delete(`/assets/${id}`);
};

export const createBooking = (bookingData) => {
  return apiClient.post('/bookings', bookingData);
};

export const getUsers = () => {
  return apiClient.get('/users');
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export const getBookingsForUser = (userId) => {
  return apiClient.get(`/users/${userId}/bookings`);
};

export const updateBookingStatus = (id, status) => {
  return apiClient.put(`/bookings/${id}/status?status=${status}`);
};
