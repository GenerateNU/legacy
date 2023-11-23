import { NavigationContainer } from '@react-navigation/native';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import React from 'react';
import { useUser } from '@/contexts/UserContext';

export default function Router() {
  const { completedOnboarding } = useUser();

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
