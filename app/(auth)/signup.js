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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/authContext";
import { signupRequest } from "../../services/authServices";

export default function SignupScreen() {
  const router = useRouter();
  const { loginCustomer } = useAuth();
  const [role, setRole] = useState("order"); // 'order' or 'earn'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    if (!form.name || !form.phone || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await signupRequest({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: role === "order" ? "customer" : "rider",
      });

      if (response.token && response.user) {
        await loginCustomer(response.token);
        // Navigation will be handled automatically by the auth context
      } else {
        Alert.alert("Error", "Signup failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* Original commented logic:
  const signup = async ({
    name,
    email,
    password,
    phone,
    role,
  }) => {
    try {
      setLoading(true);

      const data = await signupRequest({
        name,
        email,
        password,
        phone,
        role,
      });

      if (role === "customer") {
        await loginCustomer(data.token);
        router.replace("/(customer-tabs)");
      } else {
        await loginRider(data.token);
        router.replace("/(rider-tabs)");
      }
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create a Fooddash Account</Text>
            <Text style={styles.subtitle}>Sign up to start ordering or earning.</Text>
          </View>

          {/* Role Selector */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleTab, role === "order" && styles.activeTab]}
              onPress={() => setRole("order")}
            >
              <Ionicons 
                name="wine-outline" 
                size={22} 
                color={role === "order" ? "#FFF" : "#A0A0A0"} 
              />
              <Text style={[styles.roleText, role === "order" && styles.activeRoleText]}>Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleTab, role === "earn" && styles.activeTab]}
              onPress={() => setRole("earn")}
            >
              <MaterialCommunityIcons 
                name="bicycle" 
                size={22} 
                color={role === "earn" ? "#FFF" : "#A0A0A0"} 
              />
              <Text style={[styles.roleText, role === "earn" && styles.activeRoleText]}>Earn</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <InputLabel label="Name" />
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                placeholder="Full name"
                style={styles.input}
                value={form.name}
                onChangeText={(val) => setForm({ ...form, name: val })}
              />
            </View>

            <InputLabel label="Phone" />
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

            <InputLabel label="Email" />
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                placeholder="youremail@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={form.email}
                onChangeText={(val) => setForm({ ...form, email: val })}
              />
            </View>

            <InputLabel label="Password" />
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

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.signupButton, isLoading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>{isLoading ? "Signing up..." : "Sign Up"}</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have a Fooddash account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Simple internal component for labels
const InputLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4A90E2",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#707070",
    marginTop: 8,
    textAlign: "center",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 20,
  },
  roleTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#FFF",
    // Small shadow for inactive state
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTab: {
    backgroundColor: "#4A90E2",
  },
  roleText: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#A0A0A0",
  },
  activeRoleText: {
    color: "#FFF",
  },
  form: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
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
  signupButton: {
    backgroundColor: "#4A90E2",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#707070",
    fontSize: 14,
  },
  loginLink: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "700",
  },
});