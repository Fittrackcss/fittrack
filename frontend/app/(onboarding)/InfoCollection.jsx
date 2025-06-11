import { View, Text } from "react-native";
import React from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const InfoCollection = () => {

   const { toggleSelection, getSelections } = useOnboardingStore();
    const selected = getSelections("info-collection-screen");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>InfoCollection</Text>
    </View>
  );
};

export default InfoCollection;
