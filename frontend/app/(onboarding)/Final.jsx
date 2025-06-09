import { Text, TouchableOpacity, View } from "react-native";

import { setHasSeenOnboarding } from "@/utils/storage";
import { router } from "expo-router";

const finishOnboarding = async () => {
  await setHasSeenOnboarding();
  router.replace("/(tabs)/index"); // or whatever your main entry point is
};

const Final = () => {
  return (
    <View>
      <Text>Final</Text>

      <TouchableOpacity
        onPress={() => {
          finishOnboarding();
        }}
      >
        <Text>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Final;
