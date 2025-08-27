import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const { width, height } = Dimensions.get('window');

// Translation types
type TranslationKeys = 
  | 'moodTitle' 
  | 'moodSubtitle' 
  | 'saveProgress' 
  | 'next' 
  | 'selectMoodFirst'
  | 'progressSaved';

type Translations = Record<'en' | 'ka', Record<TranslationKeys, string>>;

const translations: Translations = {
  en: {
    moodTitle: 'How are you feeling today?',
    moodSubtitle: 'Your emotions matter. Take a moment to check in with yourself.',
    saveProgress: 'Save Progress',
    next: 'Continue Journey',
    selectMoodFirst: 'Please select your mood first',
    progressSaved: 'Your mood has been saved ✨'
  },
  ka: {
    moodTitle: 'როგორ გრძნობთ თავს დღეს?',
    moodSubtitle: 'თქვენი ემოციები მნიშვნელოვანია. დაუთმეთ დრო საკუთარ თავთან ურთიერთობას.',
    saveProgress: 'პროგრესის შენახვა',
    next: 'მოგზაურობის გაგრძელება',
    selectMoodFirst: 'გთხოვთ პირველ ამოირჩიეთ გუნება',
    progressSaved: 'თქვენი გუნება შენახულია ✨'
  },
};

const moods = [
  { id: 'happy', emoji: '😊', label: { en: 'Happy', ka: 'ბედნიერი' }, color: '#FFD93D' },
  { id: 'calm', emoji: '😌', label: { en: 'Calm', ka: 'მშვიდი' }, color: '#6BCF7F' },
  { id: 'neutral', emoji: '😐', label: { en: 'Neutral', ka: 'ნეიტრალური' }, color: '#A8A8A8' },
  { id: 'stressed', emoji: '😤', label: { en: 'Stressed', ka: 'სტრესული' }, color: '#FF6B6B' },
  { id: 'sad', emoji: '😔', label: { en: 'Sad', ka: 'დარდიანი' }, color: '#74A9FF' },
  { id: 'anxious', emoji: '😰', label: { en: 'Anxious', ka: 'შეშფოთებული' }, color: '#FFAB40' },
];

export default function MoodScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const currentTranslations = translations[language] || translations.en;

  const handleSaveProgress = () => {
    if (!selectedMood) {
      Alert.alert('', currentTranslations.selectMoodFirst);
      return;
    }
    
    // TODO: Implement actual saving to backend/storage
    console.log('Saving mood:', selectedMood);
    setIsSaved(true);
    
    Alert.alert('', currentTranslations.progressSaved);
    
    // Reset save status after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleContinue = () => {
    if (!selectedMood) {
      Alert.alert('', currentTranslations.selectMoodFirst);
      return;
    }
    router.push("/NotificationsScreen");
  };

  // Dynamic styles based on theme
  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#1a1a1a' : '#f8f6f3' }
  ];

  const titleStyle = [
    styles.title,
    { color: isDark ? '#ffffff' : '#2c2c2c' }
  ];

  const subtitleStyle = [
    styles.subtitle,
    { color: isDark ? '#cccccc' : '#666666' }
  ];

  const selectedMoodObj = moods.find(mood => mood.id === selectedMood);

  return (
    <ScrollView style={containerStyle} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={titleStyle}>{currentTranslations.moodTitle}</Text>
        <Text style={subtitleStyle}>{currentTranslations.moodSubtitle}</Text>
      </View>

      {/* Mood Selection Grid */}
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodOption,
              { 
                backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
                borderColor: selectedMood === mood.id ? mood.color : (isDark ? '#404040' : '#e0e0e0'),
                borderWidth: selectedMood === mood.id ? 3 : 1,
              },
              selectedMood === mood.id && { 
                transform: [{ scale: 1.05 }],
                shadowColor: mood.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }
            ]}
            onPress={() => setSelectedMood(mood.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[
              styles.moodLabel,
              { 
                color: selectedMood === mood.id ? mood.color : (isDark ? '#ffffff' : '#333333'),
                fontWeight: selectedMood === mood.id ? '700' : '500'
              }
            ]}>
              {mood.label[language]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Mood Display */}
      {selectedMoodObj && (
        <View style={[
          styles.selectedMoodDisplay,
          { 
            backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
            borderColor: selectedMoodObj.color 
          }
        ]}>
          <Text style={styles.selectedMoodEmoji}>{selectedMoodObj.emoji}</Text>
          <Text style={[
            styles.selectedMoodText,
            { color: isDark ? '#ffffff' : '#333333' }
          ]}>
            You're feeling {selectedMoodObj.label[language].toLowerCase()} today
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { 
              backgroundColor: isSaved ? '#4CAF50' : (isDark ? '#404040' : '#e0e0e0'),
              opacity: selectedMood ? 1 : 0.5 
            }
          ]}
          onPress={handleSaveProgress}
          disabled={!selectedMood}
        >
          <Text style={[
            styles.saveButtonText,
            { 
              color: isSaved ? '#ffffff' : (isDark ? '#cccccc' : '#666666')
            }
          ]}>
            {isSaved ? '✓ Saved' : currentTranslations.saveProgress}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            { 
              backgroundColor: selectedMood ? '#8b5fbf' : '#cccccc',
              opacity: selectedMood ? 1 : 0.5 
            }
          ]}
          onPress={handleContinue}
          disabled={!selectedMood}
        >
          <Text style={styles.continueButtonText}>
            {currentTranslations.next}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <Text style={[
          styles.progressText,
          { color: isDark ? '#cccccc' : '#666666' }
        ]}>
          Step 2 of 3
        </Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 50,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodOption: {
    width: (width - 60) / 2,
    aspectRatio: 1.2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 15,
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedMoodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 30,
  },
  selectedMoodEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  selectedMoodText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  buttonSection: {
    gap: 15,
    marginBottom: 30,
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 30,
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
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressBar: {
    width: width * 0.6,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5fbf',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
});