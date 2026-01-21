import { useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/authContext";
import { UserProvider } from "../contexts/userContext";
import { VendorProvider } from "../contexts/vendorContext";
import { NotificationProvider } from "../contexts/notificationContext";
import { ShopProvider } from "../contexts/shopContext";
import { OrderProvider } from "../contexts/orderContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Poppins-100": require("../assets/fonts/Poppins-Thin.ttf"),
          "Poppins-200": require("../assets/fonts/Poppins-ExtraLight.ttf"),
          "Poppins-300": require("../assets/fonts/Poppins-Light.ttf"),
          "Poppins-400": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-500": require("../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-600": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-700": require("../assets/fonts/Poppins-Bold.ttf"),
          "Poppins-800": require("../assets/fonts/Poppins-ExtraBold.ttf"),
          "Poppins-900": require("../assets/fonts/Poppins-Black.ttf"),
          "Poppins-100Italic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
          "Poppins-300Italic": require("../assets/fonts/Poppins-LightItalic.ttf"),
          "Poppins-400Italic": require("../assets/fonts/Poppins-Italic.ttf"),
          "Poppins-500Italic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
          "Poppins-600Italic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
          "Poppins-700Italic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
          "Poppins-800Italic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
          "Poppins-900Italic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
        });
      } catch (e) {
        console.warn("Error loading fonts:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="splashScreen" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="location" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <VendorProvider>
            <ShopProvider>
              <OrderProvider>
                <RootLayoutNav />
              </OrderProvider>
            </ShopProvider>
          </VendorProvider>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
}
