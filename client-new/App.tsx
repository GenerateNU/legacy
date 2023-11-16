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

<<<<<<< HEAD
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
=======
import {Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

>>>>>>> 8666dfa80d68e7331891be901b12bfa773236d62

export default function App() {
  const [fontsLoaded] = useFonts({
    "MADE Dillan": require("./assets/fonts/MADE-Dillan.otf"),
<<<<<<< HEAD
    // "Roca Heavy": require("./assets/fonts/Roca-Bold.ttf"),
    // "Roca Light": require("./assets/fonts/Roca-Light.ttf"),
    // "Roca Regular": require("./assets/fonts/Roca-Regular.ttf"),
=======
    "Roca Heavy": require("./assets/fonts/Roca-Bold.ttf"),
    "Roca Light": require("./assets/fonts/Roca-Light.ttf"),
    "Roca Regular": require("./assets/fonts/Roca-Regular.ttf"),
>>>>>>> 8666dfa80d68e7331891be901b12bfa773236d62
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
    Inter_400Regular,
<<<<<<< HEAD
    Inter_600SemiBold,
=======
    Inter_600SemiBold
>>>>>>> 8666dfa80d68e7331891be901b12bfa773236d62
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
      Roca_One: {
        Light: {
          normal: "Roca Light",
        },
        Regular: {
          normal: "Roca Regular",
        },
        Bold: {
          normal: "Roca Heavy",
        },
      },
      Inter: {
        Regular: {
          normal: "Inter_400Regular",
        },
        Bold: {
          normal: "Inter_600SemiBold",
        },
      },
    },
    colors: {
      deepEvergreen: "#0C362F",
      lightGreen: "#43A574",
      darkGreen: "#0F4F43",
      muteEggplant: "#251B22",
      creamyCanvas: "#FFF9EE",
    },
    fonts: {
      madeDillan: "MADE Dillan", // access fontFamily="madeDillan"
      dmSans: "DM_Sans", // access fontFamily={"dmSans"} fontWeight={"Regular"} fontStyle={"normal"}
      rocaOne: "Roca_One", // access fontFamily={"rocaOne"} fontWeight={"Regular"} fontStyle={"normal"}
      inter: "Inter", // access fontFamily={"inter"} fontWeight={"Regular"} fontStyle={"normal"}
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
