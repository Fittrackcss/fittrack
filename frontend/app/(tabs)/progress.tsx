import { colors } from "@/constants/Colors";
import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { WeightEntry } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProgressScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { weightEntries, getWeightEntriesByDateRange, getLatestWeight } =
    useProgressStore();

  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [latestWeight, setLatestWeight] = useState<number | null>(null);
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);

  useEffect(() => {
    const latest = getLatestWeight();
    setLatestWeight(latest);

    const today = new Date();
    let startDate = new Date();

    if (timeRange === "week") {
      startDate.setDate(today.getDate() - 7);
    } else if (timeRange === "month") {
      startDate.setMonth(today.getMonth() - 1);
    } else {
      startDate.setFullYear(today.getFullYear() - 1);
    }

    const entries = getWeightEntriesByDateRange(
      startDate.toISOString(),
      today.toISOString()
    );

    setWeightData(entries);
  }, [timeRange, getLatestWeight, getWeightEntriesByDateRange, weightEntries]);

  const renderWeightChange = () => {
    if (weightData.length < 2) return null;

    const oldestWeight = weightData[0].weight;
    const newestWeight = weightData[weightData.length - 1].weight;
    const change = newestWeight - oldestWeight;
    const isGain = change > 0;

    const app_id = "ba825b15";
    const app_key = "4908a945198c5d05cfeb579c4bfb0517	—";

    const query = "chicken";

    return (
      <View style={styles.changeContainer}>
        <Text style={styles.changeLabel}>
          {timeRange === "week"
            ? "This Week"
            : timeRange === "month"
            ? "This Month"
            : "This Year"}
        </Text>
        <Text
          style={[
            styles.changeValue,
            { color: isGain ? colors.danger : colors.success },
          ]}
        >
          {isGain ? "+" : ""}
          {change.toFixed(1)} lbs
        </Text>
      </View>
    );
  };

  const renderWeightChart = () => {
    if (weightData.length === 0) {
      return (
        <View style={styles.emptyChartContainer}>
          <Text style={styles.emptyChartText}>No weight data available</Text>
          <TouchableOpacity
            style={styles.addWeightButton}
            onPress={() => router.push("/weight/add")}
          >
            <Text style={styles.addWeightButtonText}>Add Weight</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Simple chart representation
    const minWeight = Math.min(...weightData.map((d) => d.weight));
    const maxWeight = Math.max(...weightData.map((d) => d.weight));
    const range = maxWeight - minWeight || 1; // Prevent division by zero

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartYAxis}>
          <Text style={styles.chartYLabel}>{maxWeight.toFixed(1)}</Text>
          <Text style={styles.chartYLabel}>
            {((maxWeight + minWeight) / 2).toFixed(1)}
          </Text>
          <Text style={styles.chartYLabel}>{minWeight.toFixed(1)}</Text>
        </View>

        <View style={styles.chartContent}>
          {weightData.map((entry, index) => {
            const heightPercentage = ((entry.weight - minWeight) / range) * 100;
            const date = new Date(entry.date);
            const dateLabel = date.getDate().toString();

            return (
              <View key={entry.id} style={styles.chartBarContainer}>
                <View style={styles.chartBarWrapper}>
                  <View
                    style={[
                      styles.chartBar,
                      { height: `${Math.max(5, heightPercentage)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.chartXLabel}>{dateLabel}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weight Progress</Text>

        <View style={styles.currentWeightContainer}>
          <Text style={styles.currentWeightLabel}>Current Weight</Text>
          <Text style={styles.currentWeightValue}>
            {latestWeight ? `${latestWeight} lbs` : "Not set"}
          </Text>

          {user?.goalWeight && latestWeight && (
            <Text style={styles.goalText}>
              {latestWeight > user.goalWeight
                ? `${(latestWeight - user.goalWeight).toFixed(1)} lbs to goal`
                : "Goal reached!"}
            </Text>
          )}
        </View>

        {renderWeightChange()}
      </View>

      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "week" && styles.activeTimeRangeButton,
          ]}
          onPress={() => setTimeRange("week")}
        >
          <Text
            style={[
              styles.timeRangeText,
              timeRange === "week" && styles.activeTimeRangeText,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "month" && styles.activeTimeRangeButton,
          ]}
          onPress={() => setTimeRange("month")}
        >
          <Text
            style={[
              styles.timeRangeText,
              timeRange === "month" && styles.activeTimeRangeText,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "year" && styles.activeTimeRangeButton,
          ]}
          onPress={() => setTimeRange("year")}
        >
          <Text
            style={[
              styles.timeRangeText,
              timeRange === "year" && styles.activeTimeRangeText,
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      {renderWeightChart()}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/weight/add")}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 16,
  },
  currentWeightContainer: {
    marginBottom: 16,
  },
  currentWeightLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  currentWeightValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  goalText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  changeValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeRangeContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTimeRangeButton: {
    backgroundColor: colors.primary,
  },
  timeRangeText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  activeTimeRangeText: {
    color: "#fff",
    fontWeight: "600",
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
    padding: 16,
    paddingTop: 24,
  },
  chartYAxis: {
    width: 40,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  chartYLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  chartContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
    paddingBottom: 20,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center",
  },
  chartBarWrapper: {
    width: "60%",
    height: "100%",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: "100%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartXLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  emptyChartContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyChartText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  addWeightButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  addWeightButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
