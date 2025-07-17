import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';

const suggestedFriends = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Maria Lee', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Chris Smith', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
];

const DiscoverFriends = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Friends</Text>
    <Text style={styles.subheader}>Find and connect with friends to share your fitness journey.</Text>
    <TouchableOpacity style={styles.inviteButton}>
      <Ionicons name="person-add" size={20} color="#fff" />
      <Text style={styles.inviteButtonText}>Invite Friends</Text>
    </TouchableOpacity>
    <Text style={styles.sectionTitle}>Suggested Friends</Text>
    <FlatList
      data={suggestedFriends}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.friendItem}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.friendName}>{item.name}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="person-add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      style={{ marginTop: 8 }}
    />
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
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
    marginBottom: 18,
  },
  inviteButtonText: {
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
  friendItem: {
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    padding: 6,
  },
});

export default DiscoverFriends; 