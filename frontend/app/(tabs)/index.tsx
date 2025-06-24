import { CalorieCircle } from "@/components/CalorieCircle";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useNutritionStore } from "@/store/nutritionStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

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

  const calculateAngle = (consumed, goal) => {
    const percentage = Math.min(100, (consumed / goal) * 100);
    return (percentage / 100) * 360;
  };

  const macros = {
    protein: {
      consumed: nutritionSummary.protein,
      goal: user?.macroGoals.protein || 150,
      color: colors.primary,
    },
    carbs: {
      consumed: nutritionSummary.carbs,
      goal: user?.macroGoals.carbs || 200,
      color: "#F5A623",
    },
    fat: {
      consumed: nutritionSummary.fat,
      goal: user?.macroGoals.fat || 70,
      color: "#4CD964",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          dotColor={colors.gray}
          activeDotColor={colors.primary}
          loop={false}
        >
          {/* First slide - Calorie Circle with shadow */}
          <View style={styles.slide}>
            <CalorieCircle
              consumed={netCalories}
              goal={user?.dailyCalorieGoal || 2000}
            />
          </View>

          {/* Second slide - Macro Circle with shadow */}
          <View style={styles.slide}>
            <View style={[styles.shadowContainer, styles.macroShadowContainer]}>
              <View style={styles.macroContainer}>
                {/* Circular Macro Display */}
                <View style={styles.circleContainer}>
                  <View
                    style={[
                      styles.circle,
                      {
                        borderTopColor: macros.protein.color,
                        borderRightColor: macros.carbs.color,
                        borderBottomColor: macros.fat.color,
                        borderLeftColor: "transparent",
                        transform: [
                          {
                            rotate: `${calculateAngle(
                              macros.protein.consumed,
                              macros.protein.goal
                            )}deg`,
                          },
                        ],
                      },
                    ]}
                  >
                    <View style={styles.innerCircle}>
                      <Text style={styles.macroTitle}>Macros</Text>
                    </View>
                  </View>
                </View>

                {/* Macro Values */}
                <View style={styles.macroValues}>
                  {Object.entries(macros).map(([key, macro]) => (
                    <View key={key} style={styles.macroRow}>
                      <View
                        style={[
                          styles.macroDot,
                          { backgroundColor: macro.color },
                        ]}
                      />
                      <Text style={styles.macroText}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        {macro.consumed}/{macro.goal}g
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Swiper>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Fixed Tab at the bottom */}
      <View style={styles.tab}>
        <View style={styles.tabcontent}>
          <View style={styles.imageContainer}>
            <Ionicons name="person-circle" size={50} color={colors.primary} />
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.heading}>FitTrack</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              style={{ marginTop: 15 }}
              name="bell-outline"
              size={25}
              color={"black"}
            />
          </View>
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
  heading: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: "900",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    width: 50,
    height: 50,
  },
  tabcontent: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  scrollContent: {
    marginTop: 130,
    paddingBottom: 100,
  },
  tab: {
    position: "absolute",
    bottom: "auto",
    marginBottom: 10,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  spacer: {
    height: 40,
  },
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  shadowContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  macroShadowContainer: {
    maxWidth: "90%",
  },
  macroContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  macroTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.dark,
  },
  macroValues: {
    marginLeft: 20,
  },
  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  macroDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  macroText: {
    fontSize: 14,
    color: colors.text.primary,
  },
});
