import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingProvider } from "../contexts/OnboardingContext";
import QuestionaireScreen from "../screens/auth/QuestionaireScreen";
import SignUpTransitionScreen from "../screens/auth/SignUpTransitionScreen";
import PersonaScreen from "../screens/auth/PersonaScreen";
import LandingScreen from "../screens/auth/LandingScreen";
import QuizSectionIntroScreen from "../screens/auth/QuizSectionIntroScreen";
import HomeScreen from "../screens/app/BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        initialRouteName="Sign Up Transition Screen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Questionaire Screen"
          component={QuestionaireScreen}
        />
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
    </OnboardingProvider>
  );
}
