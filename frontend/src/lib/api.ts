// API configuration and utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  error?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: 'CUSTOMER' | 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profileImage?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  preferredPaymentMethod?: string;
  defaultAddress?: string;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

// Helper function to make API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  console.log('API Call:', `${API_BASE_URL}${endpoint}`, config);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response content-type:', response.headers.get('content-type'));
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Non-JSON response received:', textResponse);
      throw new Error('Server returned an invalid response. Please check if the backend is running.');
    }
    
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('API call error:', error);
    console.error('API_BASE_URL:', API_BASE_URL);
    console.error('Full URL:', `${API_BASE_URL}${endpoint}`);
    throw error;
  }
}

// Authentication API calls
export const authApi = {
  register: async (userData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await apiCall('/auth/logout', {
      method: 'POST',
    });
    localStorage.removeItem('authToken');
    return response;
  },
};

// User API calls
export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiCall('/users/profile');
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  createCustomerProfile: async (profileData: {
    preferredPaymentMethod?: string;
    defaultAddress?: string;
    loyaltyPoints?: number;
  }): Promise<ApiResponse<CustomerProfile>> => {
    return apiCall('/users/customer-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },

  getCustomerProfile: async (): Promise<ApiResponse<CustomerProfile>> => {
    return apiCall('/users/customer-profile');
  },
};

// Token management with custom event dispatching
export const tokenManager = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('authStateChange', { 
      detail: { authenticated: true, token } 
    }));
  },
  
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('authStateChange', { 
      detail: { authenticated: false, token: null } 
    }));
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};
