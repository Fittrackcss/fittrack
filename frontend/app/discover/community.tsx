import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/constants/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Mock data as fallback
const mockHealthTips = [
  {
    id: "1",
    title: "Stay Hydrated",
    description:
      "Drink at least 8s of water daily to maintain optimal health and energy levels.",
    category: "Hydration",
    icon: "water",
  },
  {
    id: "2",
    title: "Get Enough Sleep",
    description:
      "Aim for 7-9s of quality sleep each night to support recovery and mental health.",
    category: "Sleep",
    icon: "bed",
  },
  {
    id: "3",
    title: "Eat More Protein",
    description:
      "Include lean protein sources in every meal to support muscle growth and repair.",
    category: "Nutrition",
    icon: "nutrition",
  },
  {
    id: "4",
    title: "Move Daily",
    description:
      "Even 30 minutes of moderate exercise daily can significantly improve your health.",
    category: "Exercise",
    icon: "fitness",
  },
  {
    id: "5",
    title: "Practice Mindfulness",
    description:
      "Take 10 minutes daily for meditation or deep breathing to reduce stress.",
    category: "Mental Health",
    icon: "brain",
  },
];

interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface Topic {
  id: string;
  topic: string;
}

const trendingTopics: Topic[] = [
  { id: "1", topic: "Best Home Workouts" },
  { id: "2", topic: "Healthy Meal Prep" },
  { id: "3", topic: "Motivation Monday" },
];

function makeStyles(colors: any) {
  return StyleSheet.create({
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
      marginBottom: 20,
      textAlign: "center",
    },
    joinButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignSelf: "center",
      marginBottom: 24,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    joinButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: colors.text.secondary,
    },
    trendingSection: {
      marginBottom: 24,
    },
    trendingTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 12,
    },
    trendingList: {
      marginBottom: 8,
    },
    topicItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.button.secondary,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginRight: 12,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    topicText: {
      fontSize: 14,
      color: colors.text.primary,
      fontWeight: "500",
    },
    healthTipCard: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    tipHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    tipHeaderText: {
      marginLeft: 12,
      flex: 1,
    },
    tipTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 2,
    },
    tipCategory: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    tipDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
      marginBottom: 16,
    },
    tipAction: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
    },
    tipActionText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: 600,
      marginRight: 4,
    },
    discussButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.accent,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 20,
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    discussButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 8,
    },
  });
}

const DiscoverCommunity = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [healthTips, setHealthTips] = useState<HealthTip[]>(mockHealthTips);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Function to fetch health tips from API (Nutritionix or similar)
  const fetchHealthTips = async () => {
    setLoading(true);
    try {
      // You can replace this with actual API call
      // Example: const response = await fetch('https://api.nutritionix.com/v1_1/search/health+tips');

      // For now, using mock data with a delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHealthTips(mockHealthTips);
    } catch (error) {
      console.log("Using fallback data:", error);
      setHealthTips(mockHealthTips);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHealthTips();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const renderHealthTip = ({ item }: { item: HealthTip }) => (
    <View style={styles.healthTipCard}>
      <View style={styles.tipHeader}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={colors.primary}
        />
        <View style={styles.tipHeaderText}>
          <Text style={styles.tipTitle}>{item.title}</Text>
          <Text style={styles.tipCategory}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.tipDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.tipAction}
        onPress={() =>
          router.push({
            pathname: "/discover/learn-more",
            params: {
              title: item.title,
              description: item.description,
              category: item.category,
              icon: item.icon,
            },
          })
        }
      >
        <Text style={styles.tipActionText}>Learn More</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderTopic = ({ item }: { item: Topic }) => (
    <View style={styles.topicItem}>
      <Ionicons
        name="flame"
        size={18}
        color={colors.primary}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.topicText}>{item.topic}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Community</Text>
      <Text style={styles.subheader}>
        Join the community to share, learn, and grow together.
      </Text>

      <TouchableOpacity style={styles.joinButton}>
        <MaterialCommunityIcons name="account-group" size={22} color="#fff" />
        <Text style={styles.joinButtonText}>Join Community</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Trending Health Tips</Text>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading health tips...</Text>
        </View>
      ) : (
        <FlatList
          data={healthTips}
          keyExtractor={(item: HealthTip) => item.id}
          renderItem={renderHealthTip}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
            />
          }
          ListHeaderComponent={
            <View style={styles.trendingSection}>
              <Text style={styles.trendingTitle}>Trending Topics</Text>
              <FlatList
                data={trendingTopics}
                keyExtractor={(item: Topic) => item.id}
                renderItem={renderTopic}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.trendingList}
              />
            </View>
          }
          ListFooterComponent={
            <TouchableOpacity style={styles.discussButton}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
              <Text style={styles.discussButtonText}>Start a Discussion</Text>
            </TouchableOpacity>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default DiscoverCommunity;
