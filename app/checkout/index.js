import React, { useState, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./checkoutStyles";

export default function Checkout() {
  const { orders, restaurantName } = useLocalSearchParams();
  const parsedOrders = JSON.parse(orders);
  const [expiry, setExpiry] = useState("");
  const [tab, setTab] = useState("orders");
  const [serviceFee, setServiceFee] = useState(500);
  const [deliveryFee, setDeliveryFee] = useState(1500);
  const [discount, setDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [accountNumber, setAccountNumber] = useState("123456789");
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(parsedOrders);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [card, setCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const router = useRouter();

  useEffect(() => {
    let newTotal = 0;
    for (const key in cart) {
      const item = cart[key];
      newTotal += item.price * item.quantity;
    }
    newTotal += serviceFee + deliveryFee;
    newTotal -= discount;
    setTotal(newTotal);
  }, [cart, serviceFee, deliveryFee, discount]);

  const handleQuantityChange = (key, change) => {
    setCart((prev) => {
      const updated = { ...prev };
      const newQty = updated[key].quantity + change;
      if (newQty <= 0) {
        delete updated[key];
      } else {
        updated[key].quantity = newQty;
      }
      return updated;
    });
  };

  const handleAccountCopy = async (text) => {
    await Clipboard.setStringAsync(text.toString());
    Alert.alert("Copied!");
  };

  const cartArray = Object.keys(cart).map((key) => ({
    key,
    ...cart[key],
  }));

  const checkoutOrders = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <Image source={item.image} style={styles.itemImg} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.food}</Text>
          <Text style={styles.itemName}>₦{item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.key, -1)}
            style={styles.qtyBtn}
          >
            <Ionicons name="remove" size={15} color="#000" />
          </TouchableOpacity>

          <Text style={styles.qtyCount}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => handleQuantityChange(item.key, 1)}
            style={styles.qtyBtn}
          >
            <Ionicons name="add" size={15} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const handleExpiryChange = (text) => {
    let cleaned = text.replace(/\D/g, ""); // remove non-digits
    const originalExpiry = cleaned;
    // Limit to 4 digits max (MMYY)
    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);

    // Validate month as you type
    if (cleaned.length >= 2) {
      const month = parseInt(cleaned.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        // invalid month → alert once, then clear
        Alert.alert("Invalid month", "Month must be between 01 and 12");
        cleaned = "";
      }
    }

    // Auto-insert slash after MM
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + " / " + cleaned.slice(2);
    }

    setExpiry(cleaned);
    setExpiryDate(originalExpiry);
  };
  const handleCardNumberChange = (text) => {
    let cleaned = text.replace(/\D/g, "");
    const originalCard = cleaned;
    if (cleaned.length > 16) cleaned = cleaned.slice(0, 19);
    let formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(formatted);
    setCard(originalCard);
  };


  const handleCardPayment = () => {
      const transactionId = 12345;
    console.log("details:", {
      "card" : card,
      "expiry": expiryDate,
      "cvv" : cvv,
    })

      router.replace({
    pathname: "/success",
    params: {
      total,
      paymentMethod: paymentType,
      transactionId
    },
  });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeaderContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.pageHeader}>Checkout</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab("orders")} style={styles.tab}>
          <Text style={[styles.tabTxt, tab === "orders" && styles.active]}>
            Your orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("payment")} style={styles.tab}>
          <Text style={[styles.tabTxt, tab === "payment" && styles.active]}>
            Payment & Delivery
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabHeader}>
        {tab === "orders" ? (
          <Text style={styles.tabHeaderTxt}>Order Details</Text>
        ) : (
          <Text style={styles.tabHeaderTxt}>Payment Details</Text>
        )}
      </View>

      {tab === "orders" && (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              <Text style={styles.restaurantName}>{restaurantName}</Text>

              {cartArray.map((item) => (
                <View key={item.key}>{checkoutOrders({ item })}</View>
              ))}

              <View style={styles.promoCodeContainer}>
                <TextInput
                  style={styles.promoCode}
                  placeholder="FOODDASH"
                ></TextInput>
                <TouchableOpacity>
                  <Text style={styles.apply}>Apply</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.discount}>-{discount}</Text>
              <View style={styles.fees}>
                <Text style={styles.feeTxt}>Service Fee</Text>
                <Text style={styles.feeTxt}>{serviceFee}</Text>
              </View>
              <View style={styles.fees}>
                <Text style={styles.feeTxt}>Delivery Fee</Text>
                <Text style={styles.feeTxt}>{deliveryFee}</Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.totalTxt}>TOTAL</Text>
                <Text style={styles.totalTxt}>₦{total}</Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={styles.pay}
            onPress={() => setTab("payment")}
          >
            <Text style={styles.payTxt}>Pay</Text>
          </TouchableOpacity>
        </>
      )}

      {tab === "payment" && (
        <>
          {paymentType === "transfer" ? (
            <View>
              <Text style={styles.paymentTitle}>Transfer</Text>
              <View style={styles.transferContainer}>
                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Account name</Text>
                  <Text style={styles.transfer}>*******</Text>
                </View>

                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Account number</Text>
                  <View style={styles.copyContainer}>
                    <Text style={styles.transfer}>{accountNumber}</Text>
                    <TouchableOpacity
                      onPress={() => handleAccountCopy(accountNumber)}
                    >
                      <Ionicons name="copy-outline" size={22} color="#429EEE" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Amount</Text>
                  <View style={styles.copyContainer}>
                    <Text style={styles.transfer}>₦{total}</Text>
                    <TouchableOpacity onPress={() => handleAccountCopy(total)}>
                      <Ionicons name="copy-outline" size={22} color="#429EEE" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.paidContainer} onPress={() => confirmPayment()}>
                  <Ionicons
                    name="checkmark-circle"
                    color={"#1E88E5"}
                    size={30}
                  />

                  <Text style={styles.link}>I have paid</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : paymentType === "ussd" ? (
            <View>
              <Text style={styles.paymentTitle}>USSD</Text>
              <Text style={styles.ussdInfo}>Use your bank's ussd code.</Text>
              <Text style={styles.ussdInfo}>
                Below is our bank account details
              </Text>
              <View style={styles.transferContainer}>
                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Account name</Text>
                  <Text style={styles.transfer}>*******</Text>
                </View>

                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Account number</Text>
                  <View style={styles.copyContainer}>
                    <Text style={styles.transfer}>{accountNumber}</Text>
                    <TouchableOpacity
                      onPress={() => handleAccountCopy(accountNumber)}
                    >
                      <Ionicons name="copy-outline" size={22} color="#429EEE" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.transferDetails}>
                  <Text style={styles.transfer}>Amount</Text>
                  <View style={styles.copyContainer}>
                    <Text style={styles.transfer}>₦{total}</Text>
                    <TouchableOpacity onPress={() => handleAccountCopy(total)}>
                      <Ionicons name="copy-outline" size={22} color="#429EEE" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={[styles.ussdInfo, styles.bankInfo]}>
                Dont't know your bank's ussd code?
              </Text>
              <Text style={styles.ussdInfo}>
                Check{" "}
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL("https://www.google.com")}
                >
                  Here
                </Text>
              </Text>
              <View style={styles.paidContainer}>
                <TouchableOpacity>
                  <Ionicons
                    name="checkmark-circle"
                    color={"#1E88E5"}
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={styles.link}>I have paid</Text>
              </View>
            </View>
          ) : paymentType === "card" ? (
            <View>
              <Text style={styles.paymentTitle}>Card</Text>
              <Text style={styles.cardInfo}>
                Enter your Card Details to Pay
              </Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CARD NUMBER</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  maxLength={22}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.half]}>
                  <Text style={styles.label}>CARD EXPIRY</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM / YY"
                    keyboardType="numeric"
                    maxLength={7}
                    value={expiry}
                    onChangeText={handleExpiryChange}
                  />
                </View>
                <View style={[styles.inputGroup, styles.half]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="000"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    value={cvv}
                    onChangeText={(text)=> setCvv(text)}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.confirm} onPress={() =>handleCardPayment()}>
                <Text style={styles.confirmTxt}>Pay</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.paymentTitle}>Location</Text>
              <Text style={styles.paymentInfo}>
                Kindly confirm location and keep your phone turned on
              </Text>
              <View style={styles.locationContainer}>
                <Ionicons name="navigate-outline" size={20} />
                <Text>Moremi Hostel</Text>
              </View>

              <Text style={styles.paymentTypes}>Pay With</Text>
              <TouchableOpacity
                style={styles.paymentType}
                onPress={() => setPaymentType("transfer")}
              >
                <Image
                  source={require("../../assets/transfer.png")}
                  style={styles.paymentImg}
                />
                <Text>Transfer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentType}
                onPress={() => setPaymentType("ussd")}
              >
                <Image
                  source={require("../../assets/ussd.png")}
                  style={styles.paymentImg}
                />
                <Text>USSD</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentType}
                onPress={() => setPaymentType("card")}
              >
                <Image
                  source={require("../../assets/card.png")}
                  style={styles.paymentImg}
                />
                <Text>Card</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
