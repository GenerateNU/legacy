import { useProfile } from '@/contexts/ProfileContext';
import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

export default function Router() {
  const { completedOnboarding } = useProfile();

  console.log('completedOnboarding', completedOnboarding);

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
