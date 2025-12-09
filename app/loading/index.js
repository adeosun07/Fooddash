// components/Loading.js
import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet, Modal } from "react-native";

export default function Loading({ visible }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // grow
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // shrink
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    if (visible) pulse.start();
    else {
      pulse.stop();
      scaleAnim.setValue(1);
    }

    return () => pulse.stop();
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <Animated.Image
          source={require("../assets/Logo.png")} // 👈 your logo image
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});
