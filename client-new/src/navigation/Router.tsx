import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

export default function Router() {
  const { completedOnboarding } = useUser();

  console.log('completedOnboarding', completedOnboarding);

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
