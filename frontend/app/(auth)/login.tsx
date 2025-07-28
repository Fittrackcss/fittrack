import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/Colors";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.replace("/(tabs)");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Log in to continue tracking your fitness journey
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.text.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
            cursorColor={colors.primary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.text.secondary}
            secureTextEntry
            cursorColor={colors.primary}
          />
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Log In"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(onboarding)")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
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
  formContainer: {
    marginTop: 40,
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background.secondary,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
  },
  loginButton: {
    marginTop: 8,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 4,
  },
});
