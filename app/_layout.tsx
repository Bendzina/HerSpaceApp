import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';

function InnerDrawer() {
  const { colors } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600', color: colors.text },
        drawerStyle: { backgroundColor: colors.surface },
        drawerContentStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* Keep your bottom tabs as the main app surface */}
      <Drawer.Screen
        name="(tabs)"
        options={{ title: 'Home', headerShown: false }}
      />
      {/* Secondary screens accessible from the side menu */}
      <Drawer.Screen name="insights" options={{ title: 'Insights' }} />
      <Drawer.Screen name="SettingsScreen" options={{ title: 'Settings' }} />
      <Drawer.Screen name="HelpScreen" options={{ title: 'Help' }} />
      <Drawer.Screen name="AppPreferencesScreen" options={{ title: 'Preferences' }} />
      <Drawer.Screen name="LoginScreen" options={{ title: 'Login' }} />
      <Drawer.Screen name="RegisterScreen" options={{ title: 'Register' }} />
      {/* <Drawer.Screen name="+not-found" options={{ title: 'Not Found' }} /> */}
      {/* Add more as needed */}
      <Drawer.Screen name="rituals" options={{ title: 'Rituals' }} />
    </Drawer>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>   
          <SafeAreaProvider>
            <InnerDrawer />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </SafeAreaProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
