import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/Colors";

const SignUp = () => {
  const handleContinue = () => {
    // Handle continue logic here
    console.log("Continue Pressed");

    router.push("/(onboarding)/WelcomeScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome! Let's customize{"\n"} Fittrack for your goals
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
          Continue
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "800",
          color: 'black',
          marginTop: 10,
        }}
      >
        OR
      </Text>

      <TouchableOpacity style={styles.googleButton}>
        <Ionicons
          name="logo-google"
          size={20}
          color={colors.accent}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: "center",
    fontWeight: "800",
    marginHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
    width: "80%",
    marginTop: 100,
  },

  googleButtonText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: "500",
  },
});
