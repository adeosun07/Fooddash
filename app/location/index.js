import React from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./locationStyle";

function Location(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/locationNotis.png")} style={styles.image} />
            <Text style={styles.texts}>Fooddash would like to access your location only while using the app</Text>
            <TouchableOpacity style={styles.allowContainer}>
                <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Location;