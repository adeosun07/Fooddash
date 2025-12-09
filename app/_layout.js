import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, 
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from "@expo-google-fonts/poppins";
import SplashText from "./components/SplashText";
import { StyleSheet, View, Image } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
   <View style={styles.secondSplash}>
          <View style={styles.splashContainer}>
            <Image
              source={require("./assets/Logo.png")}
              style={styles.SplashLogo}
            />
            <SplashText />
          </View>
        </View>;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#f0f7ff" translucent={false} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

const styles = StyleSheet.create({
    secondSplash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f7ff",
  },
  SplashLogo: {
    width: 50,
    height: 60,
    resizeMode: "contain",
  },
  splashContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    justifyContent: "center",
  }
});
