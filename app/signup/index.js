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
import styles from "./signupStyle";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@env";
import Loading from "../loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

function index(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleReturn = () => {
    router.replace("/onboarding");
  };
  const handleToSignin = () => {
    router.replace("/signin");
  };
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password must match");
      return;
    } else {
      setLoading(true);
      console.log({
        name: name.trim(),
        email: email.trim(),
        password,
        password_confirm: confirmPassword,
      });
      try {
        const result = await axios.post(`${API_URL}/auth/register`, {
          name: name.trim(),
          email: email.trim(),
          password,
          password_confirm: confirmPassword,
        });
        console.log(result.data);
        if (result.data.status === "success") {
          await AsyncStorage.setItem("hasOnboarded", "true");
          const info = result.data.message;
          Alert.alert(`${info}`);
          router.replace("/signin");
        } else {
          console.log("Signup err", result.data.message);
          Alert.alert(
            "Error",
            result.data.errors?.join("\n") || "Registration unsuccessful"
          );
        }
      } catch (error) {
        console.log("Signup error:", error.response?.data || error.message);
        Alert.alert(
          "Signup failed",
          "Please check your details and try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleReturn()}>
        <Image
          source={require("../assets/arrow_back.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="name"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="example@gmail.com"
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="hQwdg467@?"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="hQwdg467@?"
                style={styles.input}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignUp()}
              >
                <Text style={styles.authText}>Sign up</Text>
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
        Already have an account?{" "}
        <Text style={styles.signUpText} onPress={() => handleToSignin()}>
          Sign in
        </Text>
      </Text>

      <Loading visible={loading} />
    </SafeAreaView>
  );
}

export default index;
