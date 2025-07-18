import React from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const dummyNotifications = [
  { id: "1", title: "Welcome to FitTrack!", message: "Start tracking your fitness journey today." },
  { id: "2", title: "Goal Reminder", message: "Don't forget to log your meals and workouts." },
  { id: "3", title: "Progress Update", message: "You hit your weekly step goal! 🎉" },
];

interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationDrawerProps {
  visible: boolean;
  onClose: () => void;
  notifications?: Notification[];
}

export { dummyNotifications };
export default function NotificationDrawer({ visible, onClose, notifications = dummyNotifications }: NotificationDrawerProps) {
  const translateX = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      )}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}> 
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.8,
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  closeButton: {
    padding: 4,
    borderRadius: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  notificationCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.text.secondary,
  },
}); 