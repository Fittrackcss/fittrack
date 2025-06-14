import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const InfoCollection = () => {
  const {
    setSex,
    setAge,
    setCountry,
    getSelectedSex,
    formData,
    incrementIndex,
  } = useOnboardingStore();
  const selectedSex = getSelectedSex();
  const [showCountryModal, setShowCountryModal] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Japan",
    "South Korea",
    "Singapore",
    "New Zealand",
    "Switzerland",
    "Austria",
    "Belgium",
    "Ireland",
    "Ghana",
  ];

  const handleBack = () => {
    incrementIndex();
    router.back();
  };

  const handleSexSelection = (sex: "male" | "female") => {
    setSex(sex);
  };

  const handleAgeChange = (text: string) => {
    setAge(text);
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setShowCountryModal(false);
  };
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("info-collection-screen");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sub}>Tell us a little bit about yourself</Text>
        <Text style={styles.label}>
          Please select which sex we should use to calculate your calorie needs:
        </Text>

        <View style={styles.sexOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.sexOption,
              selectedSex === "male" && styles.sexOptionSelected,
            ]}
            onPress={() => handleSexSelection("male")}
          >
            <View style={styles.radio}>
              {selectedSex === "male" && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sexOption,
              selectedSex === "female" && styles.sexOptionSelected,
            ]}
            onPress={() => handleSexSelection("female")}
          >
            <View style={styles.radio}>
              {selectedSex === "female" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hintContainer}>
          <View style={styles.hintIcon}>
            <Text style={styles.hintIconText}>?</Text>
          </View>
          <Text style={styles.hint}>Which one should I choose?</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>How old are you?</Text>
        <TextInput
          style={styles.input}
          value={formData.age || ""}
          onChangeText={handleAgeChange}
          keyboardType="numeric"
          placeholder="Enter your age"
          placeholderTextColor={colors.text.muted}
          cursorColor={colors.primary}
          selectionColor={`${colors.primary}50`}
        />

        <Text style={styles.hint}>
          We need sex at birth and age to calculate an accurate goal for you.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Where do you live?</Text>
        <TouchableOpacity
          style={styles.countryInput}
          onPress={() => setShowCountryModal(true)}
        >
          <Text
            style={[
              styles.countryText,
              !formData.country && { color: colors.text.muted },
            ]}
          >
            {formData.country || "Select country"}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={colors.text.muted}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showCountryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <Pressable onPress={() => setShowCountryModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={colors.text.primary}
                />
              </Pressable>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {countries.map((countryName) => (
                <Pressable
                  key={countryName}
                  style={[
                    styles.countryModalItem,
                    formData.country === countryName &&
                      styles.countryModalItemSelected,
                  ]}
                  onPress={() => handleCountryChange(countryName)}
                >
                  <Text style={styles.countryModalItemText}>{countryName}</Text>
                  {formData.country === countryName && (
                    <MaterialCommunityIcons
                      name="check"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    paddingTop: 50,
    backgroundColor: colors.background.main,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.secondary,
    borderRadius: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sub: {
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.text.muted,
    fontWeight: "600",
  },
  sexOptionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  sexOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sexOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 10,
    padding: 1.5,
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "500",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  hintIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.text.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  hintIconText: {
    color: colors.background.main,
    fontSize: 12,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 14,
    color: colors.text.muted,
    fontStyle: "italic",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: colors.background.main,
    color: colors.text.primary,
  },
  countryInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: colors.background.main,
    color: colors.text.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.background.main,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  modalScrollView: {
    paddingHorizontal: 16,
  },
  countryModalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryModalItemSelected: {
    backgroundColor: colors.background.main,
  },
  countryModalItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
});

export default InfoCollection;
