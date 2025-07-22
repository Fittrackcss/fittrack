import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/constants/ThemeContext";

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 24,
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      marginTop: 24,
      marginBottom: 8,
      textAlign: "center",
    },
    subheader: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 24,
      textAlign: "center",
    },
  });
}

export default function DiscoverSleep() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Sleep</Text>
      <Text style={styles.subheader}>
        Explore tips, tools, and resources to improve your sleep.
      </Text>
    </SafeAreaView>
  );
}
