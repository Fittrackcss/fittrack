import CustomModal from "@/components/CustomModal";
import { colors } from "@/constants/colors";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const data = [
  { id: "1", name: "Lose Weight" },
  { id: "2", name: "Maintain Weight" },
  { id: "3", name: "Gain Weight" },
  { id: "4", name: "Gain Muscle" },
  { id: "5", name: "Modify My Diet" },
  { id: "6", name: "Plan Meals" },
  { id: "7", name: "Manage Stress" },
  { id: "8", name: "Stay Active" },
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

const Goals = () => {
  const selectedGoals = useOnboardingStore((state) => state.selectedGoals);
  const toggleGoalInStore = useOnboardingStore((state) => state.toggleGoal);
  const [showModal, setShowModal] = useState(false);

  const toggleGoal = (id: string) => {
    if (!selectedGoals.includes(id) && selectedGoals.length >= 3) {
      setShowModal(true);
      return;
    }
    toggleGoalInStore(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalItem
            item={item}
            isChecked={selectedGoals.includes(item.id)}
            onToggle={toggleGoal}
          />
        )}
      />
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message="You can only select up to 3 goals. To change, deselect a previous one."
      />
    </View>
  );
};

export default Goals;

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
    color: colors.text.primary,
    fontWeight: "700",
  },
});
