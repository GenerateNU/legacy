import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/app/BottomTabNavigator';
import React from 'react';
import TaskScreen from '@/screens/app/TaskScreen';
import GuideScreen from '@/screens/app/GuideScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Group screenOptions={{ presentation: 'modal' }} >
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Task Screen" component={TaskScreen} options={{
          gestureEnabled: true,
          gestureDirection: 'vertical', 
        }} />
        <Stack.Screen name="Guide Screen" component={GuideScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
