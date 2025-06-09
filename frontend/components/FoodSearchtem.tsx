import { colors } from "@/constants/colors";
import { Food } from "@/types";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FoodSearchItemProps = {
  food: Food;
  onAdd: (food: Food) => void;
};

export const FoodSearchItem = ({ food, onAdd }: FoodSearchItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onAdd(food)}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.brand}>{food.brand}</Text>
        <Text style={styles.serving}>{food.servingSize}</Text>
      </View>
      <View style={styles.nutritionContainer}>
        <Text style={styles.calories}>{food.calories} cal</Text>
        <View style={styles.macrosContainer}>
          <Text style={styles.macro}>C: {food.carbs}g</Text>
          <Text style={styles.macro}>P: {food.protein}g</Text>
          <Text style={styles.macro}>F: {food.fat}g</Text>
        </View>
      </View>
      <View style={styles.addContainer}>
        <Plus size={20} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.background.card,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
  brand: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  serving: {
    fontSize: 12,
    color: colors.text.light,
    marginTop: 2,
  },
  nutritionContainer: {
    marginRight: 16,
    alignItems: "flex-end",
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  macrosContainer: {
    flexDirection: "row",
    marginTop: 4,
    gap: 8,
  },
  macro: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  addContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
});
