import { create } from "zustand";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   age: number;
//   gender: "male" | "female";
//   height: number; // cm
//   weight: number; // lbs
//   goalWeight: number; // lbs
//   activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
//   goal: "lose" | "maintain" | "gain";
//   dailyCalorieGoal: number;
//   macroGoals: {
//     protein: number;
//     carbs: number;
//     fat: number;
//   };
// };

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female";
  country?: string;
  height: number; // cm
  weight: number; // lbs
  goalWeight: number; // lbs
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal: "lose" | "maintain" | "gain";
  dailyCalorieGoal: number;
  macroGoals: {
    protein: number;
    carbs: number;
    fat: number;
  };
};

type UserStore = {
  user: User | null;
  setUser: (userData: Partial<User>) => void;
  logout: () => void;
  calculateCalories: (data: any) => number;
  calculateMacros: (data: any) => {
    protein: number;
    carbs: number;
    fat: number;
  };
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (userData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
        macroGoals: {
          ...state.user?.macroGoals,
          ...userData.macroGoals,
        },
      } as User,
    })),

  logout: () => set({ user: null }),

  calculateCalories: (data) => {
    // Basic Harris-Benedict equation for demonstration
    const { age, height, weight, gender, activityLevel, goal } = data;
    let bmr = 0;

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };

    const tdee = bmr * (activityFactors[activityLevel] || 1.2);

    // Adjust based on goal
    if (goal === "lose") return tdee - 500;
    if (goal === "gain") return tdee + 500;
    return tdee;
  },

  calculateMacros: (data) => {
    const { goal, weight } = data;
    let protein = 0,
      carbs = 0,
      fat = 0;

    // Protein: 1.6-2.2g per kg of body weight (converted from lbs)
    protein = Math.round(weight * 0.453592 * 2.2);

    // Fat: 20-35% of total calories
    fat = Math.round((data.dailyCalorieGoal * 0.25) / 9); // 25% of calories from fat

    // Carbs make up the rest
    carbs = Math.round((data.dailyCalorieGoal - protein * 4 - fat * 9) / 4);

    return { protein, carbs, fat };
  },
}));
