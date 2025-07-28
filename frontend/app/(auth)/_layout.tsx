import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.main,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: "600",
        },
        contentStyle: {
          backgroundColor: colors.background.main,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ title: "Log In", headerShown: false }}
      />
    </Stack>
  );
}
