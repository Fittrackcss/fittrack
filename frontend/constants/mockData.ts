export const mockFoods = [
  {
    id: "1",
    name: "Oatmeal",
    brand: "Quaker",
    servingSize: "1 cup cooked",
    calories: 166,
    protein: 6,
    carbs: 28,
    fat: 3.6,
    category: "breakfast",
  },
  {
    id: "2",
    name: "Banana",
    brand: "Generic",
    servingSize: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    category: "fruit",
  },
  {
    id: "3",
    name: "Grilled Chicken Breast",
    brand: "Generic",
    servingSize: "3 oz (85g)",
    calories: 128,
    protein: 26,
    carbs: 0,
    fat: 2.7,
    category: "protein",
  },
  {
    id: "4",
    name: "Brown Rice",
    brand: "Generic",
    servingSize: "1 cup cooked",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    category: "grain",
  },
  {
    id: "5",
    name: "Avocado",
    brand: "Generic",
    servingSize: "1/2 medium",
    calories: 161,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    category: "fruit",
  },
  {
    id: "6",
    name: "Greek Yogurt",
    brand: "Fage",
    servingSize: "6 oz (170g)",
    calories: 100,
    protein: 18,
    carbs: 6,
    fat: 0,
    category: "dairy",
  },
  {
    id: "7",
    name: "Salmon",
    brand: "Generic",
    servingSize: "3 oz (85g)",
    calories: 177,
    protein: 19,
    carbs: 0,
    fat: 11,
    category: "protein",
  },
  {
    id: "8",
    name: "Broccoli",
    brand: "Generic",
    servingSize: "1 cup chopped",
    calories: 31,
    protein: 2.5,
    carbs: 6,
    fat: 0.3,
    category: "vegetable",
  },
];

export const mockExercises = [
  {
    id: "1",
    name: "Running",
    caloriesBurnedPerMinute: 10,
    category: "cardio",
  },
  {
    id: "2",
    name: "Cycling",
    caloriesBurnedPerMinute: 8,
    category: "cardio",
  },
  {
    id: "3",
    name: "Swimming",
    caloriesBurnedPerMinute: 9,
    category: "cardio",
  },
  {
    id: "4",
    name: "Weight Lifting",
    caloriesBurnedPerMinute: 5,
    category: "strength",
  },
  {
    id: "5",
    name: "Yoga",
    caloriesBurnedPerMinute: 4,
    category: "flexibility",
  },
  {
    id: "6",
    name: "HIIT",
    caloriesBurnedPerMinute: 12,
    category: "cardio",
  },
  {
    id: "7",
    name: "Walking",
    caloriesBurnedPerMinute: 4,
    category: "cardio",
  },
  {
    id: "8",
    name: "Pilates",
    caloriesBurnedPerMinute: 5,
    category: "flexibility",
  },
];

export const mockMealEntries = [
  {
    id: "1",
    date: new Date().toISOString(),
    mealType: "breakfast" as const,
    foods: [
      { foodId: "1", servings: 1 },
      { foodId: "2", servings: 1 },
    ],
  },
  {
    id: "2",
    date: new Date().toISOString(),
    mealType: "lunch" as const,
    foods: [
      { foodId: "3", servings: 1 },
      { foodId: "4", servings: 1 },
      { foodId: "8", servings: 1 },
    ],
  },
];

export const mockExerciseEntries = [
  {
    id: "1",
    date: new Date().toISOString(),
    exerciseId: "1",
    duration: 30,
  },
  {
    id: "2",
    date: new Date().toISOString(),
    exerciseId: "4",
    duration: 45,
  },
];

export const mockWeightEntries = [
  { id: "1", date: "2025-05-20", weight: 180 },
  { id: "2", date: "2025-05-21", weight: 179.5 },
  { id: "3", date: "2025-05-22", weight: 179 },
  { id: "4", date: "2025-05-23", weight: 178.5 },
  { id: "5", date: "2025-05-24", weight: 178 },
  { id: "6", date: "2025-05-25", weight: 177.5 },
  { id: "7", date: "2025-05-26", weight: 177 },
  { id: "8", date: "2025-05-27", weight: 176.5 },
];

export const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  age: 32,
  gender: "male",
  height: 175, // cm
  weight: 176.5, // lbs
  goalWeight: 165, // lbs
  activityLevel: "moderate",
  goal: "lose" as const, // lose, maintain, gain
  dailyCalorieGoal: 2200,
  macroGoals: {
    protein: 165, // grams
    carbs: 220, // grams
    fat: 73, // grams
  },
};
