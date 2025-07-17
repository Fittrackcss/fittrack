import { CalorieCircle } from "@/components/CalorieCircle";
import { DateSelector } from "@/components/DateSelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { MealCard } from "@/components/MealCard";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useNutritionStore } from "@/store/nutritionStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import Swiper from "react-native-swiper";
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DiscoverCards from "@/components/Discover";
import { Bold } from "lucide-react-native";

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

  // Animated notification bell
  const bellAnim = useRef(new Animated.Value(1)).current;
  const handleBellPress = () => {
    Animated.sequence([
      Animated.timing(bellAnim, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(bellAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    // Add notification logic here
  };

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

  const calculateAngle = (consumed: number, goal: number) => {
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
      {/* Modern fixed header, similar to diary, but with 'FitTrack' */}
      <View style={styles.headerBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>FitTrack</Text>
         
        </View>
        <View style={styles.headerIcons}>
          <Animated.View style={{ transform: [{ scale: bellAnim }] }}>
            <TouchableOpacity style={styles.iconButton} onPress={handleBellPress}>
              <MaterialCommunityIcons name="bell-outline" size={28} color={colors.primary} />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/profile')}>
            <MaterialCommunityIcons name="account-circle" size={36} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Edit Button */}
        {/* <TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginLeft: "80%",
              marginRight: 50,
              backgroundColor: colors.secondary,
              borderRadius: 20,
              height: 30,
              width: 70,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Edit
            </Text>
          </View>
        </TouchableOpacity> */}

        <View style={styles.summaryContainer}>
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
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "flex-start",
                  width: "100%",
                  marginBottom: 25,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.text.primary,
                    fontWeight: "900",
                  }}
                >
                  Macros
                </Text>
                <Text style={{ color: colors.text.muted }}>
                  Explore your macros and track consumption
                </Text>
              </View>

              <View
                style={[styles.shadowContainer, styles.macroShadowContainer]}
              >
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
                        <View style={styles.macroText}>
                          <Text style={{ color: colors.text.primary }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Text>
                          <Text
                            style={{
                              color: colors.text.secondary,
                              fontSize: 13,
                            }}
                          >
                            {macro.consumed}/{macro.goal}g
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Swiper>

          <View style={styles.spacer} />
        </View>

        <View style={styles.containerText}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Choose your next habit</Text>
            <Text style={styles.subtitle}>
              Big goals start with small habits.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start a habit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Step and Exercise*/}

        <View style={styles.containerCard}>
          {/* Steps Card */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Steps</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="run" size={30} color={"blue"} />
              <View style={{ marginLeft: 4, width: "50%" }}>
                <Text style={styles.cardSubtitle}>Connect to track steps.</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color={"black"}
              />
            </View>
          </TouchableOpacity>

          {/* Exercise Card */}
          <TouchableOpacity style={styles.card}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.cardTitle}>Exercise</Text>
              <MaterialCommunityIcons name="plus" size={24} color={"black"} />
            </View>
            <View style={styles.exerciseStats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="fire"
                  size={17}
                  color={colors.primary}
                />
                <Text style={styles.statValue}>0 cal</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="clock"
                  size={15}
                  color={colors.primary}
                />
                <Text style={styles.statValue}>0:00 hr</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Discover Cards */}

        <View style={{ backgroundColor: colors.secondary }}>
          <Text style={{ fontWeight: "bold", fontSize: 23, margin: 20 }}>
            {" "}
            Discover
          </Text>

          <DiscoverCards />
        </View>

        {/* <ExerciseCard date={selectedDate.toISOString()} /> */}

        <View style={styles.spacer} />
      </ScrollView>

      {/* Fixed Tab at the top */}
      <View style={styles.tab}>
        <View style={styles.tabcontent}>
          <View style={styles.imageContainer}>
            
          </View>
          <Text
            style={{
              marginTop: 15,
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Fittrack
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={{ marginTop: 15 }}
              name="bell-outline"
              size={28}
              color={"black"}
            />
          </TouchableOpacity>
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
    marginTop: 10,
    borderRadius: 50, // Half of your image height/width to make it perfectly circular
    overflow: "hidden", // This ensures the image respects the border radius
    width: 40,
    height: 40,
  },
  heading: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: "900",
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 800,
  },
  tabcontent: {
    display: "flex",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  scrollContent: {
    marginTop: 0,
    paddingBottom: 0,
    // Equal to tab height to prevent content from being hidden
  },
  tab: {
    position: "absolute",
    bottom: "auto",
    marginBottom: 10,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",

    
    // Optional styling
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  summaryContainer: {
    alignItems: "center",
  },
  macrosContainer: {
    width: "100%",
  },
  mealsContainer: {
    padding: 16,
  },
  spacer: {
    height: 40,
  },
  wrapper: {
    height: 400,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerText: {
    width: "95%",
    height: "auto",
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    // Shadow properties
    shadowColor: "#7F9497",
    shadowOffset: {
      width: 0,
      height: -1, // Negative value to put shadow above the tab
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "left",
  },
  buttonContainer: {
    width: "50%",
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "semibold",
  },

  containerCard: {
    width: "100%",
    padding: 16,
    display: "flex",
    gap: 10,
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "50%",
    display: "flex",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  exerciseStats: {
    flexDirection: "column",
    marginTop: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  statIcon: {
    marginRight: 10,
  },
  statValue: {
    fontSize: 14,
    color: "#333",
  },
  shadowContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    shadowColor: "#7F9497",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  macroShadowContainer: {
    maxWidth: "100%",
  },
  macroContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignContent: "center",
  },
  circleContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 140,
    height: 140,
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
    color: colors.primary,
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
    flexDirection: "column",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: colors.background.card,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    marginRight: 4,
    padding: 2,
    borderRadius: 16,
  },
  profileIcon: {
    marginLeft: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 2,
  },
});
