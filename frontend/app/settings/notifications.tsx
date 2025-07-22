import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { dummyNotifications } from "@/components/ui/NotificationDrawer";

export default function NotificationsSettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([...dummyNotifications]);

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary, colors.accent]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      <FlatList
        style={styles.content}
        data={notifications}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications at the moment 🎉</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color={colors.danger} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.main },
  header: {
    paddingTop: 25, paddingBottom: 15, paddingHorizontal: 20, borderRadius: 20,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  placeholder: { width: 40 },
  content: { flex: 1, paddingHorizontal: 20 },
  notificationCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: colors.background.card,
    borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },
  notificationTitle: { fontSize: 16, fontWeight: "bold", color: colors.primary, marginBottom: 4 },
  notificationMessage: { fontSize: 14, color: colors.text.secondary },
  emptyText: { textAlign: "center", color: colors.text.secondary, marginTop: 40, fontSize: 16 },
}); 