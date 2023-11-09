import { NavigationContainer } from "@react-navigation/native";
import AppStack from "@/navigation/AppStack";
import AuthStack from "@/navigation/AuthStack";
import { useAuth } from "@/contexts/AuthContext"
import React from "react";

export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {true ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
