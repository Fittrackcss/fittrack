import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserStore } from "../../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useTheme } from "@/constants/ThemeContext";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { onboardingSteps } from "../../constants/onboardingScreens";
import CustomModal from "../../components/ui/CustomModal";

const { width } = Dimensions.get("window");

function makeStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
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
      color: colors.text.primary,
      fontWeight: "600",
    },
    slide: {
      width,
      padding: 20,
    },
    header: {
      marginTop: 35,
      fontSize: 20,
      fontWeight: "700",
      color: colors.text.primary,
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
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 6,
      padding: 12,
      marginTop: 10,
      height: 60,
      fontSize: 17,
      color: colors.text.primary,
    },
    inputFocused: {
      borderWidth: 2,
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
      marginTop: 15,
      width: 42,
      height: 3,
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
}

const WelcomeScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isFocused, setIsFocused] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const swiperRef = useRef<SwiperFlatList>(null);
  const router = useRouter();

  // Store state
  const {
    currentIndex,
    setCurrentIndex,
    formData,
    updateFormData,
    incrementIndex,
    decrementIndex,
  } = useOnboardingStore();
  
  // Check user store state
  const { user: currentUser } = useUserStore();
  console.log("Current user from store:", currentUser);

  // Get current step
  const currentStep = onboardingSteps[currentIndex];
  
  // Debug current state
  console.log("Current index:", currentIndex, "Total steps:", onboardingSteps.length);
  console.log("Current formData:", formData);

  // Handle validation
  const validateCurrentStep = useCallback(() => {
    if (currentStep?.input && currentStep?.field && !formData[currentStep.field]?.trim()) {
      setValidationMessage(`Please ${currentStep.placeholder}`);
      setShowValidationModal(true);
      return false;
    }
    return true;
  }, [currentStep, formData]);

  // Navigation handlers
  const goToNext = useCallback(async () => {
    if (!validateCurrentStep() || isNavigating) return;

    const nextIndex = currentIndex + 1;

    // Special navigation case
    if (currentIndex === 1) {
      router.push("/(onboarding)/NextGoals");
      return;
    }

    // Always get the latest onboarding data
    const { formData, selections } = useOnboardingStore.getState();
    const { signup, user: currentUser } = useUserStore.getState();

    if (currentIndex === onboardingSteps.length - 1) {
      setIsNavigating(true);
      
      // Extract goals and other selections
      const goals = selections["goals-screen"] || [];
      const barriers = selections["barriers-screen"] || [];
      const goalChoices = selections["goal-choices-screen"] || [];
      const mealPlanning = selections["meal-planning-screen"] || [];

      // Determine the goal type with proper validation
      const goalChoice = goalChoices[0] || goals[0] || "maintain";
      const validGoal = goalChoice === "lose" || goalChoice === "gain" || goalChoice === "maintain"
        ? goalChoice as "lose" | "maintain" | "gain"
        : "maintain";

      // Build user object from all collected data - only include fields that match User type
      const userObj = {
        id: "",
        email: formData.email || "",
        name: formData.name || "User",
        password: formData.password || "temporary-password",
        gender: formData.sex || formData.gender || "male",
        age: Number(formData.age) || 0,
        height: Number(formData.height) || 0,
        weight: Number(formData.weight) || 0,
        goalWeight: Number(formData.goalWeight) || 0,
        activityLevel: formData.activityLevel || "",
        goal: validGoal,
        dailyCalorieGoal: 0,
        macroGoals: { protein: 0, carbs: 0, fat: 0 },
        weeklyWorkouts: 0,
        dailySteps: 0,
        weightGoal: "",
      };

      console.log("Final onboarding data:", { formData, selections });
      console.log("User object to signup:", userObj);

      // Create user from onboarding data
      const signupResult = await signup(userObj);
      console.log("Signup result:", signupResult);
      let afterSignupUser = useUserStore.getState().user;
      let waitCount = 0;
      while (!afterSignupUser && waitCount < 20) { // wait up to 2 seconds
        await new Promise((res) => setTimeout(res, 100));
        afterSignupUser = useUserStore.getState().user;
        waitCount++;
      }
      console.log("User after signup (waited):", afterSignupUser);
      
      // Add a small delay to ensure smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear the entire navigation stack and go to main app
      // This ensures no back navigation to onboarding screens
      router.replace("/(tabs)");
      return;
    }

    // Normal progression
    if (nextIndex < onboardingSteps.length) {
      setCurrentIndex(nextIndex);
      swiperRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      router.replace("/(auth)/login");
    }
  }, [currentIndex, validateCurrentStep, isNavigating]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      decrementIndex();
      const prevIndex = currentIndex - 1;
      swiperRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    } else {
      router.back();
    }
  }, [currentIndex, decrementIndex]);

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
                  value={formData[item.field] || ""}
                  onChangeText={(text) => updateFormData({ [item.field]: text })}
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

      {currentStep && !currentStep.componentExists && (
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

        <TouchableOpacity onPress={goToNext} style={styles.nextButton} disabled={isNavigating}>
          <Text style={styles.nextText}>
            {isNavigating 
              ? "Setting up..." 
              : currentIndex === onboardingSteps.length - 1
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

export default WelcomeScreen;
