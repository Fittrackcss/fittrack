import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CalorieCircleProps = {
  consumed: number;
  goal: number;
  size?: number;
  exerciseBurned?: number;
};

export const CalorieCircle = ({
  consumed,
  goal,
  size = 200,
  exerciseBurned = 0,
}: CalorieCircleProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // Calculate net calories after accounting for exercise
  const netCalories = Math.max(0, consumed - exerciseBurned);
  const percentage = Math.min(100, (netCalories / goal) * 100);
  const remaining = Math.max(0, goal - netCalories);
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculate exercise impact
  const overGoal = Math.max(0, consumed - goal);
  const exerciseNeeded = goal > 0 ? Math.ceil(overGoal / 5) : 0; // 5 cal/min estimate

  return (
    <View>
      <View
        style={{ flexDirection: "column", display: "flex", marginBottom: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: colors.text.primary }}>Calories</Text>
        <Text style={{ color: colors.text.muted }}>
          {remaining > 0
            ? `${remaining} remaining`
            : `${Math.abs(remaining)} over`}
        </Text>
      </View>
      <View style={[styles.container, { width: size * 1.7, height: size }]}>
        <View style={styles.backgroundCircle}>
          <View style={styles.progressCircleContainer}>
            <View style={styles.inside}>
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
                <Ionicons name="flag" size={24} color={colors.gray} />
                <Text style={styles.goalLabel}>Base Goal</Text>
              </View>
              <Text style={styles.goalValue}>{goal}</Text>
            </View>
            <View>
              <View style={styles.holder}>
                <Ionicons name="restaurant" size={24} color="blue" />
                <Text style={styles.goalLabel}>Food</Text>
              </View>
              <Text style={styles.goalValue}>{consumed}</Text>
            </View>
            <View>
              <View style={styles.holder}>
                <Ionicons name="flame" size={24} color={colors.primary} />
                <Text style={styles.goalLabel}>Exercise</Text>
              </View>
              <Text style={styles.goalValue}>
                {exerciseBurned > 0
                  ? `-${exerciseBurned}`
                  : exerciseNeeded > 0
                  ? `${exerciseNeeded} min needed`
                  : "0"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 15,
      elevation: 5,
      backgroundColor: colors.background.card,
    },
    inside: {
      backgroundColor: colors.background.card,
      width: "90%",
      height: "90%",
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    backgroundCircle: {
      width: "45%",
      height: "80%",
      borderRadius: 999,
      backgroundColor: colors.primary,
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
}

export default CalorieCircle;
