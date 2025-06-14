import React, { useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { onboardingSteps } from "../../constants/finishScreens";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const { width } = Dimensions.get("window");

const FinishScreens = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof onboardingSteps)[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Text style={styles.title}>{item.header}</Text>
        {item.customComponent ? (
          <item.customComponent 
            currentIndex={currentIndex}
            onboardingSteps={onboardingSteps}
          />
        ) : (
          !item.componentExists && <Text style={styles.sub}></Text>
        )}

        {item.footerExists && (
          <View style={styles.footer}>
            <TouchableOpacity onPress={handlePrev} style={styles.circleButton}>
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextText}>
                {currentIndex + 1 === onboardingSteps.length ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < onboardingSteps.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      // Handle finish logic
      console.log("Onboarding complete");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSteps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      {/* <CustomFooter
        item={onboardingSteps[currentIndex].id}
        screenId={onboardingSteps[currentIndex].id}
        customNext={() => {
          console.log("Completely custom next action");
          handleNext();
        }}
        customPrev={() => {
          console.log("Completely custom back action");
          handlePrev();
        }}
        overrideNext={true}
        overridePrev={true}
      /> */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: colors.text.primary,
  },
  sub: {
    fontSize: 13,
    color: colors.text.muted,
    marginTop: 5,
  },
  paginationItem: {
    marginTop: 15,
    width: 50,
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
    top: "7%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export default FinishScreens;
