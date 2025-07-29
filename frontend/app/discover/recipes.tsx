import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

const fetchFoods = async (query = "chicken") => {
  const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=12&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
};

type Food = {
  id: number;
  name: string;
  image: string;
};

function makeStyles(colors: any) {
  return StyleSheet.create({
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
      backgroundColor: colors.background.card,
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
      padding: 10,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
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
}

const FoodCard = ({ food }: { food: Food }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://spoonacular.com/cdn/ingredients_100x100/${food.image}`,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{food.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/food/recipe",
            params: { food: JSON.stringify(food) },
          })
        }
      >
        <Text style={styles.buttonText}>View Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const RecipesPage = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    setLoading(true);
    fetchFoods(query).then((data) => {
      setFoods(data);
      setLoading(false);
    });
  }, [query]);

  const handleSearch = () => {
    if (search.trim()) setQuery(search.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Foods</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search foods..."
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
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FoodCard food={item} />}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default RecipesPage;
