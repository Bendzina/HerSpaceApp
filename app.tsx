import { Stack } from "expo-router";
import { ThemeProvider } from "./app/ThemeContext";
import { LanguageProvider } from "./app/LanguageContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
