import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Welcome: undefined;
  Profile: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};


export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        {/* Background Circle */}
        <View style={styles.backgroundCircle} />
        
        {/* Decorative Plants */}
        <View style={styles.leftPlant1} />
        <View style={styles.leftPlant2} />
        <View style={styles.rightPlant1} />
        <View style={styles.rightPlant2} />
        
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
        <Text style={styles.title}>Welcome to Your Safe Space</Text>
        <Text style={styles.description}>
        A sanctuary for your emotional well-being. Let's begin your journey to inner peace.
      </Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.push('/ProfileScreen')}
       >
         <Text style={styles.getStartedText}>Get Started</Text>
         </TouchableOpacity>
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f3',
  },
  contentContainer: {
    minHeight: height,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  illustrationContainer: {
    height: height * 0.55,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  backgroundCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#f5f1eb',
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
    backgroundColor: '#2d5a3d',
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
    backgroundColor: '#3a6b4a',
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
    backgroundColor: '#2d5a3d',
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
    backgroundColor: '#3a6b4a',
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
    fontSize: 32,
    fontWeight: '700',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  buttonSection: {
    marginTop: 60,
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
