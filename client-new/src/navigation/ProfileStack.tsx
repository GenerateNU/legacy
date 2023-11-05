import {
  KeyboardAvoidingView,
  View,
  Text,
  Divider,
  Button,
  Center,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTab from "../components/reusable/ProfileTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/app/ProfileScreen";
import AllPersonasScreen from "../screens/app/AllPersonasScreen";
import MyPersonaScreen from "../screens/app/MyPersonaScreen";
import PersonaScreen from "../screens/app/PersonaScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile Screen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
      <Stack.Screen name="My Persona Screen" component={MyPersonaScreen} />
      <Stack.Screen name="All Personas Screen" component={AllPersonasScreen} />
      <Stack.Screen name="Persona Screen" component={PersonaScreen} />
    </Stack.Navigator>
  );
}
