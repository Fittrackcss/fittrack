import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/constants/ThemeContext";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.main },
    header: {
      paddingTop: 25,
      paddingBottom: 15,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    placeholder: { width: 40 },
    content: { flex: 1, paddingHorizontal: 20 },
    section: { marginTop: 24 },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background.card,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: "500",
    },
    actionCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.card,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      gap: 10,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    actionText: { fontSize: 16, color: colors.text.primary, fontWeight: "500" },
  });
}

export default function AppSettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const darkMode = mode === "dark";

  const handleClearCache = () => {
    Alert.alert("Cache cleared!");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.divider, true: colors.primary }}
              thumbColor={notificationsEnabled ? colors.accent : "#f4f3f4"}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={(val) => setMode(val ? "dark" : "light")}
              trackColor={{ false: colors.divider, true: colors.primary }}
              thumbColor={darkMode ? colors.accent : "#f4f3f4"}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleClearCache}
          >
            <MaterialCommunityIcons
              name="delete"
              size={22}
              color={colors.danger}
            />
            <Text style={styles.actionText}>Clear Cache</Text>
          </TouchableOpacity>
          <View style={styles.actionCard}>
            <MaterialCommunityIcons
              name="information"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.actionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
