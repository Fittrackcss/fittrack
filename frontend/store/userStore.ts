import { mockUser } from "@/constants/mockData";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
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
        // Mock login - in a real app, this would call your backend API
        if (email && password) {
          const typedMockUser = mockUser as User;
          set({ user: typedMockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      signup: async (userData) => {
        // Mock signup - in a real app, this would call your backend API
        if (userData.email && userData.password) {
          const newUser = {
            ...mockUser,
            ...userData,
            id: Math.random().toString(),
            goal: (userData.goal as "lose" | "maintain" | "gain") || "maintain",
          };
          const typedNewUser = newUser as User;
          set({ user: typedNewUser, isAuthenticated: true });
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
