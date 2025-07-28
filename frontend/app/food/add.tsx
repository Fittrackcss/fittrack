import FoodSearchScreen from "@/components/FoodSearchScreen";
import { useTheme } from "@/constants/ThemeContext";
import { useNutritionStore } from "@/store/nutritionStore";
import { Food } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
      backgroundColor: colors.background.main,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: colors.text.primary,
    },
    resultsContainer: {
      flex: 1,
    },
    emptyContainer: {
      padding: 24,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    initialContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    initialText: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
    },
  });
}

export default function AddFoodScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  const { mealType = "breakfast", date } = useLocalSearchParams();
  const { foods, searchFood, searchResults, addMealEntry } =
    useNutritionStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length > 1) {
      searchFood(searchQuery);
    }
  }, [searchQuery, searchFood]);

  const handleAddFood = (food: Food) => {
    // Check if there's already a meal entry for this meal type and date
    const mealDate = date
      ? new Date(date as string).toISOString()
      : new Date().toISOString();

    addMealEntry({
      date: mealDate,
      mealType: mealType as any,
      foods: [{ foodId: food.id, servings: 1 }],
    });

    router.back();
  };

  return <FoodSearchScreen />;
}
