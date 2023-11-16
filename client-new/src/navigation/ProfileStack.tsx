import {
  KeyboardAvoidingView,
  View,
  Text,
  Divider,
  Button,
  Center,
} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileTab from "../components/reusable/ProfileTab";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "../screens/app/profile/ProfileScreen";
import AllPersonasScreen from "../screens/app/profile/AllPersonasScreen";
import MyPersonaScreen from "../screens/app/profile/MyPersonaScreen";
import PersonaScreen from "../screens/app/profile/PersonaScreen";
import PasswordAndSecurityScreeen from "../screens/app/profile/PasswordAndSecurityScreen";
import NotificationsScreen from "../screens/app/profile/NotificationsScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName='Profile Screen'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Profile Screen' component={ProfileScreen} />
      <Stack.Screen name='My Persona Screen' component={MyPersonaScreen} />
      <Stack.Screen name='All Personas Screen' component={AllPersonasScreen} />
      <Stack.Screen name='Persona Screen' component={PersonaScreen} />
      <Stack.Screen
        name='Password and Security Screen'
        component={PasswordAndSecurityScreeen}
      />
      <Stack.Screen
        name='Personal Access Screen'
        component={NotificationsScreen}
      />
      <Stack.Screen
        name='Notifications Screen'
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
}
