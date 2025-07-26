import React from "react";
import { ThemeProvider } from "@/constants/ThemeContext";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1500); // Adjust time as needed
  }, []);

  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
