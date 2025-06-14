import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Slide 1",
    color: "#FFA07A",
    description: "Ready for some wins?",
    supporting: "Start tracking, it's easy",
  },
  {
    key: "2",
    title: "Slide 2",
    color: "#20B2AA",
    description: "Discover the impact of \n your food and fitness",
  },
  {
    key: "3",
    title: "Slide 3",
    color: "#87CEFA",
    description: "And make a midnful \n eating habit for your life",
  },
];

const Screen1 = () => {
  const router = useRouter();

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Sign Up Pressed");
    router.push("/(onboarding)/SignUp");
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Log In Pressed");
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 15, color: "#ccc", textAlign: "center" }}>
          Welcome to {"\n"}
          <Text style={styles.heading}>FitTrack</Text>
        </Text>
      </View>
      <View style={styles.sliderWrapper}>
        <SwiperFlatList
          data={slides}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View style={[styles.child, { backgroundColor: item.color }]}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
              <View style={styles.textDescription}>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.desc}>{item.supporting}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.key}
          showPagination
          paginationStyle={styles.pagination}
          paginationStyleItem={styles.paginationItem}
          paginationStyleItemActive={styles.paginationItemActive}
          itemWidth={width * 0.8}
          snapToAlignment="center"
          decelerationRate="fast"
          autoplay={false}
          autoplayDelay={0}
          autoplayLoop={false}
          onMomentumScrollEnd={() => {}}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: "column",
          height: "auto",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
          <Text style={[styles.show, { color: "white" }]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={[styles.show, { color: "#ff8e0c" }]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  sliderWrapper: {
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  child: {
    width: width * 0.8,
    marginHorizontal: (width * 0.2) / 5,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  paginationItem: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
    margin: 25,
    marginBottom: 35,
  },
  paginationItemActive: {
    backgroundColor: "#ff6347",
  },
  textDescription: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  signup: {
    backgroundColor: colors.button.primary,
    padding: 10,
    height: 50,
    borderRadius: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    padding: 5,
    width: "80%",
    alignItems: "center",
  },
  show: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
