import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FoodCustomizationModal({ visible, item, onClose }) {
  if (!item) return null;
  const [quantity, setQuantity] = useState(1);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="chevron-down" size={30} color="#666" />
          </TouchableOpacity>
          
          <Image source={{ uri: item.image }} style={styles.mainImage} />
          
          <View style={styles.details}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>₦{item.price}</Text>

            <Text style={styles.sectionTitle}>Goes well with</Text>
            {/* Horizontal list of sides as seen in your design */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.sideCard}>
                 <Image style={styles.sideImg} source={{uri: '...'}} />
                 <Text style={styles.sideName}>Turkey</Text>
                 <Text style={styles.sidePrice}>₦4500</Text>
                 <TouchableOpacity style={styles.addSide}><Ionicons name="add" size={16} color="#4A90E2"/></TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}><Ionicons name="remove" size={20} color="#4A90E2"/></TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}><Ionicons name="add" size={20} color="#4A90E2"/></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add to order</Text>
              <Text style={styles.addBtnText}>₦{item.price * quantity}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '85%' },
  closeBtn: { alignSelf: 'center', marginVertical: 10 },
  mainImage: { width: '100%', height: 200, borderRadius: 20 },
  details: { padding: 20 },
  itemName: { fontSize: 20, fontWeight: '800' },
  itemPrice: { color: '#4A90E2', fontSize: 18, fontWeight: '700', marginVertical: 5 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderColor: '#F2F2F2', alignItems: 'center' },
  counter: { flexDirection: 'row', backgroundColor: '#F0F7FF', borderRadius: 10, padding: 10, marginRight: 15 },
  qtyText: { marginHorizontal: 15, fontWeight: '700' },
  addBtn: { flex: 1, backgroundColor: '#4A90E2', height: 55, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  addBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});