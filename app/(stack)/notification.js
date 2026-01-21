import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NotificationContext } from '../../contexts/notificationContext';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markAllAsRead } = useContext(NotificationContext);

  if (notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.emptyContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png' }} 
            style={styles.emptyImage} 
          />
          <Text style={styles.emptyTitle}>No Notifications Yet</Text>
          <Text style={styles.emptySubtitle}>We will let you know if anything is going on</Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Start Ordering</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderGroup = (label) => {
    const groupItems = notifications.filter(n => n.group === label);
    if (groupItems.length === 0) return null;

    return (
      <View key={label} style={styles.groupSection}>
        <Text style={styles.groupLabel}>{label}</Text>
        {groupItems.map(item => (
          <View key={item.id} style={styles.notiCard}>
            {!item.isRead && <View style={styles.unreadDot} />}
            <View style={styles.notiContent}>
              <Text style={styles.notiTitle}>{item.title}</Text>
              <Text style={styles.notiBody}>{item.body}</Text>
              <Text style={styles.notiTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark all as Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {['Today', 'Yesterday', 'Earlier'].map(group => renderGroup(group))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  markReadText: { fontSize: 12, color: '#707070' },
  listContent: { paddingHorizontal: 20 },
  groupSection: { marginTop: 20 },
  groupLabel: { fontSize: 14, fontWeight: '600', color: '#A0A0A0', marginBottom: 15 },
  notiCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F2F2F2',
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  unreadDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#D32F2F', 
    marginRight: 10, 
    marginTop: 6 
  },
  notiContent: { flex: 1 },
  notiTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 4 },
  notiBody: { fontSize: 13, color: '#707070', lineHeight: 18 },
  notiTime: { fontSize: 11, color: '#C0C0C0', marginTop: 8 },
  // Empty State Styles
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyImage: { width: 120, height: 120, marginBottom: 30, opacity: 0.8 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: '#707070', textAlign: 'center', marginBottom: 30 },
  orderButton: { 
    backgroundColor: '#4A90E2', 
    width: '100%', 
    height: 55, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  orderButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});