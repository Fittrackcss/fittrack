import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { lightColors, darkColors } from "./theme";
import { useThemeStore } from "@/store/themeStore";

type ThemeMode = "system" | "light" | "dark";

const ThemeContext = createContext({
  colors: lightColors,
  darkMode: false,
  mode: "system" as ThemeMode,
  setMode: (mode: ThemeMode) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode, setMode } = useThemeStore();
  const [systemColorScheme, setSystemColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const isDark =
    mode === "dark" ||
    (mode === "system" && systemColorScheme === "dark");

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, darkMode: isDark, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 