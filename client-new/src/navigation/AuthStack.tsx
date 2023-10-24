import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import AccessScreen from "../screens/auth/AccessScreen";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Access Screen"
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
