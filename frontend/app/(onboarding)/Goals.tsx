import CustomModal from "@/components/ui/CustomModal";
// import { colors } from "@/constants/Colors";
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
            {
              backgroundColor: isChecked ? colors.background.card : colors.background.main,
              borderColor: colors.primary,
            },
          ]}
        >
          {isChecked && (
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={20}
              color={colors.primary}
            />
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
  const { colors } = useTheme();

  const handleToggle = (id: string) => {
    if (!selectedGoals.includes(id) && selectedGoals.length >= 3) {
      setShowModal(true);
      return;
    }
    toggleSelection("goals-screen", id, "multi-max-3");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.main }]}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GoalItem
            item={item}
            isChecked={selectedGoals.includes(item.id)}
            onToggle={handleToggle}
            colors={colors}
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
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
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
});
