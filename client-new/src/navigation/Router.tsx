import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuth } from "../contexts/AuthContext";

export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {false ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
