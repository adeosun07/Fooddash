import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "../tabStyles/_cartStyles";

export default function Cart() {
  const [tab, setTab] = useState("Cart");
  const [ongoing, setOngoing] = useState(true);
  const [finished, setFinished] = useState(false);

  const orders = [
    {
      id: "1",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "2",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "3",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "4",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "5",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "6",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
    {
      id: "7",
      restaurantImg: require("../assets/cuishy_cuisine.png"),
      quantity: 4,
      price: 1500,
      restaurantName: "Cuishy Cuisine",
      location: "Awo Hall, OAU",
    },
  ];

  const hasOrders = orders.length > 0;

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>

      <View style={styles.orderRow}>
        <Image source={item.restaurantImg} style={styles.restaurantImg} />
        <View style={styles.orderDetails}>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <View style={styles.qtyPrice}>
            <Text style={styles.quantity}>{item.quantity} item</Text>
            <View style={styles.separator}></View>
            <Text style={styles.price}>₦{item.price}</Text>
          </View>

          <Text style={styles.location}>Location: {item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearButton}>
                <Text style={styles.clearText}>Clear Cart</Text>
              </TouchableOpacity>
    </View>
  );
  const renderOngoing = ({ item }) => (
    <View style={styles.ongoingOrderCard}>
      <View style={styles.orderRow}>
        <Image source={item.restaurantImg} style={styles.orderRestaurantImg} />
        <View style={styles.orderDetails}>
          <Text style={styles.orderRestaurantName}>{item.restaurantName}</Text>
          <View style={styles.orderQtyPrice}>
            <Text style={styles.orderPrice}>₦{item.price}</Text>
            <Text style={styles.orderQuantity}>{item.quantity} item</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.trackOrder}>
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelOrder}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderFinished = ({ item }) => (
      <View style={styles.orderRow}>
        <Image source={item.restaurantImg} style={styles.orderRestaurantImg} />
        <View style={styles.orderDetails}>
          <Text style={styles.orderRestaurantName}>{item.restaurantName}</Text>
          <View style={styles.orderQtyPrice}>
            <Text style={styles.orderPrice}>₦{item.price}</Text>
            <Text style={styles.orderQuantity}>{item.quantity} item</Text>
          </View>
        </View>
      </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.header}>My Orders</Text>

      <View style={styles.tabRow}>
        {["Cart", "Ongoing", "Finished"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.tabItem, tab === item && styles.activeTab]}
            onPress={() => setTab(item)}
          >
            <Text
              style={[styles.tabText, tab === item && styles.activeTabText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "Cart" && (
        <>
          {hasOrders ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrder}
                contentContainerStyle={styles.orderList}
                showsVerticalScrollIndicator={false}
              />
              
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Image
                source={require("../assets/cart.png")}
                style={styles.cartImage}
              />
              <Text style={styles.emptyText}>Your Cart is Empty</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to your cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {tab === "Ongoing" && (
        <>
          {ongoing ? (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={renderOngoing}
              contentContainerStyle={styles.orderList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyCart}>
              <Image
                source={require("../assets/ongoing.png")}
                style={styles.cartImage}
              />
              <Text style={styles.emptyText}>Nothing is going on</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {tab === "Finished" && (
        <>
        {
          finished ? (
             <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={renderFinished}
              contentContainerStyle={styles.orderList}
              showsVerticalScrollIndicator={false}
            />
          ): (
            <View>
              <Text>Finished</Text>
            </View>
          )
        }
        </>
      )}
    </SafeAreaView>
  );
}
