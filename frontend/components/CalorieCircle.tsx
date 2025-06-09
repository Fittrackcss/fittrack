import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CalorieCircleProps = {
  consumed: number;
  goal: number;
  size?: number;
};

export const CalorieCircle = ({
  consumed,
  goal,
  size = 180,
}: CalorieCircleProps) => {
  const percentage = Math.min(100, (consumed / goal) * 100);
  const remaining = Math.max(0, goal - consumed);
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
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
                transform: [{ rotateZ: `-${percentage * 3.6}deg` }],
              },
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.remainingText}>{remaining}</Text>
          <Text style={styles.remainingLabel}>remaining</Text>
          <View style={styles.divider} />
          <View style={styles.goalContainer}>
            <Text style={styles.goalLabel}>Goal</Text>
            <Text style={styles.goalValue}>{goal}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundCircle: {
    width: "100%",
    height: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  goalLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  goalValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
  },
});
