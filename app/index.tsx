import { useRouter } from 'expo-router';
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const LOGO_SOURCE = require('@/assets/images/logo.png'); 
const LOGO_SIZE = 300;
const ANIMATION_DURATION = 2500;

export default function SplashScreen() {
  const router = useRouter(); 

  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.5)).current; 

  useEffect(() => {
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
      router.replace('/home');
    });
  }, [fadeAnim, scaleAnim, router]);

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
