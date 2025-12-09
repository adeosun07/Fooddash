import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "./_successStyles"

function index(props) {
      const { total, paymentMethod, transactionId } = useLocalSearchParams();
    const router = useRouter();
    const getFormattedDateTime = () =>{
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}; ${hours}:${minutes}:${seconds}`;
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="checkmark-circle" color={"#1E88E5"} size={60} />
        <Text style={styles.normalTxt}>payment successful</Text>
        <Text style={styles.headerPrice}>₦{total}</Text>
      </View>

    <View style={styles.txnContainer}>
      <Text style={styles.txnHeader}>Transaction Details</Text>
      <View style={styles.row}>
        <Text style={[styles.smallTxt, styles.smallTxt2]}>Account Name</Text>
        <Text style={styles.smallTxt}>Fooddash</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.smallTxt, styles.smallTxt2]}>Date</Text>
        <Text style={styles.smallTxt}>{getFormattedDateTime()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.smallTxt, styles.smallTxt2]}>Means</Text>
        <Text style={styles.smallTxt}>{paymentMethod}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.smallTxt, styles.smallTxt2]}>Amount</Text>
        <Text style={styles.smallTxt}>₦{total}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.smallTxt, styles.smallTxt2]}>Transaction ID</Text>
        <Text style={styles.smallTxt}>#{transactionId}</Text>
      </View>
    </View>
      <TouchableOpacity onPress={() => router.replace("/home")} style={styles.homeContainer}>
        <Text style={styles.homeTxt}>Back to home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default index;
