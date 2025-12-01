import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="immunity"
        options={{
          title: 'Immunity',
          tabBarLabel: 'Immunity',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-check" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="foodgroups"
        options={{
          title: 'Nutrition',
          tabBarLabel: 'Food',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="incompatible-food"
        options={{
          title: 'Incompatible',
          tabBarLabel: 'Allergy',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-off" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aidMap"
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
