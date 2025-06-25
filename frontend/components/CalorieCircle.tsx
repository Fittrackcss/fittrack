import { colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TestTube } from "lucide-react-native";

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
  const percentage = Math.min(100, (consumed / goal) * 100);
  const remaining = Math.max(0, goal - consumed);
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const exercise = Math.floor(Math.min((remaining - consumed) / consumed));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View>
        <View style={{flexDirection: 'column', display:'flex', marginBottom:20}}>
        <Text style={{fontWeight: 'bold', fontSize:24}}>Calories</Text>
        <Text>Remaining = Goal - Food + Exercise</Text>
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
            <Text style={styles.goalValue}>{exercise}%</Text>
          </View>
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
    shadowColor: "#7F9497",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  inside:{
    backgroundColor:'white',
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
