import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../contexts/userContext";
import MapComponent from "../../components/MapComponent";

const { width, height } = Dimensions.get("window");

export default function ConfirmAddressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveAddress } = useUser();

  // Parse location from params (might come as string)
  let locationData = null;
  try {
    if (typeof params.location === 'string') {
      locationData = JSON.parse(params.location);
    } else {
      locationData = params.location;
    }
  } catch (e) {
    console.log('Location parse error:', e);
  }

  const handleConfirm = async () => {
    try {
      const addressData = {
        apartment: params.apartment,
        notes: params.notes || "",
        type: params.type || "home",
        customLabel: params.customLabel,
        location: locationData,
      };

      await saveAddress(addressData);
      Alert.alert("Success", "Address saved!", [
        {
          text: "OK",
          onPress: () => router.push("/(customer)/home"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save address. Please try again.");
    }
  };

  const formatAddressType = (type) => {
    if (type === "order") return "Home";
    if (type === "earn") return "Work";
    return type || "Home";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapComponent initialLocation={locationData} onLocationSelected={() => {}} />
      </View>

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Address</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      {/* Bottom Section */}
      <SafeAreaView style={styles.bottomSection}>
        <ScrollView 
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardContent}
        >
          {/* Address Details */}
          <View style={styles.addressBox}>
            <View style={styles.addressRow}>
              <Ionicons name="location" size={20} color="#4A90E2" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Apartment / Room</Text>
                <Text style={styles.addressValue}>{params.apartment}</Text>
              </View>
            </View>

            {params.notes && (
              <View style={[styles.addressRow, { marginTop: 15 }]}>
                <Ionicons name="document-text" size={20} color="#4A90E2" />
                <View style={styles.addressContent}>
                  <Text style={styles.addressLabel}>Notes for Rider</Text>
                  <Text style={styles.addressValue}>{params.notes}</Text>
                </View>
              </View>
            )}

            <View style={[styles.addressRow, { marginTop: 15 }]}>
              <Ionicons name="pricetag" size={20} color="#4A90E2" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Address Type</Text>
                <Text style={styles.addressValue}>{formatAddressType(params.type)}</Text>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mapContainer: {
    width: width,
    height: height * 0.55,
    backgroundColor: "#E0E0E0",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  cardContent: {
    paddingBottom: 20,
  },
  addressBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressContent: {
    marginLeft: 12,
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: "#A0A0A0",
    fontWeight: "500",
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4A90E2",
    width: "100%",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});