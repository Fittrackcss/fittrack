import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { colors } from "@/constants/Colors";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await signup({
        name,
        email,
        password,
        age: age ? parseInt(age) : 0,
        height: height ? parseFloat(height) : 0,
        weight: weight ? parseFloat(weight) : 0,
        gender: "not specified",
        goalWeight: 0,
        activityLevel: "moderate",
        goal: "maintain",
      });

      if (success) {
        router.replace("/(tabs)");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Sign up to start your fitness journey
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <Text style={styles.sectionTitle}>Optional Information</Text>

        <Input
          label="Age"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="number-pad"
        />

        <Input
          label="Height (cm)"
          value={height}
          onChangeText={setHeight}
          placeholder="Enter your height in cm"
          keyboardType="decimal-pad"
        />

        <Input
          label="Weight (lbs)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight in lbs"
          keyboardType="decimal-pad"
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          loading={loading}
          style={styles.signupButton}
        />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  formContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  errorText: {
    fontSize: 14,
    color: colors.danger,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FFF1F2",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 16,
  },
  signupButton: {
    marginTop: 24,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 4,
  },
});
