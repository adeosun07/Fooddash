import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '../../contexts/userContext'
import { NotificationContext } from '../../contexts/notificationContext'
import { VendorContext } from '../../contexts/vendorContext'
import PromoCard from '../../components/promoCard'
import VendorCard from '../../components/vendorCard'
import FilterModal from '../../modal/filterModal'

const CATEGORIES = ['Street Foods', 'Swallow', 'Jollof Rice & Fr...']

export default function Home() {
  const router = useRouter()
  const { savedAddresses, currentAddress, setCurrentAddress } = useUser()
  const { vendors } = useContext(VendorContext)
  const { hasUnread } = useContext(NotificationContext)
  const [locationRequested, setLocationRequested] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  

  useEffect(() => {
    const checkLocationRequest = async () => {
      try {
        // Check if location has already been requested
        const requested = await AsyncStorage.getItem('locationRequested')
        
        if (!requested) {
          // First time - request location
          setLocationRequested(true)
          // Mark that we've requested location
          await AsyncStorage.setItem('locationRequested', 'true')
          
          // Navigate to location screen after 1 second
          const timeout = setTimeout(() => {
            router.push('/location')
          }, 1000)
          return () => clearTimeout(timeout)
        } else {
          // Location already requested, set current address if available
          if (savedAddresses.length > 0 && !currentAddress) {
            setCurrentAddress(savedAddresses[0])
          }
        }
      } catch (error) {
        console.log('Error checking location request:', error)
      }
    }

    checkLocationRequest()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey there 👋</Text>
            <TouchableOpacity 
              style={styles.locationSelector}
              onPress={() => router.push('/location')}
            >
              <Text style={styles.locationLabel}>DELIVER TO</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationName} numberOfLines={1}>
                  {currentAddress?.apartment || 'Select Location'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#4A90E2" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={()=>router.push('/(stack)/notification')}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              {hasUnread && <View style={styles.dot} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Card */}
        <PromoCard />

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories:</Text>
          <TouchableOpacity style={styles.filterBtn} onPress={()=>setModalVisible(true)}>
            <Ionicons name="options-outline" size={20} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity key={i} style={[styles.categoryTag, i === 0 && styles.activeCategoryTag]}>
              <Text style={[styles.catText, i === 0 && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Vendor List */}
        <View style={styles.vendorHeader}>
          <Text style={styles.sectionTitle}>Dash Vendors ✨</Text>
        </View>

        {vendors.map(item => (
          <VendorCard key={item.id} vendor={item} />
        ))}


        <FilterModal visible={modalVisible} onClose={()=>setModalVisible(false)} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  locationSelector: {
    marginTop: 8,
  },
  locationLabel: {
    fontSize: 10,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginRight: 4,
    maxWidth: '90%',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  iconBtn: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 12,
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    flex: 1,
  },
  seeAll: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: '600',
  },
  filterBtn: {
    marginRight: 10,
  },
  catScroll: {
    marginBottom: 25,
  },
  categoryTag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FDF2F0',
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryTag: {
    backgroundColor: '#FF7A50',
  },
  catText: {
    color: '#FF7A50',
    fontWeight: '600',
    fontSize: 13,
  },
  activeCatText: {
    color: '#FFFFFF',
  },
  vendorHeader: {
    marginBottom: 15,
  },
})