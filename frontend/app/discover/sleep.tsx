import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";


const DiscoverSleep = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Discover Sleep</Text>
    <Text style={styles.subheader}>
      Explore tips, tools, and resources to improve your sleep.
    </Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
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

export default DiscoverSleep;
