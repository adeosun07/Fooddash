import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { OrderContext } from '../../contexts/orderContext';
import { simulateRiderLocation, generateOrderOTP } from '../../services/riderServices';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const TrackOrderScreen = () => {
  const router = useRouter();
  const { getActiveOrders } = useContext(OrderContext);
  
  const [riderLocation, setRiderLocation] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [otp] = useState(generateOrderOTP());
  const [isOrderExpanded, setIsOrderExpanded] = useState(false);
  const [estimatedArrival, setEstimatedArrival] = useState(5 * 60);
  
  const customerLocation = { latitude: 6.5264, longitude: 3.3812 };
  
  const activeOrders = getActiveOrders();
  const currentOrder = activeOrders.length > 0 ? activeOrders[0] : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedArrival(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const vendorLocation = { lat: 6.5244, lng: 3.3792 };
    const customerLoc = { lat: 6.5264, lng: 3.3812 };

    const stopTracking = simulateRiderLocation(
      vendorLocation.lat,
      vendorLocation.lng,
      customerLoc.lat,
      customerLoc.lng,
      (locationUpdate) => {
        setRiderLocation({
          latitude: locationUpdate.latitude,
          longitude: locationUpdate.longitude,
        });
        setDeliveryProgress(locationUpdate.progress);
        
        // When delivery is complete, navigate to rate screen
        if (locationUpdate.progress >= 100) {
          setTimeout(() => {
            router.push('/(stack)/rate');
          }, 2000); // Wait 2 seconds before showing rate screen
        }
      }
    );

    return () => stopTracking();
  }, []);
  
  // Custom Timeline Item Component
  const TimelineItem = ({ title, subtitle, IconComponent, isLast, isActive }) => (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLeftColumn}>
        <View style={[styles.timelineIconContainer, isActive && styles.activeTimelineIcon]}>
          {IconComponent}
        </View>
        {!isLast && <View style={[styles.timelineLine, isActive && styles.activeLine]} />}
      </View>
      <View style={styles.timelineContent}>
        <Text style={[styles.timelineTitle, !isActive && styles.inactiveText]}>{title}</Text>
        {subtitle && <Text style={styles.timelineSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Map with markers */}
      <View style={styles.mapPlaceholder}>
        <MapView 
          style={StyleSheet.absoluteFillObject}
          region={{
            latitude: customerLocation.latitude,
            longitude: customerLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={customerLocation}
            title="Your Location"
            pinColor="#00CEC9"
          />
          
          <Marker
            coordinate={riderLocation}
            title="Rider Location"
            description={currentOrder?.rider?.fullName || 'Dash Rider'}
          >
            <View style={styles.riderMarker}>
              <Text style={{ fontSize: 20 }}>🏍️</Text>
            </View>
          </Marker>
        </MapView>
        
        <SafeAreaView>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Scrollable Sheet */}
      <ScrollView 
        style={styles.bottomSheetScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sheetHandleContainer}>
          <View style={styles.sheetHandle} />
        </View>

        <View style={styles.sheetHeader}>
          <Text style={styles.arrivalTitle}>
            {deliveryProgress >= 100 
              ? 'Dash rider has arrived!' 
              : `Arrives in ${formatTime(estimatedArrival)}`
            }
          </Text>
          
          <TouchableOpacity 
            style={styles.orderSummaryRow}
            onPress={() => setIsOrderExpanded(!isOrderExpanded)}
            activeOpacity={0.7}
          >
            <MaterialIcons name='shopping-bag' size={18} color='#FF7043' style={{ marginRight: 8 }} />
            <Text style={styles.orderItems} numberOfLines={isOrderExpanded ? undefined : 1}>
              {Array.isArray(currentOrder?.items) 
                ? currentOrder.items.map((item) => item.name).join(', ')
                : 'Jollof rice, turkey, titus fish'
              }
            </Text>
            <Ionicons name={isOrderExpanded ? 'chevron-up' : 'chevron-down'} size={20} color='#9CA3AF' />
          </TouchableOpacity>
          
          {isOrderExpanded && (
            <View style={styles.orderDetailsExpanded}>
              {Array.isArray(currentOrder?.items) ? (
                currentOrder.items.map((item, index) => (
                  <View key={index} style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailItem}>{item.quantity}x  {item.name}</Text>
                  </View>
                ))
              ) : (
                <>
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailItem}>1x  A portion of jollof rice</Text>
                  </View>
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailItem}>1x  Turkey</Text>
                  </View>
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailItem}>1x  Titus fish</Text>
                  </View>
                </>
              )}
              <Text style={styles.orderTotal}>Total: ₦{currentOrder?.price || 6750}</Text>
            </View>
          )}
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          <TimelineItem 
            title="Order Accepted"
            subtitle={`${currentOrder?.restaurant || 'Foodhub by Sharon'} has accepted your order.`}
            IconComponent={<MaterialIcons name="shopping-bag" size={18} color={deliveryProgress >= 0 ? '#00CEC9' : '#9CA3AF'} />}
            isActive={deliveryProgress >= 0}
          />
          
          {deliveryProgress < 25 && (
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel order</Text>
            </TouchableOpacity>
          )}
          
          <TimelineItem 
            title="Preparing your food"
            subtitle={deliveryProgress >= 25 
              ? `${currentOrder?.restaurant || 'Foodhub by Sharon'} is preparing and packaging your order.`
              : `${currentOrder?.restaurant || 'Foodhub by Sharon'} will start preparing and packaging your order soon.`
            }
            IconComponent={<MaterialIcons name="restaurant" size={18} color={deliveryProgress >= 25 ? '#00CEC9' : '#9CA3AF'} />}
            isActive={deliveryProgress >= 25}
          />
          
          <TimelineItem 
            title="Dash rider pickup"
            subtitle={deliveryProgress >= 50 
              ? `${currentOrder?.rider?.fullName?.split(' ')[0] || 'Adebayo S.'} is on his way to you.`
              : 'A Dash rider will be assigned to you.'
            }
            IconComponent={<MaterialIcons name="two-wheeler" size={18} color={deliveryProgress >= 50 ? '#00CEC9' : '#9CA3AF'} />}
            isActive={deliveryProgress >= 50}
          />

          {deliveryProgress >= 50 && currentOrder?.rider && (
            <View style={styles.riderCard}>
              <View style={styles.riderImagePlaceholder}>
                <Ionicons name="person" size={28} color="#9CA3AF" />
              </View>
              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>{currentOrder.rider.fullName || 'Adebayo Samuel'}</Text>
                <Text style={styles.riderVehicle}>
                  Red {currentOrder.rider.bikeType || 'Bajaj'} • {currentOrder.rider.bikePlateNumber || 'ABC-123GE'}
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="chatbubble-ellipses" size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconButton, styles.callButton]}>
                  <Ionicons name="call" size={18} color="#1F2937" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TimelineItem 
            title={deliveryProgress >= 100 ? "Dash rider has arrived!" : "Dash rider has arrived!"}
            subtitle={deliveryProgress >= 100 ? `Meet ${currentOrder?.rider?.fullName?.split(' ')[0] || 'Adebayo S.'} outside.` : 'Meet him outside.'}
            IconComponent={<MaterialIcons name="location-on" size={18} color={deliveryProgress >= 100 ? '#00CEC9' : '#9CA3AF'} />}
            isActive={deliveryProgress >= 100}
            isLast={true}
          />
        </View>

        {/* OTP Section */}
        {deliveryProgress >= 100 && (
          <View style={styles.otpContainer}>
            <View style={styles.otpRow}>
              {otp.split('').map((digit, index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpText}>{digit}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.otpFooter}>
              Give this code to the {currentOrder?.rider?.fullName?.split(' ')[0] || 'Adebayo S.'} to get your order.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapPlaceholder: {
    height: height * 0.4, // Map takes up top 40%
    backgroundColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backArrow: {
    fontSize: 20,
    color: '#3196E2',
  },
  bottomSheetScroll: {
    flex: 1,
    marginTop: -30, // Overlap the map
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  sheetHandleContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
  },
  sheetHeader: {
    width: '100%',
    marginBottom: 20,
  },
  arrivalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 10,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  orderItems: {
    color: '#374151',
    fontSize: 14,
    flex: 1,
  },
  orderDetailsExpanded: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderDetailRow: {
    marginBottom: 6,
  },
  orderDetailItem: {
    fontSize: 14,
    color: '#374151',
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 50,
  },
  cancelButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '600',
  },
  timelineSection: {
    marginTop: 10,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  timelineLeftColumn: {
    alignItems: 'center',
    marginRight: 15,
    width: 36,
  },
  timelineIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  activeTimelineIcon: {
    backgroundColor: '#E6F9F5',
    borderWidth: 2,
    borderColor: '#00CEC9',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
    minHeight: 30,
  },
  activeLine: {
    backgroundColor: '#00CEC9',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 25,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  inactiveText: {
    color: '#9CA3AF',
  },
  timelineSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  riderImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  riderName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 2,
  },
  riderVehicle: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    backgroundColor: '#F9FAFB',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  callButton: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FFE4CC',
  },
  riderMarker: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00CEC9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  otpContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 12,
  },
  otpBox: {
    width: 60,
    height: 70,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  otpText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
  },
  otpFooter: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default TrackOrderScreen;
