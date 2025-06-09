import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/constants/colors";
import { useNutritionStore } from "@/store/nutritionStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FoodDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { foods, addMealEntry } = useNutritionStore();

  const food = foods.find((f) => f.id === id);
  const [servings, setServings] = useState("1");
  const [mealType, setMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snack"
  >("breakfast");

  if (!food) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Food not found</Text>
      </View>
    );
  }

  const servingsNum = parseFloat(servings) || 1;

  const handleAddFood = () => {
    addMealEntry({
      date: new Date().toISOString(),
      mealType,
      foods: [{ foodId: food.id, servings: servingsNum }],
    });

    router.back();
  };

  const MealTypeButton = ({
    type,
    label,
  }: {
    type: typeof mealType;
    label: string;
  }) => (
    <Button
      title={label}
      variant={mealType === type ? "primary" : "outline"}
      size="small"
      onPress={() => setMealType(type)}
      style={styles.mealTypeButton}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodBrand}>{food.brand}</Text>
        <Text style={styles.foodServing}>{food.servingSize}</Text>
      </View>

      <View style={styles.nutritionContainer}>
        <View style={styles.calorieContainer}>
          <Text style={styles.calorieValue}>
            {Math.round(food.calories * servingsNum)}
          </Text>
          <Text style={styles.calorieLabel}>calories</Text>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>
              {(food.protein * servingsNum).toFixed(1)}g
            </Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>

          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>
              {(food.carbs * servingsNum).toFixed(1)}g
            </Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>

          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>
              {(food.fat * servingsNum).toFixed(1)}g
            </Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add to Meal</Text>

        <Input
          label="Number of Servings"
          value={servings}
          onChangeText={setServings}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Meal</Text>
        <View style={styles.mealTypeContainer}>
          <MealTypeButton type="breakfast" label="Breakfast" />
          <MealTypeButton type="lunch" label="Lunch" />
          <MealTypeButton type="dinner" label="Dinner" />
          <MealTypeButton type="snack" label="Snack" />
        </View>

        <Button
          title="Add to Diary"
          onPress={handleAddFood}
          style={styles.addButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 4,
  },
  foodBrand: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  foodServing: {
    fontSize: 14,
    color: colors.text.light,
  },
  nutritionContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  calorieContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  calorieLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  macroLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  formContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  mealTypeButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    padding: 24,
  },
});
