import { StyleSheet, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import CustomFooter from "../../components/ui/CustomFooter";
import { colors } from "../../constants/Colors";

const GoalReason = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Goals</Text>

      <CustomFooter item="SignUp" />
    </SafeAreaView>
  );
};

export default GoalReason;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  main: {
    height: "90%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingRight: 20,
    gap: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.text.secondary,
    fontWeight: "500",
    marginBottom: 20,
    paddingLeft: 20,
  },
  header: {
    fontSize: 40,
    color: colors.text.primary,
    fontWeight: "700",
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: colors.text.primary,
  },
  sub: {
    fontSize: 18,
    color: colors.text.secondary,
    marginTop: 5,
  },
});
