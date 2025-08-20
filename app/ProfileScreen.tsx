import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsIconButton}
          onPress={() => router.push('/SettingsScreen')}
        >
          <View style={styles.settingsIcon}>
            <Text style={styles.settingsIconText}>⚙</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>Sophia Carter</Text>
        <Text style={styles.subtitle}>Mindful Journey</Text>
        <Text style={styles.subtitle}>Joined 2022</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>32</Text>
          <Text style={styles.statLabel}>Rituals Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>Journal Entries</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Settings</Text>
      </View>

      {/* Settings Items */}
      <View style={styles.settingsItem}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.settingsLabel}>Notifications</Text>
        <View style={styles.switchPlaceholder} />
      </View>
      <View style={styles.settingsItem}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.settingsLabel}>Account Management</Text>
        <View style={styles.arrowPlaceholder} />
      </View>
      <View style={styles.settingsItem}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.settingsLabel}>Help & Support</Text>
        <View style={styles.arrowPlaceholder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  contentContainer: { 
    paddingBottom: 30 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111116',
    textAlign: 'center',
    flex: 1,
  },
  settingsIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f6f3',
  },
  settingsIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f2eff4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconText: {
    fontSize: 16,
    color: '#666',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#e0d7f7',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111116',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6387',
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: 111,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddbe5',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111116',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b6387',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111116',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2eff4',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2eff4',
    marginRight: 16,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111116',
  },
  switchPlaceholder: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f2eff4',
  },
  arrowPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f2eff4',
  },
});