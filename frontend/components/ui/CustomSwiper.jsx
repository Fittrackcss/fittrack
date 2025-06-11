import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
const CustomSwiper = ({ title, header, description, sub }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.main}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
    </View>
  );
};

export default CustomSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    left: 20,
    height: "85%",
    position: "absolute",
    justifyContent: "center",
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
    fontSize: 30,
    fontWeight: "700",
    color: colors.text.secondary,
    fontWeight: "500",
    marginBottom: 20,
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
