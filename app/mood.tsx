import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood</Text>
      <Text style={styles.subtitle}>Track how you feel over time.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
});
