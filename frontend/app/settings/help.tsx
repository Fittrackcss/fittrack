import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

export default function HelpSupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Please enter your message.");
      return;
    }
    // Here you would send the message to your backend or email service
    Alert.alert("Message sent!", "We'll get back to you at fittrack.org@gmail.com");
    setMessage("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LinearGradient colors={[colors.primary, colors.accent]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Contact Email</Text>
        <TouchableOpacity
          style={styles.emailRow}
          onPress={() => {}}>
          <MaterialCommunityIcons name="email" size={22} color={colors.primary} />
          <Text selectable style={styles.emailText}>fittrack.org@gmail.com</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Send us a message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Describe your issue or question..."
          placeholderTextColor={colors.text.muted}
          multiline
          numberOfLines={5}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text.primary, marginBottom: 12 },
  emailRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 8 },
  emailText: { fontSize: 16, color: colors.primary, fontWeight: "600" },
  input: {
    backgroundColor: colors.background.card, borderRadius: 10, padding: 16,
    fontSize: 15, color: colors.text.primary, minHeight: 100, marginBottom: 16,
    borderWidth: 1, borderColor: colors.divider,
  },
  sendButton: {
    backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14,
    alignItems: "center", marginTop: 8,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
}); 