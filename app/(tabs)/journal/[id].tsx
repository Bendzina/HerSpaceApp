import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function JournalEntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry #{id}</Text>
      <Text style={styles.subtitle}>Detail view for a single journal entry.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center' },
});