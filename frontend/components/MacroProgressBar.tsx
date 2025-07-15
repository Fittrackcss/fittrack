// import { colors } from "@/constants/Colors";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// type MacroProgressBarProps = {
//   label: string;
//   current: number;
//   goal: number;
//   color: string;
// };

// export const MacroProgressBar = ({
//   label,
//   current,
//   goal,
//   color,
// }: MacroProgressBarProps) => {
//   const percentage = Math.min(100, (current / goal) * 100);

//   return (
//     <View style={styles.container}>
//       <View style={styles.labelContainer}>
//         <Text style={styles.label}>{label}</Text>
//         <Text style={styles.values}>
//           {current.toFixed(0)}g / {goal}g
//         </Text>
//       </View>
//       <View style={styles.progressBarContainer}>
//         <View
//           style={[
//             styles.progressBar,
//             { width: `${percentage}%`, backgroundColor: color },
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 8,
//   },
//   labelContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: colors.text.primary,
//   },
//   values: {
//     fontSize: 14,
//     color: colors.text.secondary,
//   },
//   progressBarContainer: {
//     height: 8,
//     backgroundColor: colors.background.secondary,
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progressBar: {
//     height: "100%",
//     borderRadius: 4,
//   },
// });

import { colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MacroCircleProps = {
  carbs: number;
  protein: number;
  fat: number;
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
  size?: number;
};

export const MacroCircle = ({
  carbs,
  protein,
  fat,
  carbsGoal,
  proteinGoal,
  fatGoal,
  size = 200,
}: MacroCircleProps) => {
  // Calculate percentages (0-100)
  const carbsPercentage = Math.min(100, (carbs / carbsGoal) * 100);
  const proteinPercentage = Math.min(100, (protein / proteinGoal) * 100);
  const fatPercentage = Math.min(100, (fat / fatGoal) * 100);

  // Calculate angles for each macro (in degrees)
  const total = carbs + protein + fat;
  const carbsAngle = total > 0 ? (carbs / total) * 360 : 120;
  const proteinAngle = total > 0 ? (protein / total) * 360 : 120;
  const fatAngle = total > 0 ? (fat / total) * 360 : 120;

  // Colors for each macro
  const macroColors = {
    carbs: colors.carbs, // Add these to your colors constant
    protein: colors.protein,
    fat: colors.fat,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circleContainer, { width: size, height: size }]}>
        {/* Carbs Segment */}
        <View
          style={[
            styles.segment,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: macroColors.carbs,
              transform: [
                { rotate: "0deg" },
                { skewY: `${carbsAngle - 90}deg` },
              ],
            },
          ]}
        />

        {/* Protein Segment */}
        <View
          style={[
            styles.segment,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: macroColors.protein,
              transform: [
                { rotate: `${carbsAngle}deg` },
                { skewY: `${proteinAngle - 90}deg` },
              ],
            },
          ]}
        />

        {/* Fat Segment */}
        <View
          style={[
            styles.segment,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: macroColors.fat,
              transform: [
                { rotate: `${carbsAngle + proteinAngle}deg` },
                { skewY: `${fatAngle - 90}deg` },
              ],
            },
          ]}
        />

        {/* Center circle */}
        <View
          style={[
            styles.centerCircle,
            { width: size * 0.7, height: size * 0.7 },
          ]}
        >
          <Text style={styles.totalText}>{total.toFixed(0)}g</Text>
          <Text style={styles.totalLabel}>total macros</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: macroColors.carbs }]}
          />
          <Text style={styles.legendText}>
            Carbs: {carbs.toFixed(0)}g ({carbsPercentage.toFixed(0)}%)
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: macroColors.protein },
            ]}
          />
          <Text style={styles.legendText}>
            Protein: {protein.toFixed(0)}g ({proteinPercentage.toFixed(0)}%)
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: macroColors.fat }]}
          />
          <Text style={styles.legendText}>
            Fat: {fat.toFixed(0)}g ({fatPercentage.toFixed(0)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  circleContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  segment: {
    position: "absolute",
    overflow: "hidden",
  },
  centerCircle: {
    backgroundColor: colors.background.main,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  legendContainer: {
    marginTop: 20,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: colors.text.primary,
  },
});
export default MacroCircle;
