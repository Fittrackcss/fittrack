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
import { useTheme } from "@/constants/ThemeContext";
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
    updateFormData,
    incrementIndex,
  } = useOnboardingStore();
  const selectedSex = getSelectedSex();
  const [showCountryModal, setShowCountryModal] = useState(false);
  const { colors } = useTheme();

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
    updateFormData({ age: text });
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    updateFormData({ country: selectedCountry });
    setShowCountryModal(false);
  };
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("info-collection-screen");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.main }]}>
      <View style={styles.section}>
        <Text style={[styles.sub, { color: colors.text.primary }]}>Tell us a little bit about yourself</Text>
        <Text style={[styles.label, { color: colors.text.primary }]}>
          Please select which sex we should use to calculate your calorie needs:
        </Text>

        <View style={styles.sexOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.sexOption,
              { backgroundColor: colors.background.secondary, borderColor: colors.border },
              selectedSex === "male" && { borderColor: colors.primary, borderWidth: 2 },
            ]}
            onPress={() => handleSexSelection("male")}
          >
            <View style={[styles.radio, { borderColor: colors.primary }]}>
              {selectedSex === "male" && <View style={[styles.radioSelected, { backgroundColor: colors.primary }]} />}
            </View>
            <Text style={[styles.optionText, { color: colors.text.primary }]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sexOption,
              { backgroundColor: colors.background.secondary, borderColor: colors.border },
              selectedSex === "female" && { borderColor: colors.primary, borderWidth: 2 },
            ]}
            onPress={() => handleSexSelection("female")}
          >
            <View style={[styles.radio, { borderColor: colors.primary }]}>
              {selectedSex === "female" && <View style={[styles.radioSelected, { backgroundColor: colors.primary }]} />}
            </View>
            <Text style={[styles.optionText, { color: colors.text.primary }]}>Female</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hintContainer}>
          <View style={[styles.hintIcon, { backgroundColor: colors.primary }]}>
            <Text style={[styles.hintIconText, { color: colors.background.main }]}>i</Text>
          </View>
          <Text style={[styles.hint, { color: colors.text.muted }]}>Which one should I choose?</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.text.primary }]}>How old are you?</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.background.main, color: colors.text.primary, borderColor: colors.border, borderWidth: 2, }
          ]}
          value={formData.age || ""}
          onChangeText={handleAgeChange}
          keyboardType="numeric"
          placeholder="Enter your age"
          placeholderTextColor={colors.text.muted}
          cursorColor={colors.primary}
          selectionColor={`${colors.primary}50`}
        />

        <Text style={[styles.hint, { color: colors.text.muted }]}>
          We need sex at birth and age to calculate an accurate goal for you.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: colors.text.primary }]}>Where do you live?</Text>
        <TouchableOpacity
          style={[
            styles.countryInput,
            { backgroundColor: colors.background.main, borderColor: colors.border, borderWidth: 2 }
          ]}
          onPress={() => setShowCountryModal(true)}
        >
          <Text
            style={[
              styles.countryText,
              { color: formData.country ? colors.text.primary : colors.text.muted },
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
          <View style={[styles.modalContent, { backgroundColor: colors.background.main }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Select Country</Text>
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
                      [styles.countryModalItemSelected, { backgroundColor: colors.background.main }],
                  ]}
                  onPress={() => handleCountryChange(countryName)}
                >
                  <Text style={[styles.countryModalItemText, { color: colors.text.primary }]}>{countryName}</Text>
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
    // paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sub: {
    fontSize: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
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
  },
  sexOptionSelected: {
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    padding: 1.5,
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionText: {
    fontSize: 16,
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  hintIconText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 12,
  },
  input: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  countryInput: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalScrollView: {
    paddingHorizontal: 16,
  },
  countryModalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryModalItemSelected: {
  },
  countryModalItemText: {
    fontSize: 16,
  },
});

export default InfoCollection;
