import { colors } from "@/constants/Colors";
import "@/global-styles/patchText";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../assets/fonts/static/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/static/OpenSans-Bold.ttf"),
  });

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      // For now, force show onboarding always will change later
      setInitialRoute("(tabs)");
    };
    checkOnboarding();
  }, []);

  if (!fontsLoaded || !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        initialRouteName={initialRoute}
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
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="food/add"
          options={{
            title: "Add Food",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="food/details"
          options={{
            title: "Food Details",
          }}
        />
        <Stack.Screen
          name="food/foodstore"
          options={{
            title: "Food Store",
          }}
        />
        <Stack.Screen
          name="exercise/add"
          options={{
            title: "Add Exercise",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="exercise/detail"
          options={{
            title: "Exercise Details",
          }}
        />
        <Stack.Screen
          name="exercise/log"
          options={{
            title: "Exercise Details",
          }}
        />
        <Stack.Screen
          name="weight/add"
          options={{
            title: "Add Weight",
            presentation: "modal",
          }}
        />
        <Stack.Screen 
          name="discover/recipes" 
          options={{ 
            title: "Recipes",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/exercises" 
          options={{ 
            title: "Exercises",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/sleep" 
          options={{ 
            title: "Sleep",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/sync" 
          options={{ 
            title: "Sync Up",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/friends" 
          options={{ 
            title: "Friends",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/community" 
          options={{ 
            title: "Community",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="discover/learn-more" 
          options={{ 
            title: "Learn More",
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="settings/account" 
          options={{ 
            title: "Account Settings",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="settings/health" 
          options={{ 
            title: "Health Profile",
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="settings/goals" 
          options={{ 
            title: "Goals & Targets",
            headerShown: true 
          }} 
        />
      </Stack>
    </>
  );
}
