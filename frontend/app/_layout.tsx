import React from "react";
import { ThemeProvider } from "@/constants/ThemeContext";

// If you use Expo Router, you may have a Slot or Stack here
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
