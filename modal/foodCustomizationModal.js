import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderContext } from "../contexts/orderContext";

export default function FoodCustomizationModal({
  visible,
  item,
  sides = [],
  onClose,
}) {
  if (!item) return null;
  const { addItem } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(1);
  const [sideQuantities, setSideQuantities] = useState({});

  const incrementSide = (sideId) => {
    setSideQuantities((prev) => ({
      ...prev,
      [sideId]: (prev[sideId] || 0) === 0 ? 1 : (prev[sideId] || 1) * 2,
    }));
  };

  const decrementSide = (sideId) => {
    setSideQuantities((prev) => {
      const current = prev[sideId] || 0;
      if (current === 0 || current === 1) {
        return { ...prev, [sideId]: 0 };
      }
      return { ...prev, [sideId]: Math.floor(current / 2) };
    });
  };

  const calculateTotalPrice = () => {
    let total = item.price * quantity;
    Object.keys(sideQuantities).forEach((sideId) => {
      if (sideQuantities[sideId] > 0) {
        const side = sides.find(s => s.id === sideId);
        if (side) {
          total += side.price * sideQuantities[sideId];
        }
      }
    });
    return total;
  };

  const handleAddToOrder = () => {
    addItem({ ...item, quantity });
    Object.keys(sideQuantities).forEach((sideId) => {
      if (sideQuantities[sideId] > 0) {
        const side = sides.find(s => s.id === sideId);
        if (side) {
          addItem({ ...side, quantity: sideQuantities[sideId] });
        }
      }
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="chevron-down" size={30} color="#666" />
          </TouchableOpacity>

          <Image source={item.image} style={styles.mainImage} />

          <View style={styles.details}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>₦{item.price}</Text>

            <Text style={styles.sectionTitle}>Goes well with</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sidesScroll}
            >
              {sides.map((side) => {
                const sideQty = sideQuantities[side.id] || 0;
                return (
                  <View key={side.id} style={styles.sideCard}>
                    {/* Product Image Area */}
                    <View style={styles.imageWrapper}>
                      <Image style={styles.sideImg} source={side.image} />

                      {/* Floating Quantity Selector */}
                      <View style={styles.quantityContainer}>
                        {sideQty === 0 ? (
                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => incrementSide(side.id)}
                          >
                            <Text style={styles.buttonText}>+</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.counterRow}>
                            <TouchableOpacity
                              onPress={() => decrementSide(side.id)}
                              style={styles.counterBtn}
                            >
                              <Text style={styles.counterBtnText}>—</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{sideQty}</Text>

                            <TouchableOpacity
                              onPress={() => incrementSide(side.id)}
                              style={styles.counterBtn}
                            >
                              <Text style={styles.counterBtnText}>+</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Product Details */}
                    <View style={styles.infoContainer}>
                      <Text style={styles.sideName}>{side.name}</Text>
                      <Text style={styles.sideDesc}>
                        {side.description || "1pc"}
                      </Text>
                      <Text style={styles.sidePrice}>₦{side.price}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity === 1) {
                    onClose();
                  } else {
                    setQuantity(quantity === 2 ? 1 : Math.floor(quantity / 2));
                  }
                }}
              >
                <Ionicons name="remove" size={20} color="#4A90E2" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity * 2)}>
                <Ionicons name="add" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddToOrder}>
              <Text style={styles.addBtnText}>Add to order</Text>
              <Text style={styles.addBtnText}>₦{calculateTotalPrice()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "85%",
  },
  closeBtn: { alignSelf: "center", marginVertical: 10 },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  details: { padding: 20 },
  itemName: { fontSize: 20, fontWeight: "800" },
  itemDesc: { fontSize: 14, color: "#666", marginTop: 5 },
  itemPrice: {
    color: "#4A90E2",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  sidesScroll: { marginVertical: 10 },
  sideCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageWrapper: {
    width: "100%",
    height: 120,
    position: "relative",
  },
  sideImg: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  quantityContainer: {
    position: "absolute",
    bottom: -15,
    right: 10,
    backgroundColor: "#eff7ff",
    borderRadius: 15,
    minWidth: 40,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  addButton: {
    width: 40,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  counterBtn: {
    padding: 5,
  },
  counterBtnText: {
    fontSize: 18,
    color: "#4A90E2",
    fontWeight: "600",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  buttonText: {
    fontSize: 24,
    color: "#4A90E2",
    fontWeight: "300",
  },
  infoContainer: {
    padding: 12,
    paddingTop: 20,
  },
  sideName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  sideDesc: {
    fontSize: 12,
    color: "#888",
    marginVertical: 4,
  },
  sidePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    backgroundColor: "#F0F7FF",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  qtyText: { marginHorizontal: 15, fontWeight: "700" },
  addBtn: {
    flex: 1,
    backgroundColor: "#4A90E2",
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  addBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
});
