import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const RAPIDAPI_KEY = "1da1935727msh98758fdefa3e542p16676djsn53ef7394e79a";
const RAPIDAPI_HOST = "exercisedb.p.rapidapi.com";

const fetchExercises = async (query: string) => {
  let url = "https://exercisedb.p.rapidapi.com/exercises";
  if (query) {
    url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(
      query
    )}`;
  }
  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
  });
  const data = await res.json();
  // The API returns an array of exercises
  console.log(data);
  return Array.isArray(data) ? data : [];
};

type Exercise = {
  id: string;
  name: string;
  bodyPart?: string;
  equipment?: string;
  target?: string;
  gifUrl?: string;
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
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 4,
      textAlign: "center",
    },
    category: {
      fontSize: 13,
      color: colors.primary,
      marginBottom: 4,
      textAlign: "center",
    },
    description: {
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
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.accent,
      backgroundColor: "transparent",
    },
    searchButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      height: 50,
      justifyContent: "center",
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

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.category}>
        {exercise.bodyPart || exercise.target || "General"}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {exercise.equipment ? `Equipment: ${exercise.equipment}` : ""}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

const ExercisesPage = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchExercises(query).then((data) => {
      setExercises(data);
      setLoading(false);
    });
  }, [query]);

  const handleSearch = () => {
    setQuery(search.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: colors.background.secondary,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text style={styles.header}>Discover Workouts</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
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
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default ExercisesPage;
