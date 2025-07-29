import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("(onboarding)");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require("../assets/images/fit.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff8e0c",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "cover",
  },
});

export default SplashScreen;
