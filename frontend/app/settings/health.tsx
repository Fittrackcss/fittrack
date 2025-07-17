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

export default function HealthProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useUserStore();
  
  const [weight, setWeight] = useState(user?.weight?.toString() || "");
  const [goalWeight, setGoalWeight] = useState(user?.goalWeight?.toString() || "");
  const [height, setHeight] = useState(user?.height?.toString() || "");
  const [age, setAge] = useState(user?.age?.toString() || "");
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || "moderate");

  const activityLevels = [
    { key: "sedentary", label: "Sedentary", description: "Little to no exercise" },
    { key: "light", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { key: "moderate", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { key: "active", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { key: "very_active", label: "Extremely Active", description: "Very hard exercise, physical job" },
  ];

  const handleSaveHealth = () => {
    if (!weight || !goalWeight || !height || !age) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    updateUser({
      ...user,
      weight: parseFloat(weight),
      goalWeight: parseFloat(goalWeight),
      height: parseFloat(height),
      age: parseInt(age),
      activityLevel,
    });

    Alert.alert("Success", "Health profile updated successfully!");
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
        <Text style={styles.headerTitle}>Health Profile</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Metrics</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Current Weight (kg)</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="scale" size={20} color={colors.text.secondary} />
              <TextInput
                style={styles.textInput}
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter current weight"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Goal Weight (kg)</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="target" size={20} color={colors.text.secondary} />
              <TextInput
                style={styles.textInput}
                value={goalWeight}
                onChangeText={setGoalWeight}
                placeholder="Enter goal weight"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height (cm)</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="human-male-height" size={20} color={colors.text.secondary} />
              <TextInput
                style={styles.textInput}
                value={height}
                onChangeText={setHeight}
                placeholder="Enter height"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="calendar" size={20} color={colors.text.secondary} />
              <TextInput
                style={styles.textInput}
                value={age}
                onChangeText={setAge}
                placeholder="Enter age"
                placeholderTextColor={colors.text.light}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Activity Level Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Level</Text>
          <Text style={styles.sectionSubtitle}>Select your typical activity level</Text>
          
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.activityCard,
                activityLevel === level.key && styles.selectedActivityCard
              ]}
              onPress={() => setActivityLevel(level.key)}
            >
              <View style={styles.activityContent}>
                <Text style={[
                  styles.activityTitle,
                  activityLevel === level.key && styles.selectedActivityTitle
                ]}>
                  {level.label}
                </Text>
                <Text style={[
                  styles.activityDescription,
                  activityLevel === level.key && styles.selectedActivityDescription
                ]}>
                  {level.description}
                </Text>
              </View>
              {activityLevel === level.key && (
                <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Goals</Text>
          
          <TouchableOpacity style={styles.goalCard}>
            <MaterialCommunityIcons name="heart" size={24} color="#FF6B6B" />
            <View style={styles.goalText}>
              <Text style={styles.goalTitle}>Weight Management</Text>
              <Text style={styles.goalSubtitle}>Track your weight progress</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.light} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.goalCard}>
            <MaterialCommunityIcons name="run" size={24} color="#4ECDC4" />
            <View style={styles.goalText}>
              <Text style={styles.goalTitle}>Fitness Goals</Text>
              <Text style={styles.goalSubtitle}>Set exercise and strength targets</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.light} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.goalCard}>
            <MaterialCommunityIcons name="food-apple" size={24} color="#95E1D3" />
            <View style={styles.goalText}>
              <Text style={styles.goalTitle}>Nutrition Goals</Text>
              <Text style={styles.goalSubtitle}>Set calorie and macro targets</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.light} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveHealth}>
          <Text style={styles.saveButtonText}>Save Health Profile</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedActivityCard: {
    borderColor: colors.primary,
    backgroundColor: colors.background.secondary,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  selectedActivityTitle: {
    color: colors.primary,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  selectedActivityDescription: {
    color: colors.text.primary,
  },
  goalCard: {
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
  goalText: {
    flex: 1,
    marginLeft: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  goalSubtitle: {
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