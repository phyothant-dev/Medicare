// app/_layout.tsx
import { LanguageProvider } from "@/context/LanguageContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Keep the index (splash/login) screen as a standalone stack screen */}
        <Stack.Screen name="index" />

        {/* Use a grouped `(tabs)` layout for the rest of the app screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LanguageProvider>
  );
}