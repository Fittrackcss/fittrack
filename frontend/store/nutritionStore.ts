import { mockFoods, mockMealEntries } from "@/constants/mockData";
import { Food, FoodEntry, MealEntry } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NutritionState {
  foods: Food[];
  mealEntries: MealEntry[];
  searchResults: Food[];
  searchFood: (query: string) => void;
  addMealEntry: (entry: Omit<MealEntry, "id">) => void;
  updateMealEntry: (id: string, entry: Partial<MealEntry>) => void;
  deleteMealEntry: (id: string) => void;
  addFoodToMeal: (mealId: string, foodEntry: FoodEntry) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  getMealEntriesByDate: (date: string) => MealEntry[];
  getDailyNutritionSummary: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      foods: mockFoods,
      mealEntries: mockMealEntries as MealEntry[],
      searchResults: [],
      searchFood: (query) => {
        const results = get().foods.filter((food) =>
          food.name.toLowerCase().includes(query.toLowerCase())
        );
        set({ searchResults: results });
      },
      addMealEntry: (entry) => {
        const newEntry = {
          ...entry,
          id: Math.random().toString(),
        };
        set((state) => ({
          mealEntries: [...state.mealEntries, newEntry],
        }));
      },
      updateMealEntry: (id, entry) => {
        set((state) => ({
          mealEntries: state.mealEntries.map((meal) =>
            meal.id === id ? { ...meal, ...entry } : meal
          ),
        }));
      },
      deleteMealEntry: (id) => {
        set((state) => ({
          mealEntries: state.mealEntries.filter((meal) => meal.id !== id),
        }));
      },
      addFoodToMeal: (mealId, foodEntry) => {
        set((state) => ({
          mealEntries: state.mealEntries.map((meal) => {
            if (meal.id === mealId) {
              const existingFoodIndex = meal.foods.findIndex(
                (f) => f.foodId === foodEntry.foodId
              );
              if (existingFoodIndex >= 0) {
                // Update existing food entry
                const updatedFoods = [...meal.foods];
                updatedFoods[existingFoodIndex] = {
                  ...updatedFoods[existingFoodIndex],
                  servings:
                    updatedFoods[existingFoodIndex].servings +
                    foodEntry.servings,
                };
                return { ...meal, foods: updatedFoods };
              } else {
                // Add new food entry
                return {
                  ...meal,
                  foods: [...meal.foods, foodEntry],
                };
              }
            }
            return meal;
          }),
        }));
      },
      removeFoodFromMeal: (mealId, foodId) => {
        set((state) => ({
          mealEntries: state.mealEntries.map((meal) => {
            if (meal.id === mealId) {
              return {
                ...meal,
                foods: meal.foods.filter((f) => f.foodId !== foodId),
              };
            }
            return meal;
          }),
        }));
      },
      // getMealEntriesByDate: (date) => {
      //   const dateStr = new Date(date).toISOString().split("T")[0];
      //   return get().mealEntries.filter(
      //     (meal) => new Date(meal.date).toISOString().split("T")[0] === dateStr
      //   );
      // }
      //
      // In nutritionStore.ts, modify getMealEntriesByDate:
      getMealEntriesByDate: (date) => {
        const targetDate = new Date(date).setHours(0, 0, 0, 0);
        return get().mealEntries.filter((meal) => {
          const mealDate = new Date(meal.date).setHours(0, 0, 0, 0);
          return mealDate === targetDate;
        });
      },
      getDailyNutritionSummary: (date) => {
        const meals = get().getMealEntriesByDate(date);
        const foods = get().foods;

        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;

        meals.forEach((meal) => {
          meal.foods.forEach((foodEntry) => {
            const food = foods.find((f) => f.id === foodEntry.foodId);
            if (food) {
              calories += food.calories * foodEntry.servings;
              protein += food.protein * foodEntry.servings;
              carbs += food.carbs * foodEntry.servings;
              fat += food.fat * foodEntry.servings;
            }
          });
        });

        return { calories, protein, carbs, fat };
      },
    }),
    {
      name: "nutrition-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
