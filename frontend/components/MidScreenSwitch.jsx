import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { useOnboardingStore } from "../store/useOnboardingStore";
import CustomSwiper from "./CustomSwiper";

const MidScreenSwitch = ({ item, title, header, description, sub }) => {
  const swiperRef = useRef(null);
  const currentIndex = useOnboardingStore((state) => state.currentIndex);
  const setCurrentIndex = useOnboardingStore((state) => state.setCurrentIndex);

  const onboardingIndex = useOnboardingStore((state) => state.currentIndex);
  const setOnboardingIndex = useOnboardingStore(
    (state) => state.setCurrentIndex
  );

  const [localIndex, setLocalIndex] = useState(onboardingIndex);

  useEffect(() => {
    if (localIndex !== onboardingIndex) {
      setLocalIndex(onboardingIndex);
      swiperRef.current?.scrollToIndex({ index: onboardingIndex });
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

  const goBackToWelcome = () => {
    setCurrentIndex(currentIndex + 1);
    router.replace("/(onboarding)/WelcomeScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <LinearGradient
        colors={["#ffffff", colors.primary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <CustomSwiper
          title={`${title}`}
          header={`${header}`}
          description={`${description}`}
          sub={`${sub}`}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={goBackToWelcome}
            style={styles.circleButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.background.main}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MidScreenSwitch;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  circleButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    padding: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: colors.background.main,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  nextText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
