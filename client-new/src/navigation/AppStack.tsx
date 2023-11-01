import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/app/BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
          initialRouteName="Home Screen"
          screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        </Stack.Navigator>
      );
}