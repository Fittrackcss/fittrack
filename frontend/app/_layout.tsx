import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@/constants/ThemeContext";
import { Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
