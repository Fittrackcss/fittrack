import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "@/constants/Colors";
import { useOnboardingStore } from "@/store/useOnboardingStore";

// const WeightCollection = () => {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [heightFocused, setHeightFocused] = useState(false);
//   const [weightFocused, setWeightFocused] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.subtitle}>Just a few more questions</Text>

//         <View style={styles.inputRow}>
//           <View style={styles.inputColumn}>
//             <Text style={styles.label}>How tall are you?</Text>
//             <View
//               style={[styles.inputWrapper, heightFocused && styles.inputActive]}
//             >
//               <TextInput
//                 onFocus={() => setHeightFocused(true)}
//                 onBlur={() => setHeightFocused(false)}
//                 style={styles.input}
//                 placeholder="cm"
//                 placeholderTextColor={colors.text.muted}
//                 keyboardType="numeric"
//                 value={height}
//                 onChangeText={setHeight}
//                 selectionColor={colors.primary}
//               />
//             </View>
//           </View>
//           <View style={styles.unitContainer}>
//             <Text style={styles.unitText}>cm</Text>
//           </View>
//         </View>

//         <View style={styles.inputRow}>
//           <View style={styles.inputColumn}>
//             <Text style={styles.label}>How much do you weigh?</Text>
//             <View
//               style={[styles.inputWrapper, weightFocused && styles.inputActive]}
//             >
//               <TextInput
//                 onFocus={() => setWeightFocused(true)}
//                 onBlur={() => setWeightFocused(false)}
//                 style={styles.input}
//                 placeholder="lbs"
//                 placeholderTextColor={colors.text.muted}
//                 keyboardType="numeric"
//                 value={weight}
//                 onChangeText={setWeight}
//                 selectionColor={colors.primary}
//               />
//             </View>
//           </View>
//           <View style={styles.unitContainer}>
//             <Text style={styles.unitText}>lbs</Text>
//           </View>
//         </View>

//         <Text style={styles.note}>
//           It's ok to estimate, you can update later.
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// Replace the entire component with this:
const WeightCollection = () => {
  const { formData, updateFormData } = useOnboardingStore();
  const [heightFocused, setHeightFocused] = useState(false);
  const [weightFocused, setWeightFocused] = useState(false);

  const handleHeightChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      const height = parseInt(text);
      updateFormData({
        height: height > 0 && height <= 300 ? height : undefined,
      });
    }
  };

  const handleWeightChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      const weight = parseInt(text);
      updateFormData({
        weight: weight > 0 && weight <= 1000 ? weight : undefined,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Just a few more questions</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={styles.label}>How tall are you?</Text>
            <View
              style={[styles.inputWrapper, heightFocused && styles.inputActive]}
            >
              <TextInput
                onFocus={() => setHeightFocused(true)}
                onBlur={() => setHeightFocused(false)}
                style={styles.input}
                placeholder="cm"
                placeholderTextColor={colors.text.muted}
                keyboardType="numeric"
                value={formData.height?.toString() || ""}
                onChangeText={handleHeightChange}
                selectionColor={colors.primary}
                maxLength={3}
              />
            </View>
          </View>
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>cm</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={styles.label}>How much do you weigh?</Text>
            <View
              style={[styles.inputWrapper, weightFocused && styles.inputActive]}
            >
              <TextInput
                onFocus={() => setWeightFocused(true)}
                onBlur={() => setWeightFocused(false)}
                style={styles.input}
                placeholder="lbs"
                placeholderTextColor={colors.text.muted}
                keyboardType="numeric"
                value={formData.weight?.toString() || ""}
                onChangeText={handleWeightChange}
                selectionColor={colors.primary}
                maxLength={3}
              />
            </View>
          </View>
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>lbs</Text>
          </View>
        </View>

        <Text style={styles.note}>
          It's ok to estimate, you can update later.
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  content: {
    flex: 1,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 20,
    color: colors.text.primary,
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
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
    color: colors.text.primary,
    padding: 0,
  },
  inputActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  unitContainer: {
    width: 70,
    height: 60,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  unitText: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.primary,
  },
  note: {
    fontSize: 14,
    color: colors.text.muted,
    marginTop: 8,
  },
});

export default WeightCollection;
