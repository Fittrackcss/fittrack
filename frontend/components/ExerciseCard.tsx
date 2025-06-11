import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { Exercise } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ExerciseCardProps = {
  date: string;
};

export const ExerciseCard = ({ date }: ExerciseCardProps) => {
  const router = useRouter();
  const { exercises, exerciseEntries } = useExerciseStore();

  const todayEntries = exerciseEntries.filter(
    (entry) =>
      new Date(entry.date).toISOString().split("T")[0] ===
      new Date(date).toISOString().split("T")[0]
  );

  const exerciseItems: Array<{ exercise: Exercise; duration: number }> = [];

  todayEntries.forEach((entry) => {
    const exercise = exercises.find((e) => e.id === entry.exerciseId);
    if (exercise) {
      exerciseItems.push({
        exercise,
        duration: entry.duration,
      });
    }
  });

  const totalCaloriesBurned = exerciseItems.reduce(
    (sum, item) => sum + item.exercise.caloriesBurnedPerMinute * item.duration,
    0
  );

  const handleAddExercise = () => {
    router.push(`/exercise/add?date=${date}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise</Text>
        <Text style={styles.calories}>{totalCaloriesBurned} cal</Text>
      </View>

      {exerciseItems.length > 0 ? (
        <View style={styles.exerciseList}>
          {exerciseItems.map((item, index) => (
            <View
              key={`${item.exercise.id}-${index}`}
              style={styles.exerciseItem}
            >
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.exercise.name}</Text>
                <Text style={styles.exerciseDuration}>
                  {item.duration} {item.duration === 1 ? "minute" : "minutes"}
                </Text>
              </View>
              <Text style={styles.exerciseCalories}>
                {Math.round(
                  item.exercise.caloriesBurnedPerMinute * item.duration
                )}{" "}
                cal
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No exercises added yet</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Plus size={16} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.accent,
  },
  exerciseList: {
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    color: colors.text.primary,
  },
  exerciseDuration: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  exerciseCalories: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  emptyState: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.light,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.accent,
    marginLeft: 4,
  },
});
