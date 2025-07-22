import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const WeightCollection = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFocused, setHeightFocused] = useState(false);
  const [weightFocused, setWeightFocused] = useState(false);
  const { updateFormData } = useOnboardingStore();
  const { colors } = useTheme();

  const handleHeightChange = (text: string) => {
    setHeight(text);
    updateFormData({ height: text });
  };

  const handleWeightChange = (text: string) => {
    setWeight(text);
    updateFormData({ weight: text });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.main }]}>
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: colors.text.primary }]}>Just a few more questions</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={[styles.label, { color: colors.text.primary }]}>How tall are you?</Text>
            <View
              style={[
                styles.inputWrapper,
                { borderColor: colors.border, backgroundColor: colors.background.main },
                heightFocused && { borderColor: colors.primary, borderWidth: 2 }
              ]}
            >
              <TextInput
                onFocus={() => setHeightFocused(true)}
                onBlur={() => setHeightFocused(false)}
                style={[styles.input, { color: colors.text.primary }]}
                placeholder="cm"
                placeholderTextColor={colors.text.muted}
                keyboardType="numeric"
                value={height}
                onChangeText={handleHeightChange}
                selectionColor={colors.primary}
              />
            </View>
          </View>
          <View style={styles.unitContainer}>
            <Text style={[styles.unitText, { color: colors.primary }]}>cm</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={[styles.label, { color: colors.text.primary }]}>How much do you weigh?</Text>
            <View
              style={[
                styles.inputWrapper,
                { borderColor: colors.border, backgroundColor: colors.background.main },
                weightFocused && { borderColor: colors.primary, borderWidth: 2 }
              ]}
            >
              <TextInput
                onFocus={() => setWeightFocused(true)}
                onBlur={() => setWeightFocused(false)}
                style={[styles.input, { color: colors.text.primary }]}
                placeholder="kg"
                placeholderTextColor={colors.text.muted}
                keyboardType="numeric"
                value={weight}
                onChangeText={handleWeightChange}
                selectionColor={colors.primary}
              />
            </View>
          </View>
          <View style={styles.unitContainer}>
            <Text style={[styles.unitText, { color: colors.primary }]}>kg</Text>
          </View>
        </View>

        <Text style={[styles.note, { color: colors.text.muted }]}>
          It's ok to estimate, you can update later.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 32,
    fontWeight: "700",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
    width: "100%",
  },
  inputColumn: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
  inputActive: {
    borderWidth: 2,
  },
  unitContainer: {
    width: 70,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  unitText: {
    fontWeight: "700",
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default WeightCollection;
