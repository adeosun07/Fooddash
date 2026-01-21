import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../contexts/authContext";
import { loginRequest } from "../../services/authServices";

export default function LoginScreen() {
  const router = useRouter();
  const { loginCustomer } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!form.phone || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginRequest({
        phone: form.phone,
        password: form.password,
        role: "customer",
      });

      if (response.token && response.user) {
        await loginCustomer(response.token);
        router.replace("/(customer)/home");
      } else {
        Alert.alert("Error", "Login failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* Original commented logic:
  const handleLogin = () => {
    // Logic for authentication goes here
    console.log("Logging in with:", form.phone);
  };
  */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to continue.</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                placeholder="08012345678"
                keyboardType="phone-pad"
                style={styles.input}
                value={form.phone}
                onChangeText={(val) => setForm({ ...form, phone: val })}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                placeholder="gQgjhdl-"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={form.password}
                onChangeText={(val) => setForm({ ...form, password: val })}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#A0A0A0" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>{isLoading ? "Logging in..." : "Log In"}</Text>
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>

          {/* Footer Navigation */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Fooddash? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signupLink}>Create an account</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    justifyContent: "center",
    flexGrow: 1,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4A90E2",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#707070",
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    height: 60,
    borderRadius: 30, // Fully rounded look from screenshot
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  forgotContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },
  footerText: {
    color: "#707070",
    fontSize: 14,
  },
  signupLink: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "700",
  },
});

/* import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";

export const useLogin = () => {
  const { loginCustomer, loginRider } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password, role }) => {
    try {
      setLoading(true);

      const data = await loginRequest({ email, password, role });

      if (role === "customer") {
        await loginCustomer(data.token);
        router.replace("/(customer-tabs)");
      } else {
        await loginRider(data.token);
        router.replace("/(rider-tabs)");
      }
    } catch (error) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
 */