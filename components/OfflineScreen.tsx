// src/components/OfflineScreen.tsx
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you have expo vector icons installed
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OfflineScreenProps {
  onRetry: () => void;
}

const OfflineScreen: React.FC<OfflineScreenProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="signal-cellular-off" size={100} color="#FF6347" />
      <Text style={styles.title}>You are offline</Text>
      <Text style={styles.message}>
        It looks like you're not connected to the internet. Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OfflineScreen;