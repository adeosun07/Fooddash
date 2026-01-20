import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../tabStyles/_homeStyle";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const restaurants = [
  {
    id: 1,
    img: require("../../assets/cuishy_cuisine.png"),
    restaurantName: "Cuishy Cuisine",
    restaurantStatus: "open",
  },
  {
    id: 2,
    img: require("../../assets/glovana.png"),
    restaurantName: "Glovanna Treats",
    restaurantStatus: "open",
  },
  {
    id: 3,
    img: require("../../assets/boss_grills.png"),
    restaurantName: "Boss Grills",
    restaurantStatus: "open",
  },
  {
    id: 4,
    img: require("../../assets/banwill.png"),
    restaurantName: "Mr Banwill Cuisine",
    restaurantStatus: "open",
  },
  {
    id: 5,
    img: require("../../assets/orente_grills.png"),
    restaurantName: "Orente Foods",
    restaurantStatus: "open",
  },
];

function Index() {
  const [query, setQuery] = useState("");

  const filteredRestaurants = restaurants.filter((item) =>
    item.restaurantName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topSection}>
        <View style={styles.delivery}>
          <Text style={styles.deliveryTxt}>DELIVER TO</Text>
          <Text style={styles.deliveryLocation}>Moremi Hostel, OAU</Text>
        </View>
        <Image
          source={require("../../assets/Vector.png")}
          style={styles.settings}
        />
      </View>

      <Text style={styles.greeting}>
        Hey Tori,{" "}
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Good Afternoon</Text>
      </Text>

      <View style={styles.searchBox}>
        <Ionicons style={styles.icons} name="search" size={20} color="#989898" />
        <TextInput
          placeholder="Search for restaurant, food"
          style={styles.search}
          value={query}
          onChangeText={(text) => setQuery(text)}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons
              style={styles.icons}
              name="close-circle"
              size={20}
              color="#989898"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.ad}>
        <Text style={styles.adTxt}>Invite 2 friends and Get free Delivery</Text>
        <Text style={styles.adTxt}>Terms and Conditions apply</Text>
        <Text style={styles.adBtn}>Let's go!</Text>
      </View>

      <View style={styles.restaurants}>
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.title}>Restaurants</Text>}
          renderItem={({ item }) => (
            <Link key={item.id} href={`/restaurant/${encodeURIComponent(item.restaurantName)}`} asChild>
              <Pressable style={styles.restaurantCard}>
                {({ pressed }) => (
                  <View style={{ position: "relative" }}>
                    <Image source={item.img} style={styles.restaurantImage} />
                    {pressed && <View style={styles.overlay} />}
                    <View style={styles.textContainer}>
                      <Text style={styles.restaurantName}>
                        {item.restaurantName}
                      </Text>
                      <Text style={styles.restaurantStatus}>
                        {item.restaurantStatus}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
              No restaurant found
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default Index;
