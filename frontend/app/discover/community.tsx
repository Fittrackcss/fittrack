import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const trendingTopics = [
  { id: '1', topic: 'Best Home Workouts' },
  { id: '2', topic: 'Healthy Meal Prep' },
  { id: '3', topic: 'Motivation Monday' },
];

const DiscoverCommunity = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Community</Text>
    <Text style={styles.subheader}>Join the community to share, learn, and grow together.</Text>
    <TouchableOpacity style={styles.joinButton}>
      <MaterialCommunityIcons name="account-group" size={22} color="#fff" />
      <Text style={styles.joinButtonText}>Join Community</Text>
    </TouchableOpacity>
    <Text style={styles.sectionTitle}>Trending Topics</Text>
    <FlatList
      data={trendingTopics}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.topicItem}>
          <Ionicons name="flame" size={18} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.topicText}>{item.topic}</Text>
        </View>
      )}
      style={{ marginTop: 8 }}
    />
    <TouchableOpacity style={styles.discussButton}>
      <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
      <Text style={styles.discussButtonText}>Start a Discussion</Text>
    </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
    marginBottom: 18,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    marginTop: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  topicText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  discussButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
    marginTop: 18,
  },
  discussButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default DiscoverCommunity; 