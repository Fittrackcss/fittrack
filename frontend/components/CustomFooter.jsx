import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useOnboardingStore } from "../store/useOnboardingStore";

const CustomFooter = ({ item }) => {
  const router = useRouter();
  const onboardingIndex = useOnboardingStore((state) => state.currentIndex);
  const setOnboardingIndex = useOnboardingStore(
    (state) => state.setCurrentIndex
  );

  const [localIndex, setLocalIndex] = useState(onboardingIndex);

  useEffect(() => {
    if (localIndex !== onboardingIndex) {
      setLocalIndex(onboardingIndex);
    }
  }, [onboardingIndex]);

  const goToNext = () => {
    const nextIndex = localIndex + 1;

    if (localIndex === 1) {
      router.push(`/(onboarding)/${item}`);
      return;
    }

    if (nextIndex < onboardingSteps.length) {
      setLocalIndex(nextIndex);
      setOnboardingIndex(nextIndex);
      swiperRef.current?.scrollToIndex({ index: nextIndex });
    }
  };

  const goToPrev = () => {
    if (localIndex > 0) {
      const prev = localIndex - 1;
      setLocalIndex(prev);
      setOnboardingIndex(prev);
      swiperRef.current?.scrollToIndex({ index: prev });
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={goToPrev} style={styles.circleButton}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFooter;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%",
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
