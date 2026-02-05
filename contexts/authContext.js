import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../app/splashScreen";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // "customer" | "rider"
  const [token, setToken] = useState(null);

  // 🔹 Run once when app starts
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const customerToken = await AsyncStorage.getItem("customer_token");
        const riderToken = await AsyncStorage.getItem("rider_token");

        if (customerToken) {
          setIsLoggedIn(true);
          setRole("customer");
          setToken(customerToken);
        } else if (riderToken) {
          setIsLoggedIn(true);
          setRole("rider");
          setToken(riderToken);
        } else {
          setIsLoggedIn(false);
          setRole(null);
          setToken(null);
        }
      } catch (error) {
        console.log("Auth load error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // 🔹 Login handlers
  const loginCustomer = async (authToken) => {
    await AsyncStorage.setItem("customer_token", authToken);
    await AsyncStorage.removeItem("rider_token");

    setIsLoggedIn(true);
    setRole("customer");
    setToken(authToken);
  };

  const loginRider = async (authToken) => {
    await AsyncStorage.setItem("rider_token", authToken);
    await AsyncStorage.removeItem("customer_token");

    setIsLoggedIn(true);
    setRole("rider");
    setToken(authToken);
  };

  // 🔹 Logout (for both roles)
  const logout = async () => {
    await AsyncStorage.removeItem("customer_token");
    await AsyncStorage.removeItem("rider_token");

    setIsLoggedIn(false);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        role,
        token,
        loginCustomer,
        loginRider,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
