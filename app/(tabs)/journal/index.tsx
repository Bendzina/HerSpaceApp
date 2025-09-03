import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function JournalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>Capture your thoughts and reflections.</Text>

      <View style={{ height: 20 }} />

      <TouchableOpacity
        onPress={() => router.push('/(tabs)/journal/new-entry' as any)}
        style={[styles.button, { backgroundColor: '#8b5fbf' }]}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>New Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: '/(tabs)/journal/[id]', params: { id: '1' } } as any)
        }
        style={[styles.button, { borderColor: '#8b5fbf', borderWidth: 1 }]}
      >
        <Text style={{ color: '#8b5fbf', fontWeight: '600' }}>Open Entry #1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 20, marginTop: 12 },
});