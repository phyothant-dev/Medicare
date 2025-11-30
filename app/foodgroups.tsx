// app/foodgroups.tsx
import { FoodGroup, getSeasonalFoodGroupAdvice, threeFoodGroups } from '@/data/foodGroupsData';
// 💡 IMPORT CONTEXT HOOK
import { useLanguage } from '@/context/LanguageContext';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Reusable component for displaying one group's examples
const GroupExamples: React.FC<{ examples: string[] }> = ({ examples }) => (
    <View style={styles.examplesContainer}>
        {examples.map((example, index) => (
            <View key={index} style={styles.examplePill}>
                <Text style={styles.exampleText}>{example}</Text>
            </View>
        ))}
    </View>
);

const FoodGroupsScreen: React.FC = () => {
  // 💡 USE CONTEXT HOOK
  const { t, currentLang } = useLanguage();
  
  const seasonalAdvice = getSeasonalFoodGroupAdvice();
  const { width } = useWindowDimensions();
  const isSmall = width < 380; // Breakpoint for small devices

  // 💡 Dynamically select the correct content key ('myanmar' or 'english')
  const contentKey = currentLang === 'my' ? 'myanmar' : 'english';
  
  // Placeholder image (replace with your actual local import)
  const allFoodGroupsImage = require('@/assets/images/group_food.png');
  // NOTE: If you don't have this image, replace the path or comment out the Image component.

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          // DYNAMIC HEADER TITLE
          title: t('resource_foodgroups_title'), 
          headerStyle: {
            backgroundColor: '#f0f4f8',
          },
          headerTintColor: '#333',
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { fontSize: isSmall ? 28 : 32 }]}>{t('foodgroups_title_my')}</Text>
        <Text style={[styles.subtitle, { fontSize: isSmall ? 16 : 18 }]}>{t('foodgroups_title_en')}</Text>

        {/* --- SINGLE COMPREHENSIVE IMAGE (Responsive Height) --- */}
        <Image 
            source={allFoodGroupsImage} 
            style={[styles.mainImage, { height: isSmall ? 180 : 220 }]} 
            resizeMode="contain" 
        />

        <Text style={styles.introText}>
            {t('foodgroups_intro')}
        </Text>

        {/* --- SEASONAL HIGHLIGHT SECTION --- */}
        <View style={styles.seasonalHighlight}>
            <MaterialCommunityIcons name="star-circle" size={28} color="#9400D3" />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.seasonalTitle, { fontSize: isSmall ? 14 : 16 }]}>
                    {seasonalAdvice.groupName} ({t('seasonal_focus_suffix')})
                </Text>
                <Text style={[styles.seasonalTip, { fontSize: isSmall ? 12 : 14 }]}>
                    {currentLang === 'my' ? seasonalAdvice.myanmarTip : seasonalAdvice.englishTip}
                </Text>
                {/* Optional: Show the English tip below the Burmese one for context */}
                {currentLang === 'my' && <Text style={styles.seasonalTipEnglish}>{seasonalAdvice.englishTip}</Text>}
            </View>
        </View>
        
        {/* --- FOOD GROUP CARDS --- */}
        {threeFoodGroups.map((group: FoodGroup) => {
            const isSeasonalHighlight = group.english.name.includes(seasonalAdvice.groupName);
            // 💡 Get dynamic content
            const dynamicContent = (group as any)[contentKey];
            
            return (
                <View 
                    key={group.id} 
                    style={[
                        styles.groupCard, 
                        isSeasonalHighlight && styles.seasonalCardHighlight
                    ]}
                >
                    <View style={styles.headerRow}>
                        <MaterialCommunityIcons 
                            name={group.iconName as any} 
                            size={30} 
                            color={group.iconColor} 
                        />
                        <View style={styles.groupTitles}>
                            <Text style={[styles.groupNameMyanmar, { fontSize: isSmall ? 18 : 20, color: group.iconColor }]}>
                                {/* Show current language name */}
                                {dynamicContent.name} 
                            </Text>
                            <Text style={[styles.groupNameEnglish, { fontSize: isSmall ? 12 : 14 }]}>
                                {/* Show the other language name */}
                                {contentKey === 'myanmar' ? group.english.name : group.myanmar.name}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.groupDescription, { fontSize: isSmall ? 14 : 16 }]}>
                        {dynamicContent.description}
                    </Text>

                    <Text style={styles.exampleTitle}>{t('example_title')}:</Text>
                    <GroupExamples examples={dynamicContent.examples} />
                </View>
            );
        })}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodGroupsScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f4f8' },
    scrollContainer: { padding: 20, paddingBottom: 50 },
    title: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
    subtitle: { color: '#489eef', marginBottom: 15, fontWeight: '600' },
    
    mainImage: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 25,
    },
    introText: { fontSize: 16, color: '#555', marginBottom: 25 },
    
    seasonalHighlight: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff0f5', 
        borderRadius: 12,
        padding: 15,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#9400D330',
    },
    seasonalTitle: {
        fontWeight: 'bold',
        color: '#9400D3',
    },
    seasonalTip: {
        marginTop: 4,
        color: '#555',
        lineHeight: 20,
    },
    seasonalTipEnglish: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
    
    groupCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    seasonalCardHighlight: {
        borderWidth: 3,
        borderColor: '#9400D3', 
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 10,
    },
    groupTitles: {
        marginLeft: 15,
    },
    groupNameMyanmar: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    groupNameEnglish: {
        color: '#666',
    },
    groupDescription: {
        color: '#333',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    exampleTitle: {
        fontWeight: '700',
        paddingHorizontal: 15,
        marginBottom: 8,
        color: '#444',
    },
    examplesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingBottom: 20,
        gap: 8,
    },
    examplePill: {
        backgroundColor: '#489eef15', 
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#489eef50',
    },
    exampleText: {
        fontSize: 14,
        color: '#489eef',
    }
});