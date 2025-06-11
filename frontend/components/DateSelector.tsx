import { colors } from "@/constants/Colors";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DateSelectorProps = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  const goToPreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToPreviousDay} style={styles.arrowButton}>
        <ChevronLeft size={20} color={colors.text.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToToday} style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToNextDay} style={styles.arrowButton}>
        <ChevronRight size={20} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  arrowButton: {
    padding: 8,
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
});
