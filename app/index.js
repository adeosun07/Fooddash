import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashText from "../components/SplashText";


export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

 /*  useEffect(() => {
    const checkStatus = async () => {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      const token = await AsyncStorage.getItem("authToken");
      setHasOnboarded(!!onboarded);
      setIsSignedIn(!!token);

      setTimeout(() => setLoading(false), 2000);
    };

    checkStatus();
  }, []); */

/*   if (loading) return (
        <View style={styles.secondSplash}>
          <View style={styles.splashContainer}>
            <Image
              source={require("../assets/Logo.png")}
              style={styles.SplashLogo}
            />
            <SplashText />
          </View>
        </View>
      ); 
 */
  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isSignedIn && hasOnboarded) {
    return <Redirect href="/success" />;
  }

  return <Redirect href="/(customer)" />; 
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
