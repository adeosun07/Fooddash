import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapComponent = ({ onLocationSelected, initialLocation }) => {
  const defaultRegion = {
    latitude: 7.5898,
    longitude: 4.5085,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [region, setRegion] = useState(initialLocation ? { ...initialLocation, latitudeDelta: 0.05, longitudeDelta: 0.05 } : defaultRegion);
  const [markerCoordinate, setMarkerCoordinate] = useState(
    initialLocation ? { latitude: initialLocation.latitude, longitude: initialLocation.longitude } : { latitude: 7.5898, longitude: 4.5085 }
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        setIsLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          const { latitude, longitude } = location.coords;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };

          setRegion(newRegion);
          setMarkerCoordinate({ latitude, longitude });
          onLocationSelected?.({ latitude, longitude });
        }
      } catch (error) {
        console.log("Location error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentLocation();
  }, []);

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });
    onLocationSelected?.({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={markerCoordinate}
          title="Selected Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
