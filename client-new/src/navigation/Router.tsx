import { NavigationContainer } from '@react-navigation/native';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import SubTaskScreen from '@/screens/app/SubTaskScreen';
import GuideScreen from '@/screens/app/GuideScreen';
import TaskScreen from '@/screens/app/TaskScreen';
import HomeScreen from '@/screens/app/HomeScreen';

export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {/* <GuideScreen guideName="Test Guide" /> */}
      {/*SubTaskScreen subtask_id={9} */}
      <SubTaskScreen props={{id: 9, sub_task_name: "Personal Information", sub_task_description: "Create a checklist of basic personal information needed for end-of-life planning. Personal intake for doulas and trust and estate lawyers."}}/>
    </NavigationContainer>
  );
}
