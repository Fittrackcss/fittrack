import { CalorieCircle } from "@/components/CalorieCircle";
import { DateSelector } from "@/components/DateSelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { MealCard } from "@/components/MealCard";
import { useTheme } from "@/constants/ThemeContext";
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
import { useProgressStore } from "@/store/progressStore";
import { WeightEntry } from "@/types";
import NotificationDrawer from "@/components/ui/NotificationDrawer";
import { dummyNotifications } from "@/components/ui/NotificationDrawer";


function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main, // ✅ Now colors is in scope
    },
    scrollView: {
      flex: 1,
    },
    imageContainer: {
      marginTop: 10,
      borderRadius: 50,
      overflow: "hidden",
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
      marginTop: 30,
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
      bottom: 0,
      marginBottom: 0,
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
      backgroundColor: colors.background.card, 
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
      backgroundColor: colors.background.card, 
      borderRadius: 12,
      width: "50%",
      display: "flex",
      padding: 16,
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.primary, 
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.text.secondary, 
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
      color: colors.accent,
    },
    shadowContainer: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 20,
      width: "100%",
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
    notificationBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
      paddingHorizontal: 4,
    },
    notificationBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
}

export default function DashboardScreen() {
  const { colors, darkMode } = useTheme();
  const router = useRouter();
  const { user } = useUserStore();
  const { getDailyNutritionSummary } = useNutritionStore();
  const { getDailyExerciseSummary } = useExerciseStore();
  const { weightEntries, getWeightEntriesByDateRange, getLatestWeight } = useProgressStore();
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [weightRange, setWeightRange] = useState<'week' | 'month' | 'year'>('week');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationsViewed, setNotificationsViewed] = useState(false);

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
    setDrawerVisible(true);
    setNotificationsViewed(true);
  };

  useEffect(() => {
    if (selectedDate) {
      const nutrition = getDailyNutritionSummary(selectedDate.toISOString());
      const exercise = getDailyExerciseSummary(selectedDate.toISOString());
      setNutritionSummary(nutrition);
      setExerciseSummary(exercise);
    }
  }, [selectedDate, getDailyNutritionSummary, getDailyExerciseSummary]);

  useEffect(() => {
    const today = new Date();
    let startDate = new Date();
    if (weightRange === 'week') {
      startDate.setDate(today.getDate() - 7);
    } else if (weightRange === 'month') {
      startDate.setMonth(today.getMonth() - 1);
    } else {
      startDate.setFullYear(today.getFullYear() - 1);
    }
    const entries = getWeightEntriesByDateRange(startDate.toISOString(), today.toISOString());
    setWeightData(entries);
  }, [weightRange, weightEntries, getWeightEntriesByDateRange]);

  const renderWeightChart = () => {
    if (weightData.length === 0) {
      return (
        <View style={{ height: 180, justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
          <Text style={{ color: colors.text.secondary }}>No weight data available</Text>
        </View>
      );
    }
    const minWeight = Math.min(...weightData.map((d) => d.weight));
    const maxWeight = Math.max(...weightData.map((d) => d.weight));
    const range = maxWeight - minWeight || 1;
    return (
      <View style={{ flexDirection: 'row', height: 180, padding: 8, marginVertical: 16 }}>
        <View style={{ width: 40, justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 8 }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary }}>{maxWeight.toFixed(1)}</Text>
          <Text style={{ fontSize: 12, color: colors.text.secondary }}>{((maxWeight + minWeight) / 2).toFixed(1)}</Text>
          <Text style={{ fontSize: 12, color: colors.text.secondary }}>{minWeight.toFixed(1)}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: '100%', paddingBottom: 20 }}>
          {weightData.map((entry, index) => {
            const heightPercentage = ((entry.weight - minWeight) / range) * 100;
            const date = new Date(entry.date);
            const dateLabel = date.getDate().toString();
            return (
              <View key={entry.id} style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ width: '60%', height: '100%', justifyContent: 'flex-end' }}>
                  <View
                    style={{
                      width: '100%',
                      height: `${Math.max(5, heightPercentage)}%`,
                      backgroundColor: colors.primary,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                    }}
                  />
                </View>
                <Text style={{ fontSize: 12, color: colors.text.secondary, marginTop: 4 }}>{dateLabel}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

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

  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      {/* Modern fixed header, similar to diary, but with 'Fittrack' */}
      <View style={styles.headerBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Fittrack</Text>
        </View>
        <View style={styles.headerIcons}>
          <Animated.View style={{ transform: [{ scale: bellAnim }], position: 'relative' }}>
            <TouchableOpacity style={styles.iconButton} onPress={handleBellPress}>
              <MaterialCommunityIcons name="bell-outline" size={28} color={colors.primary} />
              {/* Notification count badge */}
              {(!notificationsViewed && dummyNotifications.length > 0) ? (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{dummyNotifications.length}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/profile')}>
            <MaterialCommunityIcons name="account-circle" size={36} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Notification Drawer */}
      <NotificationDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
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
                style={[
                  styles.shadowContainer,
                  styles.macroShadowContainer,
                  { backgroundColor: colors.background.card }, // <-- theme support
                ]}
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
                          backgroundColor: colors.background.main, // <-- theme support
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
                      <View style={[
                        styles.innerCircle,
                        { backgroundColor: colors.background.card } // <-- theme support
                      ]}>
                        <Text style={[styles.macroTitle, { color: colors.text.primary }]}>Macros</Text>
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

        {/* Original dashboard content restored */}
        <View style={styles.containerText}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text.primary }]}>Choose your next habit</Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Big goals start with small habits.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start a habit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Step and Exercise */}
        <View style={styles.containerCard}>
          {/* Steps Card */}
          <TouchableOpacity style={[styles.card, !darkMode && {
            shadowColor: '#7F9497',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 8,
            elevation: 4,
          }]} onPress={() => router.push('/discover/sync')}>
            <Text style={styles.cardTitle}>Steps</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="run" size={30} color={colors.primary} />
              <View style={{ marginLeft: 4, width: "50%" }}>
                <Text style={styles.cardSubtitle}>Connect to track steps.</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={30}
                color={colors.text.primary}
              />
            </View>
          </TouchableOpacity>

          {/* Exercise Card */}
          <TouchableOpacity style={[styles.card, !darkMode && {
            shadowColor: '#7F9497',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 8,
            elevation: 4,
          }]} onPress={() => router.push('/discover/exercises')}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.cardTitle}>Exercise</Text>
              <MaterialCommunityIcons name="plus" size={24} color={colors.primary} />
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

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 23,
            margin: 20,
            color: colors.text.primary,
          }}
        >
          Weight Progress
        </Text>

        {/* Weight Progress Chart - just before DiscoverCards, with modern shadow */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,
            backgroundColor: colors.background.card,
            borderRadius: 18,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.primary, marginRight: 16 }}></Text>
            <TouchableOpacity onPress={() => setWeightRange('week')} style={{ marginRight: 30 }}>
              <Text style={{ color: weightRange === 'week' ? colors.primary : colors.text.secondary, fontWeight: weightRange === 'week' ? 'bold' : 'normal' }}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWeightRange('month')} style={{ marginRight: 30 }}>
              <Text style={{ color: weightRange === 'month' ? colors.primary : colors.text.secondary, fontWeight: weightRange === 'month' ? 'bold' : 'normal' }}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWeightRange('year')}>
              <Text style={{ color: weightRange === 'year' ? colors.primary : colors.text.secondary, fontWeight: weightRange === 'year' ? 'bold' : 'normal' }}>Year</Text>
            </TouchableOpacity>
          </View>
          {renderWeightChart()}
        </View>

        {/* Discover Cards */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 23,
            margin: 20,
            color: colors.text.primary,
          }}
        >
          Discover
        </Text>
        <DiscoverCards darkMode={darkMode} />

        <View style={styles.spacer} />
      </ScrollView>

    </View>
  );
}
