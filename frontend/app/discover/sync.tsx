import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const syncOptions = [
  {
    key: 'watch',
    title: 'Add Watch',
    description: 'Connect your smart watch to track activity and sleep.',
    icon: <Ionicons name="watch" size={36} color={colors.primary} />,
  },
  {
    key: 'fitnessApp',
    title: 'Connect Fitness App',
    description: 'Sync with popular fitness apps for seamless data integration.',
    icon: <MaterialCommunityIcons name="run-fast" size={36} color={colors.primary} />,
  },
  {
    key: 'syncData',
    title: 'Sync Data',
    description: 'Manually sync your latest health and activity data.',
    icon: <FontAwesome5 name="sync" size={32} color={colors.primary} />,
  },
];

const DiscoverSync = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Sync Up</Text>
    <Text style={styles.subheader}>Connect your devices and apps for a complete fitness experience.</Text>
    <View style={styles.optionsContainer}>
      {syncOptions.map(option => (
        <TouchableOpacity key={option.key} style={styles.card} activeOpacity={0.85}>
          <View style={styles.iconContainer}>{option.icon}</View>
          <Text style={styles.cardTitle}>{option.title}</Text>
          <Text style={styles.cardDescription}>{option.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
    textAlign: "center",
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

export default DiscoverSync; 