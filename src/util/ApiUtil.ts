import axios from 'axios';
import KeyChainService from '../service/KeyChainService';
import { refreshTokenUpdate, updateUserData } from '../service/AuthService';

export const BASE_URL = 'http://103.110.236.177:30019';
export const API_URL = `${BASE_URL}/api/v1`;
export const IMAGE_PDF_URL = BASE_URL;
// export const BASE_URL = 'http://103.110.236.177:30019/api/v1';
// export const IMAGE_PDF_URL = 'http://103.110.236.177:30019/';
// const BASE_URL = 'http://192.168.1.153/myprojects/Laravel/EMR_V1_L10/api/v1';

interface Credentials {
  access_token: string | null;
  token_type: 'bearer';
  refresh_token: string | null;
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getCredentials = async (): Promise<Credentials> => {
  const accessToken = await KeyChainService.getSecureValue('accessToken');
  const refreshToken = await KeyChainService.getSecureValue('refreshToken');

  return {
    access_token: accessToken || null,
    token_type: 'bearer',
    refresh_token: refreshToken || null,
  };
};

const getHeaders = async () => {
  const credentials = await getCredentials();
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${credentials.access_token}`,
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
};

// Function to refresh the token
const getRefreshToken = async (): Promise<string | null> => {
  try {
    const storedRefreshToken = await KeyChainService.getSecureValue('refreshToken');
    if (!storedRefreshToken) {
      console.log('No refresh token available');
      return null;
    }
    const response = await refreshTokenUpdate({ refresh_token: storedRefreshToken });
    if (!response.data.access_token) {
      console.log('No access token returned');
      return null;
    }
    console.log('getRefreshToken');
    // Update user data with new token
    await updateUserData();
    return response.data.access_token;
  } catch (error) {
    console.log('Error in getRefreshToken:', error);
    return null;
  }
};

// Axios interceptor for token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check for specific status code indicating token issues
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await getRefreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
        return Promise.reject('Error refreshing token');
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const handleRequestError = (error: unknown) => {
  console.log('API request failed:', error);
  throw error;
};

export default {
  getWithoutToken: async (endpoint: string, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  postWithoutToken: async (endpoint: string, data = {}) => {
    console.log({ endpoint });
    try {
      const response = await api.post(`${endpoint}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      } else {
        handleRequestError(error);
      }
    }
  },

  putWithoutToken: async (endpoint: string, data = {}) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  deleteWithoutToken: async (endpoint: string) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  getWithToken: async (endpoint: string, params = {}) => {
    try {
      const headers = await getHeaders();
      const response = await api.get(endpoint, {
        params,
        ...headers,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  postWithToken: async (endpoint: string, body = {}) => {
    try {
      const headers = await getHeaders();
      const response = await api.post(endpoint, body, { ...headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  postFormDataWithToken: async (endpoint: string, body = {}) => {
    try {
      const headers: any = await getHeaders();
      const config = {
        headers: {
          ...headers.headers,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await api.post(endpoint, body, config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        handleRequestError(error);
      }
    }
  },

  patchWithToken: async (endpoint: string, body = {}) => {
    try {
      const headers = await getHeaders();
      const response = await api.patch(endpoint, body, { ...headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        console.log('API request failed:', error);
        handleRequestError(error);
      }
    }
  },

  putWithToken: async (endpoint: string, body = {}, params = {}) => {
    try {
      const headers = await getHeaders();
      const response = await api.put(endpoint, body, { params, ...headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        console.log('API request failed:', error);
        handleRequestError(error);
      }
    }
  },

  deleteWithToken: async (endpoint: string, params = {}) => {
    try {
      const headers = await getHeaders();
      const response = await api.delete(endpoint, { params, ...headers });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else {
        console.log('API request failed:', error);
        handleRequestError(error);
      }
    }
  },
};
