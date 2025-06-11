import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/Colors";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import CustomModal from "./CustomModal";

interface CustomFooterProps {
  item: string;
  screenId: string; // Added to match your store structure
  mode?: "single" | "multi" | "multi-max-3"; // Added to match your store
}

const CustomFooter = ({
  item,
  screenId,
  mode = "single",
}: CustomFooterProps) => {
  const router = useRouter();

  // Access the store with proper typing
  const getSelections = useOnboardingStore((state) => state.getSelections);
  const currentSelections = getSelections(screenId);

  const [hasSelections, setHasSelections] = useState(
    currentSelections.length > 0
  );

  useEffect(() => {
    setHasSelections(currentSelections.length > 0);
  }, [currentSelections]);

  const goToNext = () => {
    // Validate selections based on mode before proceeding
    if (mode === "single" && !hasSelections) {
      // Optionally show error to user
      return;
    }

    if (mode === "multi-max-3" && currentSelections.length === 0) {
      // Optionally show error to user
      return;
    }

    router.push(`/(onboarding)/${item}` as never);
  };

  const goToPrev = () => {
    router.back();
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={goToPrev} style={styles.circleButton}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToNext}
        style={[
          styles.nextButton,
          !hasSelections && mode !== "multi" ? { opacity: 0.5 } : null,
        ]}
        disabled={!hasSelections && mode !== "multi"}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  circleButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.secondary,
    borderRadius: 50,
    padding: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomFooter;
