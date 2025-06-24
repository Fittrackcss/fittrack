import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from "react-native";

const API_KEY = "092d26b35e184825855ea028cbb74f60";

const FoodSearchScreen = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("chicken"); 
  const [submittedQuery, setSubmittedQuery] = useState("");

  const fetchFoods = async (query) => {
    setLoading(true);
    try {
      const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=10&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setFoods(data.results || []);
      setSubmittedQuery(query);
    } catch (error) {
      console.error("Error fetching from Spoonacular:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(searchTerm); // Initial fetch with default term
  }, []);

  const handleSubmit = () => {
    fetchFoods(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for ingredients..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      ) : (
        <>
          <Text style={styles.heading}>Results for "{submittedQuery}"</Text>
          <FlatList
            data={foods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.label}>{item.name}</Text>
                {item.image ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.details}>No image available</Text>
                )}
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noResults}>No results found</Text>
            }
          />
        </>
      )}
    </View>
  );
};

export default FoodSearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  label: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555" },
  image: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});