import { colors } from "@/constants/Colors";
import { useNutritionStore } from "@/store/nutritionStore";
import { Food, MealEntry } from "@/types";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

type MealCardProps = {
  title: string;
  mealType: MealEntry["mealType"];
  date: string;
};

export const MealCard = ({ title, mealType, date }: MealCardProps) => {
  const router = useRouter();
  const { getMealEntriesByDate, foods } = useNutritionStore();

  // Add image URLs for each meal type
  const mealImages: { [key: string]: string } = {
    breakfast: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    lunch: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    dinner: 'https://plus.unsplash.com/premium_photo-1683134512986-5d0b728753e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D', // salad
    snack: 'https://media.istockphoto.com/id/2161423472/photo/healthy-snack-at-work-hand-reaching-for-nuts-on-desk.webp?a=1&b=1&s=612x612&w=0&k=20&c=HBEEbqC5Jaw2-FOdqS0OghcV3Qkj7WaE6lxH5MMbB6Q=', // biscuit
  };

  // Get and filter entries for this date and meal type
  const todayEntries = useMemo(() => {
    return getMealEntriesByDate(date).filter(
      (entry) => entry.mealType === mealType
    );
  }, [date, mealType, getMealEntriesByDate]);

  // Calculate meal foods and total calories
  const { mealFoods, totalCalories } = useMemo(() => {
    const result: Array<{ food: Food; servings: number }> = [];
    let calories = 0;

    todayEntries.forEach((entry) => {
      entry.foods.forEach((foodEntry) => {
        const food = foods.find((f) => f.id === foodEntry.foodId);
        if (food) {
          const foodCalories = (food.calories || 0) * (foodEntry.servings || 0);
          calories += foodCalories;
          result.push({
            food,
            servings: foodEntry.servings,
          });
        }
      });
    });

    return { mealFoods: result, totalCalories: Math.round(calories) };
  }, [todayEntries, foods]);

  const handleAddFood = () => {
    router.push(`/food/add?mealType=${mealType}&date=${date}`);
  };

  return (
    <View style={styles.modernCard}>
      <Image source={{ uri: mealImages[mealType] || mealImages.breakfast }} style={styles.mealImageModern} />
      <View style={styles.headerRowModern}>
        <Text style={styles.cardTitleModern}>{title}</Text>
        <Text style={styles.caloriesModern}>{totalCalories} cal</Text>
      </View>
      {mealFoods.length > 0 ? (
        <View style={styles.foodListModern}>
          {mealFoods.map((item, index) => (
            <View key={`${item.food.id}-${index}`} style={styles.foodItemModern}>
              <View style={styles.foodInfoModern}>
                <Text style={styles.foodNameModern}>{item.food.name}</Text>
                <Text style={styles.foodServingModern}>
                  {item.servings} {item.servings === 1 ? "serving" : "servings"}
                </Text>
              </View>
              <Text style={styles.foodCaloriesModern}>
                {Math.round(item.food.calories * item.servings)} cal
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateModern}>
          <Text style={styles.emptyTextModern}>No foods added yet</Text>
        </View>
      )}
      <TouchableOpacity style={styles.addButtonModern} onPress={handleAddFood}>
        <Plus size={18} color="#fff" />
        <Text style={styles.addButtonTextModern}>Add Food</Text>
      </TouchableOpacity>
    </View>
  );
};

// Keep your existing styles unchanged
const styles = StyleSheet.create({
  modernCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 22,
    marginBottom: 18,
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    alignItems: 'center',
  },
  mealImageModern: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginBottom: -24,
    resizeMode: 'cover',
  },
  headerRowModern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 36,
    marginBottom: 4,
    zIndex: 2,
  },
  cardTitleModern: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  caloriesModern: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  foodListModern: {
    marginBottom: 10,
    paddingHorizontal: 18,
    width: '100%',
  },
  foodItemModern: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  foodInfoModern: {
    flex: 1,
  },
  foodNameModern: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  foodServingModern: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  foodCaloriesModern: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  emptyStateModern: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextModern: {
    fontSize: 14,
    color: colors.text.light,
    textAlign: 'center',
  },
  addButtonModern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 10,
    shadowColor: '#7F9497',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonTextModern: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});
