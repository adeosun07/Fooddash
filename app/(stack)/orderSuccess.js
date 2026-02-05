import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OrderSuccessScreen() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(customer)/orders');
    }, 5000); // Increased to 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.overlay}>
          
          <SafeAreaView style={styles.contentContainer}>
            
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={80} color="#FFFFFF" />
              </View>
            </View>

            {/* 3. Text Section */}
            <View style={styles.textWrapper}>
              <Text style={styles.title}>
                Order Placed!
              </Text>
              <Text style={styles.subtitle}>
                The Dash Vendor has received your order.
              </Text>
            </View>
          </SafeAreaView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#ffffff', // Dim the background image
    justifyContent: 'center', // Center content
  },
  contentContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(74, 144, 226, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  textWrapper: {
    marginBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#292929',
    lineHeight: 46,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#292929',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4A90E2',
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
