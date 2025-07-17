import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

const router = useRouter();

const DiscoverSleep = () => (
  <SafeAreaView style={styles.container}>
    <LinearGradient
      colors={[colors.primary, colors.accent]}
      style={styles.newheader}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Discover Sleep</Text>
    </LinearGradient>
    <Text style={styles.text}>
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
  newheader: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
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
