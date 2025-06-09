import { mockExerciseEntries, mockExercises } from "@/constants/mockData";
import { Exercise, ExerciseEntry } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExerciseState {
  exercises: Exercise[];
  exerciseEntries: ExerciseEntry[];
  searchResults: Exercise[];
  searchExercise: (query: string) => void;
  addExerciseEntry: (entry: Omit<ExerciseEntry, "id">) => void;
  updateExerciseEntry: (id: string, entry: Partial<ExerciseEntry>) => void;
  deleteExerciseEntry: (id: string) => void;
  getExerciseEntriesByDate: (date: string) => ExerciseEntry[];
  getDailyExerciseSummary: (date: string) => {
    totalDuration: number;
    totalCaloriesBurned: number;
  };
}

export const useExerciseStore = create<ExerciseState>()(
  persist(
    (set, get) => ({
      exercises: mockExercises,
      exerciseEntries: mockExerciseEntries,
      searchResults: [],
      searchExercise: (query) => {
        const results = get().exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(query.toLowerCase())
        );
        set({ searchResults: results });
      },
      addExerciseEntry: (entry) => {
        const newEntry = {
          ...entry,
          id: Math.random().toString(),
        };
        set((state) => ({
          exerciseEntries: [...state.exerciseEntries, newEntry],
        }));
      },
      updateExerciseEntry: (id, entry) => {
        set((state) => ({
          exerciseEntries: state.exerciseEntries.map((exercise) =>
            exercise.id === id ? { ...exercise, ...entry } : exercise
          ),
        }));
      },
      deleteExerciseEntry: (id) => {
        set((state) => ({
          exerciseEntries: state.exerciseEntries.filter(
            (exercise) => exercise.id !== id
          ),
        }));
      },
      getExerciseEntriesByDate: (date) => {
        const dateStr = new Date(date).toISOString().split("T")[0];
        return get().exerciseEntries.filter(
          (exercise) =>
            new Date(exercise.date).toISOString().split("T")[0] === dateStr
        );
      },
      getDailyExerciseSummary: (date) => {
        const entries = get().getExerciseEntriesByDate(date);
        const exercises = get().exercises;

        let totalDuration = 0;
        let totalCaloriesBurned = 0;

        entries.forEach((entry) => {
          const exercise = exercises.find((e) => e.id === entry.exerciseId);
          if (exercise) {
            totalDuration += entry.duration;
            totalCaloriesBurned +=
              exercise.caloriesBurnedPerMinute * entry.duration;
          }
        });

        return { totalDuration, totalCaloriesBurned };
      },
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
