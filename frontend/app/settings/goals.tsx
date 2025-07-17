import { colors } from "@/constants/Colors";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function GoalsScreen() {
  const router = useRouter();
  const { user, updateUser } = useUserStore();

  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(
    user?.dailyCalorieGoal?.toString() || "2000"
  );
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(
    user?.weeklyWorkouts?.toString() || "3"
  );
  const [dailySteps, setDailySteps] = useState(
    user?.dailySteps?.toString() || "10000"
  );
  const [weightGoal, setWeightGoal] = useState(user?.weightGoal || "lose");

  const weightGoals = [
    {
      key: "lose",
      label: "Lose Weight",
      icon: "trending-down" as const,
      color: "#FF6B6B",
    },
    {
      key: "maintain",
      label: "Maintain Weight",
      icon: "minus" as const,
      color: "#4ECDC4",
    },
    {
      key: "gain",
      label: "Gain Weight",
      icon: "trending-up" as const,
      color: "#95E1D3",
    },
  ];

  const handleSaveGoals = () => {
    if (!dailyCalorieGoal || !weeklyWorkouts || !dailySteps) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    updateUser({
      ...user,
      dailyCalorieGoal: parseInt(dailyCalorieGoal),
      weeklyWorkouts: parseInt(weeklyWorkouts),
      dailySteps: parseInt(dailySteps),
      weightGoal,
    });

    Alert.alert("Success", "Goals updated successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goals & Targets</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weight Goal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Goal</Text>
          <Text style={styles.sectionSubtitle}>
            What's your primary weight goal?
          </Text>

          {weightGoals.map((goal) => (
            <TouchableOpacity
              key={goal.key}
              style={[
                styles.goalCard,
                weightGoal === goal.key && styles.selectedGoalCard,
              ]}
              onPress={() => setWeightGoal(goal.key)}
            >
              <MaterialCommunityIcons
                name={goal.icon}
                size={24}
                color={weightGoal === goal.key ? "#fff" : goal.color}
              />
              <View style={styles.goalContent}>
                <Text
                  style={[
                    styles.goalTitle,
                    weightGoal === goal.key && styles.selectedGoalTitle,
                  ]}
                >
                  {goal.label}
                </Text>
              </View>
              {weightGoal === goal.key && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Targets Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Targets</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Daily Calorie Goal</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="fire"
                size={20}
                color={colors.text.secondary}
              />
              <TextInput
                style={styles.textInput}
                value={dailyCalorieGoal}
                onChangeText={setDailyCalorieGoal}
                placeholder="Enter daily calorie goal"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>cal</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Daily Steps Goal</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="walk"
                size={20}
                color={colors.text.secondary}
              />
              <TextInput
                style={styles.textInput}
                value={dailySteps}
                onChangeText={setDailySteps}
                placeholder="Enter daily steps goal"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>steps</Text>
            </View>
          </View>
        </View>

        {/* Weekly Targets Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Targets</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weekly Workouts</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={20}
                color={colors.text.secondary}
              />
              <TextInput
                style={styles.textInput}
                value={weeklyWorkouts}
                onChangeText={setWeeklyWorkouts}
                placeholder="Enter weekly workout goal"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>workouts</Text>
            </View>
          </View>
        </View>

        {/* Progress Tracking Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Tracking</Text>

          <TouchableOpacity style={styles.trackingCard}>
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color={colors.primary}
            />
            <View style={styles.trackingText}>
              <Text style={styles.trackingTitle}>Weight Progress</Text>
              <Text style={styles.trackingSubtitle}>
                Track your weight changes over time
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.text.light}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.trackingCard}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={24}
              color="#4ECDC4"
            />
            <View style={styles.trackingText}>
              <Text style={styles.trackingTitle}>Workout Streak</Text>
              <Text style={styles.trackingSubtitle}>
                Track your consecutive workout days
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.text.light}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.trackingCard}>
            <MaterialCommunityIcons name="target" size={24} color="#95E1D3" />
            <View style={styles.trackingText}>
              <Text style={styles.trackingTitle}>Goal Achievement</Text>
              <Text style={styles.trackingSubtitle}>
                Monitor your progress towards goals
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.text.light}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoals}>
          <Text style={styles.saveButtonText}>Save Goals</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedGoalCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  goalContent: {
    flex: 1,
    marginLeft: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  selectedGoalTitle: {
    color: "#fff",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputUnit: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  trackingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  trackingText: {
    flex: 1,
    marginLeft: 16,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  trackingSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
