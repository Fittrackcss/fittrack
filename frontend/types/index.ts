export type Food = {
  id: string;
  name: string;
  brand: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
};

export type Exercise = {
  id: string;
  name: string;
  caloriesBurnedPerMinute: number;
  category: string;
};

export type FoodEntry = {
  foodId: string;
  servings: number;
};

export type MealEntry = {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foods: FoodEntry[];
};

export type ExerciseEntry = {
  id: string;
  date: string;
  exerciseId: string;
  duration: number;
};

export type WeightEntry = {
  id: string;
  date: string;
  weight: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goalWeight: number;
  activityLevel: string;
  goal: "lose" | "maintain" | "gain";
  dailyCalorieGoal: number;
  weeklyWorkouts: number;
  dailySteps: number;
  weightGoal: string;
  profilePhoto?: string;
  macroGoals: {
    protein: number;
    carbs: number;
    fat: number;
  };
  password?: string; // Add password as optional
};
