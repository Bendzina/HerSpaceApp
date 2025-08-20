import { ThemeProvider } from './app/ThemeContext';
import { LanguageProvider } from './app/LanguageContext';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Slot />
      </LanguageProvider>
    </ThemeProvider>
  );
}