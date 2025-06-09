import { colors } from "@/constants/colors";
import { useNutritionStore } from "@/store/nutritionStore";
import { Food, MealEntry } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MealCardProps = {
  title: string;
  mealType: MealEntry["mealType"];
  date: string;
};

export const MealCard = ({ title, mealType, date }: MealCardProps) => {
  const router = useRouter();
  const { foods, mealEntries } = useNutritionStore();

  const todayEntries = mealEntries.filter(
    (entry) =>
      entry.mealType === mealType &&
      new Date(entry.date).toISOString().split("T")[0] ===
        new Date(date).toISOString().split("T")[0]
  );

  const mealFoods: Array<{ food: Food; servings: number }> = [];

  todayEntries.forEach((entry) => {
    entry.foods.forEach((foodEntry) => {
      const food = foods.find((f) => f.id === foodEntry.foodId);
      if (food) {
        mealFoods.push({
          food,
          servings: foodEntry.servings,
        });
      }
    });
  });

  const totalCalories = mealFoods.reduce(
    (sum, item) => sum + item.food.calories * item.servings,
    0
  );

  const handleAddFood = () => {
    router.push(`/food/add?mealType=${mealType}&date=${date}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.calories}>{totalCalories} cal</Text>
      </View>

      {mealFoods.length > 0 ? (
        <View style={styles.foodList}>
          {mealFoods.map((item, index) => (
            <View key={`${item.food.id}-${index}`} style={styles.foodItem}>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.food.name}</Text>
                <Text style={styles.foodServing}>
                  {item.servings} {item.servings === 1 ? "serving" : "servings"}
                </Text>
              </View>
              <Text style={styles.foodCalories}>
                {Math.round(item.food.calories * item.servings)} cal
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No foods added yet</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <Plus size={16} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  foodList: {
    marginBottom: 12,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    color: colors.text.primary,
  },
  foodServing: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  foodCalories: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  emptyState: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.light,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    marginLeft: 4,
  },
});
