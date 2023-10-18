import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "native-base";

export default function HomeScreen() {
  const { user, createAccount, login, logout } = useAuth();
  return (
    <SafeAreaView>
      <Text>Home Screen, Welcome to Legacy!</Text>
      <Button onPress={logout}>Logout</Button>
    </SafeAreaView>
  );
}
