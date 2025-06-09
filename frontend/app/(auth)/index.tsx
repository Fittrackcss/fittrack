import { Button } from "@/components/Button";
import { colors } from "@/constants/colors";
import { useUserStore } from "@/store/userStore";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Redirect href="/(onboarding)" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>FitTrack</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Track Your Fitness Journey</Text>
        <Text style={styles.subtitle}>
          Log your meals, track your workouts, and achieve your health goals
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => router.push("/login")}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Sign Up"
          onPress={() => router.push("/signup")}
          variant="outline"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    marginBottom: 16,
  },
});
