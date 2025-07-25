import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useFoodStore } from "@/store/foodStore";
import { useTheme } from "@/constants/ThemeContext";


function makeStyles(colors: any){
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background.main,
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
      color: colors.text.muted,
    },
  });  
}

const foodstore = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState("1");
  const { foods, addFood, removeFood } = useFoodStore();

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
  
  const {colors} = useTheme();
  const styles = makeStyles(colors);

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
                  color={mealType === type ? colors.primary : colors.background.secondary}
                />
              ))}
            </View>
          </View>

          <Button
            title="Add to Food Log"
            onPress={handleAddFood}
            color={colors.primary}
          />
        </View>
      ) : (
        // Food list view
        <View style={styles.listContainer}>
          <View style={{ height: "100%", backgroundColor: colors.background.card }}>
            <Text style={styles.title}>Your Food Log</Text>
          </View>

          {foods.length === 0 ? (
            <Text style={styles.emptyText}>No foods logged yet</Text>
          ) : (
            <FlatList
              data={foods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.foodItem}>
                  {item.image && (
                    <Image
                      source={{
                        uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                      }}
                      style={{ width: 50, height: 50, marginBottom: 10 }}
                    />
                  )}
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Meal: {item.mealType}</Text>
                  <Text>
                    Calories: {item.nutrition?.nutrients[0]?.amount || "N/A"} {item.nutrition?.nutrients[0]?.unit || ""}
                  </Text>
                  <Button
                    title="Remove"
                    onPress={() => handleRemoveFood(item.id)}
                    color={colors.danger}
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
export default foodstore;
