import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./_shopStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


const foods = [
  {
    id: 1,
    address: "Dominico Ede Road",
    restaurantId: 1,
    name: "1 Portion of rice",
    image: require("../assets/rice.png"),
    price: 400,
    menu: ["Sides", "Special Menu", "General"],
  },
  {
    id: 2,
    restaurantId: 1,
    name: "1 portion of beans",
    image: require("../assets/beans.png"),
    price: 400,
  },
  {
    id: 3,
    restaurantId: 1,
    name: "White Spaghetti",
    image: require("../assets/spag.png"),
    price: 400,
  },
  {
    id: 4,
    restaurantId: 1,
    name: "1 portion of jollof rice",
    image: require("../assets/jollofRice.png"),
    price: 400,
  },
  {
    id: 5,
    restaurantId: 1,
    name: "1 portion of fried rice",
    image: require("../assets/friedrice.png"),
    price: 400,
  },
  {
    id: 6,
    restaurantId: 1,
    name: "Yam Porridge",
    image: require("../assets/YamPorridge.png"),
    price: 400,
  },
  {
    id: 7,
    restaurantId: 1,
    name: "Stir fry",
    image: require("../assets/stirfry.png"),
    price: 1500,
  },
];

export default function RestaurantFoods() {
  const { restaurantName } = useLocalSearchParams();
  const decodedName = decodeURIComponent(restaurantName);
  const [menuType, setMenuType] = useState("Sides");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState({}); 
  const router = useRouter();

  const restaurantAddress = foods[0].address;
  const menu = foods[0].menu;

  const handleReturn = () => router.back();

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleCloseBanner = () => {
    setSelectedItem(null);
  };

  const handleAddItem = async () => {
    if (!selectedItem) return;
  
    setOrders((prev) => ({
      ...prev,
      [selectedItem.id]: {
        food: selectedItem.name,
        price: selectedItem.price,
        quantity,
        image: selectedItem.image
      },
    }));

    setSelectedItem(null);
    alert("added");
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const hasOrders = Object.keys(orders).length > 0; 

  const handleCheckout = () => {
    router.push({
      pathname: "/checkout",
      params: { orders: JSON.stringify(orders),
        restaurantName
       },
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={20}
        onPress={() => handleReturn()}
        style={styles.backArrow}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{decodedName}</Text>
        <Ionicons
          name="information-circle-outline"
          size={20}
          style={styles.info}
        />
      </View>
      <Text style={styles.address}>{restaurantAddress}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuTabs}
      >
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <Text
              style={[
                styles.menuItem,
                menuType === item && styles.activeMenuItem,
              ]}
              onPress={() => setMenuType(item)}
            >
              {item}
            </Text>
            {index !== menu.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </ScrollView>

      {menuType === "Sides" && (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.foodContainer}>
                <Image source={item.image} style={styles.foodImg} />
                <View style={styles.foodDetails}>
                  <Text style={styles.detailsTxt}>{item.name}</Text>
                  <Text style={styles.detailsTxt}>₦{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal visible={!!selectedItem} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={handleCloseBanner} />
        <View style={styles.banner}>
          <View style={styles.ruler}></View>
          <Image source={selectedItem?.image} style={styles.bannerImg} />
          <Text style={styles.bannerName}>{selectedItem?.name}</Text>
          <Text style={styles.bannerPrice}>₦{selectedItem?.price}</Text>

          <View style={styles.purchaseContainer}>
            <View style={styles.quantityContainer}>
              <Ionicons name="remove" size={24} onPress={decreaseQty} />
              <Text style={styles.quantityTxt}>{quantity}</Text>
              <Ionicons name="add" size={24} onPress={increaseQty} />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addButtonTxt}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {!selectedItem && hasOrders && (
        <TouchableOpacity style={styles.checkoutButton} onPress={()  => handleCheckout ()}>
          <Text style={styles.checkoutText}>Proceed to Order Items</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
