import { useProfile } from '@/contexts/ProfileContext';
import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { View } from 'native-base';

export default function Router() {
  const { profile, completedOnboarding } = useProfile();

  if (completedOnboarding == undefined || profile == undefined) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log('[router] completedOnboarding profile', profile.completed_onboarding_response);
  console.log('[router] completedOnboarding', completedOnboarding);

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
