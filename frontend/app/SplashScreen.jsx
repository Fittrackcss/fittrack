// import React, { useEffect } from "react";
// import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace("(onboarding)");
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [navigation]);
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#ff8e0c" }}>
//       <StatusBar hidden={true} />
//       <Image
//         source={require("../assets/images/splash-icon.png")}
//         style={styles.image}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#3E3167",
//     justifyContent: "center",
//     alignItems: "center",
//     resizeMode: "cover",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
// });

// export default SplashScreen;
import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("(onboarding)");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);
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
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
