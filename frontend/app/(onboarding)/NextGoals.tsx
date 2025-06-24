import { colors } from "@/constants/Colors";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  { id: "1", name: "Lack of time" },
  { id: "2", name: "Healthy diets lack variety" },
  { id: "3", name: "Stress around food choices" },
  { id: "4", name: "Food cravings" },
  { id: "5", name: "Troubles cooking" },
  { id: "6", name: "Lack of progress" },
  { id: "7", name: "Holidays/Vacations" },
  { id: "8", name: "No experience barriers" },
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
          borderWidth: 1.5,
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
            isChecked && { backgroundColor: 'white' },
          ]}
        >
          {isChecked && (
            <Text style={{ color: "white", fontWeight: "bold" }}><MaterialCommunityIcons name="checkbox-marked" size={20} color={colors.primary} /></Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const NextGoals = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("barriers-screen");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Goals</Text>
        <Text style={styles.headerDesc}>
          In the past, what have been your barriers to maintaining weight?
        </Text>
        <Text style={styles.sub}>Select all that apply</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GoalItem
              item={item}
              isChecked={selected.includes(item.id)}
              onToggle={(id) => toggleSelection("barriers-screen", id, "multi")}
            />
          )}
        />
      </View>
      <CustomFooter
        item="GoalChoices"
        screenId="goal-choices-screen"
        mode="multi"
      />
    </SafeAreaView>
  );
};

export default NextGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
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
    backgroundColor: 'white',
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
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: 'black',
    marginBottom: 30,
  },
  headerDesc: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 5,
  },
  sub: {
    fontSize: 15,
    fontWeight: 800,
    color: colors.text.muted,
  },
});
