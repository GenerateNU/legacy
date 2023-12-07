import GuideScreen from '@/screens/app/GuideScreen';
import TaskScreen from '@/screens/app/tasks/TaskScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import HomeScreen from './BottomTabNavigator';
// import TaskStack from './TaskStack';
import SubTaskSummaryScreen from '@/screens/app/tasks/SubTaskSummaryScreen';
import SubTaskScreen from '@/screens/app/tasks/SubTaskScreen';

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
      <Stack.Group>
        <Stack.Screen name="Task Screen" component={TaskScreen} />
        <Stack.Screen name="SubTask Summary Screen" component={SubTaskSummaryScreen} />
        <Stack.Screen name="Subtask Screen" component={SubTaskScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Guide Screen" component={GuideScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
