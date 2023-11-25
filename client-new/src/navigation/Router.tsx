import { useProfile } from '@/contexts/ProfileContext';
import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { View, Text } from 'react-native';

export default function Router() {
  const { completedOnboarding } = useProfile();

  console.log('completedOnboarding', completedOnboarding);

  if (completedOnboarding === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
