import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { isDark, colors } = useTheme();
  const { t } = useLanguage();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert(t.profile.permissionRequired);
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

  const styles = createStyles(colors, isDark);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.profile.title}</Text>
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
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarPlaceholder}>👤</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{t.profile.userName}</Text>
        <Text style={styles.subtitle}>{t.profile.subtitle}</Text>
        <Text style={styles.subtitle}>{t.profile.joined}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>{t.profile.dayStreak}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>32</Text>
          <Text style={styles.statLabel}>{t.profile.ritualsCompleted}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>{t.profile.journalEntries}</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{t.profile.settings}</Text>
      </View>

      {/* Settings Items */}
      <TouchableOpacity 
        style={styles.settingsItem}
        onPress={() => router.push('/NotificationsScreen')}
      >
        <View style={[styles.iconPlaceholder, styles.notificationIcon]}>
          <Text style={styles.iconText}>🔔</Text>
        </View>
        <Text style={styles.settingsLabel}>{t.profile.notifications}</Text>
        <View style={styles.arrowPlaceholder}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.settingsItem}
        onPress={() => router.push('/PasswordScreen')}
      >
        <View style={[styles.iconPlaceholder, styles.accountIcon]}>
          <Text style={styles.iconText}>🔒</Text>
        </View>
        <Text style={styles.settingsLabel}>{t.profile.accountManagement}</Text>
        <View style={styles.arrowPlaceholder}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.settingsItem}
        onPress={() => router.push('/HelpScreen')}
      >
        <View style={[styles.iconPlaceholder, styles.helpIcon]}>
          <Text style={styles.iconText}>❓</Text>
        </View>
        <Text style={styles.settingsLabel}>{t.profile.helpSupport}</Text>
        <View style={styles.arrowPlaceholder}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background
  },
  contentContainer: { 
    paddingBottom: 30 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // ცენტრირება
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  settingsIconButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  settingsIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary + '30',
  },
  avatarPlaceholder: {
    fontSize: 48,
    color: colors.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    backgroundColor: colors.primary + '20',
  },
  accountIcon: {
    backgroundColor: colors.success + '20',
  },
  helpIcon: {
    backgroundColor: colors.warning + '20',
  },
  iconText: {
    fontSize: 20,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  arrowPlaceholder: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});