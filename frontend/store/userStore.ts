// import { mockUser } from "@/constants/mockData";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { apiClient } from "@/services/apiClient";
import { UserProfile, UserUpdateRequest } from "@/services/api";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: User & { password: string }) => Promise<boolean>;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => {
        console.log("setUser called with:", user);
        set({ user, isAuthenticated: true });
      },

      updateUser: async (userData) => {
        console.log("updateUser called with:", userData);
        try {
          // Update user on backend
          const updatedProfile = await apiClient.updateUser(userData);
          console.log("Backend update response:", updatedProfile);
          
          // Update local state
          set((state) => {
            const updatedUser = state.user ? { ...state.user, ...userData } : null;
            console.log("Updated user:", updatedUser);
            return { user: updatedUser };
          });
        } catch (error) {
          console.error("Error updating user:", error);
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          console.log("Attempting login with:", { email, password });
          
          // Call backend API
          const response = await apiClient.login(email, password);
          console.log("Login response:", response);
          
          // Fetch user profile
          const userProfile = await apiClient.getCurrentUser() as UserProfile;
          console.log("User profile:", userProfile);
          
          // Convert UserProfile to User type
          const user: User = {
            id: userProfile.id.toString(),
            name: userProfile.name,
            email: userProfile.email,
            password: password, // Keep password for local validation
            gender: userProfile.gender || "male",
            age: userProfile.age || 0,
            height: userProfile.height || 0,
            weight: userProfile.weight || 0,
            goalWeight: userProfile.goalWeight || 0,
            activityLevel: userProfile.activityLevel || "",
            goal: (userProfile.goal as "lose" | "maintain" | "gain") || "maintain",
            dailyCalorieGoal: userProfile.dailyCalorieGoal || 0,
            macroGoals: userProfile.macroGoals || { protein: 0, carbs: 0, fat: 0 },
            weeklyWorkouts: 0,
            dailySteps: 0,
            weightGoal: "",
          };
          
          set({ user, isAuthenticated: true });
          console.log("Login successful, user set:", user);
          return true;
        } catch (error) {
          console.error("Login failed:", error);
          return false;
        }
      },

      logout: async () => {
        try {
          await apiClient.logout();
        } catch (error) {
          console.error("Error during logout:", error);
        }
        set({ user: null, isAuthenticated: false });
      },

      signup: async (userData) => {
        try {
          console.log("Attempting signup with:", userData);
          
          // Prepare signup data for backend
          const signupData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            height: userData.height,
            weight: userData.weight,
            dateOfBirth: (userData as any).dateOfBirth,
            sex: userData.gender,
            country: (userData as any).country,
            activityLevel: userData.activityLevel,
            goalWeight: userData.goalWeight,
            weeklyGoal: userData.goal,
            goals: [userData.goal],
            goalReasons: [],
            healthBenefits: [],
            referralSource: "",
          };
          
          // Call backend API
          const response = await apiClient.signup(signupData);
          console.log("Signup response:", response);
          
          // Convert to User type and set
          const user: User = {
            id: Math.random().toString(), // Backend will assign real ID
            name: userData.name,
            email: userData.email,
            password: userData.password,
            gender: userData.gender || "male",
            age: userData.age || 0,
            height: userData.height || 0,
            weight: userData.weight || 0,
            goalWeight: userData.goalWeight || 0,
            activityLevel: userData.activityLevel || "",
            goal: userData.goal || "maintain",
            dailyCalorieGoal: userData.dailyCalorieGoal || 0,
            macroGoals: userData.macroGoals || { protein: 0, carbs: 0, fat: 0 },
            weeklyWorkouts: 0,
            dailySteps: 0,
            weightGoal: "",
          };
          
          set({ user, isAuthenticated: true });
          console.log("Signup successful, user set:", user);
          return true;
        } catch (error) {
          console.error("Signup failed:", error);
          return false;
        }
      },

      fetchCurrentUser: async () => {
        try {
          const userProfile = await apiClient.getCurrentUser() as UserProfile;
          console.log("Fetched user profile:", userProfile);
          
          // Convert UserProfile to User type
          const user: User = {
            id: userProfile.id.toString(),
            name: userProfile.name,
            email: userProfile.email,
            password: "", // Don't store password from API
            gender: userProfile.gender || "male",
            age: userProfile.age || 0,
            height: userProfile.height || 0,
            weight: userProfile.weight || 0,
            goalWeight: userProfile.goalWeight || 0,
            activityLevel: userProfile.activityLevel || "",
            goal: (userProfile.goal as "lose" | "maintain" | "gain") || "maintain",
            dailyCalorieGoal: userProfile.dailyCalorieGoal || 0,
            macroGoals: userProfile.macroGoals || { protein: 0, carbs: 0, fat: 0 },
            weeklyWorkouts: 0,
            dailySteps: 0,
            weightGoal: "",
          };
          
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error("Error fetching current user:", error);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
