// app/immunity.tsx
import ImmunityTipComponent from '@/components/ImmunityTip'; // Adjust import path
import { getSeasonalImmunityData } from '@/data/immunityData'; // Adjust import path
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 💡 IMPORT CONTEXT HOOK
import { useLanguage } from '@/context/LanguageContext';
import { Stack } from 'expo-router';


const ImmunityDetailsScreen: React.FC = () => {
  // 💡 USE CONTEXT HOOK
  const { t, currentLang } = useLanguage();
  
  // 💡 Determine language key for data fetching
  const langKey = currentLang === 'my' ? 'myanmar' : 'english';
  
  // 💡 Fetch data using the language key
  const { headerTitle, priorityTips, generalTips } = getSeasonalImmunityData(langKey);


  return (
    <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
            options={{
                // DYNAMIC HEADER TITLE
                title: t('resource_immunity_title'), 
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#333',
            }}
        />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* DYNAMIC TITLES */}
        <Text style={styles.title}>{t('resource_immunity_title')}</Text>
        <Text style={styles.subtitle}>{headerTitle}</Text>

        {/* SEASONAL PRIORITIES SECTION */}
        <Text style={styles.sectionTitle}>🎯 {t('immunity_section_priority')}</Text>
        <Text style={styles.sectionDescription}>
          {t('immunity_description_priority')}
        </Text>
        
        {priorityTips.map(tip => (
            <ImmunityTipComponent
                key={tip.id}
                {...tip}
                isPriority={true}
                language={langKey} // 💡 Pass the dynamic language key
            />
        ))}
        
        <View style={styles.separator} />

        {/* GENERAL WELLNESS SECTION */}
        <Text style={styles.sectionTitle}>🏃 {t('immunity_section_general')}</Text>
        <Text style={styles.sectionDescription}>
          {t('immunity_description_general')}
        </Text>

        {generalTips.map(tip => (
            <ImmunityTipComponent
                key={tip.id}
                {...tip}
                language={langKey} // 💡 Pass the dynamic language key
            />
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImmunityDetailsScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 20, paddingBottom: 50 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#489eefff', marginBottom: 8 },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#489eefff',
    paddingLeft: 10,
  },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 25, marginBottom: 5, color: '#333' },
  sectionDescription: { fontSize: 15, color: '#777', marginBottom: 15 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 25 },
});