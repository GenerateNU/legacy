import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import QuestionaireScreen from "../screens/auth/QuestionaireScreen";
import AccessScreen from "../screens/auth/AccessScreen";
import SignUpTransitionScreen from "../screens/auth/SignUpTransitionScreen";
import QuizSectionIntroScreen from "../screens/auth/QuizSectionIntroScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Quiz Section Intro Screen"
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
    </Stack.Navigator>
  );
}
