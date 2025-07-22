import CustomModal from "@/components/ui/CustomModal";
import { useTheme } from "@/constants/ThemeContext";
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
    colors,
  }: {
    item: { id: string; name: string };
    isChecked: boolean;
    onToggle: (id: string) => void;
    colors: any;
  }) => (
    <View
      style={[
        styles.item,
        { backgroundColor: colors.secondary },
        isChecked && {
          borderWidth: 1.5,
          borderColor: colors.primary,
        },
      ]}
    >
      <Text style={[styles.itemName, { color: colors.text.secondary }]}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={[
            styles.checked,
            {
              backgroundColor: isChecked ? colors.background.card : colors.background.main,
              borderColor: colors.accent,
            },
          ]}
        >
          {isChecked && (
            <MaterialCommunityIcons name="checkbox-marked" size={20} color={colors.primary} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const NextGoals = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("barriers-screen");
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main }}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text.primary }]}>Goals</Text>
        <Text style={[styles.headerDesc, { color: colors.text.primary }]}>
          In the past, what have been your barriers to maintaining weight?
        </Text>
        <Text style={[styles.sub, { color: colors.text.muted }]}>Select all that apply</Text>
      </View>
      <View style={[styles.container, { backgroundColor: colors.background.main }]}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GoalItem
              item={item}
              isChecked={selected.includes(item.id)}
              onToggle={(id) => toggleSelection("barriers-screen", id, "multi")}
              colors={colors}
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
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  checked: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
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
    marginBottom: 30,
  },
  headerDesc: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  sub: {
    fontSize: 15,
    fontWeight: 800,
  },
});
