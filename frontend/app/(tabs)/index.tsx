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
import { ScrollView, StyleSheet, View, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
     

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

      {/* Fixed Tab at the bottom */}
     <View style={styles.tab}>
  <View style={styles.tabcontent}>
    <View style={styles.imageContainer}>
      <ImageBackground 
        style={styles.img} 
        source={{ uri: "https://img.freepik.com/free-photo/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club_637285-2497.jpg?" }}
      />
    </View>
    <MaterialCommunityIcons style={{marginTop:15}} name="bell-outline" size={30} color={'black'}/>
  </View>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
   imageContainer: {
    borderRadius: 50, // Half of your image height/width to make it perfectly circular
    overflow: 'hidden', // This ensures the image respects the border radius
    width: 50,
    height: 50,
  },
  img:{
    height:50,
    width:50,
    borderRadius:600,
  }, 
  tabcontent:{
    display:'flex',
    marginTop:20,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignContent: 'center',

  },
  scrollContent: {
     marginTop: 130,
    paddingBottom: 100, // Equal to tab height to prevent content from being hidden
  },
  tab: {
    position: 'absolute',
    bottom: 'auto',
    marginBottom:10,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3, // Negative value to put shadow above the tab
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10, // For Android
    
    // Optional styling
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
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