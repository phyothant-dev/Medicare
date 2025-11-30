// app/index.tsx
import ScreenWrapper from "@/components/ScreenWrapper";
import SymptomAnalysisModal from "@/components/SymptomAnalysisModal";
import { useLanguage } from "@/context/LanguageContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

// Placeholder for your AI API Service (replace with your actual implementation)
async function getHFResponse(prompt: string): Promise<string> {
    console.log(`Sending prompt to AI: ${prompt}`);
    // Simulate API delay and response
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `AI Analysis: Based on the symptoms provided, it is recommended to consult a doctor. Common causes might include viral infection or stress. Please seek professional medical advice immediately. (Prompt: ${prompt})`;
}

const Home: React.FC = () => {
  const router = useRouter(); 
  const [symptomInput, setSymptomInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // 💡 GET STATE AND FUNCTIONS FROM GLOBAL CONTEXT
  const { isEnglish, setIsEnglish, t } = useLanguage(); 

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<string>(""); 

  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  // 💡 Toggle function uses the setter from context
  const toggleLanguage = (value: boolean) => {
    setIsEnglish(value);
  };

  const handleStartAnalysis = async () => {
    const promptText = symptomInput.trim();
    if (!promptText) {
      Alert.alert(t('alert_input_required_title'), t('alert_input_required_message'));
      return;
    }

    setLoading(true);
    try {
      const currentLanguage = isEnglish ? 'English' : 'Burmese';
      // Include language hint in the prompt for better AI response consistency
      const fullPrompt = `Analyze these symptoms in detail, providing likely causes and general advice. Respond in ${currentLanguage}. Symptoms: "${promptText}"`;
      
      const aiResponse: string = await getHFResponse(fullPrompt);
      
      setAiResult(aiResponse);
      setModalVisible(true); 

    } catch (error) {
      console.error("AI API Error:", error);
      Alert.alert(t('alert_error_title'), t('alert_error_message'));
    } finally {
      setLoading(false);
      setSymptomInput("");
    }
  };

  return (
    <ScreenWrapper bg="#f0f4f8">
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* Top Title Section */}
        <View style={styles.headerSection}>
          
          {/* Title and Language Toggle Side-by-Side */}
          <View style={styles.headerContent}>
            
            {/* Title */}
            <Text style={[styles.title, { fontSize: isSmall ? 26 : 30 }]}>
              {t('title')}
            </Text>

            {/* 💡 LANGUAGE SWITCHER (Smaller and adjusted space) */}
            <View style={styles.langToggleSwitchContainer}>
                
                {/* Icon (Color changes based on active language) */}
                <Ionicons 
                    name="language-outline" 
                    size={18} 
                    color={isEnglish ? "#489eef" : "#333"} 
                    style={{ marginRight: 3 }} // Reduced margin
                />

                {/* Dynamic Language Tag (MY or EN) */}
                <Text style={{ 
                    fontWeight: 'bold', 
                    fontSize: 13, // Reduced font size
                    color: isEnglish ? "#489eef" : "#333",
                    marginRight: 3 // Reduced margin
                }}>
                    {isEnglish ? 'EN' : 'MY'}
                </Text>


                <Switch
                    trackColor={{ false: "#ccc", true: "#489eef" }}
                    thumbColor={isEnglish ? "#fff" : "#fff"}
                    onValueChange={toggleLanguage}
                    value={isEnglish}
                    style={styles.switchStyle}
                />
            </View>
          </View>

          <Text style={[styles.subtitle, { fontSize: isSmall ? 16 : 18 }]}>
            {t('subtitle')}
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={22} color="gray" />
            <TextInput
              style={[styles.input, { fontSize: isSmall ? 14 : 16 }]}
              placeholder={t('placeholder_symptoms')}
              placeholderTextColor="gray"
              value={symptomInput}              
              onChangeText={setSymptomInput}
            />
          </View>
          
          {/* Analysis Button */}
          <TouchableOpacity
            style={styles.btnStart}
            onPress={handleStartAnalysis}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text
                style={{
                  fontSize: isSmall ? 16 : 18,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {t('button_start_analysis')}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Middle Auto-Growing Section */}
        <View style={styles.middleSection}>
          <Text style={[styles.sectionTitle, { fontSize: isSmall ? 20 : 22 }]}>
            {t('section_quick_checkup')}
          </Text>

          {/* Grid */}
          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput(t('area_head_neck'))}
            >
              <MaterialCommunityIcons name="brain" size={30} color="red" />
              <Text style={styles.cardText}>{t('area_head_neck')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() =>
                setSymptomInput(t('area_chest_lung'))
              }
            >
              <AntDesign name="heart" size={30} color="red" />
              <Text style={styles.cardText}>{t('area_chest_lung')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput(t('area_fever_flu'))}
            >
              <MaterialCommunityIcons
                name="emoticon-sick-outline"
                size={30}
                color="black"
              />
              <Text style={styles.cardText}>{t('area_fever_flu')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput(t('area_stomach_digestive'))}
            >
              <MaterialCommunityIcons name="stomach" size={30} color="blue" />
              <Text style={styles.cardText}>{t('area_stomach_digestive')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() =>
                setSymptomInput(t('area_joint_muscle'))
              }
            >
              <FontAwesome5 name="bone" size={24} color="gray" />
              <Text style={styles.cardText}>{t('area_joint_muscle')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput(t('area_skin_rash'))}
            >
              <MaterialCommunityIcons name="bandage" size={30} color="green" />
              <Text style={styles.cardText}>{t('area_skin_rash')}</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: isSmall ? 20 : 22, fontWeight: "bold", marginTop: 10 }}>
            {t('section_resources')}
          </Text>

          {/* 1. Boost Your Immunity Card (Navigates to /immunity) */}
          <TouchableOpacity 
            style={styles.entireCard}
            onPress={() => router.push('/immunity')} 
          >
            <View style={[styles.healthResourceContainer, { backgroundColor: '#34d734' }]}>
              <Text style={styles.tagText}>{t('tag_vitamins')}</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: '#489eef' }]}>{t('resource_immunity_title')}</Text>
              <Text style={styles.cardSubtitle}>
                {t('resource_immunity_subtitle')}
              </Text>
            </View>
          </TouchableOpacity>
          
          {/* 2. Food Groups Card (Navigates to /foodgroups) */}
          <TouchableOpacity 
            style={styles.entireCard}
            onPress={() => router.push('/foodgroups')} 
          >
            <View style={[styles.healthResourceContainer, { backgroundColor: '#FF8C00' }]}>
              <Text style={styles.tagText}>{t('tag_nutrition')}</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: '#FF8C00' }]}>{t('resource_foodgroups_title')}</Text>
              <Text style={styles.cardSubtitle}>
                {t('resource_foodgroups_subtitle')}
              </Text>
            </View>
          </TouchableOpacity>
          
          {/* 3. Incompatible Foods Card (Navigates to /incompatible-food) */}
          <TouchableOpacity 
            style={styles.entireCard}
            onPress={() => router.push('/incompatible-food')} 
          >
            <View style={[styles.healthResourceContainer, { backgroundColor: '#D9534F' }]}>
              <Text style={styles.tagText}>{t('tag_allergy')}</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={[styles.cardTitle, { color: '#D9534F' }]}>{t('resource_incompatible_title')}</Text>
              <Text style={styles.cardSubtitle}>
                {t('resource_incompatible_subtitle')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      </ScrollView>

      {/* MODAL COMPONENT */}
      <SymptomAnalysisModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        analysisText={aiResult}
      />
      
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5, 
    },
    // 💡 ADJUSTED STYLES FOR SMALLER TOGGLE BUTTON
    langToggleSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5, // Reduced
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 32, // Reduced
    },
    switchStyle: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], // Reduced
    },
    headerSection: {
      gap: 15,
    },
    middleSection: {
      flex: 1,
      gap: 5,
      marginBottom: 5,
    },
    title: {
      fontWeight: "bold",
    },
    subtitle: {
      color: "#333",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 12,
      height: 48,
      paddingHorizontal: 12,
      backgroundColor: "#fff",
      gap: 10,
    },
    input: {
      flex: 1,
    },
    sectionTitle: {
      fontWeight: "bold",
    },
    cardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 15,
    },
    btnType: {
      width: "31%",
      aspectRatio: 1,
      backgroundColor: "#fff",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      elevation: 3,
    },
    cardText: {
      marginTop: 8,
      fontSize: 12,
      textAlign: "center",
      fontWeight: "600",
    },
    entireCard: {
      width: "100%",
      backgroundColor: "#f5f5f5",
      borderRadius: 15,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      borderWidth: 1,
      borderColor: "#ddd",
      marginBottom: 10,
    },
    cardTextContainer: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: "#555",
    },
    healthResourceContainer: {
      height: 70,
      width: 80,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
      borderRadius: 10,
    },
    tagText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    btnStart: {
      backgroundColor: "#00BFFF",
      padding: 18,
      borderRadius: 30,
      alignItems: "center",
    },
});