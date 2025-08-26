// app/AppPreferencesScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

// translations ობიექტი
const translations = {
  en: {
    appPreferences: 'App Preferences',
    darkMode: 'Dark Mode',
    fontSize: 'Font Size',
    language: 'Language',
    english: 'English',
    georgian: 'Georgian',
    back: 'Back',
  },
  ka: {
    appPreferences: 'აპის პარამეტრები',
    darkMode: 'მუქი თემა',
    fontSize: 'ტექსტის ზომა',
    language: 'ენა',
    english: 'English',
    georgian: 'ქართული',
    back: 'უკან',
  },
};

export default function AppPreferencesScreen() {
  const router = useRouter();
  const { isDark, setIsDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Safe access to translations
  const currentTranslations = translations[language as keyof typeof translations] || translations.en;

  // Theme Toggle Handler
  const handleThemeToggle = (value: boolean) => {
    console.log('Theme toggle pressed:', value);
    setIsDark(value);
  };

  // Language Change Handler
  const handleLanguageChange = (newLanguage: 'en' | 'ka') => {
    console.log('Language change pressed:', newLanguage);
    setLanguage(newLanguage);
  };

  // Font Size Change Handler
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    console.log('Font size changed:', size);
    setFontSize(size);
  };

  // Dynamic styles based on theme
  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }
  ];

  const headerStyle = [
    styles.header,
    { color: isDark ? '#ffffff' : '#8b5fbf' }
  ];

  const labelStyle = [
    styles.label,
    { color: isDark ? '#ffffff' : '#2c2c2c' }
  ];

  const cardStyle = [
    styles.card,
    { 
      backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
      shadowColor: isDark ? '#000' : '#8b5fbf',
    }
  ];

  const backButtonStyle = [
    styles.backButton,
    { backgroundColor: isDark ? '#2c2c2c' : '#ffffff' }
  ];

  const backButtonTextStyle = [
    styles.backButtonText,
    { color: isDark ? '#ffffff' : '#8b5fbf' }
  ];

  return (
    <>
      {/* Expo Router Stack Screen configuration */}
      <Stack.Screen 
        options={{ 
          headerShown: false,
          title: currentTranslations.appPreferences 
        }} 
      />
      
      <View style={containerStyle}>
        {/* Custom Back Button */}
        <TouchableOpacity 
          style={backButtonStyle}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={backButtonTextStyle}>← {currentTranslations.back}</Text>
        </TouchableOpacity>

        <Text style={headerStyle}>{currentTranslations.appPreferences}</Text>

        {/* Theme Switch Card */}
        <View style={[cardStyle, styles.row]}>
          <Text style={labelStyle}>{currentTranslations.darkMode}</Text>
          <Switch
            value={isDark}
            onValueChange={handleThemeToggle}
            thumbColor={isDark ? '#8b5fbf' : '#ffffff'}
            trackColor={{ false: '#dddbe5', true: '#8b5fbf' }}
            ios_backgroundColor="#dddbe5"
          />
        </View>

        {/* Font Size Card */}
        <View style={cardStyle}>
          <Text style={[labelStyle, styles.sectionTitle]}>{currentTranslations.fontSize}</Text>
          <View style={styles.fontSizeGroup}>
            <TouchableOpacity
              style={[
                styles.fontSizeButton,
                { backgroundColor: isDark ? '#1a1a1a' : '#f2eff4' },
                fontSize === 'small' && styles.fontSizeButtonActive,
              ]}
              onPress={() => handleFontSizeChange('small')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.fontSizeText,
                { color: isDark ? '#ffffff' : '#2c2c2c' },
                fontSize === 'small' && { color: '#ffffff' }
              ]}>A</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.fontSizeButton,
                { backgroundColor: isDark ? '#1a1a1a' : '#f2eff4' },
                fontSize === 'medium' && styles.fontSizeButtonActive,
              ]}
              onPress={() => handleFontSizeChange('medium')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.fontSizeText,
                { fontSize: 18, color: isDark ? '#ffffff' : '#2c2c2c' },
                fontSize === 'medium' && { color: '#ffffff' }
              ]}>A</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.fontSizeButton,
                { backgroundColor: isDark ? '#1a1a1a' : '#f2eff4' },
                fontSize === 'large' && styles.fontSizeButtonActive,
              ]}
              onPress={() => handleFontSizeChange('large')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.fontSizeText,
                { fontSize: 22, color: isDark ? '#ffffff' : '#2c2c2c' },
                fontSize === 'large' && { color: '#ffffff' }
              ]}>A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Card */}
        <View style={cardStyle}>
          <Text style={[labelStyle, styles.sectionTitle]}>{currentTranslations.language}</Text>
          <View style={styles.languageGroup}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { backgroundColor: isDark ? '#1a1a1a' : '#f2eff4' },
                language === 'en' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('en')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.languageText,
                { color: isDark ? '#ffffff' : '#2c2c2c' },
                language === 'en' && { color: '#ffffff' }
              ]}>{currentTranslations.english}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.languageButton,
                { backgroundColor: isDark ? '#1a1a1a' : '#f2eff4' },
                language === 'ka' && styles.languageButtonActive,
              ]}
              onPress={() => handleLanguageChange('ka')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.languageText,
                { color: isDark ? '#ffffff' : '#2c2c2c' },
                language === 'ka' && { color: '#ffffff' }
              ]}>{currentTranslations.georgian}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Debug Info */}
        <View style={[cardStyle, { marginTop: 20 }]}>
          <Text style={[labelStyle, { fontSize: 12, opacity: 0.7 }]}>
            Debug: Theme={isDark ? 'Dark' : 'Light'}, Language={language}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    paddingTop: 50, // Safe area-ისთვის
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  fontSizeGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  fontSizeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fontSizeButtonActive: {
    backgroundColor: '#8b5fbf',
    borderColor: '#8b5fbf',
  },
  fontSizeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  languageButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageButtonActive: {
    backgroundColor: '#8b5fbf',
    borderColor: '#8b5fbf',
  },
  languageText: {
    fontWeight: '600',
    fontSize: 16,
  },
});