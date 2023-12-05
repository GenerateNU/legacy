import GuideScreen from '@/screens/app/GuideScreen';
import TaskScreen from '@/screens/app/TaskScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import HomeScreen from '../screens/app/BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen
          name="Task Screen"
          component={TaskScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'vertical'
          }}
        />
        <Stack.Screen name="Guide Screen" component={GuideScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
