import { colors } from "@/constants/Colors";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import {
  Award,
  Bell,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
  User,
  Calendar,
  VenusAndMars,
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)");
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: <User size={20} color={colors.text.primary} />,
      title: "Account Settings",
      onPress: () => {},
    },
    {
      icon: <Heart size={20} color={colors.text.primary} />,
      title: "Health Profile",
      onPress: () => {},
    },
    {
      icon: <Award size={20} color={colors.text.primary} />,
      title: "Goals & Targets",
      onPress: () => {},
    },
    {
      icon: <Bell size={20} color={colors.text.primary} />,
      title: "Notifications",
      onPress: () => {},
    },
    {
      icon: <HelpCircle size={20} color={colors.text.primary} />,
      title: "Help & Support",
      onPress: () => {},
    },
    {
      icon: <Settings size={20} color={colors.text.primary} />,
      title: "App Settings",
      onPress: () => {},
    },
  ];

  const formatActivityLevel = (level?: string) => {
    if (!level) return "--";
    return level
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatGoal = (goal?: string) => {
    if (!goal) return "--";
    return goal.charAt(0).toUpperCase() + goal.slice(1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Text style={styles.profileImagePlaceholder}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name || "User"}</Text>
        <Text style={styles.email}>{user?.email || "No email provided"}</Text>

        {/* Personal Info Row */}
        <View style={styles.personalInfoContainer}>
          {user?.gender && (
            <View style={styles.personalInfoItem}>
              <VenusAndMars size={16} color={colors.text.secondary} />
              <Text style={styles.personalInfoText}>
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </Text>
            </View>
          )}

          {user?.age !== undefined && (
            <View style={styles.personalInfoItem}>
              <Calendar size={16} color={colors.text.secondary} />
              <Text style={styles.personalInfoText}>{user.age} years</Text>
            </View>
          )}

          {user?.country && (
            <View style={styles.personalInfoItem}>
              <MapPin size={16} color={colors.text.secondary} />
              <Text style={styles.personalInfoText}>{user.country}</Text>
            </View>
          )}
        </View>

        {/* Health Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {user?.weight !== undefined ? `${user.weight} lbs` : "--"}
            </Text>
            <Text style={styles.statLabel}>Current Weight</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {user?.goalWeight !== undefined ? `${user.goalWeight} lbs` : "--"}
            </Text>
            <Text style={styles.statLabel}>Goal Weight</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {user?.height !== undefined ? `${user.height} cm` : "--"}
            </Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
        </View>

        {/* Additional Stats */}
        <View style={styles.additionalStats}>
          <View style={styles.additionalStatItem}>
            <Text style={styles.additionalStatLabel}>Activity Level</Text>
            <Text style={styles.additionalStatValue}>
              {formatActivityLevel(user?.activityLevel)}
            </Text>
          </View>

          <View style={styles.additionalStatItem}>
            <Text style={styles.additionalStatLabel}>Goal</Text>
            <Text style={styles.additionalStatValue}>
              {formatGoal(user?.goal)}
            </Text>
          </View>

          <View style={styles.additionalStatItem}>
            <Text style={styles.additionalStatLabel}>Daily Calories</Text>
            <Text style={styles.additionalStatValue}>
              {user?.dailyCalorieGoal !== undefined
                ? user.dailyCalorieGoal
                : "--"}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={colors.danger} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>FitTrack v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  personalInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  personalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  personalInfoText: {
    fontSize: 12,
    color: colors.text.primary,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.divider,
  },
  additionalStats: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  additionalStatItem: {
    alignItems: "center",
    flex: 1,
  },
  additionalStatLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  additionalStatValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 16,
  },
  menuItemArrow: {
    fontSize: 20,
    color: colors.text.light,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: colors.danger,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.text.light,
    textAlign: "center",
    marginBottom: 32,
  },
});
