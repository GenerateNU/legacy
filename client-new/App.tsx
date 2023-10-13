import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/navigation/Router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth0Provider } from "react-native-auth0";

export default function App() {
  const theme = extendTheme({
    fontConfig: {},
    colors: {},
  });
  return (
    <Auth0Provider 
    domain={"dev-145d20j331samjak.us.auth0.com"}
    clientId={"0tAv4FM6AkiCPREr9MgbT13aiV5rUVSq"}>
      <SafeAreaProvider>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </SafeAreaProvider>
    </Auth0Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
