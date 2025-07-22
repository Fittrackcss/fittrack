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
  { id: "1", name: "Tone up" },
  { id: "2", name: "Bulk up" },
  { id: "3", name: "Get Strong" },
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
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.checked,
            { backgroundColor: isChecked ? colors.background.card : colors.background.main, borderColor: colors.accent },
          ]}
        >
          {isChecked && (
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={20}
              color={colors.primary}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const GoalChoices = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selected = getSelections("goal-choices-screen");
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main }}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text.secondary }]}>Goals</Text>
        <Text style={[styles.headerDesc, { color: colors.text.primary }]}>Select your primary fitness goal</Text>
        <Text style={[styles.sub, { color: colors.text.muted }]}>Select one</Text>
      </View>
      <View style={[styles.container, { backgroundColor: colors.background.main }]}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <GoalItem
              item={item}
              isChecked={selected.includes(item.id)}
              onToggle={(id) =>
                toggleSelection("goal-choices-screen", id, "single")
              }
              colors={colors}
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
    borderRadius: 20,
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
  },
  headerDesc: {
    fontSize: 20,
    fontWeight: "700",
  },
  sub: {
    fontSize: 15,
  },
});
