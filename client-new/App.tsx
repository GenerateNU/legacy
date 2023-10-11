import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/navigation/Router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const theme = extendTheme({
    fontConfig: {},
    colors: {},
  });
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </SafeAreaProvider>
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
