import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/constants/ThemeContext";
import { useProgressStore } from "@/store/progressStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      padding: 24,
    },
    formContainer: {
      marginTop: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 24,
    },
    dateLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text.primary,
      marginBottom: 8,
    },
    dateContainer: {
      backgroundColor: colors.background.secondary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 24,
    },
    dateValue: {
      fontSize: 16,
      color: colors.text.primary,
    },
    saveButton: {
      marginTop: 16,
    },
  });
}

export default function AddWeightScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const { addWeightEntry } = useProgressStore();

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAddWeight = () => {
    if (!weight) return;

    addWeightEntry({
      date,
      weight: parseFloat(weight),
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Weight Entry</Text>

        <Input
          label="Weight (lbs)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight"
          keyboardType="decimal-pad"
        />

        <Text style={styles.dateLabel}>Date</Text>
        <TouchableOpacity style={styles.dateContainer}>
          <Text style={styles.dateValue}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <Button
          title="Save Weight"
          onPress={handleAddWeight}
          style={styles.saveButton}
          disabled={!weight}
        />
      </View>
    </View>
  );
}
