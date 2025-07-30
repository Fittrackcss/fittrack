import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '@/config/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }

  private async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          await this.removeAuthToken();
          throw new Error('Authentication failed. Please login again.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.makeRequest<{ token: string; type: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      await this.setAuthToken(response.token);
    }
    
    return response;
  }

  async signup(userData: any) {
    const response = await this.makeRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    return response;
  }

  async logout() {
    await this.removeAuthToken();
  }

  // User endpoints
  async getCurrentUser() {
    return await this.makeRequest('/users/me');
  }

  async updateUser(userData: any) {
    return await this.makeRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Food endpoints
  async getFoodLibrary() {
    return await this.makeRequest('/api/food/library');
  }

  async logFood(foodData: any) {
    return await this.makeRequest('/api/food/log', {
      method: 'POST',
      body: JSON.stringify(foodData),
    });
  }

  async getFoodLogs(date?: string) {
    const params = date ? `?date=${date}` : '';
    return await this.makeRequest(`/api/food/logs${params}`);
  }

  // Exercise endpoints
  async getExerciseLibrary() {
    return await this.makeRequest('/api/exercise/library');
  }

  async logExercise(exerciseData: any) {
    return await this.makeRequest('/api/exercise/log', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  async getExerciseLogs(date?: string) {
    const params = date ? `?date=${date}` : '';
    return await this.makeRequest(`/api/exercise/logs${params}`);
  }

  // Progress endpoints
  async getProgress() {
    return await this.makeRequest('/api/progress');
  }

  async logWeight(weightData: any) {
    return await this.makeRequest('/api/progress/weight', {
      method: 'POST',
      body: JSON.stringify(weightData),
    });
  }

  async getWeightLogs() {
    return await this.makeRequest('/api/progress/weight/logs');
  }
}

export const apiClient = new ApiClient(); 