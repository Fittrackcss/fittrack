import { useTheme } from "@/constants/ThemeContext";
import { useUserStore } from "@/store/userStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useRouter } from "expo-router";
import {
  Award,
  Bell,
  Heart,
  HelpCircle,
  LogOut,
  Settings,
  User,
  Crown,
  Target,
  Shield,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "@/components/ui/CustomModal";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    headerGradient: {
      paddingTop: 40,
      paddingBottom: 10,
      paddingHorizontal: 15,
    },
    headerContentRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: 16,
    },
    nameEmailContainer: {
      marginLeft: 18,
      flex: 1,
      justifyContent: "center",
    },
    profileImageContainer: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      position: "relative",
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
    profileImagePlaceholder: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#fff",
    },
    cameraIcon: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: "#fff",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 4,
    },
    email: {
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 24,
    },
    statsContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: "center",
      marginHorizontal: 4,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
      marginTop: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
      textAlign: "center",
    },
    scrollContent: {
      flex: 1,
      paddingTop: 24,
    },
    menuContainer: {
      paddingHorizontal: 20,
    },
    menuCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.background.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: 2,
    },
    menuItemSubtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    logoutCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginTop: 24,
      marginBottom: 16,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.danger,
      marginLeft: 12,
    },
    versionText: {
      fontSize: 12,
      color: colors.text.light,
      textAlign: "center",
      marginBottom: 32,
    },
  });
}

export default function ProfileScreen() {
  const { colors, darkMode } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const { user, logout, updateUser } = useUserStore();
  const { formData, selections } = useOnboardingStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Create fallback user from onboarding data if user store is null
  const fallbackUser = user || (formData && Object.keys(formData).length > 0 ? {
    id: "onboarding-user",
    name: formData.name || "User",
    email: formData.email || "",
    age: Number(formData.age) || 0,
    gender: formData.sex || formData.gender || "",
    height: Number(formData.height) || 0,
    weight: Number(formData.weight) || 0,
    goalWeight: Number(formData.goalWeight) || 0,
    activityLevel: formData.activityLevel || "",
    goal: "maintain" as const,
    dailyCalorieGoal: 0,
    weeklyWorkouts: 0,
    dailySteps: 0,
    weightGoal: "",
    profilePhoto: undefined,
    macroGoals: { protein: 0, carbs: 0, fat: 0 },
  } : null);

  const displayUser = user || fallbackUser;

  useEffect(() => {
    console.log("Current user object:", user);
    console.log("Onboarding formData:", formData);
    console.log("Onboarding selections:", selections);
    console.log("Fallback user:", fallbackUser);
    console.log("Display user:", displayUser);
    console.log("Profile photo URI:", displayUser?.profilePhoto);
    console.log("User name:", displayUser?.name);
    console.log("User email:", displayUser?.email);
    console.log("User weight:", displayUser?.weight);
    console.log("User height:", displayUser?.height);
    console.log("User goal weight:", displayUser?.goalWeight);
    
    // Check if user store is working
    const { user: storeUser, isAuthenticated } = useUserStore.getState();
    console.log("User store state - user:", storeUser);
    console.log("User store state - isAuthenticated:", isAuthenticated);
  }, [user, formData, selections, fallbackUser, displayUser]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    router.replace("/(onboarding)/Screen1");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant permission to access your photo library"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      console.log("Selected image URI:", result.assets[0].uri);
      
      // If we have a real user, update it normally
      if (user) {
        updateUser({
          profilePhoto: result.assets[0].uri,
        });
      } else {
        // If we're using fallback data, create a new user with the photo
        const newUser = {
          ...fallbackUser!,
          profilePhoto: result.assets[0].uri,
        };
        useUserStore.getState().setUser(newUser);
      }
      console.log("User updated with profile photo");
    }
  };

  const menuItems = [
    {
      icon: <User size={22} color={colors.primary} />,
      title: "Account Settings",
      subtitle: "Manage your profile and preferences",
      onPress: () => router.push("/settings/account"),
    },
    {
      icon: <Heart size={22} color="#FF6B6B" />,
      title: "Health Profile",
      subtitle: "Your health metrics and goals",
      onPress: () => router.push("/settings/health"),
    },
    {
      icon: <Target size={22} color="#4ECDC4" />,
      title: "Goals & Targets",
      subtitle: "Set and track your fitness goals",
      onPress: () => router.push("/settings/goals"),
    },
    {
      icon: <Bell size={22} color="#FFE66D" />,
      title: "Notifications",
      subtitle: "Customize your app notifications",
      onPress: () => {
        router.push("/settings/notifications");
      },
    },
    {
      icon: <HelpCircle size={22} color="#95E1D3" />,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      onPress: () => {
        router.push("/settings/help");
      },
    },
    {
      icon: <Settings size={22} color="#A8E6CF" />,
      title: "App Settings",
      subtitle: "Configure app preferences",
      onPress: () => {
        router.push("/settings/app");
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Modern gradient header */}
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContentRow}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={pickImage}
          >
            {displayUser?.profilePhoto ? (
              <Image
                source={{ uri: displayUser.profilePhoto }}
                style={styles.profileImage}
                onError={(error) => {
                  console.log("Image loading error:", error);
                  // If image fails to load, remove the profile photo
                  updateUser({ profilePhoto: undefined });
                }}
                onLoad={() => console.log("Image loaded successfully")}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.profileImagePlaceholder}>
                {displayUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            )}
            <View style={styles.cameraIcon}>
              <MaterialCommunityIcons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.nameEmailContainer}>
            <Text style={styles.name}>{displayUser?.name?.trim() || "User"}</Text>
            <Text style={styles.email}>
              {displayUser?.email || "user@example.com"}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="scale"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.statValue}>{displayUser?.weight ? `${displayUser.weight} kg` : "-- kg"}</Text>
            <Text style={styles.statLabel}>Current Weight</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="target"
              size={20}
              color={colors.accent}
            />
            <Text style={styles.statValue}>{displayUser?.goalWeight ? `${displayUser.goalWeight} kg` : "-- kg"}</Text>
            <Text style={styles.statLabel}>Goal Weight</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="human-male-height"
              size={20}
              color="#4ECDC4"
            />
            <Text style={styles.statValue}>{displayUser?.height ? `${displayUser.height} cm` : "-- cm"}</Text>
            <Text style={styles.statLabel}>Height</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuCard,
                !darkMode && {
                  shadowColor: "#7F9497",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.text.light}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
          <LogOut size={22} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>FitTrack v1.0.0</Text>
      </ScrollView>

      <CustomModal
        visible={showLogoutModal}
        onClose={cancelLogout}
        title="Log Out"
        message="Are you sure you want to log out?"
        type="warning"
        buttons={[
          {
            text: "Cancel",
            onPress: cancelLogout,
            style: "secondary"
          },
          {
            text: "Log Out",
            onPress: confirmLogout,
            style: "danger"
          }
        ]}
      />
    </View>
  );
}
