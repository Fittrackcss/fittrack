import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

const fetchRecipes = async (query = "chicken") => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&addRecipeInformation=true&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
};

type Recipe = {
  id: number;
  title: string;
  image: string;
  summary?: string;
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <View style={styles.card}>
    <Image source={{ uri: recipe.image }} style={styles.image} />
    <Text style={styles.title}>{recipe.title}</Text>
    <Text style={styles.summary} numberOfLines={2}>{recipe.summary?.replace(/<[^>]+>/g, '')}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>View Recipe</Text>
    </TouchableOpacity>
  </View>
);

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    setLoading(true);
    fetchRecipes(query).then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, [query]);

  const handleSearch = () => {
    if (search.trim()) setQuery(search.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Recipes</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          selectionColor={colors.primary}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.background.card || "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flex: 1,
    alignItems: "center",
    shadowColor: "#7F9497",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 150,
    maxWidth: "48%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  summary: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    padding: 8,
    backgroundColor: "transparent",
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default RecipesPage; 