import { mockWeightEntries } from "@/constants/mockData";
import { WeightEntry } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  weightEntries: WeightEntry[];
  addWeightEntry: (entry: Omit<WeightEntry, "id">) => void;
  updateWeightEntry: (id: string, entry: Partial<WeightEntry>) => void;
  deleteWeightEntry: (id: string) => void;
  getWeightEntriesByDateRange: (
    startDate: string,
    endDate: string
  ) => WeightEntry[];
  getLatestWeight: () => number | null;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      weightEntries: mockWeightEntries,
      addWeightEntry: (entry) => {
        const newEntry = {
          ...entry,
          id: Math.random().toString(),
        };
        set((state) => ({
          weightEntries: [...state.weightEntries, newEntry],
        }));
      },
      updateWeightEntry: (id, entry) => {
        set((state) => ({
          weightEntries: state.weightEntries.map((weight) =>
            weight.id === id ? { ...weight, ...entry } : weight
          ),
        }));
      },
      deleteWeightEntry: (id) => {
        set((state) => ({
          weightEntries: state.weightEntries.filter(
            (weight) => weight.id !== id
          ),
        }));
      },
      getWeightEntriesByDateRange: (startDate, endDate) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        return get()
          .weightEntries.filter((entry) => {
            const entryDate = new Date(entry.date).getTime();
            return entryDate >= start && entryDate <= end;
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
      },
      getLatestWeight: () => {
        const entries = [...get().weightEntries].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return entries.length > 0 ? entries[0].weight : null;
      },
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
