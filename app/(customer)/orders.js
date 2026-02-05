import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { OrderContext } from '../../contexts/orderContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
  const router = useRouter();
  const context = useContext(OrderContext);
  
  // Add safety check
  if (!context) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text>Error: Order context not available</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const { getActiveOrders, getCompletedOrders } = context;
  
  // State to manage active tab: 'Active' or 'Completed'
  const [activeTab, setActiveTab] = useState('Active');

  // Get orders from context
  const activeOrders = getActiveOrders();
  const completedOrders = getCompletedOrders();

  // Helper to determine which data to show
  const currentData = activeTab === 'Active' ? activeOrders : completedOrders;

  // Component for the Header
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Orders</Text>
      <View style={{ width: 40 }} /> 
    </View>
  );

  // Component for Tab Switcher
  const TabSwitcher = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Active' && styles.activeTab]}
        onPress={() => setActiveTab('Active')}
      >
        <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>
          Active
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Completed' && styles.activeTab]}
        onPress={() => setActiveTab('Completed')}
      >
        <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Component for Empty State
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
         {/* Placeholder for the blue document icon */}
        <Text style={{ fontSize: 40 }}>📄</Text> 
      </View>
      <Text style={styles.emptyTitle}>No Order History Yet</Text>
      <Text style={styles.emptySubtitle}>
        Your past orders will show up here. Start exploring delicious meals!
      </Text>
      <TouchableOpacity style={styles.startOrderingButton} onPress={() => router.push('/(customer)/home')}>
        <Text style={styles.startOrderingText}>Start Ordering</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <TabSwitcher />

        {currentData.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {currentData.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.orderCard}
                onPress={() => {
                  if (activeTab === 'Active') {
                    router.push('/(stack)/tracking');
                  }
                }}
                activeOpacity={activeTab === 'Active' ? 0.7 : 1}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.restaurantName}>{item.restaurant}</Text>
                    <Text style={styles.orderMeta}>{item.date} • {item.price}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: item.status === 'Cancelled' ? '#FEE2E2' : '#D1FAE5' }
                  ]}>
                    <Text style={[
                      styles.statusText, 
                      { color: item.status === 'Cancelled' ? '#EF4444' : '#10B981' }
                    ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsText}>
                    {Array.isArray(item.items) 
                      ? item.items.map((i, idx) => `${i.quantity}x ${i.name}`).join(', ')
                      : item.items
                    }
                  </Text>
                </View>

                {activeTab === 'Active' ? (
                  <View style={styles.activeStatusRow}>
                    <View style={styles.greenDot} />
                    <Text style={styles.deliveryStatusText}>{item.deliveryStatus || item.status}</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderText}>🔄 Reorder</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
  },
  backArrow: {
    fontSize: 20,
    color: '#3196E2',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 5,
    marginVertical: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3196E2',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // Shadow for iOS/Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemsContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemsText: {
    fontSize: 13,
    color: '#444',
  },
  reorderButton: {
    borderWidth: 1,
    borderColor: '#3196E2',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reorderText: {
    color: '#3196E2',
    fontWeight: '600',
  },
  activeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  deliveryStatusText: {
    fontSize: 12,
    color: '#EF4444',
  },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  startOrderingButton: {
    backgroundColor: '#3196E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  startOrderingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
