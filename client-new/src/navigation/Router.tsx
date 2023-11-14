import {NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import {useAuth} from "../contexts/AuthContext";
import ProfileStack from "./ProfileStack";

export default function Router() {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {true ? <ProfileStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
