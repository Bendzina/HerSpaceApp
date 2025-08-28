// app/(tabs)/index.tsx
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const { width, height } = Dimensions.get('window');

const translations = {
  en: {
    welcomeTitle: 'Welcome to Her Space ✨',
    welcomeDescription: 'A sanctuary for women’s emotional well-being. Begin your journey inward.',
    getStarted: 'Get Started',
    settings: 'Settings',
  },
  ka: {
    welcomeTitle: 'მოგესალმებით Her Space-ში ✨',
    welcomeDescription: 'ქალების ემოციური კეთილდღეობის თავშესაფარი. დაიწყე შენი შინაგანი მოგზაურობა.',
    getStarted: 'დაიწყე',
    settings: 'პარამეტრები',
  },
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f6f3' }]}>
      
      {/* Settings Button - ზედა კუთხეში */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push('/SettingsScreen')}
        activeOpacity={0.7}
      >
        <Text style={[styles.settingsText, { color: isDark ? '#fff' : '#8b5fbf' }]}>⚙️</Text>
      </TouchableOpacity>

      {/* Lottie Animation */}
      <LottieView
        source={require('../../assets/animations/welcome.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#2c2c2c' }]}>
          {t.welcomeTitle}
        </Text>
        <Text style={[styles.description, { color: isDark ? '#ddd' : '#444' }]}>
          {t.welcomeDescription}
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push('./FocusScreen')}
        >
          <Text style={styles.getStartedText}>{t.getStarted}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  // settings
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  settingsText: {
    fontSize: 20,
    fontWeight: '600',
  },

  animation: {
    width: width * 0.9,
    height: height * 0.5,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: -20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#8b5fbf',
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#8b5fbf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
