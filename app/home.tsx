import { getHFResponse } from "@/services/aiApiService";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("AI output will appear here...");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    setOutput("Thinking...");
    
    // Check if input is empty before making the call
    if (!input.trim()) {
        setOutput("Please enter a prompt.");
        setLoading(false);
        return;
    }

    const reply = await getHFResponse(input);
    setOutput(reply);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AI Chatbot</Text>
        
        <TextInput
          placeholder="Ask AI something..."
          value={input}
          onChangeText={setInput}
          multiline={true}
          style={styles.input}
        />
        
        <Button 
          title={loading ? "Loading..." : "Ask AI"} 
          onPress={handleAskAI} 
          disabled={loading}
        />
        
        <View style={styles.outputContainer}>
          <Text style={styles.outputTextTitle}>AI Response:</Text>
          <Text style={styles.outputText}>{output}</Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the entire screen is covered
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50, // Add padding at the bottom for scrolling margin
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    minHeight: 80, // Allow multiple lines for input
    fontSize: 16,
  },
  outputContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  outputTextTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  outputText: {
    fontSize: 16, // Use a readable font size
    lineHeight: 24,
    color: '#333',
  },
});