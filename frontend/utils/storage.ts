import AsyncStorage from "@react-native-async-storage/async-storage";

export const HAS_SEEN_ONBOARDING = "hasSeenOnboarding";

export const setHasSeenOnboarding = async () => {
  await AsyncStorage.setItem(HAS_SEEN_ONBOARDING, "true");
};

export const getHasSeenOnboarding = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(HAS_SEEN_ONBOARDING);
  return value === "true";
};
