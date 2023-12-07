import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TaskScreen from '@/screens/app/tasks/TaskScreen';
import SubTaskSummaryScreen from '@/screens/app/tasks/SubTaskSummaryScreen';
import SubTaskScreen from '@/screens/app/tasks/SubTaskScreen';

const Stack = createNativeStackNavigator();
/**
 * The Task Stack contains all the screens related to tasks
 * - All Tasks Screen
 *  - Task Summary Screen
 *     - Subtask Summary Screen
 * @returns TaskStack
 */
export default function TaskStack() {
  return (
    <Stack.Navigator
      initialRouteName="Subtask Summary Screen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Task Screen" component={TaskScreen} />
      <Stack.Screen name="Subtask Summary Screen" component={SubTaskSummaryScreen} />
      <Stack.Screen name="Subtask Screen" component={SubTaskScreen} />
    </Stack.Navigator>
  );
}