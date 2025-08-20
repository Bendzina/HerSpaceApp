import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Account Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Account</Text>
      </View>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => router.push('/ProfileScreen')}
      >
        <View style={styles.iconPlaceholder} />
        <View style={styles.settingsTextBox}>
          <Text style={styles.settingsLabel}>Profile</Text>
          <Text style={styles.settingsSubLabel}>Edit your profile information</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => router.push('/PasswordScreen')}
      >
        <View style={styles.iconPlaceholder} />
        <View style={styles.settingsTextBox}>
          <Text style={styles.settingsLabel}>Password</Text>
          <Text style={styles.settingsSubLabel}>Change your password</Text>
        </View>
      </TouchableOpacity>

      {/* Preferences Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Preferences</Text>
      </View>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => router.push('/NotificationsScreen')}
      >
        <View style={styles.iconPlaceholder} />
        <View style={styles.settingsTextBox}>
          <Text style={styles.settingsLabel}>Notifications</Text>
          <Text style={styles.settingsSubLabel}>Manage your notification settings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => router.push('/AppPreferencesScreen')}
      >
        <View style={styles.iconPlaceholder} />
        <View style={styles.settingsTextBox}>
          <Text style={styles.settingsLabel}>App Preferences</Text>
          <Text style={styles.settingsSubLabel}>Customize the app's appearance</Text>
        </View>
      </TouchableOpacity>

      {/* Support Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Support</Text>
      </View>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => router.push('/HelpScreen')}
      >
        <View style={styles.iconPlaceholder} />
        <View style={styles.settingsTextBox}>
          <Text style={styles.settingsLabel}>Help</Text>
          <Text style={styles.settingsSubLabel}>Get help and support</Text>
        </View>
      </TouchableOpacity>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutItem} onPress={() => {/* აქ დაამატე ლოგაუთის ფუნქცია */}}>
        <View style={styles.logoutIcon} />
        <Text style={styles.logoutLabel}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerIcon: {
    width: 48, height: 48, backgroundColor: '#f2eff4', borderRadius: 12, marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111116',
    textAlign: 'center',
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111116',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2eff4',
    gap: 16,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f2eff4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTextBox: {
    flex: 1,
    justifyContent: 'center',
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111116',
  },
  settingsSubLabel: {
    fontSize: 14,
    color: '#6b6387',
    marginTop: 2,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2eff4',
    marginRight: 16,
  },
  logoutLabel: {
    fontSize: 16,
    color: '#111116',
  },
});