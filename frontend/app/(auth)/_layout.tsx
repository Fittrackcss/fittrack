import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
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
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />
    </Stack>
  );
}
