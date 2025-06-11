import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { exercises, addExerciseEntry } = useExerciseStore();

  const exercise = exercises.find((e) => e.id === id);
  const [duration, setDuration] = useState("30");

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const durationNum = parseInt(duration) || 30;
  const totalCalories = exercise.caloriesBurnedPerMinute * durationNum;

  const handleAddExercise = () => {
    addExerciseEntry({
      date: new Date().toISOString(),
      exerciseId: exercise.id,
      duration: durationNum,
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseCategory}>{exercise.category}</Text>
      </View>

      <View style={styles.calorieContainer}>
        <View style={styles.calorieItem}>
          <Text style={styles.calorieValue}>
            {exercise.caloriesBurnedPerMinute}
          </Text>
          <Text style={styles.calorieLabel}>cal/min</Text>
        </View>

        <View style={styles.calorieDivider} />

        <View style={styles.calorieItem}>
          <Text style={styles.calorieValue}>{totalCalories}</Text>
          <Text style={styles.calorieLabel}>total calories</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add to Workout</Text>

        <Input
          label="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="number-pad"
        />

        <Button
          title="Add to Diary"
          onPress={handleAddExercise}
          style={styles.addButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 16,
    color: colors.text.secondary,
    textTransform: "capitalize",
  },
  calorieContainer: {
    flexDirection: "row",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    justifyContent: "space-around",
  },
  calorieItem: {
    alignItems: "center",
  },
  calorieDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.divider,
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  calorieLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  formContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 16,
  },
  addButton: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    padding: 24,
  },
});
