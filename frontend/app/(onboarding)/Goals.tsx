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
          borderWidth: 1.5,
          borderColor: colors.primary,
        },
      ]}
    >
      <Text style={styles.itemName}>{item.name}</Text>
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
            isChecked && {
              backgroundColor: "white",
            },
          ]}
        >
          {isChecked && (
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-marked"
                size={20}
                color={colors.primary}
              />
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
);

const Goals = () => {
  const { toggleSelection, getSelections } = useOnboardingStore();
  const selectedGoals = getSelections("goals-screen");
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id: string) => {
    if (!selectedGoals.includes(id) && selectedGoals.length >= 3) {
      setShowModal(true);
      return;
    }
    toggleSelection("goals-screen", id, "multi-max-3");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GoalItem
            item={item}
            isChecked={selectedGoals.includes(item.id)}
            onToggle={handleToggle}
          />
        )}
      />
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message="You can select up to 3 goals. Deselect one to add another."
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
    height: 70,
    width: "100%",
    backgroundColor: colors.secondary,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
  },
  checked: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: "700",
  },
});
