import ScreenWrapper from "@/components/ScreenWrapper";
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
  useWindowDimensions,
} from "react-native";

const Home = () => {
  const [symptomInput, setSymptomInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const placeholderText = "Start typing your symptoms (e.g., headache)";

  const handleStartAnalysis = async () => {
    const promptText = symptomInput.trim();
    if (!promptText) {
      Alert.alert("Input Required", "Please enter your symptoms to start.");
      return;
    }

    setLoading(true);
    const aiResponse = await getHFResponse(promptText);
    setLoading(false);

    Alert.alert("AI Symptom Analysis", aiResponse);
    setSymptomInput("");
  };

  return (
    <ScreenWrapper bg="#f0f4f8">
      <View style={styles.container}>

        {/* Top Title Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { fontSize: isSmall ? 26 : 30 }]}>
            Health Hub
          </Text>

          <Text style={[styles.subtitle, { fontSize: isSmall ? 16 : 18 }]}>
            How are you feeling today? Let's check your symptoms.
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={22} color="gray" />
            <TextInput
              style={[styles.input, { fontSize: isSmall ? 14 : 16 }]}
              placeholder={placeholderText}
              placeholderTextColor="gray"
              value={symptomInput}
              onChangeText={setSymptomInput}
            />
          </View>
        </View>

        {/* Middle Auto-Growing Section */}
        <View style={styles.middleSection}>
          <Text style={[styles.sectionTitle, { fontSize: isSmall ? 20 : 22 }]}>
            Quick Checkup Areas
          </Text>

          {/* Grid */}
          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput("headache, stiff neck")}
            >
              <MaterialCommunityIcons name="brain" size={30} color="red" />
              <Text style={styles.cardText}>Head & Neck</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() =>
                setSymptomInput("chest pain, shortness of breath")
              }
            >
              <AntDesign name="heart" size={30} color="red" />
              <Text style={styles.cardText}>Chest & Lung</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput("fever and body aches")}
            >
              <MaterialCommunityIcons
                name="emoticon-sick-outline"
                size={30}
                color="black"
              />
              <Text style={styles.cardText}>Fever & Flu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput("abdominal cramping, diarrhea")}
            >
              <MaterialCommunityIcons name="stomach" size={30} color="blue" />
              <Text style={styles.cardText}>Stomach/Digestive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() =>
                setSymptomInput("joint swelling and tenderness")
              }
            >
              <FontAwesome5 name="bone" size={24} color="gray" />
              <Text style={styles.cardText}>Joint & Muscle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnType}
              onPress={() => setSymptomInput("red itchy rash")}
            >
              <MaterialCommunityIcons name="bandage" size={30} color="green" />
              <Text style={styles.cardText}>Skin & Rash</Text>
            </TouchableOpacity>
          </View>

          {/* Health Resource Card */}
          <Text style={{ fontSize: isSmall ? 24 : 28, fontWeight: "bold" }}>
            Health Resource
          </Text>

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
        </View>

        {/* Bottom Button */}
        <TouchableOpacity
          style={styles.btnStart}
          onPress={handleStartAnalysis}
          disabled={loading}
        >
          <Text
            style={{
              fontSize: isSmall ? 16 : 18,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {loading ? "Analyzing..." : "Start Symptom Analysis"}
          </Text>
        </TouchableOpacity>

      </View>
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

  headerSection: {
    gap: 15,
  },

  middleSection: {
    flex: 1,
    gap: 20,
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
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardTextContainer: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#489eef",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },

  healthResourceContainer: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#34d734",
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
    marginBottom: 25,
  },
});
