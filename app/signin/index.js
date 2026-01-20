import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./signinStyle";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../loading";

function index(props) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReturn = () => {
        router.replace("/onboarding");
    }

    const handleToSignup = () => {
        router.replace("/signup");
    }

    const handleForgotPassword = async () => {
      if (!email) {
        Alert.alert("Error", "Please enter your email");
        return;
      }
      setLoading(true);
      // Dummy delay to simulate API call
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "OTP sent to your email");
        router.push({
          pathname: "/signin/ForgotPassword",
          params: { email },
        });
      }, 2000);
    }

    const handleSignin = async () => {
      if (!email || !password) {
        Alert.alert("Error", "Please enter email and password");
        return;
      }
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        await AsyncStorage.setItem("isSignedIn", "true");
        await AsyncStorage.setItem("authToken", "dummy_token_" + Date.now());
        Alert.alert("Success", "Signed in successfully!");
        router.replace("/(customer)");
      }, 2000);
    }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=>handleReturn()}>
      <Image
        source={require("../assets/arrow_back.png")}
        style={styles.image} 
      />
      </TouchableOpacity>
      <Text style={styles.title}>Sign In</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="example@gmail.com" style={styles.input} 
              value={email}
              onChangeText={(text)=> setEmail(text)}/>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="hQwdg467@?"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity onPress={() => handleForgotPassword()}>
                <Text style={styles.fgtPwd}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=> handleSignin ()}>
                <Text style={styles.authText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.optnsContainer}>
        <View style={styles.otherContainer}>
          <View style={styles.dashLine} />
          <Text style={styles.otherText}>Or continue with</Text>
          <View style={styles.dashLine} />
        </View>
        <View style={styles.iconsContainer}>
          <Image source={require("../../assets/apple.png")} />
          <Image source={require("../../assets/google.png")} />
        </View>
      </View>
      <Text style={styles.signUpContainer}>
        Don't have an account? <Text style={styles.signUpText} onPress={()=>handleToSignup()}>Sign up</Text>
      </Text>
      <Loading visible={loading} />
    </SafeAreaView>
  );
}

export default index;
