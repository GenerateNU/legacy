import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import AccessScreen from "../screens/auth/AccessScreen";
import OnboardingStack from "./OnboardingStack";
import React from "react";
import { useUser } from "../contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function AuπthStack() {
  const { user } = useUser();
  const screenToDisplay = user ? "Onboarding Stack" : "Access Screen";

  return (
    <Stack.Navigator
      initialRouteName={screenToDisplay}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Access Screen" component={AccessScreen} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
      <Stack.Screen name="Onboarding Stack" component={OnboardingStack} />
    </Stack.Navigator>
  );
}
