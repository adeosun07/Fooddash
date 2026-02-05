import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export { UserContext };

export const UserProvider = ({ children }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    defaultAddressId: null,
    notificationsEnabled: true,
    darkModeEnabled: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from AsyncStorage on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const [addressesData, preferencesData] = await Promise.all([
        AsyncStorage.getItem("savedAddresses"),
        AsyncStorage.getItem("userPreferences"),
      ]);

      if (addressesData) {
        setSavedAddresses(JSON.parse(addressesData));
      }
      if (preferencesData) {
        setUserPreferences(JSON.parse(preferencesData));
      }
    } catch (error) {
      console.log("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAddress = async (address) => {
    try {
      const newAddress = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...address,
      };

      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses);
      await AsyncStorage.setItem(
        "savedAddresses",
        JSON.stringify(updatedAddresses)
      );
      return newAddress;
    } catch (error) {
      console.log("Error saving address:", error);
      throw error;
    }
  };

  const updateAddress = async (addressId, updatedData) => {
    try {
      const updatedAddresses = savedAddresses.map((addr) =>
        addr.id === addressId ? { ...addr, ...updatedData } : addr
      );
      setSavedAddresses(updatedAddresses);
      await AsyncStorage.setItem(
        "savedAddresses",
        JSON.stringify(updatedAddresses)
      );
    } catch (error) {
      console.log("Error updating address:", error);
      throw error;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const updatedAddresses = savedAddresses.filter(
        (addr) => addr.id !== addressId
      );
      setSavedAddresses(updatedAddresses);
      await AsyncStorage.setItem(
        "savedAddresses",
        JSON.stringify(updatedAddresses)
      );

      // If deleted address was current, clear it
      if (currentAddress?.id === addressId) {
        setCurrentAddress(null);
      }
    } catch (error) {
      console.log("Error deleting address:", error);
      throw error;
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const updatedPreferences = {
        ...userPreferences,
        defaultAddressId: addressId,
      };
      setUserPreferences(updatedPreferences);
      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(updatedPreferences)
      );
    } catch (error) {
      console.log("Error setting default address:", error);
      throw error;
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      const updatedPreferences = { ...userPreferences, ...preferences };
      setUserPreferences(updatedPreferences);
      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(updatedPreferences)
      );
    } catch (error) {
      console.log("Error updating preferences:", error);
      throw error;
    }
  };

  const value = {
    // State
    savedAddresses,
    currentAddress,
    userPreferences,
    isLoading,

    // Actions
    saveAddress,
    updateAddress,
    deleteAddress,
    setCurrentAddress,
    setDefaultAddress,
    updatePreferences,
    loadUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
