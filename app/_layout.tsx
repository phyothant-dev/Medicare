// app/_layout.tsx
import { LanguageProvider } from "@/context/LanguageContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="home" />
        <Stack.Screen name="immunity" />
        <Stack.Screen name="foodgroups" />
        <Stack.Screen name="incompatible-food" />
      </Stack>
    </LanguageProvider>
  );
}