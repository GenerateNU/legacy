import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {false ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
