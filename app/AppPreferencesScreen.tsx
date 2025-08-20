import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { translations } from './translations';

export default function AppPreferencesScreen() {
  const { isDark, setIsDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{translations[language].appPreferences}</Text>

      {/* Theme Switch */}
      <View style={styles.row}>
        <Text style={styles.label}>{translations[language].darkMode}</Text>
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          thumbColor={isDark ? '#8b5fbf' : '#fff'}
          trackColor={{ false: '#dddbe5', true: '#8b5fbf' }}
        />
      </View>

      {/* Font Size */}
      <View style={styles.row}>
        <Text style={styles.label}>{translations[language].fontSize}</Text>
        <View style={styles.fontSizeGroup}>
          <TouchableOpacity
            style={[
              styles.fontSizeButton,
              fontSize === 'small' && styles.fontSizeButtonActive,
            ]}
            onPress={() => setFontSize('small')}
          >
            <Text style={styles.fontSizeText}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.fontSizeButton,
              fontSize === 'medium' && styles.fontSizeButtonActive,
            ]}
            onPress={() => setFontSize('medium')}
          >
            <Text style={[styles.fontSizeText, { fontSize: 18 }]}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.fontSizeButton,
              fontSize === 'large' && styles.fontSizeButtonActive,
            ]}
            onPress={() => setFontSize('large')}
          >
            <Text style={[styles.fontSizeText, { fontSize: 22 }]}>A</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language */}
      <View style={styles.row}>
        <Text style={styles.label}>{translations[language].language}</Text>
        <View style={styles.languageGroup}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('en')}
          >
            <Text style={styles.languageText}>{translations[language].english}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'ka' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('ka')}
          >
            <Text style={styles.languageText}>{translations[language].georgian}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5fbf',
    marginBottom: 32,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    color: '#2c2c2c',
    fontWeight: '500',
  },
  fontSizeGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  fontSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f2eff4',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  fontSizeButtonActive: {
    backgroundColor: '#8b5fbf',
  },
  fontSizeText: {
    fontSize: 14,
    color: '#2c2c2c',
    fontWeight: 'bold',
  },
  languageGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f2eff4',
    marginHorizontal: 4,
  },
  languageButtonActive: {
    backgroundColor: '#8b5fbf',
  },
  languageText: {
    color: '#2c2c2c',
    fontWeight: '500',
  },
});