import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2', // Blue from design
        tabBarInactiveTintColor: '#A0A0A0', // Gray from design
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      {/* 1. For You (Home) */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'For You',
          tabBarIcon: ({ color }) => (
              <Ionicons 
                name= "home-outline"
                size={22} 
                color= {color}
              />
          ),
        }}
      />

      {/* 2. Search */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={22} color={color} />
          ),
        }}
      />

      {/* 3. Orders */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" size={22} color={color} />
          ),
        }}
      />

      {/* 4. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    paddingBottom: 25,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  activeIconContainer: {
    backgroundColor: '#4A90E2', // The blue circle in the design
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Lifts the icon slightly
  },
});