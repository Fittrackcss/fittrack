import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { Exercise } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Animated circular progress ring
const AnimatedCircle = Animated.createAnimatedComponent(View);
const AnimatedProgressRing = ({ percent, calories }: { percent: number; calories: number }) => {
  const strokeWidth = 3;
  const size = 64;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (1 - percent);
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedCircle
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: colors.background.secondary,
        }}
      />
      <AnimatedCircle
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: colors.accent,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          transform: [{ rotate: `${percent * 360}deg` }],
        }}
      />
      <Text style={styles.progressCalories}>{Math.round(calories)}</Text>
      <Text style={styles.progressLabel}>kcal</Text>
    </View>
  );
};

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

  // For demo, assume 500 kcal is the daily goal
  const percent = Math.min(totalCaloriesBurned / 500, 1);

  const handleAddExercise = () => {
    router.push(`/exercise/add?date=${date}`);
  };

  return (
    <LinearGradient
      colors={[colors.accent, colors.background.secondary, colors.background.card]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.modernCard}
    >
      <View style={styles.cardHeaderRow}>
        <View>
          <Text style={styles.cardTitle}>Exercise</Text>
          <Text style={styles.cardSubtitle}>Keep moving, stay healthy!</Text>
        </View>
        <AnimatedProgressRing percent={percent} calories={totalCaloriesBurned} />
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
                )} cal
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateModern}>
          <MaterialCommunityIcons name="run-fast" size={36} color={colors.text.secondary} style={{ marginBottom: 8 }} />
          <Text style={styles.emptyTextModern}>No exercises added yet</Text>
        </View>
      )}
      <TouchableOpacity style={styles.addButtonModern} onPress={handleAddExercise}>
        <Plus size={18} color="#fff" />
        <Text style={styles.addButtonTextModern}>Add Exercise</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modernCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    letterSpacing: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
    marginBottom: 2,
    marginRight: 15
  },
  progressCalories: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent,
    marginTop: 2,
    textAlign: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: -2,
    textAlign: 'center',
  },
  exerciseList: {
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: "600",
  },
  exerciseDuration: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  exerciseCalories: {
    fontSize: 15,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  emptyStateModern: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTextModern: {
    fontSize: 15,
    color: colors.primary,
    textAlign: "center",
  },
  addButtonModern: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignSelf: "center",
    marginTop: 8,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonTextModern: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});
