import CustomModal from "@/components/ui/CustomModal";
import { colors } from "@/constants/Colors";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFooter from "@/components/ui/CustomFooter";

const data = [
  { id: "1", name: "Never" },
  { id: "2", name: "Rarely" },
  { id: "3", name: "Occasionally" },
  { id: "4", name: "Frequently" },
  { id: "5", name: "Always" },
];

const GoalItem = React.memo(
  ({
    item,
    isChecked,
    onToggle,
  }: {
    item: { id: string; name: string };
    isChecked: boolean;
    onToggle: (id: string) => void;
  }) => (
    <View
      style={[
        styles.item,
        isChecked && {
          borderWidth: 2,
          borderColor: colors.primary,
        },
      ]}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={[
            styles.checked,
            isChecked && { backgroundColor: colors.primary },
          ]}
        >
          {isChecked && (
            <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const MealPlanning = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("meal-planning-screen");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Goals</Text>
        <Text style={styles.headerDesc}>
          How often do you plan your meals in advance
        </Text>
        <Text style={styles.sub}>Select one</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <GoalItem
              item={item}
              isChecked={selected.includes(item.id)}
              onToggle={(id) =>
                toggleSelection("meal-planning-screen", id, "single")
              }
            />
          )}
        />
      </View>
      <CustomFooter item="InfoCollection" screenId="meal-planning-screen" />
    </SafeAreaView>
  );
};

export default MealPlanning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    width: "100%",
    backgroundColor: colors.secondary,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  checked: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: "700",
  },
  header: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  headerDesc: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 10,
  },
  sub: {
    fontSize: 15,
    color: colors.text.muted,
  },
});
