import React from 'react';
import { Stack } from 'expo-router';

export default function JournalStackLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontWeight: '600' } }}>
      <Stack.Screen name="index" options={{ title: 'Journal' }} />
      <Stack.Screen name="new-entry" options={{ title: 'New Entry' }} />
      <Stack.Screen name="[id]" options={{ title: 'Entry' }} />
    </Stack>
  );
}