import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from './index';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
}