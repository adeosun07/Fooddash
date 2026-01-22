import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ShopContext } from "../../contexts/shopContext";
import FoodCustomizationModal from "../../modal/foodCustomizationModal";
import { OrderContext } from "../../contexts/orderContext";

export default function VendorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getVendorById } = useContext(ShopContext);
  const vendor = getVendorById(id);
  const [activeTab, setActiveTab] = useState("Meals");
  const [selectedItem, setSelectedItem] = useState(null);
  const { orders, addItem } = useContext(OrderContext);

  if (!vendor) return <Text>Vendor not found</Text>;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        {/* Header UI (Images and Vendor Info) */}
        <View style={styles.imageContainer}>
          <Image source={vendor.image} style={styles.headerImage} />
          <View style={styles.headerOverlay} pointerEvents="box-none">
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={20} color="#4A90E2" />
              </TouchableOpacity>
              <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color="#A0A0A0" />
                <TextInput
                  placeholder="search"
                  style={styles.searchInput}
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => {
                  /* share action */
                }}
              >
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#4A90E2"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.vendorTags}>{vendor.tags.join(" • ")}</Text>
          <Text style={styles.status}>
            ★ {vendor.rating} • {vendor.status} • Opens at {vendor.openingTime}
          </Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {["Meals", "Sides", "Special Menus"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items List */}
        {vendor.menu[activeTab.toLowerCase()].map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDesc}>{item.description}</Text>
              <Text style={styles.foodPrice}>₦{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.foodImageWrapper}
               onPress={() => {
                  setSelectedItem(item);
                  addItem(item);
                }}>
              <Image source={item.image} style={styles.foodImage} />
              <View
                style={styles.addButton}
              >
                <Text style={styles.addIcon}>+</Text>
              </View>
            </TouchableOpacity>
              
          </View>
        ))}
      </ScrollView>

      {/* Floating Check Order Button */}
      {(selectedItem || orders.length > 0) && (
        <TouchableOpacity style={styles.checkOrderBtn}>
          <Text style={styles.checkOrderLabel}>Check Order</Text>
          <Text style={styles.checkOrderText}>
            {selectedItem
              ? `₦${selectedItem.price}`
              : `₦${orders.reduce((s, i) => s + (i.price || 0), 0)}`}
          </Text>
        </TouchableOpacity>
      )}

      <FoodCustomizationModal
        visible={!!selectedItem}
        item={selectedItem}
        sides={vendor.menu.sides || []}
        onClose={() => setSelectedItem(null)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerImage: {
    width: "100%",
    height: Dimensions.get("window").height * 0.4,
    resizeMode: "cover",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "#EEE",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  searchBox: {
    width: "70%",
    height: 42,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#333",
  },
  headerInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  vendorName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
  },
  vendorTags: {
    fontSize: 14,
    color: "#707070",
    marginTop: 5,
    textAlign: "center",
  },
  status: {
    fontSize: 13,
    color: "#4A90E2",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  tab: {
    marginRight: 25,
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#4A90E2",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#A0A0A0",
  },
  activeTabText: {
    color: "#4A90E2",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F9F9F9",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  foodDesc: {
    fontSize: 13,
    color: "#707070",
    marginVertical: 4,
    lineHeight: 18,
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  foodImageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    marginLeft: 15,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  addButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  addIcon: {
    fontSize: 20,
    color: "#4A90E2",
    fontWeight: "bold",
  },
  checkOrderBtn: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#4A90E2",
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    // Shadow for the floating effect
    elevation: 8,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  checkOrderLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  checkOrderText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
