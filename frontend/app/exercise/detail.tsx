import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/constants/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      padding: 24,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 16,
      textAlign: "center",
      width: "100%",
    },
    card: {
      width: '100%',
      backgroundColor: colors.background.card,
      borderRadius: 22,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#7F9497',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 24,
    },
    image: {
      width: 220,
      height: 220,
      borderRadius: 18,
      marginBottom: 18,
      backgroundColor: "#f0f0f0",
      borderWidth: 4,
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 6,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10,
      textAlign: "center",
      letterSpacing: 1,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      marginBottom: 2,
      alignSelf: 'flex-start',
    },
    labelIcon: {
      marginRight: 8,
    },
    label: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text.primary,
      textAlign: "left",
    },
    value: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "left",
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    instructionsBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 16,
      width: '100%',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    instructionsText: {
      fontSize: 15,
      color: colors.text.primary,
      lineHeight: 22,
    },
    goBackBtn: {
      marginTop: 24,
      width: '100%',
    },
  });
}


export default function ExerciseDetailPage() {
  const { exercise } = useLocalSearchParams();
  const router = useRouter();
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  let exerciseData: any = null;
  if (exercise) {
    try {
      exerciseData = JSON.parse(exercise as string);
    } catch {}
  }

  if (!exerciseData) {
    return (
      <View style={styles.card}>
        <Text>No exercise data available.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
      <View
        style={{
          height: 60,
          backgroundColor: colors.background.secondary,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text style={styles.header}>Discover Workouts</Text>
      </View>
      <View style={styles.card}>
        {exerciseData.gifUrl && (
          <Image source={{ uri: exerciseData.gifUrl }} style={styles.image} />
        )}
        <Text style={styles.title}>{exerciseData.name}</Text>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="dumbbell" size={20} color={colors.primary} style={styles.labelIcon} />
          <Text style={styles.label}>Equipment Needed:</Text>
        </View>
        <Text style={styles.value}>{(exerciseData.equipment).toUpperCase() || "None"}</Text>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="target" size={20} color={colors.primary} style={styles.labelIcon} />
          <Text style={styles.label}>Target Body Part:</Text>
        </View>
        <Text style={styles.value}>{(exerciseData.target).toUpperCase() || "No target group available for this exercise."}</Text>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="book-open-variant" size={20} color={colors.primary} style={styles.labelIcon} />
          <Text style={styles.label}>Instructions:</Text>
        </View>
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsText}>{exerciseData.instructions || "No instructions available for this exercise."}</Text>
        </View>
        <Button title="Go Back" onPress={() => router.back()} style={styles.goBackBtn} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
