import GuideScreen from '@/screens/app/GuideScreen';
import TaskScreen from '@/screens/app/tasks/TaskScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import HomeScreen from '../screens/app/BottomTabNavigator';
import TaskStack from './TaskStack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Task Screen" component={TaskScreen} />
      <Stack.Screen name="Guide Screen" component={GuideScreen} />
    </Stack.Navigator>
  );
}
