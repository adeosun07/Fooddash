import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { OrderContext } from '../../contexts/orderContext';
import { UserContext } from '../../contexts/userContext';
import PaymentTransferModal from '../../modal/paymentTransferModal';

export default function CheckoutScreen() {
  const router = useRouter();
  const { orders, getTotal, placeOrder } = useContext(OrderContext);
  const { currentAddress } = useContext(UserContext);
  const [note, setNote] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Default coordinates (Awo Hall area) - in real app, get from currentAddress
  const defaultLocation = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const DELIVERY_FEE = 300;
  const SERVICE_FEE = 50;
  const subtotal = getTotal();
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  const handleMakePayment = () => {
    if (paymentMethod === 'transfer') {
      setShowPaymentModal(true);
    } else {
      // Handle other payment methods (card, wallet)
      console.log('Processing payment:', { orders, note, isGift, paymentMethod, total });
    }
  };

  const handlePaymentModalClose = (paymentConfirmed) => {
    setShowPaymentModal(false);
    if (paymentConfirmed) {
      // Create order in history
      const vendorName = orders[0]?.vendorName || 'Food Vendor';
      placeOrder({
        restaurant: vendorName,
        total: total,
        note: note,
        isGift: isGift,
        paymentMethod: paymentMethod,
        address: currentAddress,
      });
      
      // Navigate to order success screen
      console.log('Payment confirmed!');
      router.push('/(stack)/orderSuccess');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={defaultLocation} mapType='satellite'>
            <Marker
              coordinate={{
                latitude: defaultLocation.latitude,
                longitude: defaultLocation.longitude,
              }}
              title="Delivery Location"
              description={currentAddress?.apartment || 'Awo Hall'}
            />
          </MapView>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <TouchableOpacity style={styles.addressRow}>
            <Ionicons name="location" size={20} color="#4A90E2" />
            <Text style={styles.addressText}>
              {currentAddress?.apartment || 'Awo Hall, Block 3, Room 8'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Note Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Drop a note for the Dash rider</Text>
          <View style={styles.noteInputContainer}>
            <MaterialCommunityIcons name="bike" size={18} color="#A0A0A0" />
            <TextInput
              placeholder="Add instructions..."
              style={styles.noteInput}
              placeholderTextColor="#A0A0A0"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* Gift Option */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.giftRow}
            onPress={() => setIsGift(!isGift)}
          >
            <View style={styles.giftLeft}>
              <MaterialCommunityIcons name="gift" size={20} color="#4A90E2" />
              <Text style={styles.giftText}>Send as a gift</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('transfer')}
          >
            <MaterialCommunityIcons
              name="bank-transfer"
              size={20}
              color={paymentMethod === 'transfer' ? '#4A90E2' : '#A0A0A0'}
            />
            <Text
              style={[
                styles.paymentText,
                paymentMethod === 'transfer' && styles.paymentTextActive,
              ]}
            >
              Transfer
            </Text>
            {paymentMethod === 'transfer' && (
              <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
            )}
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summarySubtext}>Breakdown of your fees</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item subtotal</Text>
            <Text style={styles.summaryValue}>₦{subtotal}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={styles.summaryValue}>₦{DELIVERY_FEE}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service fee</Text>
            <Text style={styles.summaryValue}>₦{SERVICE_FEE}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₦{total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Make Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.paymentBtn}
          onPress={handleMakePayment}
        >
          <Text style={styles.paymentBtnText}>Make payment</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Transfer Modal */}
      <PaymentTransferModal
        visible={showPaymentModal}
        onClose={handlePaymentModalClose}
        amount={total}
        orderId="12"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  mapContainer: {
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    height: 200,
  },
  map: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BFA5',
    marginTop: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginHorizontal: 12,
  },
  noteInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingVertical: 12,
  },
  noteInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: '#333',
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  giftLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  paymentText: {
    flex: 1,
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '600',
    marginLeft: 12,
  },
  paymentTextActive: {
    color: '#333',
  },
  summarySubtext: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderBottomWidth: 0,
    paddingVertical: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A90E2',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  paymentBtn: {
    backgroundColor: '#4A90E2',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
