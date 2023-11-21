import { NavigationContainer } from '@react-navigation/native';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import SubTaskScreen from '@/screens/app/SubTaskScreen';
import GuideScreen from '@/screens/app/GuideScreen';

export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {true ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
