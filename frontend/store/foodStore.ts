import { create } from "zustand";
import { persist } from "zustand/middleware";

type FoodItem = {
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
};

type FoodStore = {
  foods: FoodItem[];
  addFood: (food: Omit<FoodItem, "addedAt">) => void;
  removeFood: (id: number) => void;
  clearFoods: () => void;
};

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: [],
      addFood: (food) =>
        set((state) => ({
          foods: [
            ...state.foods,
            {
              ...food,
              addedAt: new Date().toISOString(),
            },
          ],
        })),
      removeFood: (id) =>
        set((state) => ({
          foods: state.foods.filter((food) => food.id !== id),
        })),
      clearFoods: () => set({ foods: [] }),
    }),
    {
      name: "food-storage", // name for localStorage
    }
  )
);
