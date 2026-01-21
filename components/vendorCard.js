import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { VendorContext } from '../contexts/vendorContext';
import { useRouter } from 'expo-router';

export default function VendorCard({ vendor }) {
  const { toggleFavorite } = useContext(VendorContext);
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/vendor/${vendor.id}`)}>
      <View style={styles.imageWrapper}>
        <Image source={vendor.image} style={styles.image} />
        <TouchableOpacity style={styles.favoriteBtn} onPress={() => toggleFavorite(vendor.id)}>
          <Ionicons name={vendor.isFavorite ? 'heart' : 'heart-outline'} size={20} color={vendor.isFavorite ? '#FF6B6B' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.mainInfo}>
          <Text style={styles.name}>{vendor.name}</Text>
          <Text style={styles.desc}>{vendor.description}</Text>
          <View style={styles.stats}>
             <MaterialCommunityIcons name="bike" size={14} color="#707070" />
             <Text style={styles.statText}>{vendor.deliveryFee} • </Text>
             <Ionicons name="star" size={14} color="#FFD700" />
             <Text style={styles.statText}>{vendor.rating}</Text>
          </View>
        </View>
        <View style={styles.metaInfo}>
           <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{vendor.status}</Text>
           </View>
           <Text style={styles.timeText}>{vendor.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  imageWrapper: { width: '100%', height: 180, borderRadius: 20, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  favoriteBtn: { position: 'absolute', top: 15, right: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  name: { fontSize: 16, fontWeight: '700', color: '#333' },
  desc: { fontSize: 12, color: '#A0A0A0', marginVertical: 2 },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statText: { fontSize: 12, color: '#707070', marginLeft: 4 },
  statusBadge: { backgroundColor: '#E1F0FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  statusText: { color: '#4A90E2', fontSize: 12, fontWeight: '600' },
  timeText: { fontSize: 11, color: '#A0A0A0', textAlign: 'right', marginTop: 5 },
});