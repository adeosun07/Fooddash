import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleToSignup = () => router.replace("/signup");

  // Slide Data
  const slides = {
    1: {
      title: "Your Campus.",
      description: "Made for OAU, connecting the entire campus community.",
      image: require("../../assets/onboarding1.png"),
    },
    2: {
      title: "Your Food.",
      description: "Explore a wide range of meals from your favorite campus vendors.",
      // Using 4 images for the grid
      images: [
        "https://picsum.photos/seed/food1/400/400",
        "https://picsum.photos/seed/food2/400/400",
        "https://picsum.photos/seed/food3/400/400",
        "https://picsum.photos/seed/food4/400/400",
      ],
    },
    3: {
      title: "Your Dash.",
      description: "Fast delivery or flexible earnings.\nYour choice.",
      image: "https://picsum.photos/seed/delivery/800/1000",
    },
  };

  const currentSlide = slides[step];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 1. Image Section */}
      <View style={styles.imageSection}>
        {step === 2 ? (
          <View style={styles.gridContainer}>
            {currentSlide.images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.gridImage} />
            ))}
          </View>
        ) : (
          <Image source={{ uri: currentSlide.image }} style={styles.mainImage} />
        )}
      </View>

      {/* 2. Pagination Dots */}
      <View style={styles.indicatorContainer}>
        {[1, 2, 3].map((num) => (
          <View
            key={num}
            style={[styles.dot, step === num ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>

      {/* 3. Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>
      </View>

      {/* 4. Button Section */}
      <View style={styles.bottomSection}>
        {step < 3 ? (
          <View style={styles.rowButtons}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={handleToSignup}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.getStartedButton} onPress={handleToSignup}>
            <Text style={styles.nextText}>Get Started  →</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  imageSection: {
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  gridContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridImage: {
    width: "48%",
    height: "48%",
    borderRadius: 15,
    marginBottom: "4%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  dot: {
    height: 6,
    width: 25,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#F37335", // Salmon/Orange
  },
  inactiveDot: {
    backgroundColor: "#FDEEE9",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4A90E2", // Light Blue
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "center",
    lineHeight: 22,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "#F0F7FF",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  skipText: {
    color: "#4A90E2",
    fontWeight: "700",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  nextText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  getStartedButton: {
    backgroundColor: "#4A90E2",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
  },
});