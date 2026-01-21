import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/authContext";
import SplashScreen from "./splashScreen";

export default function Index() {
  const { isLoading, isLoggedIn, role } = useAuth();
  const [hasOnboarded, setHasOnboarded] = useState(null);
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("has_onboarded");
      setHasOnboarded(value === "true");
    };

    checkOnboarding();
  }, []);

  if (!navigationState?.key || isLoading || hasOnboarded === null) {
    return <SplashScreen />;
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding/index" />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  // Logged in → customer redirect
  if (role === "customer") {
    return <Redirect href="/(customer)/home" />;
  }

  // Default redirect to auth
  return <Redirect href="/(auth)/login" />;
}
