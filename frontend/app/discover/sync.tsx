import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/constants/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 8,
      textAlign: "center",
    },
    newheader: {
      paddingTop: 20,
      paddingBottom: 15,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    placeholder: {
      width: 40,
    },
    subheader: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 24,
      textAlign: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    optionsContainer: {
      flex: 1,
      justifyContent: "center",
      gap: 20,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      marginBottom: 16,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 6,
      textAlign: "center",
    },
    cardDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
    },
  });
}

const router = useRouter();
const DiscoverSync = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const syncOptions = [
    {
      key: "watch",
      title: "Add Watch",
      description: "Connect your smart watch to track activity and sleep.",
      icon: <Ionicons name="watch" size={36} color={colors.primary} />,
    },
    {
      key: "fitnessApp",
      title: "Connect Fitness App",
      description:
        "Sync with popular fitness apps for seamless data integration.",
      icon: (
        <MaterialCommunityIcons
          name="run-fast"
          size={36}
          color={colors.primary}
        />
      ),
    },
    {
      key: "syncData",
      title: "Sync Data",
      description: "Manually sync your latest health and activity data.",
      icon: <FontAwesome5 name="sync" size={32} color={colors.primary} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={styles.newheader}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goals & Targets</Text>
        <View style={styles.placeholder} />
      </LinearGradient> */}

      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={styles.header}>Sync Up</Text>
        <Text style={styles.subheader}>
          Connect your devices and apps for a complete fitness experience.
        </Text>
        <View style={styles.optionsContainer}>
          {syncOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.card}
              activeOpacity={0.85}
            >
              <View style={styles.iconContainer}>{option.icon}</View>
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverSync;
