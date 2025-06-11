import { CalorieCircle } from "@/components/CalorieCircle";
import { DateSelector } from "@/components/DateSelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { MacroProgressBar } from "@/components/MacroProgressBar";
import { MealCard } from "@/components/MealCard";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useNutritionStore } from "@/store/nutritionStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { getDailyNutritionSummary } = useNutritionStore();
  const { getDailyExerciseSummary } = useExerciseStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [exerciseSummary, setExerciseSummary] = useState({
    totalDuration: 0,
    totalCaloriesBurned: 0,
  });

  useEffect(() => {
    if (selectedDate) {
      const nutrition = getDailyNutritionSummary(selectedDate.toISOString());
      const exercise = getDailyExerciseSummary(selectedDate.toISOString());

      setNutritionSummary(nutrition);
      setExerciseSummary(exercise);
    }
  }, [selectedDate, getDailyNutritionSummary, getDailyExerciseSummary]);

  const netCalories =
    nutritionSummary.calories - exerciseSummary.totalCaloriesBurned;
  const caloriesRemaining = user ? user.dailyCalorieGoal - netCalories : 0;

  return (
    <ScrollView style={styles.container}>
      <DateSelector date={selectedDate} onDateChange={setSelectedDate} />

      <View style={styles.summaryContainer}>
        <CalorieCircle
          consumed={netCalories}
          goal={user?.dailyCalorieGoal || 2000}
        />

        <View style={styles.macrosContainer}>
          <MacroProgressBar
            label="Protein"
            current={nutritionSummary.protein}
            goal={user?.macroGoals.protein || 150}
            color={colors.primary}
          />
          <MacroProgressBar
            label="Carbs"
            current={nutritionSummary.carbs}
            goal={user?.macroGoals.carbs || 200}
            color="#F5A623"
          />
          <MacroProgressBar
            label="Fat"
            current={nutritionSummary.fat}
            goal={user?.macroGoals.fat || 70}
            color="#4CD964"
          />
        </View>
      </View>

      <View style={styles.mealsContainer}>
        <MealCard
          title="Breakfast"
          mealType="breakfast"
          date={selectedDate.toISOString()}
        />
        <MealCard
          title="Lunch"
          mealType="lunch"
          date={selectedDate.toISOString()}
        />
        <MealCard
          title="Dinner"
          mealType="dinner"
          date={selectedDate.toISOString()}
        />
        <MealCard
          title="Snacks"
          mealType="snack"
          date={selectedDate.toISOString()}
        />
      </View>

      <ExerciseCard date={selectedDate.toISOString()} />

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  summaryContainer: {
    padding: 16,
    alignItems: "center",
  },
  macrosContainer: {
    width: "100%",
    marginTop: 24,
  },
  mealsContainer: {
    padding: 16,
  },
  spacer: {
    height: 40,
  },
});
