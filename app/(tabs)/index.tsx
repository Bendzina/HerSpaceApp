// app/(tabs)/index.tsx
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const { width, height } = Dimensions.get('window');

// Translation types
type TranslationKeys = 'welcomeTitle' | 'welcomeDescription' | 'getStarted' | 'settings';
type Translations = Record<'en' | 'ka', Record<TranslationKeys, string>>;

// translations ობიექტი
const translations: Translations = {
  en: {
    welcomeTitle: 'Welcome to Your Safe Space',
    welcomeDescription: 'A sanctuary for your emotional well-being. Let\'s begin your journey to inner peace.',
    getStarted: 'Get Started',
    settings: 'Settings',
  },
  ka: {
    welcomeTitle: 'მოგესალმებით თქვენს უსაფრთხო სივრცეში',
    welcomeDescription: 'თქვენი ემოციური კეთილდღეობის თავშესაფარი. დავიწყოთ თქვენი მოგზაურობა შინაგან სიმშვიდისკენ.',
    getStarted: 'დაიწყეთ',
    settings: 'პარამეტრები',
  },
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { language } = useLanguage();

  // Safe access to translations with proper typing
  const currentTranslations = translations[language] || translations.en;

  // Dynamic styles based on theme
  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#1a1a1a' : '#f8f6f3' }
  ];

  const titleStyle = [
    styles.title,
    { color: isDark ? '#ffffff' : '#2c2c2c' }
  ];

  const descriptionStyle = [
    styles.description,
    { color: isDark ? '#cccccc' : '#666666' }
  ];

  const settingsButtonStyle = [
    styles.settingsButton,
    { backgroundColor: isDark ? '#2c2c2c' : '#ffffff' }
  ];

  const settingsTextStyle = [
    styles.settingsText,
    { color: isDark ? '#ffffff' : '#8b5fbf' }
  ];

  return (
    <ScrollView style={containerStyle} contentContainerStyle={styles.contentContainer}>
      {/* Settings Button */}
      <TouchableOpacity 
        style={settingsButtonStyle}
        onPress={() => router.push('/SettingsScreen')}
        activeOpacity={0.7}
      >
        <Text style={settingsTextStyle}>⚙️ </Text>
      </TouchableOpacity>

      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        {/* Background Circle */}
        <View style={[
          styles.backgroundCircle,
          { backgroundColor: isDark ? '#2c2c2c' : '#f5f1eb' }
        ]} />
        
        {/* Decorative Plants */}
        <View style={[styles.leftPlant1, { backgroundColor: isDark ? '#4a6b5a' : '#2d5a3d' }]} />
        <View style={[styles.leftPlant2, { backgroundColor: isDark ? '#5a7b6a' : '#3a6b4a' }]} />
        <View style={[styles.rightPlant1, { backgroundColor: isDark ? '#4a6b5a' : '#2d5a3d' }]} />
        <View style={[styles.rightPlant2, { backgroundColor: isDark ? '#5a7b6a' : '#3a6b4a' }]} />
        
        {/* Small decorative flowers */}
        <View style={styles.flower1} />
        <View style={styles.flower2} />
        <View style={styles.flower3} />
        <View style={styles.flower4} />
        
        {/* Central meditation figure placeholder */}
        <View style={styles.meditationFigure}>
          <View style={styles.figureBody} />
          <View style={styles.figureHead} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={titleStyle}>{currentTranslations.welcomeTitle}</Text>
        <Text style={descriptionStyle}>
          {currentTranslations.welcomeDescription}
        </Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push('./FocusScreen')}
        >
          <Text style={styles.getStartedText}>{currentTranslations.getStarted}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    minHeight: height,
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 50,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  illustrationContainer: {
    height: height * 0.45,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backgroundCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    position: 'absolute',
    zIndex: 1,
  },
  // Left side plants
  leftPlant1: {
    position: 'absolute',
    left: 20,
    top: '20%',
    width: 80,
    height: 120,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ rotate: '-15deg' }],
    zIndex: 2,
  },
  leftPlant2: {
    position: 'absolute',
    left: 0,
    top: '45%',
    width: 60,
    height: 90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    transform: [{ rotate: '10deg' }],
    zIndex: 2,
  },
  // Right side plants
  rightPlant1: {
    position: 'absolute',
    right: 20,
    top: '15%',
    width: 70,
    height: 110,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    transform: [{ rotate: '20deg' }],
    zIndex: 2,
  },
  rightPlant2: {
    position: 'absolute',
    right: 5,
    top: '50%',
    width: 55,
    height: 85,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    transform: [{ rotate: '-10deg' }],
    zIndex: 2,
  },
  // Small decorative flowers
  flower1: {
    position: 'absolute',
    left: 50,
    bottom: '15%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e09f7d',
    zIndex: 3,
  },
  flower2: {
    position: 'absolute',
    left: 70,
    bottom: '25%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d4816a',
    zIndex: 3,
  },
  flower3: {
    position: 'absolute',
    right: 60,
    bottom: '20%',
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#e09f7d',
    zIndex: 3,
  },
  flower4: {
    position: 'absolute',
    right: 40,
    bottom: '30%',
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#d4816a',
    zIndex: 3,
  },
  // Meditation figure
  meditationFigure: {
    position: 'absolute',
    zIndex: 4,
    alignItems: 'center',
  },
  figureBody: {
    width: 60,
    height: 80,
    backgroundColor: '#e09f7d',
    borderRadius: 30,
    marginBottom: -10,
  },
  figureHead: {
    width: 35,
    height: 35,
    backgroundColor: '#d4816a',
    borderRadius: 17.5,
  },
  contentSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  buttonSection: {
    marginTop: 50,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#8b5fbf',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 30,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#8b5fbf',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});