import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useFoodStore } from "@/store/foodStore";
import { colors } from "@/constants/Colors";

const foodstore = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState("1");
  const { foods, addFood, removeFood } = useFoodStore();

  // Get food data from navigation if coming from search
  const incomingFood = params.foodData ? JSON.parse(params.foodDatauj) : null;
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
    <View style={styles.container}>
      {incomingFood ? (
        // Add new food view
        <View style={styles.addContainer}>
          <Text style={styles.title}>Add {incomingFood.name}</Text>

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
                  color={mealType === type ? "#6F4E37" : "#FFF5E5"}
                />
              ))}
            </View>
          </View>

          <Button
            title="Add to Food Log"
            onPress={handleAddFood}
            color="#ff8e0c"
          />
        </View>
      ) : (
        // Food list view
        <View style={styles.listContainer}>
          <Text style={styles.title}>Your Food Log</Text>

          {foods.length === 0 ? (
            <Text style={styles.emptyText}>No foods logged yet</Text>
          ) : (
            <FlatList
              data={foods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.foodItem}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Meal: {item.mealType}</Text>
                  <Text>
                    Calories: {item.nutrition?.nutrients[0]?.amount || "N/A"}{" "}
                    {item.nutrition?.nutrients[0]?.unit || ""}
                  </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addContainer: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
export default foodstore;
