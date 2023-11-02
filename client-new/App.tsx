import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/navigation/Router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/AuthContext";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    "MADE Dillan": require("./assets/fonts/MADE-Dillan.otf"),
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  const theme = extendTheme({
    fontConfig: {
      DM_Sans: {
        Regular: {
          normal: "DMSans_400Regular",
          italic: "DMSans_400Regular_Italic",
        },
        Medium: {
          normal: "DMSans_500Medium",
          italic: "DMSans_500Medium_Italic",
        },
        Bold: {
          normal: "DMSans_700Bold",
          italic: "DMSans_700Bold_Italic",
        },
      },
    },
    colors: {
      deepEvergreen: "#0C362F",
      muteEggplant: "#251B22",
    },
    fonts: {
      madeDillan: "MADE Dillan", // access fontFamily="madeDillan"
      dmSans: "DM_Sans", // access fontFamily={"dmSans"} fontWeight={"Regular"} fontStyle={"normal"}
    },
  });

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Router />
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
