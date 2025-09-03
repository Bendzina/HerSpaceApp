import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewEntryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Journal Entry</Text>
      <Text style={styles.subtitle}>This is a placeholder screen. Add a form here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center' },
});