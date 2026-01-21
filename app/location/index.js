import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

export default function LocationPermissionScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAllow = async () => {
    try {
      setIsLoading(true);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to proceed");
        setIsLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Extract and log coordinates
      const { latitude, longitude } = location.coords;
      
      console.log("📍 Location Coordinates:");
      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
      console.log(`Full Location:`, location.coords);

      // Get reverse geocoding (optional - get address from coordinates)
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocode.length > 0) {
        console.log("📬 Address from Coordinates:");
        console.log(`${geocode[0].street}, ${geocode[0].city}, ${geocode[0].country}`);
      }

      // Navigate to manual location screen with coordinates
      router.push({
        pathname: '/location/manual',
        params: {
          latitude,
          longitude,
          street: geocode.length > 0 ? geocode[0].street : 'Location',
          city: geocode.length > 0 ? geocode[0].city : 'Unknown',
        },
      });
    } catch (error) {
      console.error("Location Error:", error);
      Alert.alert("Error", "Unable to get location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualEntry = () => {
    // Navigate to a manual address search screen
    router.push("/manual");
    console.log("Navigating to manual entry...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 1. Illustration Section */}
      <View style={styles.illustrationContainer}>
        {/* REPLACE the uri with your local asset: require('../../assets/location-bg.png') */}
        <Image
          source={require("../../assets/images/permission.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* 2. Text Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Get Fast Delivery</Text>
        <Text style={styles.description}>
          Enable location access so we can find your exact spot and ensure your
          food arrives without delays.
        </Text>
      </View>

      {/* 3. Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.allowButton, isLoading && styles.disabledButton]} 
          onPress={handleAllow}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.allowText}>Allow</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.manualButton} 
          onPress={handleManualEntry}
          disabled={isLoading}
        >
          <Text style={styles.manualText}>Enter Location Manually</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
  },
  illustrationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: width * 0.8,
    height: width * 0.8,
  },
  contentContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4A90E2", // Same blue as Login/Signup
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1.5,
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },
  allowButton: {
    backgroundColor: "#4A90E2",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // Standard shadow for the primary button
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  allowText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  manualButton: {
    backgroundColor: "#F0F7FF", // Light blue tint from design
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  manualText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
});