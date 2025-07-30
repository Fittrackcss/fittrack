import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/constants/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFoodStore } from "@/store/foodStore";
import CustomModal from "@/components/ui/CustomModal";

const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
      padding: 24,
    },
    card: {
      width: "100%",
      backgroundColor: colors.background.card,
      borderRadius: 22,
      padding: 24,
      alignItems: "center",
      shadowColor: "#7F9497",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
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
      flexDirection: "row",
      alignItems: "center",
      marginTop: 18,
      marginBottom: 2,
      alignSelf: "flex-start",
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
      alignSelf: "flex-start",
    },
    summaryBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 16,
      width: "100%",
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
      width: "100%",
    },
    goBackBtn: {
      marginTop: 12,
      width: "100%",
    },
  });
}

export default function FoodRecipePage() {
  const { colors } = useTheme();
  const { addFood } = useFoodStore();
  const router = useRouter();
  const { food } = useLocalSearchParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Memoize food data parsing
  const foodData = useMemo(() => {
    if (!food) return null;
    try {
      return JSON.parse(food as string);
    } catch {
      return null;
    }
  }, [food]);

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Memoize styles to prevent recreation on every render
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // Fetch recipe only when foodData.id changes
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!foodData?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
            foodData.name
          )}&number=1&apiKey=${API_KEY}`
        );
        const data = await res.json();
        if (data?.length > 0) {
          const recipeRes = await fetch(
            `https://api.spoonacular.com/recipes/${data[0].id}/information?apiKey=${API_KEY}`
          );
          const recipeData = await recipeRes.json();
          setRecipe(recipeData);
        } else {
          setRecipe(null);
        }
      } catch (e) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [foodData?.id]);

  // Memoize the add handler
  const handleAdd = useCallback(() => {
    if (!foodData) return;
    addFood({
      id: foodData.id,
      name: foodData.name,
      image: foodData.image,
      nutrition: foodData.nutrition || null,
      quantity: 1,
      mealType: "breakfast",
    });
    setShowSuccessModal(true);
    setSuccessMessage(`${foodData.name} added to your food log.`);
  }, [foodData, addFood]);

  // Memoize derived values
  const imageUrl = useMemo(
    () =>
      foodData?.image
        ? `https://spoonacular.com/cdn/ingredients_100x100/${foodData.image}`
        : null,
    [foodData?.image]
  );

  const title = useMemo(() => foodData?.name || "Food", [foodData?.name]);
  const summary = useMemo(
    () =>
      recipe?.summary?.replace(/<[^>]+>/g, "") ||
      "No recipe summary available.",
    [recipe?.summary]
  );

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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        <View style={styles.card}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.labelRow}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={20}
              color={colors.primary}
              style={styles.labelIcon}
            />
            <Text style={styles.label}>Recipe:</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
          <Button
            title="Add to Food Log"
            onPress={handleAdd}
            style={styles.addBtn}
          />
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.goBackBtn}
          />
        </View>
      </ScrollView>
      <CustomModal
        visible={showSuccessModal}
        title="Added!"
        message={successMessage}
        type="success"
        onClose={() => {
          setShowSuccessModal(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
