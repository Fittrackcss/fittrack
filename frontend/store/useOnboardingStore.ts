import { router } from "expo-router";
import { create } from "zustand";

type ScreenSelections = {
  [screenId: string]: string[];
};

type FormData = {
  [key: string]: string;
};

export type SelectionMode = "single" | "multi" | "multi-max-3" | "";

type OnboardingStore = {
  // Navigation state (using both names for compatibility)
  currentIndex: number;
  onboardingIndex: number; // Added for backward compatibility
  setCurrentIndex: (index: number) => void;
  setOnboardingIndex: (index: number) => void; // Added for backward compatibility

  // Selection state
  selections: ScreenSelections;
  toggleSelection: (
    screenId: string,
    itemId: string,
    mode: SelectionMode
  ) => void;
  getSelections: (screenId: string) => string[];

  // Form data state
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  // Navigation state
  currentIndex: 0,
  onboardingIndex: 0, // Mirrors currentIndex

  // Setter functions that update both values
  setCurrentIndex: (index) =>
    set({
      currentIndex: index,
      onboardingIndex: index, // Keep them in sync
    }),

  setOnboardingIndex: (index) =>
    set({
      onboardingIndex: index,
      currentIndex: index, // Keep them in sync
    }),

  // Selection management
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

      if (mode === "multi-max-3" && newSelection.length > 3) {
        return;
      }
      if (mode === "" && newSelection.length > 1) {
        router.push("/(onboarding)/InfoCollection");
      }
    }

    set({
      selections: {
        ...get().selections,
        [screenId]: newSelection,
      },
    });
  },

  getSelections: (screenId) => get().selections[screenId] || [],

  // Form data management
  formData: {},
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));
