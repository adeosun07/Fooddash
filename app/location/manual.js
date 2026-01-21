import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapComponent from "../../components/MapComponent";

const { width } = Dimensions.get("window");

export default function AddressDetailsScreen() {
  const router = useRouter();
  const [addressType, setAddressType] = useState("School"); // Default selected
  const [otherLabel, setOtherLabel] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [apartment, setApartment] = useState("");
  const [notes, setNotes] = useState("");

  const addressTypes = [
    { id: "Home", icon: "home-outline" },
    { id: "School", icon: "school-outline" },
    { id: "Work", icon: "briefcase-outline" },
    { id: "Other", icon: "pencil-outline" },
  ];

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log("Location selected:", location);
  };

  const handleSaveAddress = () => {
    if (!selectedLocation) {
      Alert.alert("Error", "Please select a location on the map");
      return;
    }

    if (!apartment.trim()) {
      Alert.alert("Error", "Please enter apartment/room/block details");
      return;
    }

    const addressData = {
      location: JSON.stringify(selectedLocation),
      apartment,
      notes,
      type: addressType,
      customLabel: addressType === "Other" ? otherLabel : null,
    };

    console.log("Saving address:", addressData);
    
    // Navigate to confirm screen with address data
    router.push({
      pathname: '/location/confirm',
      params: addressData,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Map Component */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Select Location on Map</Text>
          <MapComponent onLocationSelected={handleLocationSelected} />
          {selectedLocation && (
            <View style={styles.coordinatesBox}>
              <Ionicons name="location" size={16} color="#4A90E2" />
              <Text style={styles.coordinatesText}>
                {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
              </Text>
            </View>
          )}
        </View>

        {/* 2. Form Inputs */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Apartment / Room / Block</Text>
          <TextInput 
            placeholder="Block C, room 14 or lecture hall 2" 
            style={styles.input}
            placeholderTextColor="#A0A0A0"
            value={apartment}
            onChangeText={setApartment}
          />

          <Text style={styles.label}>Note to the Dash rider</Text>
          <TextInput 
            placeholder="Meet me at the black gate or call me when you get here" 
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
            placeholderTextColor="#A0A0A0"
            value={notes}
            onChangeText={setNotes}
          />

          {/* 3. Address Type Selector */}
          <Text style={styles.label}>Address type</Text>
          <View style={styles.typeContainer}>
            {addressTypes.map((type) => {
              const isActive = addressType === type.id;
              return (
                <TouchableOpacity 
                  key={type.id}
                  style={[styles.typeButton, isActive && styles.activeTypeButton]}
                  onPress={() => setAddressType(type.id)}
                >
                  <Ionicons 
                    name={type.icon} 
                    size={18} 
                    color={isActive ? "#4A90E2" : "#707070"} 
                  />
                  <Text style={[styles.typeText, isActive && styles.activeTypeText]}>
                    {type.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Conditional Input for "Other" label */}
          {addressType === "Other" && (
            <TextInput 
              placeholder="Address label (e.g., Church, Gym)" 
              style={[styles.input, { marginTop: 15 }]}
              value={otherLabel}
              onChangeText={setOtherLabel}
            />
          )}
        </View>

        {/* 4. Action Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  coordinatesBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4A90E2",
    marginTop: 10,
  },
  coordinatesText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#4A90E2",
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 80,
    paddingTop: 15,
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
    minWidth: "22%",
    justifyContent: "center",
  },
  activeTypeButton: {
    borderColor: "#4A90E2",
    backgroundColor: "#F0F7FF",
  },
  typeText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#707070",
    fontWeight: "500",
  },
  activeTypeText: {
    color: "#4A90E2",
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    marginHorizontal: 20,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});