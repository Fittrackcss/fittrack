import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput, Alert, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts'; // Make sure expo-contacts is installed

const suggestedFriends = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Maria Lee', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Chris Smith', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
];

const DiscoverFriends = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleInviteByEmail = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setSending(true);
    const subject = encodeURIComponent('Join me on FitTrack!');
    const body = encodeURIComponent('Hey! I am using FitTrack to track my fitness journey. Join me and let\'s get fit together!');
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;
    await Linking.openURL(mailto);
    setSending(false);
    setModalVisible(false);
    setEmail('');
  };

  const handleInviteFromContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your contacts.');
      return;
    }
    const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.Emails] });
    if (data.length === 0) {
      Alert.alert('No contacts found', 'You have no contacts with email addresses.');
      return;
    }
    // Pick the first contact with an email for demo purposes
    const contact = data.find((c: Contacts.Contact) => c.emails && c.emails.length > 0);
    if (!contact) {
      Alert.alert('No contacts with email', 'None of your contacts have email addresses.');
      return;
    }
    const contactEmail = contact.emails && contact.emails[0]?.email;
    if (!contactEmail) {
      Alert.alert('No email found', 'Selected contact does not have an email address.');
      return;
    }
    const subject = encodeURIComponent('Join me on FitTrack!');
    const body = encodeURIComponent(`Hey ${contact.name || ''}! I am using FitTrack to track my fitness journey. Join me and let\'s get fit together!`);
    const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    await Linking.openURL(mailto);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      <Text style={styles.subheader}>Find and connect with friends to share your fitness journey.</Text>
      <TouchableOpacity style={styles.inviteButton} onPress={() => setModalVisible(true)}>
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
      {/* Invite Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite a Friend</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleInviteFromContacts}>
              <Ionicons name="people" size={22} color={colors.primary} style={{ marginRight: 10 }} />
              <Text style={styles.modalOptionText}>Invite from Contacts</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text style={styles.modalLabel}>Invite by Email</Text>
            <View style={styles.emailRow}>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleInviteByEmail} disabled={sending}>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 18,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
    marginBottom: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.background.card,
    marginVertical: 14,
  },
  modalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.background.card,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: colors.background.secondary,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 8,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DiscoverFriends; 