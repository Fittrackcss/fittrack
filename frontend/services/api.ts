// API Configuration
export const API_BASE_URL = 'http://localhost:8080';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface JwtResponse {
  token: string;
  type: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  sex?: string;
  country?: string;
  activityLevel?: string;
  goalWeight?: number;
  weeklyGoal?: string;
  goals?: string[];
  goalReasons?: string[];
  healthBenefits?: string[];
  referralSource?: string;
}

// User Types
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  goalWeight?: number;
  activityLevel?: string;
  goal?: string;
  dailyCalorieGoal?: number;
  macroGoals?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface UserUpdateRequest {
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  goalWeight?: number;
  activityLevel?: string;
  goal?: string;
  dailyCalorieGoal?: number;
  macroGoals?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Food Types
export interface FoodItem {
  id: number;
  name: string;
  image?: string;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
  quantity: number;
  addedAt: string;
  mealType?: string;
}

export interface FoodLogRequest {
  foodId: number;
  quantity: number;
  mealType: string;
}

// Exercise Types
export interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment?: string;
  instructions?: string;
}

export interface ExerciseLog {
  id: number;
  exerciseId: number;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  date: string;
}

export interface ExerciseLogRequest {
  exerciseId: number;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
} 