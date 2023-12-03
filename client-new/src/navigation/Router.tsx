import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { View } from 'native-base';
import TaskScreen from '@/screens/app/TaskScreen';
import HomeScreen from '@/screens/app/HomeScreen';
import SubTaskSummaryScreen from '@/screens/app/SubTaskSummaryScreen';
import SubTaskScreen from '@/screens/app/SubTaskScreen';

export default function Router() {
  //const { completedOnboarding } = useUser();

  /*
  if (completedOnboarding == undefined) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </View>
    );
  } 
  */

  //console.log('[router] completedOnboarding', completedOnboarding);

  return (
    <NavigationContainer>
      {/*completedOnboarding ? <AppStack /> : <AuthStack />*/}
      <SubTaskScreen props={{id: 9, sub_task_name: "Personal Information", sub_task_description: "Create a checklist of basic personal information needed for end-of-life planning. Personal intake for doulas and trust and estate lawyers."}}/>
      {/*<SubTaskSummaryScreen props={{id: 1, task_name: "Create Familiarity with the Process"}}/>*/}
    </NavigationContainer>
  );
}
