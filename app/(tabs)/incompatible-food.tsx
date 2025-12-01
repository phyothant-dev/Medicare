// app/incompatible-food.tsx
import ScreenWrapper from "@/components/ScreenWrapper";
// 💡 IMPORT CONTEXT HOOK
import { useLanguage } from "@/context/LanguageContext";
import { INCOMPATIBLE_FOODS } from '@/data/incompatibleFoods';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";


const IncompatibleFoodScreen: React.FC = () => {
  // 💡 USE CONTEXT HOOK
  const { t, currentLang } = useLanguage(); 
  
  // 💡 Dynamically select the correct content key ('myanmar_content' or 'english_content')
  const contentKey = currentLang === 'my' ? 'myanmar_content' : 'english_content';

  return (
    <ScreenWrapper bg="#f0f4f8">
      <Stack.Screen
        options={{
          // DYNAMIC HEADER TITLE
          title: t('incompatible_foods_title'), 
          headerStyle: {
            backgroundColor: '#f0f4f8',
          },
          headerTintColor: '#333',
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          <Text style={styles.header}>
            🚫 {t('incompatible_foods_header')}
          </Text>
          <Text style={styles.description}>
            {t('incompatible_foods_description')}
          </Text>
          
          
          {INCOMPATIBLE_FOODS.map((item) => {
            
            // 💡 Get dynamic content based on currentLang
            const dynamicContent = (item as any)[contentKey];

            return (
                <View key={item.id} style={styles.infoBlock}>
                    <View style={styles.blockHeader}>
                        <MaterialCommunityIcons 
                            name={item.icon} 
                            size={28} 
                            color={item.color} 
                            style={{ marginRight: 10 }} 
                        />
                        <Text style={[styles.blockTitle, { color: item.color }]}>
                            {dynamicContent.pair} 
                        </Text>
                    </View>
                    
                    <Text style={styles.exampleText}>
                        {t('example_prefix')} **{dynamicContent.example}** </Text>
                    
                    <Text style={styles.blockText}>
                        <Text style={{ fontWeight: 'bold' }}>{t('reason_prefix')}:</Text> {dynamicContent.reason} 
                    </Text>
                </View>
            );
          })}
          
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default IncompatibleFoodScreen;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginBottom: 10,
    fontStyle: 'italic',
  },
  infoBlock: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 3,
    marginBottom: 10,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: "700",
    flexShrink: 1,
  },
  exampleText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 38,
  },
  blockText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
});