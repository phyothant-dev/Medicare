import axios from "axios";

// NOTE: Your key is exposed here. In a real app, load this from a secure .env file.
const OPENROUTER_API_KEY = "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"; 

export async function getHFResponse(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // Using a confirmed free model on OpenRouter
        model: "x-ai/grok-4.1-fast", 
        messages: [
          { role: "system", content: "You are a helpful and concise assistant." },
          { role: "user", content: prompt }
        ],
        parameters: {
            max_tokens: 150 // Use 'max_tokens' for OpenRouter/OpenAI compatibility
        }
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "medicare", 
          "X-Title": "MyReactNativeApp"
        },
        // ADDED TIMEOUT: This helps prevent the connection from being cut off prematurely
        timeout: 20000 
      }
    );

    const data = response.data;
    const generatedText = data.choices[0]?.message?.content || "No response from AI.";

    // Log the full text and length to confirm the API is sending everything
    console.log("API Response Length:", generatedText.length);
    
    return generatedText;

  } catch (error) {
    // If the error has a response object, display the error message from the API
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error("OpenRouter API Error:", errorMessage);
    
    return "AI is not available right now. Error: " + errorMessage;
  }
}