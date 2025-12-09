import React, { useEffect, useState } from "react";
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
import { API_URL} from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function index(props) {
    
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleReturn = () => {
        router.replace("/onboarding");
    }

    const handleToSignup = () => {
        router.replace("/signup");
    }

    const handleForgotPassword = async () => {
      const result = await axios.post(`https://api-foodash.khostels.com.ng/students/auth/request_otp`, {
        email
      })
      if(result.data.status === "success"){
        const info = result.data.message;
        Alert.alert(`${info}`);
        router.push({
  pathname: "/signin/ForgotPassword",
  params: { email },
});

      }
    }

    const handleSignin = async () => {
      const result = await axios.post(`https://api-foodash.khostels.com.ng/students/auth/login`, {
        email,
        password
      });

      if (result.data.status === "success"){
        await AsyncStorage.setItem("isSignedIn", "true");
        const info = result.data.message;
        Alert.alert(`${info}`);
        router.replace("/home")
      }
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
          <Image source={require("../assets/apple.png")} />
          <Image source={require("../assets/google.png")} />
        </View>
      </View>
      <Text style={styles.signUpContainer}>
        Don't have an account? <Text style={styles.signUpText} onPress={()=>handleToSignup()}>Sign up</Text>
      </Text>
    </SafeAreaView>
  );
}

export default index;
