// src/app/SplashScreen.tsx
import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import OfflineScreen from '../components/OfflineScreen'; // Import the new component

const LOGO_SOURCE = require('@/assets/images/logo.png'); 
const LOGO_SIZE = 300;
const ANIMATION_DURATION = 2500;

export default function SplashScreen() {
  const router = useRouter(); 
  const [isConnected, setIsConnected] = useState(true); // State to track network status

  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.5)).current; 

  // Function to perform the network check and navigation
  const checkNetworkAndNavigate = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnected(true);
        // Start animation only if connected
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION * 0.7, 
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, 
            duration: ANIMATION_DURATION, 
            easing: Easing.elastic(1),
            useNativeDriver: true,
          }),
        ]).start(() => {
          router.replace('./home');
        });
      } else {
        setIsConnected(false); // Show the offline screen
      }
    });
  };

  useEffect(() => {
    checkNetworkAndNavigate();

    // Optionally: Listen for network changes while on the splash screen
    const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected && !isConnected) {
            // If connection is regained while on the offline screen, try navigating again
            // A simple retry logic
            checkNetworkAndNavigate();
        }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  // If not connected, show the custom offline screen
  if (!isConnected) {
    return <OfflineScreen onRetry={checkNetworkAndNavigate} />;
  }

  // If connected (or checking), show the animated splash screen
  return (
    <View style={styles.container}>
      <Animated.Image
        source={LOGO_SOURCE}
        style={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          opacity: fadeAnim, 
          transform: [
            { scale: scaleAnim },
          ],
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: "center",
    alignItems: "center",
  },
});