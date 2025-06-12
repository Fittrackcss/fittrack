import CustomModal from "@/components/ui/CustomModal";
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
  { id: "1", name: "Tone up" },
  { id: "2", name: "Bulk up" },
  { id: "3", name: "Get Strong" },
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
            <Text style={{ color: "white", fontWeight: "bold" }}><MaterialCommunityIcons name="checkbox-marked-circle" size={20} color={colors.primary} /></Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const GoalChoices = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("goal-choices-screen");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Goals</Text>
        <Text style={styles.headerDesc}>Select your primary fitness goal</Text>
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
                toggleSelection("goal-choices-screen", id, "single")
              }
            />
          )}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 15,
          width: "100%",
        }}
      >
        <CustomFooter
          item="MealPlanning"
          screenId="goal-choices-screen"
          mode="single"
        />
      </View>
    </SafeAreaView>
  );
};

export default GoalChoices;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
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
    borderRadius: 20,
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
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
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
  },
  sub: {
    fontSize: 15,
    color: colors.text.muted,
  },
});
