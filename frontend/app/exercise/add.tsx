import { ExerciseSearchItem } from "@/components/ExerciseSearchItem";
import { colors } from "@/constants/colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { Exercise } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddExerciseScreen() {
  const router = useRouter();
  const { date } = useLocalSearchParams();
  const { exercises, searchExercise, searchResults, addExerciseEntry } =
    useExerciseStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length > 1) {
      searchExercise(searchQuery);
    }
  }, [searchQuery, searchExercise]);

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
        {searchQuery.length > 0 ? (
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
