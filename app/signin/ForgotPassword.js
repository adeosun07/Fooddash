import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./forgotPasswordStyle";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Loading from "../loading";


function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // refs for input navigation
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const { email } = useLocalSearchParams();


  const handleReturn = () => {
    router.replace("/signin");
  };

  const handleVerify = async () => {
    const otp = `${one}${two}${three}${four}`;
    if (otp.length < 4) {
      Alert.alert("Incomplete Code", "Please enter all 4 digits.");
      return;
    }

    setLoading(true);
    // Dummy delay to simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Password reset successfully!");
      router.replace("/signin");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleReturn}>
        <Image
          source={require("../../assets/arrow_back.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.paragraph}>We have sent a code to your email</Text>
      <Text style={styles.paragraph}>{email ?? "example@gmail.com"}</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.inputBox}>
              <TextInput
                ref={input1Ref}
                style={styles.input}
                maxLength={1}
                keyboardType="number-pad"
                value={one}
                onChangeText={(text) => {
                  setOne(text);
                  if (text) input2Ref.current.focus();
                }}
              />
              <TextInput
                ref={input2Ref}
                style={styles.input}
                maxLength={1}
                keyboardType="number-pad"
                value={two}
                onChangeText={(text) => {
                  setTwo(text);
                  if (text) input3Ref.current.focus();
                  else input1Ref.current.focus();
                }}
              />
              <TextInput
                ref={input3Ref}
                style={styles.input}
                maxLength={1}
                keyboardType="number-pad"
                value={three}
                onChangeText={(text) => {
                  setThree(text);
                  if (text) input4Ref.current.focus();
                  else input2Ref.current.focus();
                }}
              />
              <TextInput
                ref={input4Ref}
                style={styles.input}
                maxLength={1}
                keyboardType="number-pad"
                value={four}
                onChangeText={(text) => {
                  setFour(text);
                  if (!text) input3Ref.current.focus();
                }}
                onSubmitEditing={handleVerify}
              />
            </View>

            <Text style={styles.noCode}>
              Didn't receive code?
              <Text style={{ fontFamily: "Poppins_600SemiBold" }}> Resend</Text>
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.authText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Loading visible={loading} />
    </SafeAreaView>
  );
}

export default ForgotPassword;
