import { Button } from "native-base";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth0 } from "react-native-auth0";
import { Alert } from "react-native";

export default function AccessScreen() {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
      Alert.alert("Success", "You have successfully logged in");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <Text>Access Screen, Welcome to Legacy! This is Akshay</Text>
      <Button onPress={onPress}></Button>
    </SafeAreaView>
  );
}
