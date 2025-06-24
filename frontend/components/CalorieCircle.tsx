import { colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CalorieCircleProps = {
  consumed: number;
  goal: number;
  size?: number;
};

export const CalorieCircle = ({
  consumed,
  goal,
  size = 200,
}: CalorieCircleProps) => {
  // Ensure all inputs are non-negative
  const safeConsumed = Math.max(0, consumed);
  const safeGoal = Math.max(1, goal);

  // Calculate percentage (capped at 100%)
  const percentage = Math.min(100, (safeConsumed / safeGoal) * 100);

  // Calculate remaining calories (can't be negative)
  const remaining = Math.max(0, safeGoal - safeConsumed);

  // Circle styling calculations
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Exercise shows percentage over goal (only if consumed > goal)
  const overPercentage =
    safeConsumed > safeGoal
      ? Math.floor(((safeConsumed - safeGoal) / safeGoal) * 100)
      : 0;

  return (
    <View style={[styles.container, { width: size * 1.7, height: size }]}>
      <View style={styles.backgroundCircle}>
        <View style={styles.progressCircleContainer}>
          <View
            style={[
              styles.progressCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "transparent",
                borderTopColor: colors.primary,
                transform: [{ rotateZ: `${percentage * 3.6}deg` }],
              },
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.remainingText}>{remaining}</Text>
          <Text style={styles.remainingLabel}>remaining</Text>
          <View style={styles.divider} />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          width: "40%",
        }}
      >
        <View style={styles.goalContainer}>
          <View>
            <View style={styles.holder}>
              <Ionicons name="flag" size={24} color={colors.accent} />
              <Text style={styles.goalLabel}>Base Goal</Text>
            </View>
            <Text style={styles.goalValue}>{safeGoal}</Text>
          </View>
          <View>
            <View style={styles.holder}>
              <Ionicons name="restaurant" size={24} color="blue" />
              <Text style={styles.goalLabel}>Food</Text>
            </View>
            <Text style={styles.goalValue}>{safeConsumed}</Text>
          </View>
          <View>
            <View style={styles.holder}>
              <Ionicons name="flame" size={24} color="blue" />
              <Text style={styles.goalLabel}>Exercise</Text>
            </View>
            <Text style={styles.goalValue}>{overPercentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  backgroundCircle: {
    width: "45%",
    height: "80%",
    borderRadius: 999,
    backgroundColor: colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressCircleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircle: {
    position: "absolute",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  remainingText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  remainingLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: -4,
  },
  divider: {
    width: 30,
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 8,
  },
  goalContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  goalLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 10,
  },
  goalValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.muted,
    textAlign: "left",
  },
  holder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
