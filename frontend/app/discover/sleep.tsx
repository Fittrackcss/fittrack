import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";

const DiscoverSleep = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Discover Sleep</Text>
    <Text style={styles.text}>Explore tips, tools, and resources to improve your sleep.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

export default DiscoverSleep; 