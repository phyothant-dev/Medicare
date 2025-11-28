import { getHFResponse } from "@/services/aiApiService";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  // State to hold the user's input symptom text
  const [symptomInput, setSymptomInput] = useState("");
  // State to handle loading feedback (recommended)
  const [loading, setLoading] = useState(false); 
  
  const placeholderText = "Start typing your symptoms (eg., headache)";
  
  // --- New Function to Handle AI Call ---
  const handleStartAnalysis = async () => {
    // 1. Basic input validation
    const promptText = symptomInput.trim();
    if (!promptText) {
      Alert.alert("Input Required", "Please enter your symptoms to start the analysis.");
      return;
    }
    
    setLoading(true);
    
    // 2. Call the AI service with the user's prompt
    const aiResponse = await getHFResponse(promptText);

    setLoading(false);

    // 3. Display the result (use an Alert for quick testing, replace with state/modal later)
    Alert.alert("AI Symptom Analysis", aiResponse);

    // OPTIONAL: Clear the input field after sending
    setSymptomInput("");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Health Hub</Text>

        <Text style={styles.subtitle}>
          How are you feeling today? Let's check your symptoms.
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color="gray" />
          <TextInput
            style={styles.input}
            placeholder={placeholderText}
            placeholderTextColor="gray"
            // --- CONNECT INPUT STATE ---
            value={symptomInput} 
            onChangeText={setSymptomInput}
            // ---------------------------
          />
        </View>

        <Text style={styles.sectionTitle}>Quick Checkup Areas</Text>

        {/* 3 Columns × 2 Rows - (No changes needed here) */}
        <View style={styles.cardsContainer}>
          {/* ... (Your existing TouchableOpacity cards) ... */}
          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("headache, stiff neck")}>
            <MaterialCommunityIcons name="brain" size={30} color="red" />
            <Text style={styles.cardText}>Head & Neck</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("chest pain, shortness of breath")}>
            <AntDesign name="heart" size={30} color="red" />
            <Text style={styles.cardText}>Chest & Lung</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("fever and body aches")}>
            <MaterialCommunityIcons
              name="emoticon-sick-outline"
              size={30}
              color="black"
            />
            <Text style={styles.cardText}>Fever & Flu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("abdominal cramping, diarrhea")}>
            <MaterialCommunityIcons name="stomach" size={24} color="blue" />
            <Text style={styles.cardText}>Stomach/Digestive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("joint swelling and tenderness")}>
            <FontAwesome5 name="bone" size={24} color="gray" />
            <Text style={styles.cardText}>Joint & Muscle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnType} onPress={() => setSymptomInput("red itchy rash")}>
            <MaterialCommunityIcons name="bandage" size={30} color="green" />
            <Text style={styles.cardText}>Skin & Rash</Text>
          </TouchableOpacity>
        </View>

        {/* Health Resource (No changes needed) */}
        <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
          Health Resource
        </Text>
        <TouchableOpacity>
          <View style={styles.entireCard}>
            <View style={styles.healthResourceContainer}>
              <Text style={styles.tagText}>Vitamins</Text>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Boost Your Immunity</Text>
              <Text style={styles.cardSubtitle}>
                The essential vitamins and nutrients you need this season.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Start Button */}
        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity 
            style={styles.btnStart} 
            onPress={handleStartAnalysis} // --- CALL NEW HANDLER ---
            disabled={loading} // Disable while loading
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              {loading ? "Analyzing..." : "Start Symptom Analysis"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    color: "#333",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    gap: 10,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  // 3 columns × 2 rows
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    rowGap: 15,
  },

  btnType: {
    width: "31%", // 3 per row
    aspectRatio: 1, // perfect square
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  cardText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  // Health Resource Card
  entireCard: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row", // horizontal layout
    justifyContent: "space-between",
    alignItems: "center",
    gap: 17,

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#489eefff",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#555555ff",
  },

  healthResourceContainer: {
    height: 70,
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#34d734ff",
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  tagText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  btnStart: {
    backgroundColor: "#00BFFF",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
});