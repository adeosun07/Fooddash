import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  // Reusable component for the list items
  const MenuItem = ({ icon, title, subtitle, onPress, color, showBadge, danger }) => (
    <TouchableOpacity style={[styles.menuItem, danger && styles.menuItemDanger]} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: '#F9FAFB' }]}>
        {icon}
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>{title}</Text>
        {!!subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.rightSection}>
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Get ₦500</Text>
          </View>
        )}
        <MaterialIcons name="chevron-right" size={24} color={danger ? '#EB5757' : '#C4C4C4'} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#3196E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TA</Text>
          </View>
          <Text style={styles.userName}>Tori Adeoye</Text>
          <Text style={styles.userEmail}>toriadeoye@gmail.com</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/(stack)/editProfile')}>
            <Feather name="edit-3" size={14} color="#3196E2" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₦2,500</Text>
          </View>
          <TouchableOpacity style={styles.topUpButton} onPress={() => router.push('/profile/wallet')}>
            <Text style={styles.topUpText}>+ Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Account & Activity Section */}
        <Text style={styles.sectionHeader}>Account & Activity</Text>
        <MenuItem
          icon={<Ionicons name='wallet-outline'size={20}/>}
          title="Wallet"
          subtitle="Your balance and history"
        />
        <MenuItem 
          icon={<Feather name="shopping-bag" size={20} color="#2D9CDB" />}
          title="Your Orders" 
          subtitle="History and reorder"
        />
        <MenuItem 
          icon={<Feather name="heart" size={20} color="#FF4B81" />}
          title="Favorites" 
          subtitle="Saved restaurants"
          onPress={() => router.push('/profile/favorites')}
        />
        <MenuItem 
          icon={<Feather name="map-pin" size={20} color="#4CAF50" />}
          title="Address Book" 
          subtitle="Manage saved locations"
        />
        <MenuItem 
          icon={<Feather name="users" size={20} color="#FF9800" />}
          title="Invite Friends" 
          showBadge={true}
        />

        {/* General Settings */}
        <Text style={styles.sectionHeader}>General Settings</Text>
        <MenuItem 
          icon={<Feather name="bell" size={20} color="#9C27B0" />}
          title="Notifications" 
          subtitle="Manage alerts"
          onPress={() => router.push('/(stack)/notification')}
        />
        <MenuItem 
          icon={<Feather name="lock" size={20} color="#F44336" />}
          title="Security" 
          subtitle="Change password"
          onPress={() => router.push('/profile/security')}
        />
        <MenuItem 
          icon={<Feather name="help-circle" size={20} color="#2F80ED" />}
          title="Help & Support" 
          subtitle="Get assistance"
        />

        {/* Legal */}
        <Text style={styles.sectionHeader}>Legal</Text>
        <MenuItem 
          icon={<Feather name="file-text" size={20} color="#2D9CDB" />}
          title="Terms & Conditions" 
          subtitle=""
        />
        <MenuItem 
          icon={<Feather name="log-out" size={20} color="#EB5757" />}
          title="Log Out" 
          subtitle=""
          danger
        />

        {/* Version */}
        <Text style={styles.versionText}>Version 1.0.2</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  backButton: {
    padding: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
  },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },
  userSection: { alignItems: 'center', marginTop: 10 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3196E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  userEmail: { fontSize: 14, color: '#6B7280', marginVertical: 4 },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3196E2',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  editButtonText: { color: '#3196E2', marginLeft: 5, fontSize: 14 },
  walletCard: {
    backgroundColor: '#3196E2',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  walletLabel: { color: '#FFF', fontSize: 14, opacity: 0.9 },
  walletAmount: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 4 },
  topUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  topUpText: { color: '#FFF', fontWeight: '600' },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  menuSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  menuItemDanger: {
    borderColor: '#FDE8E8',
  },
  menuTitleDanger: {
    color: '#EB5757',
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    backgroundColor: '#D1FADF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: { color: '#039855', fontSize: 10, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#C4C4C4', fontSize: 12, marginTop: 30 },
});

export default ProfileScreen;