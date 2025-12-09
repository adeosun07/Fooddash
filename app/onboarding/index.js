import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./onboarding";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router"

export default function OnboardingScreen(props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleToSignup = () => {
      router.replace("/signup");
  }

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 && <Image style={styles.imgContainer} source={require("../assets/delivery.png")}/>}
      {step === 2 && <Image source={require("../assets/varieties.png")} style={styles.imgContainer} />}
      {step === 3 && <Image source={require("../assets/easyPayment.png")} style={styles.imgContainer}  />}
      <View style={styles.indicatorContainer}>
        {[1, 2, 3].map((num) => (
          <View
            key={num}
            style={[styles.dot, step === num && styles.activeDot]}
          />
        ))}
      </View>
      {step === 1 && <Text style={styles.hero}>Swift Delivery</Text>}
      {step === 2 && <Text style={styles.hero}>Platter of Varieties</Text>}
      {step === 3 && <Text style={styles.hero}>Easy Payment</Text>}
      {step === 1 && (
        <Text style={styles.description}>
          Your meals delivered across campus in minutes {"\u2013"} hot, fast,
          and stress{"\u2011"}free
        </Text>
      )}
      {step === 2 && (
        <Text style={styles.description}>
          Explore a wide range of meals from your favorite campus spots.
        </Text>
      )}
      {step === 3 && (
        <Text style={styles.description}>
          Pay your way {"\u2013"} with card, cash, or wallet. Fast checkout, no
          wahala.
        </Text>
      )}

      <View style={styles.fixedBottom}>
        {step < 3 && (
          <View style={styles.buttonContainer}>
            {step === 1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => alert("Pressed!")}
              >
                <Text style={[styles.btnText, styles.skipTxt]} onPress={handleToSignup}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => prevStep()}
              >
                <Text style={[styles.btnText, styles.skipTxt]}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.nextButton, styles.button]}
              onPress={() => nextStep()}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => handleToSignup()}
          >
            <Text style={[styles.getStarted]}>Get Started</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.footer}>Sign up or sign in as a Rider</Text>
      </View>
      <StatusBar 
        style="dark"        
        backgroundColor="#6200EE"
        translucent={true}  
      />
    </SafeAreaView>
  );
}

