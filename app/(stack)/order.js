import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { OrderContext } from '../../contexts/orderContext';
import { ShopContext } from '../../contexts/shopContext';

export default function OrderScreen() {
  const router = useRouter();
  const { vendorId } = useLocalSearchParams();
  const { orders, getTotal, updateItemQuantity, addItem } = useContext(OrderContext);
  const { getVendorById } = useContext(ShopContext);
  const vendor = vendorId ? getVendorById(vendorId) : null;
  const [note, setNote] = useState('');

  const handleUpdateQty = (index, delta) => {
    updateItemQuantity(index, delta);
  };

  const handleAddRecommendation = (item) => {
    addItem(item);
  };

  const handleAddMore = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Vendor Info & Add More */}
        {vendor && (
          <View style={styles.vendorRow}>
            <View>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <Text style={styles.orderLabel}>Order items</Text>
            </View>
            <TouchableOpacity style={styles.addMoreBtn} onPress={handleAddMore}>
              <Ionicons name="add" size={16} color="#4A90E2" />
              <Text style={styles.addMoreText}>Add more items</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Cart Items */}
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.itemCard}>
              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => handleUpdateQty(index, -1)}>
                  <Ionicons name="remove" size={18} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => handleUpdateQty(index, 1)}>
                  <Ionicons name="add" size={18} color="#4A90E2" />
                </TouchableOpacity>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₦{item.price * (item.quantity || 1)}</Text>
              </View>
              {item.image && (
                <Image source={item.image} style={styles.itemImg} />
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No items in order</Text>
        )}

        {/* Note to Vendor */}
        <Text style={styles.sectionTitle}>Drop a note for the Dash vendor</Text>
        <View style={styles.noteInputContainer}>
          <MaterialCommunityIcons name="store-outline" size={20} color="#A0A0A0" />
          <TextInput
            placeholder="Add instructions, special requests..."
            style={styles.noteInput}
            placeholderTextColor="#A0A0A0"
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Recommendations Section */}
        <Text style={styles.sectionTitle}>You might also like</Text>
        {vendor && vendor.menu ? (
          <View style={styles.recommendGrid}>
            {vendor.menu.meals &&
              vendor.menu.meals.map((item) => (
                <View key={`meal-${item.id}`} style={styles.recommendCard}>
                  {item.image ? (
                    <Image source={item.image} style={styles.recommendImg} />
                  ) : (
                    <View style={[styles.recommendImg, { backgroundColor: '#F0F7FF' }]} />
                  )}
                  <TouchableOpacity
                    style={styles.smallAddBtn}
                    onPress={() => handleAddRecommendation(item)}
                  >
                    <Ionicons name="add" size={16} color="#4A90E2" />
                  </TouchableOpacity>
                  <Text style={styles.recommendName}>{item.name}</Text>
                  <Text style={styles.recommendDesc}>{item.description}</Text>
                  <Text style={styles.recommendPrice}>₦{item.price}</Text>
                </View>
              ))}
            {vendor.menu.sides &&
              vendor.menu.sides.map((item) => (
                <View key={`side-${item.id}`} style={styles.recommendCard}>
                  {item.image ? (
                    <Image source={item.image} style={styles.recommendImg} />
                  ) : (
                    <View style={[styles.recommendImg, { backgroundColor: '#F0F7FF' }]} />
                  )}
                  <TouchableOpacity
                    style={styles.smallAddBtn}
                    onPress={() => handleAddRecommendation(item)}
                  >
                    <Ionicons name="add" size={16} color="#4A90E2" />
                  </TouchableOpacity>
                  <Text style={styles.recommendName}>{item.name}</Text>
                  <Text style={styles.recommendDesc}>{item.description}</Text>
                  <Text style={styles.recommendPrice}>₦{item.price}</Text>
                </View>
              ))}
          </View>
        ) : null}
      </ScrollView>

      {/* Sticky Bottom Checkout */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/(stack)/checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to checkout</Text>
          <Text style={styles.checkoutText}>₦{getTotal()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backBtn: {},
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  vendorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  vendorName: { fontSize: 18, fontWeight: '800', color: '#333' },
  orderLabel: { fontSize: 13, color: '#707070', marginTop: 4 },
  addMoreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7FF', padding: 8, borderRadius: 20 },
  addMoreText: { color: '#4A90E2', fontSize: 11, fontWeight: '600', marginLeft: 4 },
  itemCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7FF', padding: 8, borderRadius: 10, width: 85, justifyContent: 'space-between' },
  qtyText: { fontWeight: '700', color: '#4A90E2' },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 15, fontWeight: '700', color: '#333' },
  itemPrice: { fontSize: 14, color: '#4A90E2', fontWeight: '600', marginTop: 4 },
  itemImg: { width: 60, height: 45, borderRadius: 8 },
  emptyText: { fontSize: 14, color: '#A0A0A0', textAlign: 'center', marginVertical: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginTop: 25, marginBottom: 15, color: '#333' },
  noteInputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F2F2F2', paddingBottom: 10 },
  noteInput: { flex: 1, marginLeft: 10, fontSize: 13, color: '#333' },
  recommendGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recommendCard: { width: '48%', marginBottom: 20 },
  recommendImg: { width: '100%', height: 100, borderRadius: 15 },
  smallAddBtn: { position: 'absolute', top: 75, right: 10, backgroundColor: '#FFF', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  recommendName: { fontSize: 14, fontWeight: '700', marginTop: 8, color: '#333' },
  recommendDesc: { fontSize: 11, color: '#A0A0A0', marginVertical: 4 },
  recommendPrice: { fontSize: 14, fontWeight: '700', color: '#4A90E2' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', padding: 20, borderTopWidth: 1, borderTopColor: '#F2F2F2' },
  checkoutBtn: { backgroundColor: '#4A90E2', height: 55, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
