import { useTheme } from "@/constants/ThemeContext";
import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { WeightEntry } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      paddingHorizontal: 10,
    },
    header: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
      marginTop: 20,
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
      color: colors.text.light,
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
    },

    gradientHeader: {
      paddingTop: 10,
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderRadius: 15,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    gradientHeaderTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
      letterSpacing: 1,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 20,
      marginHorizontal: 16,
      marginTop: 24,
      padding: 0,
      
    },
    chartCard: {
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      padding: 8,
      marginTop: 12,
     
    },
    timeRangeContainerModern: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8,
      marginBottom: 0,
      gap: 8,
    },
    timeRangeButtonModern: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: "#f0f2f5",
      marginHorizontal: 2,
    },
    activeTimeRangeButtonModern: {
      backgroundColor: colors.primary,
    },
    timeRangeTextModern: {
      fontSize: 15,
      color: colors.text.secondary,
      fontWeight: "500",
    },
    activeTimeRangeTextModern: {
      color: "#fff",
      fontWeight: "700",
    },
    addButtonModern: {
      position: "absolute",
      bottom: 36,
      right: 28,
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    addButtonGradient: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    accountHeader: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    accountBackButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    accountHeaderTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    accountPlaceholder: {
      width: 40,
    },
  });
}

export default function ProgressScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const { user } = useUserStore();
  const { weightEntries, getWeightEntriesByDateRange, getLatestWeight } =
    useProgressStore();

  const handleBack = () => {
    router.back();
  };

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
    <SafeAreaView style={styles.container}>
      {/* Header matching Account Settings */}
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={styles.accountHeader}
      >
        <TouchableOpacity
          style={styles.accountBackButton}
          onPress={handleBack}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.accountHeaderTitle}>Progress</Text>
        <View style={styles.accountPlaceholder} />
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={{ marginBottom: 40 }}>
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
                    ? `${(latestWeight - user.goalWeight).toFixed(
                        1
                      )} lbs to goal`
                    : "Goal reached!"}
                </Text>
              )}
            </View>
            {renderWeightChange()}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.timeRangeContainerModern}>
            <TouchableOpacity
              style={[
                styles.timeRangeButtonModern,
                timeRange === "week" && styles.activeTimeRangeButtonModern,
              ]}
              onPress={() => setTimeRange("week")}
            >
              <Text
                style={[
                  styles.timeRangeTextModern,
                  timeRange === "week" && styles.activeTimeRangeTextModern,
                ]}
              >
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeRangeButtonModern,
                timeRange === "month" && styles.activeTimeRangeButtonModern,
              ]}
              onPress={() => setTimeRange("month")}
            >
              <Text
                style={[
                  styles.timeRangeTextModern,
                  timeRange === "month" && styles.activeTimeRangeTextModern,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeRangeButtonModern,
                timeRange === "year" && styles.activeTimeRangeButtonModern,
              ]}
              onPress={() => setTimeRange("year")}
            >
              <Text
                style={[
                  styles.timeRangeTextModern,
                  timeRange === "year" && styles.activeTimeRangeTextModern,
                ]}
              >
                Year
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartCard}>{renderWeightChart()}</View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButtonModern}
        onPress={() => router.push("/weight/add")}
      >
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.addButtonGradient}
        >
          <Plus size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
