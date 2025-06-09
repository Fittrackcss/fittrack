import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { colors } from "../../constants/colors";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { onboardingSteps } from "./onboardingScreens";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const swiperRef = useRef(null);

  // Zustand state
  const onboardingIndex = useOnboardingStore((state) => state.currentIndex);
  const setOnboardingIndex = useOnboardingStore(
    (state) => state.setCurrentIndex
  );
  const formData = useOnboardingStore((state) => state.formData);
  const updateFormData = useOnboardingStore((state) => state.updateFormData);

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
      router.push("/(onboarding)/GoalMid");
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

  const currentStep = onboardingSteps[localIndex];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.titleContainer}>
        <Text key={localIndex} style={styles.title}>
          {currentStep?.title}
        </Text>
      </View>

      <SwiperFlatList
        ref={swiperRef}
        index={localIndex}
        data={onboardingSteps}
        horizontal
        showPagination={false}
        scrollEnabled={false}
        onChangeIndex={({ index }) => {
          if (index !== localIndex) {
            setLocalIndex(index);
            setOnboardingIndex(index);
          }
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, item.customComponent && { padding: 0 }]}>
            {item.header && (
              <View
                style={[
                  styles.headerWrapper,
                  item.customComponent && { padding: 20 },
                ]}
              >
                <Text style={styles.header}>{item.header}</Text>
                <Text style={styles.sub}>{item.sub}</Text>
              </View>
            )}

            {item.customComponent ? (
              <item.customComponent />
            ) : item.input ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text style={styles.inputLabel}>{item.placeholder}</Text>
                <TextInput
                  value={formData[item.key] || ""}
                  onChangeText={(text) => updateFormData({ [item.key]: text })}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={[styles.input, isFocused && styles.inputFocused]}
                  selectionColor={colors.primary}
                  placeholder={item.placeholder}
                  placeholderTextColor="#999"
                />
              </View>
            ) : null}
          </View>
        )}
      />

      {!currentStep.customComponent && (
        <View style={styles.paginationWrapper}>
          {onboardingSteps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationItem,
                i === localIndex && styles.paginationItemActive,
              ]}
            />
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity onPress={goToPrev} style={styles.circleButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNext} style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    paddingLeft: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  slide: {
    width,
    padding: 20,
  },
  headerWrapper: {
    marginBottom: 25,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  sub: {
    fontSize: 13,
    color: colors.text.muted,
    marginTop: 5,
  },
  inputLabel: {
    fontSize: 13,
    color: colors.text.muted,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    height: 60,
    color: colors.text.secondary,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  footer: {
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
  paginationItem: {
    width: 42,
    height: 5,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationItemActive: {
    backgroundColor: colors.primary,
  },
  paginationWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: "11%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
