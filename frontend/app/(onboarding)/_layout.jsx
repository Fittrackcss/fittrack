import { Stack } from "expo-router";
import { colors } from "../../constants/Colors";

const layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.main,
        },
        headerTintColor: colors.text.secondary,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerBackTitle: ".",
        contentStyle: {
          backgroundColor: colors.background.main,
        },
        font: {
          family: "OpenSans",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="Screen1" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen name="Goals" options={{ headerShown: false }} />
      <Stack.Screen
        name="WelcomeScreen"
        options={{
          headerShown: false,
          headerTitle: "Welcome Screen ",
        }}
      />
      <Stack.Screen name="GoalMid" options={{ headerShown: false }} />
      <Stack.Screen name="GoalReason" options={{ headerShown: false }} />
      <Stack.Screen name="NextGoals" options={{ headerShown: false }} />
      <Stack.Screen name="GoalChoices" options={{ headerShown: false }} />
      <Stack.Screen name="MealPlanning" options={{ headerShown: false }} />
      <Stack.Screen name="InfoCollection" options={{ headerShown: false }} />
      <Stack.Screen name="FinishScreens" options={{ headerShown: false }} />
    </Stack>
  );
};

export default layout;
