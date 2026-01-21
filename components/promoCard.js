import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PromoCard() {
  return (
    <View style={styles.card}>
      <View style={styles.textSection}>
        <Text style={styles.title}>
          Invite 2 friends and get <Text style={styles.highlight}>free delivery</Text>
        </Text>
        <Text style={styles.subtitle}>Share the love of the Fooddash community 🎉</Text>
      </View>
      <Image 
        source={{ uri: 'https://picsum.photos/seed/friends/300/300' }} 
        style={styles.promoImage} 
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Free</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E1F0FF',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 10,
    height: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  textSection: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: '#4A90E2', lineHeight: 24 },
  highlight: { color: '#FF7A50' },
  subtitle: { fontSize: 12, color: '#4F4F4F', marginTop: 8 },
  promoImage: { width: 140, height: '140%', position: 'absolute', right: -10, bottom: 0 },
  badge: {
    position: 'absolute',
    top: 10,
    left: '50%',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 2,
  },
  badgeText: { color: '#FF7A50', fontWeight: 'bold', fontSize: 10 }
});