import React from "react";
import { ThemeProvider } from "@/constants/ThemeContext";
import MainApp from "./app/_layout";

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
