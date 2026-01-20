import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Initialize app state from AsyncStorage
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedOnboarded = await AsyncStorage.getItem("hasOnboarded");
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUser = await AsyncStorage.getItem("user");

        setIsOnboarded(!!storedOnboarded);
        setIsSignedIn(!!storedToken);
        setAuthToken(storedToken);
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle sign in
  const signIn = async (token, userData) => {
    try {
      await AsyncStorage.setItem("authToken", token);
      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
      setIsSignedIn(true);
      setAuthToken(token);
      setUser(userData || null);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  // Handle sign out
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");
      setIsSignedIn(false);
      setAuthToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  // Handle onboarding
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      setIsOnboarded(true);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      throw error;
    }
  };

  // Update user data
  const updateUser = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const value = {
    isSignedIn,
    isOnboarded,
    loading,
    user,
    authToken,
    signIn,
    signOut,
    completeOnboarding,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
