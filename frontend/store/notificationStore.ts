import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Notification {
  id: string;
  title: string;
  message: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getNotifications: () => Notification[];
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        { id: "1", title: "Welcome to FitTrack!", message: "Start tracking your fitness journey today." },
        { id: "2", title: "Goal Reminder", message: "Don't forget to log your meals and workouts." },
        { id: "3", title: "Progress Update", message: "You hit your weekly step goal! 🎉" },
      ],
      
      addNotification: (notification) => {
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
      
      clearAllNotifications: () => {
        set({ notifications: [] });
      },
      
      getNotifications: () => {
        return get().notifications;
      },
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 