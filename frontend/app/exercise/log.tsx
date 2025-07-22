import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useExerciseStore } from "@/store/exerciseStore";
import { useTheme } from "@/constants/ThemeContext";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { ExerciseEntry } from "@/types";

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      padding: 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondary,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 2,
    },
    addButtonText: {
      color: colors.primary,
      fontWeight: "bold",
      fontSize: 15,
      marginLeft: 6,
    },
    list: {
      paddingBottom: 32,
    },
    card: {
      backgroundColor: colors.background.card || "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    exerciseName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    date: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    duration: {
      fontSize: 15,
      color: colors.primary,
      fontWeight: "600",
    },
    calories: {
      fontSize: 15,
      color: colors.accent,
      fontWeight: "600",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text.light,
    },
  });
}

const ExerciseLogPage = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { exerciseEntries, exercises } = useExerciseStore();
  const router = useRouter();

  // Sort by most recent
  const sortedEntries = [...exerciseEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderItem = ({ item }: { item: ExerciseEntry }) => {
    const exercise = exercises.find((e) => e.id === item.exerciseId);
    if (!exercise) return null;
    const calories = exercise.caloriesBurnedPerMinute * item.duration;
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.duration}>{item.duration} min</Text>
          <Text style={styles.calories}>{calories} cal</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Log</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/exercise/add")}> 
          <Plus size={20} color={colors.primary} />
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      {sortedEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No exercises logged yet.</Text>
        </View>
      ) : (
        <FlatList
          data={sortedEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ExerciseLogPage; 