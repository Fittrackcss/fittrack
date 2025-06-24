import { router } from "expo-router";
import { create } from "zustand";
import { useUserStore } from "./userStore";

type ScreenSelections = {
  [screenId: string]: string[];
};

type FormData = {
  name?: string;
  sex?: "male" | "female";
  age?: number;
  country?: string;
  height?: number; // cm
  weight?: number; // lbs
  goalWeight?: number; // lbs
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal?: "lose" | "maintain" | "gain";
  [key: string]: any;
};
type SelectionMode = "single" | "multi" | "multi-max-3" | "navigate-after-one";

type OnboardingStore = {
  currentIndex: number;
  onboardingIndex: number;
  setCurrentIndex: (index: number) => void;
  setOnboardingIndex: (index: number) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;

  selections: ScreenSelections;
  toggleSelection: (
    screenId: string,
    itemId: string,
    mode: SelectionMode
  ) => void;
  getSelections: (screenId: string) => string[];
  getSelectedSex: () => "male" | "female" | undefined;

  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  setSex: (sex: "male" | "female") => void;
  setAge: (age: number) => void;
  setCountry: (country: string) => void;
  completeOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  currentIndex: 0,
  onboardingIndex: 0,

  setCurrentIndex: (index) =>
    set({ currentIndex: index, onboardingIndex: index }),
  setOnboardingIndex: (index) =>
    set({ onboardingIndex: index, currentIndex: index }),

  incrementIndex: () => {
    const newIndex = get().currentIndex + 1;
    set({ currentIndex: newIndex, onboardingIndex: newIndex });
    return newIndex;
  },

  decrementIndex: () => {
    const newIndex = Math.max(0, get().currentIndex - 1);
    set({ currentIndex: newIndex, onboardingIndex: newIndex });
    return newIndex;
  },

  selections: {},
  toggleSelection: (screenId, itemId, mode) => {
    const current = get().selections[screenId] || [];
    let newSelection: string[];

    if (mode === "single") {
      newSelection = current.includes(itemId) ? [] : [itemId];
    } else {
      newSelection = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];

      if (mode === "multi-max-3" && newSelection.length > 3) return;
      if (mode === "navigate-after-one" && newSelection.length > 1) {
        router.push("/(onboarding)/InfoCollection");
      }
    }

    set({
      selections: { ...get().selections, [screenId]: newSelection },
    });
  },

  getSelections: (screenId) => get().selections[screenId] || [],
  getSelectedSex: () => {
    const sex = get().formData.sex;
    return sex === "male" || sex === "female" ? sex : undefined;
  },

  formData: {},
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  setSex: (sex) =>
    set((state) => ({
      formData: { ...state.formData, sex },
      selections: { ...state.selections, "info-collection-screen": [sex] },
    })),

  setAge: (age) =>
    set((state) => ({ formData: { ...state.formData, age: Number(age) } })),

  setCountry: (country) =>
    set((state) => ({ formData: { ...state.formData, country } })),

  completeOnboarding: () => {
    const formData = get().formData;
    const { calculateCalories, calculateMacros, setUser } =
      useUserStore.getState();

    // Calculate values first
    const dailyCalorieGoal = calculateCalories(formData) || 2000;
    const macroGoals = calculateMacros({
      ...formData,
      dailyCalorieGoal,
    }) || {
      protein: 150,
      carbs: 200,
      fat: 65,
    };

    // Create complete user object
    const userData = {
      name: formData.name?.trim() || "User",
      email: formData.email?.trim() || "",
      age: formData.age || 25,
      gender: formData.sex || "male",
      country: formData.country || undefined,
      height: formData.height || 170,
      weight: formData.weight || 150,
      goalWeight: formData.goalWeight || 140,
      activityLevel: formData.activityLevel || "moderate",
      goal: formData.goal || "lose",
      dailyCalorieGoal,
      macroGoals,
    };

    console.log("Transferring to user profile:", userData); // Debug log
    setUser(userData);
    router.replace("/(tabs)");
  },
}));
