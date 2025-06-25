import { DateSelector } from "@/components/DateSelector";
import { ExerciseCard } from "@/components/ExerciseCard";
import { colors } from "@/constants/Colors";
import { useExerciseStore } from "@/store/exerciseStore";
import { useRouter } from "expo-router";
import { Plus, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MealCard } from "@/components/MealCard";

export default function ExerciseScreen() {
  const router = useRouter();
  const { searchExercise, searchResults } = useExerciseStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchExercise(searchQuery);
    }
  }, [searchQuery, searchExercise]);

  const renderExerciseCard = () => (
    <View style={styles.exerciseContainer}>
      <ExerciseCard date={selectedDate.toISOString()} />
    </View>
  );

  const renderSearchResults = () => (
    <View style={styles.searchResultsContainer}>
      <Text style={styles.searchResultsTitle}>
        {searchResults.length > 0
          ? `Found ${searchResults.length} results`
          : "No results found"}
      </Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.searchResultItem}
            onPress={() => router.push(`/exercise/detail?id=${item.id}`)}
          >
            <View>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseCategory}>{item.category}</Text>
            </View>
            <Text style={styles.exerciseCalories}>
              {item.caloriesBurnedPerMinute} cal/min
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.searchResultsList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
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
            onFocus={() => setIsSearching(true)}
            returnKeyType="search"
          />
        </View>
        {isSearching && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setIsSearching(false);
              setSearchQuery("");
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {!isSearching ? (
        <>
          <DateSelector date={selectedDate} onDateChange={setSelectedDate} />
          {renderExerciseCard()}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              router.push(`/exercise/add?date=${selectedDate.toISOString()}`)
            }
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        renderSearchResults()
      )}

      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', backgroundColor:colors.secondary,}}>

       <MealCard
            title="Breakfast"
            mealType="breakfast"
            date={selectedDate.toISOString()}
          />
          <MealCard
            title="Lunch"
            mealType="lunch"
            date={selectedDate.toISOString()}
          />
          <MealCard
            title="Dinner"
            mealType="dinner"
            date={selectedDate.toISOString()}
          />
          <MealCard
            title="Snacks"
            mealType="snack"
            date={selectedDate.toISOString()}
          />
      </View>

      

{/* Tab at the top */}
      </ScrollView>
      <View style={styles.tab}>

        <View style={{ flexDirection: 'row', marginTop:20}}>

          <TouchableOpacity>
            
          <MaterialCommunityIcons
            style={{ marginTop: 15 }}
            name="chevron-left"
            size={28}
            color={"black"}
          />
          </TouchableOpacity>
          <TouchableOpacity>

          <Text style={{fontWeight:'bold', fontSize:24, marginLeft:20, marginTop:13}}>Diary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
   
  },
   tab: {
    position: "absolute",
    bottom: "auto",
    marginBottom: 10,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",

    // Shadow properties
    shadowColor: "#7F9497",
    shadowOffset: {
      width: 0,
      height: -3, // Negative value to put shadow above the tab
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10, // For Android

    // Optional styling
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
        marginTop:125
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
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
  cancelButton: {
    marginLeft: 12,
  },
  cancelButtonText: {
    color: colors.accent,
    fontSize: 16,
  },
  exerciseContainer: {
    padding: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    padding: 16,
    paddingBottom: 8,
  },
  searchResultsList: {
    paddingBottom: 24,
  },
  searchResultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.background.card,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
  exerciseCategory: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: "capitalize",
  },
  exerciseCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.accent,
  },
});
