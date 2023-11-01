import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/navigation/Router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth0Provider } from "react-native-auth0";
import { AuthProvider } from "./src/contexts/AuthContext";
import { getUser } from "./src/services/TestService";

export default function App() {
  const theme = extendTheme({
    fontConfig: {},
    colors: {},
  });
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Router />
          getUser()
        </NativeBaseProvider>
      </SafeAreaProvider>
    </AuthProvider>
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
