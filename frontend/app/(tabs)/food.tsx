import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useFoodStore } from "@/store/foodStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/constants/ThemeContext";

const foodstore = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState("1");
  const { foods, addFood, removeFood } = useFoodStore();
  const { colors } = useTheme();

  // Get food data from navigation if coming from search
  const incomingFood = params.foodData ? JSON.parse(params.foodData) : null;
  const [mealType, setMealType] = useState(params.mealType || "breakfast");

  const handleAddFood = () => {
    if (!incomingFood) return;

    addFood({
      id: incomingFood.id,
      name: incomingFood.name,
      image: incomingFood.image,
      nutrition: incomingFood.nutrition,
      quantity: parseInt(quantity) || 1,
      mealType: mealType as string,
    });

    router.back();
  };

  const handleRemoveFood = (id: number) => {
    removeFood(id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.main }]}>
      {incomingFood ? (
        // Add new food view
        <View style={styles.addContainer}>
          <Text style={[styles.title, { color: colors.accent }]}>Add {incomingFood.name}</Text>

          {incomingFood.image && (
            <Image
              source={{ uri: incomingFood.image }}
              style={styles.foodImageLarge}
              resizeMode="contain"
            />
          )}

          <View style={styles.inputGroup}>
            <Text>Quantity:</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Meal Type:</Text>
            <View style={styles.mealTypeContainer}>
              {["breakfast", "lunch", "dinner", "snack"].map((type) => (
                <Button
                  key={type}
                  title={type}
                  onPress={() => setMealType(type)}
                  color={mealType === type ? "#4CAF50" : "#CCCCCC"}
                />
              ))}
            </View>
          </View>

          <Button
            title="Add to Food Log"
            onPress={handleAddFood}
            color="#4CAF50"
          />
        </View>
      ) : (
        // Food list view
        <View style={styles.listContainer}>
          <View
            style={{
              height: "auto",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: colors.background.secondary,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={[styles.title, { color: colors.accent }]}>Your Food Log</Text>
          </View>

          {foods.length === 0 ? (
            <Text style={styles.emptyText}>No foods logged yet</Text>
          ) : (
            <FlatList
              data={foods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={[styles.foodItem, { backgroundColor: colors.background.card }]}>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.foodImage}
                      resizeMode="contain"
                    />
                  )}
                  <View style={styles.foodDetails}>
                    <Text style={[styles.foodName, { color: colors.primary }]}>{item.name}</Text>
                    <Text style={{ color: colors.text.muted }}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={{ color: colors.text.muted }}>
                      Meal: {item.mealType}
                    </Text>
                    <Text style={{ color: colors.text.muted }}>
                      Calories: {item.nutrition?.nutrients[0]?.amount || "N/A"}{" "}
                      {item.nutrition?.nutrients[0]?.unit || ""}
                    </Text>
                  </View>
                  <Button
                    title="Remove"
                    onPress={() => handleRemoveFood(item.id)}
                    color="#FF5252"
                  />
                </View>
              )}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addContainer: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  mealTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
  },
  foodDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  foodImageLarge: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default foodstore;
