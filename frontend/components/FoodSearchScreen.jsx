import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_KEY = "092d26b35e184825855ea028cbb74f60"; // Replace with your actual API key
const QUERY = "chicken"; // Search term

const FoodSearchScreen = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const url = `https://api.spoonacular.com/food/ingredients/search?query=${QUERY}&number=10&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        setFoods(data.results);
      } catch (error) {
        console.error("Error fetching from Spoonacular:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Spoonacular Results for "{QUERY}"</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>{item.name}</Text>
            {item.image ? (
              <Image style={styles.details}>
                Image: https://spoonacular.com/cdn/ingredients_100x100/{item.image}
              </Image>
            ) : (
              <Text style={styles.details}>No image available</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default FoodSearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  label: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555" },
});
