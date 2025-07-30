import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useTheme } from "@/constants/ThemeContext";

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      paddingTop: 40,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 21,
      fontWeight: "bold",
      color: colors.text.secondary,
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 24,
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
      paddingHorizontal: 16,
      height: 60,
      justifyContent: "center",
    },
    input: {
      fontSize: 16,
      color: colors.text.primary,
    },
    inputActive: {
      borderWidth: 2,
      borderColor: colors.primary,
    },
    passwordHint: {
      fontSize: 14,
      color: colors.text.muted,
      marginTop: 8,
    },
    termsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 32,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors.primary,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
    },
    checkmark: {
      color: "#fff",
      fontWeight: "bold",
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: colors.text.primary,
    },
    termsLink: {
      color: colors.primary,
      fontWeight: "600",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    circleButton: {
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.button.secondary,
      borderRadius: 50,
      padding: 10,
    },
    nextButton: {
      flex: 1,
      marginLeft: 20,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: "center",
    },
    nextText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    nextButtonDisabled: {
      backgroundColor: colors.button.secondary,
    },
  });
}

const CreateAccount = ({ currentIndex, onboardingSteps }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const { formData, updateFormData } = useOnboardingStore();
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState(formData.password || "");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleNext = () => {
    if (!email || !password) {
      return;
    }
    // Save to onboarding store
    updateFormData({ email, password });
    // Proceed with navigation logic
    if (currentIndex + 1 < onboardingSteps.length) {
      router.push(`/(onboarding)/${onboardingSteps[currentIndex + 1].id}`);
    } else {
      // Handle finish logic
      router.push("/(tabs)/");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Almost done! Create your account.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View
            style={[styles.inputWrapper, emailFocused && styles.inputActive]}
          >
            <TextInput
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                updateFormData({ email: text });
              }}
              selectionColor={colors.primary}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View
            style={[styles.inputWrapper, passwordFocused && styles.inputActive]}
          >
            <TextInput
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor={colors.text.muted}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                updateFormData({ password: text });
              }}
              selectionColor={colors.primary}
            />
          </View>
          <Text style={styles.passwordHint}>10 characters minimum</Text>
        </View>

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View
            style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
          >
            {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the{" "}
            <Text style={styles.termsLink}>
              FitTrack Terms & Conditions and Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePrev} style={styles.circleButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.nextButton,
            (!email || !password || !termsAccepted) &&
              styles.nextButtonDisabled,
          ]}
          disabled={!email || !password || !termsAccepted}
        >
          <Text style={styles.nextText}>
            {currentIndex + 1 === onboardingSteps.length ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;
