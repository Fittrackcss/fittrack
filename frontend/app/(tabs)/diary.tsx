import { DateSelector } from "@/components/DateSelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useRouter } from "expo-router";
import { Plus, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MealCard } from "@/components/MealCard";
import { LinearGradient } from "expo-linear-gradient";

const mealIcons: { [key: string]: any } = {
  breakfast: require("@/assets/images/food.jpg"),
  lunch: require("@/assets/images/food.jpg"),
  dinner: require("@/assets/images/food.jpg"),
  snack: require("@/assets/images/food.jpg"),
};

export default function ExerciseScreen() {
  const router = useRouter();
  const { searchExercise, searchResults } = useExerciseStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderExerciseCard = () => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionHeader}>Today's Exercise</Text>
      <View style={styles.exerciseGradientCard}>
        <ExerciseCard date={selectedDate.toISOString()} />
        {/* Example: Progress ring or calories summary */}
        {/* <View style={styles.exerciseSummary}>
          <MaterialCommunityIcons name="fire" size={10} color={colors.accent} />
          <Text style={styles.exerciseSummaryText}>320 kcal burned</Text>
        </View> */}
      </View>
    </View>
  );

  // Daily summary mock
  const dailySummary = {
    mealsLogged: 2,
    totalMeals: 4,
    workoutsLogged: 1,
    totalWorkouts: 1,
  };

  return (
    <View style={styles.container}>
      {/* Modern fixed header */}
      <View style={styles.headerBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Diary</Text>
          <Text style={styles.headerDate}>
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <MaterialCommunityIcons name="account-circle" size={36} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Daily summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            You’ve logged {dailySummary.mealsLogged}/{dailySummary.totalMeals} meals and {dailySummary.workoutsLogged}/{dailySummary.totalWorkouts} workout today!
          </Text>
        </View>

        <DateSelector date={selectedDate} onDateChange={setSelectedDate} />
        {renderExerciseCard()}
        {/* Section divider */}
        <View style={styles.sectionDivider} />
        {/* Meal cards section */}
        <View style={styles.mealSectionContainer}>
          <Text style={styles.sectionHeader}>Meals</Text>
          <View style={styles.mealCardsList}>
            {[
              { title: "Breakfast", mealType: "breakfast" },
              { title: "Lunch", mealType: "lunch" },
              { title: "Dinner", mealType: "dinner" },
              { title: "Snacks", mealType: "snack" },
            ].map((meal) => (
              <View key={meal.mealType} style={styles.mealCardWrapper}>
                <MealCard
                  title={meal.title}
                  mealType={meal.mealType as any}
                  date={selectedDate.toISOString()}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.background.card,
    
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    letterSpacing: 1,
  },
  headerDate: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 2,
  },
  profileIcon: {
    marginLeft: 12,
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 2,
  },
  summaryCard: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    margin: 20,
    marginTop: 24,
    padding: 18,
    alignItems: "center",
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 8,
    
    borderRadius: 32,
   
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 32,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingHorizontal: 16,
   
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelButtonText: {
    color: colors.accent,
    fontSize: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 24,
    marginHorizontal: 20,
    borderRadius: 1,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 20,
    marginBottom: 12,
    marginTop: 12,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  exerciseGradientCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseSummary: {
    alignItems: "center",
    marginLeft: 16,
  },
  exerciseSummaryText: {
    fontSize: 14,
    color: colors.text.primary,
    marginTop: 4,
  },
  mealSectionContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 18,
    paddingHorizontal: 8,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mealCardsList: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  mealCardWrapper: {
    width: "95%",
    marginBottom: 16,
    alignItems: "center",
  },
  mealCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    alignItems: "center",
    padding: 18,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  mealIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  mealMacros: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  addFoodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  addFoodText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 6,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },
  searchResultsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    margin: 20,
    marginTop: 24,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  searchResultsList: {
    paddingBottom: 24,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.background.secondary,
    marginBottom: 10,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
  exerciseCategory: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: "capitalize",
  },
  exerciseCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.accent,
  },
  searchButton: {
    marginLeft: 8,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  searchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    minWidth: 40,
    minHeight: 40,
  },
  // ... keep other styles as needed ...
});
