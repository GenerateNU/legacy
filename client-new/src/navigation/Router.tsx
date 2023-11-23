import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useUser } from "../contexts/UserContext";
import React from "react";

export default function Router() {
  const { completedOnboarding } = useUser();

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
