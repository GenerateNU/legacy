import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import QuestionaireScreen from "../screens/auth/QuestionaireScreen";
import AccessScreen from "../screens/auth/AccessScreen";
import SignUpTransitionScreen from "../screens/auth/SignUpTransitionScreen";
import QuizSectionIntroScreen from "../screens/auth/QuizSectionIntroScreen";
import PersonaScreen from "../screens/auth/PersonaScreen";
import LandingScreen from "../screens/auth/LandingScreen";

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
      <Stack.Screen name="Questionaire Screen" component={QuestionaireScreen} />
      <Stack.Screen
        name="Sign Up Transition Screen"
        component={SignUpTransitionScreen}
      />
      <Stack.Screen
        name="Quiz Section Intro Screen"
        component={QuizSectionIntroScreen}
      />
      <Stack.Screen name="Persona Screen" component={PersonaScreen} />
      <Stack.Screen name="Landing Screen" component={LandingScreen} />
    </Stack.Navigator>
  );
}
