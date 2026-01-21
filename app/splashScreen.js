import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Get screen width to help size the logo dynamically if needed
const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const textColor = '#E88D72';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Middle Content Section */}
      <View style={styles.centerContent}>
        {/* ------- IMPORTANT -------
          Replace the `source` below with your local image requirement.
          Example: source={require('./assets/splash-logo.png')} 
        */}
        <Image 
          source={require('../assets/images/Logo.svg')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={[styles.tagline, { color: textColor }]}>
          Your Campus. Your Food. Your Dash.
        </Text>
      </View>
      
      {/* Bottom Footer Section */}
      <Text style={[styles.copyright, { color: textColor }]}>
        ©TechVetra Limited
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 30,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.35, 
    height: width * 0.45, 
    marginBottom: 25,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 10, 
  },
});

export default SplashScreen;