import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RitualsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rituals</Text>
      <Text style={styles.subtitle}>Daily practices to support your wellbeing.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
});
