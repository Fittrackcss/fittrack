// store/useOnboardingStore.ts
import { create } from "zustand";

type FormData = {
  name?: string;
  email?: string;
  agreeToTerms?: boolean;
};

type OnboardingStore = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;

  selectedGoals: string[];
  toggleGoal: (id: string) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),

  formData: {},
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetFormData: () => set({ formData: {}, selectedGoals: [] }),

  selectedGoals: [],
  toggleGoal: (id: string) =>
    set((state) => {
      const alreadySelected = state.selectedGoals.includes(id);
      let updatedGoals = alreadySelected
        ? state.selectedGoals.filter((goal) => goal !== id)
        : [...state.selectedGoals];

      if (!alreadySelected && updatedGoals.length < 3) {
        updatedGoals.push(id);
      }

      return { selectedGoals: updatedGoals };
    }),
}));
