import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/constants/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFoodStore } from "@/store/foodStore";

const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      padding: 24,
    },
    card: {
      width: '100%',
      backgroundColor: colors.background.card,
      borderRadius: 22,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#7F9497',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 24,
    },
    image: {
      width: 220,
      height: 220,
      borderRadius: 18,
      marginBottom: 18,
      backgroundColor: "#f0f0f0",
      borderWidth: 4,
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 6,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10,
      textAlign: "center",
      letterSpacing: 1,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      marginBottom: 2,
      alignSelf: 'flex-start',
    },
    labelIcon: {
      marginRight: 8,
    },
    label: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text.primary,
      textAlign: "left",
    },
    value: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "left",
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    summaryBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 16,
      width: '100%',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    summaryText: {
      fontSize: 15,
      color: colors.text.primary,
      lineHeight: 22,
    },
    addBtn: {
      marginTop: 18,
      width: '100%',
    },
    goBackBtn: {
      marginTop: 12,
      width: '100%',
    },
  });
}

export default function FoodRecipePage() {
  const { food } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addFood } = useFoodStore();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // Parse food data from params
  let foodData: any = null;
  if (food) {
    try {
      foodData = JSON.parse(food as string);
    } catch {}
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        if (foodData?.id) {
          // Try to fetch a recipe for this ingredient
          const res = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(foodData.name)}&number=1&apiKey=${API_KEY}`
          );
          const data = await res.json();
          if (data && data.length > 0) {
            // Fetch full recipe info
            const recipeRes = await fetch(
              `https://api.spoonacular.com/recipes/${data[0].id}/information?apiKey=${API_KEY}`
            );
            const recipeData = await recipeRes.json();
            setRecipe(recipeData);
          } else {
            setRecipe(null);
          }
        }
      } catch (e) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    if (foodData?.id) fetchRecipe();
    else setLoading(false);
  }, [foodData]);

  const handleAdd = () => {
    if (!foodData) return;
    addFood({
      id: foodData.id,
      name: foodData.name,
      image: foodData.image,
      nutrition: foodData.nutrition || null,
      quantity: 1,
      mealType: "breakfast",
    });
    Alert.alert("Added!", `${foodData.name} added to your food log.`);
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!foodData) {
    return (
      <View style={styles.card}>
        <Text>No food data available.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const imageUrl = foodData?.image ? `https://spoonacular.com/cdn/ingredients_100x100/${foodData.image}` : null;
  const title = foodData?.name || "Food";
  const summary = recipe?.summary || "No recipe summary available.";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.card}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="book-open-variant" size={20} color={colors.primary} style={styles.labelIcon} />
          <Text style={styles.label}>Recipe:</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{summary.replace(/<[^>]+>/g, "")}</Text>
        </View>
        <Button title="Add to Food Log" onPress={handleAdd} style={styles.addBtn} />
        <Button title="Go Back" onPress={() => router.back()} style={styles.goBackBtn} />
      </View>
    </SafeAreaView>
  );
} 