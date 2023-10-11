import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccessScreen from "../screens/auth/AccessScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
          initialRouteName="Access Screen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Access Screen" component={AccessScreen} />
        </Stack.Navigator>
      );
}