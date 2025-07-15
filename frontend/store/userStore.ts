// import { mockUser } from "@/constants/mockData";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// interface UserState {
//   user: User | null;
//   isAuthenticated: boolean;
//   setUser: (user: User) => void;
//   updateUser: (userData: Partial<User>) => void;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
// }

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       setUser: (user) => set({ user, isAuthenticated: true }),
//       updateUser: (userData) =>
//         set((state) => ({
//           user: state.user ? { ...state.user, ...userData } : null,
//         })),
//       login: async (email, password) => {
//         // Mock login - in a real app, this would call your backend API
//         if (email && password) {
//           const typedMockUser = mockUser as User;
//           set({ user: typedMockUser, isAuthenticated: true });
//           return true;
//         }
//         return false;
//       },
//       logout: () => set({ user: null, isAuthenticated: false }),
//       signup: async (userData) => {
//         // Mock signup - in a real app, this would call your backend API
//         if (userData.email && userData.password) {
//           const newUser = {
//             ...mockUser,
//             ...userData,
//             id: Math.random().toString(),
//             goal: (userData.goal as "lose" | "maintain" | "gain") || "maintain",
//           };
//           const typedNewUser = newUser as User;
//           set({ user: typedNewUser, isAuthenticated: true });
//           return true;
//         }
//         return false;
//       },
//     }),
//     {
//       name: "user-storage",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: User & { password: string }) => Promise<boolean>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      login: async (email, password) => {
        // In a real app, you would verify credentials with your backend
        // For now, we'll just check if credentials exist
        if (email && password) {
          // Get any existing user data from storage
          const storedData = await AsyncStorage.getItem("user-storage");
          const parsedData = storedData ? JSON.parse(storedData) : null;

          if (parsedData?.state?.user?.email === email) {
            // User exists - log them in
            set({ user: parsedData.state.user, isAuthenticated: true });
            return true;
          }
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      signup: async (userData) => {
        if (userData.email && userData.password) {
          // Create new user from the actual provided data
          const newUser: User = {
            id: Math.random().toString(36).substring(7),
            name: userData.name || "",
            email: userData.email,
            weight: userData.weight || 0,
            height: userData.height || 0,
            goalWeight: userData.goalWeight || 0,
            goal: userData.goal || "maintain",
            age: userData.age || 0,
            gender: userData.gender || "",
            activityLevel: userData.activityLevel || "",
            dailyCalorieGoal: userData.dailyCalorieGoal || 0,
            macroGoals: userData.macroGoals || { protein: 0, carbs: 0, fat: 0 },
            password: userData.password,
          };

          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
