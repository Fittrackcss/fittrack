// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { colors } from "@/constants/Colors";
// import { useOnboardingStore } from "@/store/useOnboardingStore";

// interface CustomFooterProps {
//   item: string;
//   screenId: string; // Added to match your store structure
//   mode?: "single" | "multi" | "multi-max-3"; // Added to match your store
// }

// const CustomFooter = ({
//   item,
//   screenId,
//   mode = "single",
// }: CustomFooterProps) => {
//   const router = useRouter();

//   // Access the store with proper typing
//   const getSelections = useOnboardingStore((state) => state.getSelections);
//   const currentSelections = getSelections(screenId);

//   const [hasSelections, setHasSelections] = useState(
//     currentSelections.length > 0
//   );

//   useEffect(() => {
//     setHasSelections(currentSelections.length > 0);
//   }, [currentSelections]);

//   const goToNext = () => {
//     // Validate selections based on mode before proceeding
//     if (mode === "single" && !hasSelections) {
//       // Optionally show error to user
//       return;
//     }

//     if (mode === "multi-max-3" && currentSelections.length === 0) {
//       // Optionally show error to user
//       return;
//     }

//     router.push(`/(onboarding)/${item}` as never);
//   };

//   const goToPrev = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.footer}>
//       <TouchableOpacity onPress={goToPrev} style={styles.circleButton}>
//         <Ionicons name="arrow-back" size={24} color={colors.primary} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={goToNext}
//         style={[
//           styles.nextButton,
//           !hasSelections && mode !== "multi" ? { opacity: 0.5 } : null,
//         ]}
//         disabled={!hasSelections && mode !== "multi"}
//       >
//         <Text style={styles.nextText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/constants/ThemeContext";
import { useOnboardingStore } from "@/store/useOnboardingStore";

interface CustomFooterProps {
  item: string;
  screenId: string;
  mode?: "single" | "multi" | "multi-max-3";
  // Optional props for custom button handlers
  customNext?: () => void;
  customPrev?: () => void;
  // Optional props to override default behavior
  overrideNext?: boolean;
  overridePrev?: boolean;
}

const CustomFooter = ({
  item,
  screenId,
  mode = "single",
  customNext,
  customPrev,
  overrideNext = false,
  overridePrev = false,
}: CustomFooterProps) => {
  const router = useRouter();
  const getSelections = useOnboardingStore((state) => state.getSelections);
  const currentSelections = getSelections(screenId);

  const [hasSelections, setHasSelections] = useState(
    currentSelections.length > 0
  );

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    setHasSelections(currentSelections.length > 0);
  }, [currentSelections]);

  const handleNext = () => {
    // Run validation unless overridden
    if (!overrideNext) {
      if (mode === "single" && !hasSelections) return;
      if (mode === "multi-max-3" && currentSelections.length === 0) return;
    }

    // Use custom function if provided, otherwise default routing
    if (customNext) {
      customNext();
    } else {
      router.push(`/(onboarding)/${item}` as never);
    }
  };

  const handlePrev = () => {
    // Use custom function if provided, otherwise default routing
    if (customPrev) {
      customPrev();
    } else {
      router.back();
    }
  };

  // Determine if next button should be disabled
  const isNextDisabled =
    !overrideNext &&
    (mode === "single" || mode === "multi-max-3") &&
    !hasSelections;

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={handlePrev}
        style={styles.circleButton}
        disabled={overridePrev ? false : undefined}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.nextButton, isNextDisabled ? { opacity: 0.5 } : null]}
        disabled={isNextDisabled}
      >
        <Text style={styles.nextText}>
          {item === "finish" ? "Finish" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function makeStyles(colors: any) {
  return StyleSheet.create({
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
}

export default CustomFooter;
