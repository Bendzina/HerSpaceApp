import React from 'react';
import { View, Text, Switch, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '@/app/ThemeContext';

export default function CustomDrawerContent(props: any) {
  const { isDark, setIsDark, colors } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: colors.background }}
    >
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>HerSpace</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Find your calm</Text>
        </View>
      </View>

      <View style={{ paddingTop: 4, paddingBottom: 8 }}>
        <DrawerItemList {...props} />
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.toggleLabel, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={setIsDark}
          trackColor={{ false: '#bbb', true: colors.primary }}
          thumbColor={isDark ? '#fff' : '#f4f3f4'}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
