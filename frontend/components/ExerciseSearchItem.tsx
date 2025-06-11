import { colors } from "@/constants/Colors";
import { Exercise } from "@/types";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ExerciseSearchItemProps = {
  exercise: Exercise;
  onAdd: (exercise: Exercise) => void;
};

export const ExerciseSearchItem = ({
  exercise,
  onAdd,
}: ExerciseSearchItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onAdd(exercise)}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.category}>{exercise.category}</Text>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesValue}>
          {exercise.caloriesBurnedPerMinute}
        </Text>
        <Text style={styles.caloriesLabel}>cal/min</Text>
      </View>
      <View style={styles.addContainer}>
        <Plus size={20} color={colors.accent} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.background.card,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
  category: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: "capitalize",
  },
  caloriesContainer: {
    marginRight: 16,
    alignItems: "flex-end",
  },
  caloriesValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  caloriesLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  addContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
});
