// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   Image,
// } from "react-native";

// const API_KEY = "092d26b35e184825855ea028cbb74f60"; // Replace with your actual API key
// const QUERY = "fish";

// const FoodSearchScreen = () => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const url = `https://api.spoonacular.com/food/ingredients/search?query=${QUERY}&number=10&apiKey=${API_KEY}`;
//         const response = await fetch(url);
//         const data = await response.json();

//         setFoods(data.results);
//       } catch (error) {
//         console.error("Error fetching from Spoonacular:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFoods();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.heading}>Spoonacular Results for "{QUERY}"</Text> */}
//       <FlatList
//         data={foods}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.label}>{item.name}</Text>
//             {item.image ? (
//               <Image style={styles.details}>
//                 {/* Image: https://spoonacular.com/cdn/ingredients_100x100/
//                 {item.image} */}
//               </Image>
//             ) : (
//               <Text style={styles.details}>No image available</Text>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default FoodSearchScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   item: {
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 8,
//   },
//   label: { fontSize: 18, fontWeight: "bold" },
//   details: { fontSize: 14, color: "#555" },
// });

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/constants/Colors";
import { Button } from "./ui/Button";
import { useRouter } from "expo-router";

const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

const FoodSearchScreen = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // Function to fetch detailed ingredient information like calories etc
  const fetchIngredientDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/${id}/information?amount=100&apiKey=${API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching ingredient details:", error);
      return null;
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchFoods = async () => {
        try {
          setLoading(true);

          // First fetch the basic ingredient search results
          const searchResponse = await fetch(
            `https://api.spoonacular.com/food/ingredients/search?query=${searchTerm}&number=9&apiKey=${API_KEY}`
          );
          const searchData = await searchResponse.json();

          // Then fetch detailed information for each result
          const detailedFoods = await Promise.all(
            searchData.results.map(async (item) => {
              const details = await fetchIngredientDetails(item.id);
              return {
                ...item,
                ...details,
                nutrition: details?.nutrition || null,
              };
            })
          );

          setFoods(detailedFoods || []);
        } catch (error) {
          console.error("Error fetching from Spoonacular:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFoods();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery);
    }
  };
  const handleAdd = () => {
    router.push("/food/foodstore");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for ingredients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          selectionColor={colors.accent}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={foods}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>{item.name}</Text>

                {item.nutrition?.nutrients ? (
                  <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionText}>
                      Calories: {item.nutrition.nutrients[0]?.amount}{" "}
                      {item.nutrition.nutrients[0]?.unit}
                    </Text>
                    <Text style={styles.nutritionText}>
                      Protein: {item.nutrition.nutrients[1]?.amount}g
                    </Text>
                    <Text style={styles.nutritionText}>
                      Carbs: {item.nutrition.nutrients[2]?.amount}g
                    </Text>
                    <Text style={styles.nutritionText}>
                      Fat: {item.nutrition.nutrients[3]?.amount}g
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.details}>
                    Nutrition data not available
                  </Text>
                )}
              </View>
              <View>
                {item.image ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                    }}
                  />
                ) : (
                  <Text style={styles.details}>No image</Text>
                )}

                <TouchableOpacity
                  style={{
                    // height: 30,
                    width: 50,
                    padding: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: colors.primary,
                  }}
                  onPress={handleAdd}
                >
                  <Text>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            !loading && (
              <Text style={styles.emptyText}>
                {searchTerm ? "No results found" : "Search for ingredients"}
              </Text>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.button.primary,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 8,
  },
  nutritionContainer: {
    marginTop: 4,
  },
  nutritionText: {
    fontSize: 14,
    color: colors.text.muted,
    marginBottom: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});

export default FoodSearchScreen;
