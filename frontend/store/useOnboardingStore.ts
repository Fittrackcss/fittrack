import { router } from "expo-router";
import { create } from "zustand";

type ScreenSelections = {
  [screenId: string]: string[];
};

type FormData = {
  sex?: "male" | "female";
  age?: string;
  country?: string;
  [key: string]: string | undefined;
};

export type SelectionMode =
  | "single"
  | "multi"
  | "multi-max-3"
  | "navigate-after-one";

type OnboardingStore = {
  // Navigation state
  currentIndex: number;
  onboardingIndex: number;
  setCurrentIndex: (index: number) => void;
  setOnboardingIndex: (index: number) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;

  // Selection state
  selections: ScreenSelections;
  toggleSelection: (
    screenId: string,
    itemId: string,
    mode: SelectionMode
  ) => void;
  getSelections: (screenId: string) => string[];
  getSelectedSex: () => "male" | "female" | undefined;

  // Form data state
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  setSex: (sex: "male" | "female") => void;
  setAge: (age: string) => void;
  setCountry: (country: string) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  // Navigation state
  currentIndex: 0,
  onboardingIndex: 0,

  // Navigation setters
  setCurrentIndex: (index) =>
    set({
      currentIndex: index,
      onboardingIndex: index,
    }),
  setOnboardingIndex: (index) =>
    set({
      onboardingIndex: index,
      currentIndex: index,
    }),
  incrementIndex: () => {
    const { currentIndex } = get();
    const newIndex = currentIndex + 1;
    set({
      currentIndex: newIndex,
      onboardingIndex: newIndex,
    });
    return newIndex;
  },
  decrementIndex: () => {
    const { currentIndex } = get();
    const newIndex = Math.max(0, currentIndex - 1);
    set({
      currentIndex: newIndex,
      onboardingIndex: newIndex,
    });
    return newIndex;
  },

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
      if (mode === "navigate-after-one" && newSelection.length > 1) {
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

  // Specific getter for sex
  getSelectedSex: () => {
    const sex = get().formData.sex;
    return sex === "male" || sex === "female" ? sex : undefined;
  },

  // Form data management
  formData: {},
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // Specific setters for InfoCollection data
  setSex: (sex) =>
    set((state) => ({
      formData: { ...state.formData, sex },
      selections: {
        ...state.selections,
        "info-collection-screen": [sex],
      },
    })),

  setAge: (age) =>
    set((state) => ({
      formData: { ...state.formData, age },
    })),

  setCountry: (country) =>
    set((state) => ({
      formData: { ...state.formData, country },
    })),
}));
