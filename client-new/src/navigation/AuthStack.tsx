import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import QuestionaireScreen from "../screens/auth/QuestionaireScreen";
import AccessScreen from "../screens/auth/AccessScreen";
import TransitionScreen from "../screens/auth/TransitionScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Transition Screen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Acess Screen" component={AccessScreen} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
      <Stack.Screen name="Question Screen" component={QuestionaireScreen} />
      <Stack.Screen name="Transition Screen" component={TransitionScreen} />
    </Stack.Navigator>
  );
}
