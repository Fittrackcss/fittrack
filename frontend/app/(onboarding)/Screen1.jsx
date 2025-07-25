import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { SwiperFlatList } from "react-native-swiper-flatlist";
// import { colors } from "../../constants/Colors";
import { useTheme } from "@/constants/ThemeContext";
import slide1 from "../../assets/images/slide1.jpg";
import food from "../../assets/images/food.jpg";
import image from "../../assets/images/image.png";
import { useTheme } from "@/constants/ThemeContext";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "  ",
    img: slide1, // Directly use the imported image
    description: "Ready for some wins?",
    supporting: "Start tracking, it's easy",
  },
  {
    key: "2",
    title: "Slide 2",
    img: food,
    description: "Discover the impact of \n your food and fitness",
  },
  {
    key: "3",
    title: "Slide 3",
    img: image,
    description: "And make a mindful \n eating habit for your life",
  },
];

const Screen1 = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/(onboarding)/SignUp");
  };

  const handleLogin = () => {
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
            <View style={{ flex: 1, alignItems: "center" }}>
              <ImageBackground
                source={item.img}
                style={styles.slideImage}
                resizeMode="cover"
              ></ImageBackground>
              <View style={styles.textDescription}>
                <Text style={styles.desc}>{item.description}</Text>
                {item.supporting && (
                  <Text style={styles.desc}>{item.supporting}</Text>
                )}
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
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
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
    backgroundColor: colors.background.main,
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
  slideImage: {
    width: width * 0.8,
    marginHorizontal: (width * 0.2) / 5,
    height: 400,
    borderRadius: 10,
    // margin: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  slideTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
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
    backgroundColor: colors.primary,
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  signup: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  login: {
    padding: 15,
    borderRadius: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
