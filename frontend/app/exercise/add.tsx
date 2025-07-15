// import { ExerciseSearchItem } from "@/components/ExerciseSearchItem";
// import { colors } from "@/constants/Colors";
// import { useExerciseStore } from "@/store/exerciseStore";
// import { Exercise } from "@/types";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Search } from "lucide-react-native";
// import React, { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

// export default function AddExerciseScreen() {
//   const router = useRouter();
//   const { date } = useLocalSearchParams();
//   const { exercises, searchExercise, searchResults, addExerciseEntry } =
//     useExerciseStore();

//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (searchQuery.length > 1) {
//       searchExercise(searchQuery);
//     }
//   }, [searchQuery, searchExercise]);

//   const handleAddExercise = (exercise: Exercise) => {
//     const exerciseDate = date
//       ? new Date(date as string).toISOString()
//       : new Date().toISOString();

//     addExerciseEntry({
//       date: exerciseDate,
//       exerciseId: exercise.id,
//       duration: 30, // Default duration
//     });

//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Search
//           size={20}
//           color={colors.text.secondary}
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search exercises..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           autoFocus
//           returnKeyType="search"
//         />
//       </View>

//       <View style={styles.resultsContainer}>
//         {searchQuery.length > 0 ? (
//           <FlatList
//             data={searchResults}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <ExerciseSearchItem exercise={item} onAdd={handleAddExercise} />
//             )}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Text style={styles.emptyText}>No exercises found</Text>
//               </View>
//             }
//           />
//         ) : (
//           <View style={styles.initialContainer}>
//             <Text style={styles.initialText}>
//               Search for exercises to add to your workout
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background.main,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.divider,
//     backgroundColor: colors.background.main,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//     color: colors.text.primary,
//   },
//   resultsContainer: {
//     flex: 1,
//   },
//   emptyContainer: {
//     padding: 24,
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 16,
//     color: colors.text.secondary,
//   },
//   initialContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   initialText: {
//     fontSize: 16,
//     color: colors.text.secondary,
//     textAlign: "center",
//   },
// });

import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { Exercise } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { ExerciseSearchItem } from "@/components/ExerciseSearchItem";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddExerciseScreen() {
  const router = useRouter();
  const { date } = useLocalSearchParams();
  const { exercises, searchExercise, searchResults, addExerciseEntry } =
    useExerciseStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "8d20b8334a854f338d0f7687407e46c0";

  useEffect(() => {
    const fetchExercises = async () => {
      if (searchQuery.length > 1) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.spoonacular.com/food/exercises/search?query=${searchQuery}&apiKey=${API_KEY}`
          );
          const data = await response.json();
          const transformedExercises = data.exercises.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            category: item.equipment || "general",
            caloriesBurnedPerMinute: item.caloriesPerMinute || 5, // Default value if not provided
          }));
          searchExercise(transformedExercises);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchExercises();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleAddExercise = (exercise: Exercise) => {
    const exerciseDate = date
      ? new Date(date as string).toISOString()
      : new Date().toISOString();

    addExerciseEntry({
      date: exerciseDate,
      exerciseId: exercise.id,
      duration: 30, // Default duration
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search
          size={20}
          color={colors.text.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
          returnKeyType="search"
        />
      </View>

      <View style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Loading...</Text>
          </View>
        ) : searchQuery.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseSearchItem exercise={item} onAdd={handleAddExercise} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No exercises found</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>
              Search for exercises to add to your workout
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Keep the same styles object as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.background.main,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.text.primary,
  },
  resultsContainer: {
    flex: 1,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  initialContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  initialText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
