import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FilterModal({ visible, onClose }) {
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const options = ['Recommended', 'Fastest Delivery', 'Lowest Price', 'Top Rated'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Sort Section */}
          <View style={styles.content}>
            <Text style={styles.sectionLabel}>SORT BY</Text>
            {options.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.optionRow, selectedSort === option && styles.activeOption]}
                onPress={() => setSelectedSort(option)}
              >
                <Text style={[styles.optionText, selectedSort === option && styles.activeOptionText]}>
                  {option}
                </Text>
                <View style={[styles.radio, selectedSort === option && styles.radioActive]}>
                  {selectedSort === option && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer Action */}
          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Show 5 Restaurants</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  title: { fontSize: 18, fontWeight: '700' },
  resetText: { color: '#4A90E2', fontWeight: '600' },
  content: { padding: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 15 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderRadius: 12, borderWidth: 1, borderColor: '#F2F2F2', marginBottom: 10 },
  activeOption: { borderColor: '#4A90E2', backgroundColor: '#F0F7FF' },
  optionText: { color: '#707070', fontSize: 14, fontWeight: '500' },
  activeOptionText: { color: '#4A90E2', fontWeight: '700' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: '#4A90E2' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A90E2' },
  applyButton: { backgroundColor: '#4A90E2', marginHorizontal: 20, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});