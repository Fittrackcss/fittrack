import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState, useCallback } from "react";
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
import { colors } from "../../constants/Colors";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { onboardingSteps } from "./onboardingScreens";
import CustomModal from "../../components/ui/CustomModal";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const swiperRef = useRef(null);

  // Store state
  const { currentIndex, setCurrentIndex, formData, updateFormData } =
    useOnboardingStore();

  // Get current step
  const currentStep = onboardingSteps[currentIndex];

  // Handle validation
  const validateCurrentStep = useCallback(() => {
    if (currentStep?.input && !formData[currentStep.key]?.trim()) {
      setValidationMessage(`Please ${currentStep.placeholder}`);
      setShowValidationModal(true);
      return false;
    }
    return true;
  }, [currentStep, formData]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    const nextIndex = currentIndex + 1;

    // Special navigation case
    if (currentIndex === 1) {
      router.push("/(onboarding)/NextGoals");
      return;
    }

    // Normal progression
    if (nextIndex < onboardingSteps.length) {
      setCurrentIndex(nextIndex);
      swiperRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      router.replace("/(auth)/login");
    }
  }, [currentIndex, validateCurrentStep]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      swiperRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    } else {
      router.back();
    }
  }, [currentIndex]);

  // Handle index change safely
  const handleIndexChange = useCallback(
    ({ index }: { index: number }) => {
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [currentIndex]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{currentStep?.title}</Text>
      </View>

      <SwiperFlatList
        ref={swiperRef}
        index={currentIndex}
        data={onboardingSteps}
        horizontal
        showPagination={false}
        scrollEnabled={false}
        onChangeIndex={handleIndexChange}
        renderItem={({ item }) => (
          <View style={[styles.slide, item.customComponent && { padding: 0 }]}>
            {item.header && (
              <View style={[item.customComponent && { padding: 20 }]}>
                <Text style={styles.header}>{item.header}</Text>
                <Text style={styles.sub}>{item.sub}</Text>
              </View>
            )}

            {item.customComponent ? (
              <item.customComponent />
            ) : item.input ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text style={styles.inputLabel}>{item.label}</Text>
                <TextInput
                  value={formData[item.key] || ""}
                  onChangeText={(text) => updateFormData({ [item.key]: text })}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={[styles.input, isFocused && styles.inputFocused]}
                  selectionColor={colors.primary}
                  placeholder={item.placeholder}
                  placeholderTextColor="#999"
                  returnKeyType="done"
                />
              </View>
            ) : null}
          </View>
        )}
      />

      {currentStep && !currentStep.customComponent && (
        <View style={styles.paginationWrapper}>
          {onboardingSteps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationItem,
                i === currentIndex && styles.paginationItemActive,
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
          <Text style={styles.nextText}>
            {currentIndex === onboardingSteps.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title="Required Field"
        message={validationMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    height: 50,
    width: "100%",
    marginBottom: 5,
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

export default WelcomeScreen;
