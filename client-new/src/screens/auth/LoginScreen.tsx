import { KeyboardAvoidingView, View } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import ScreenWideInput from "../../components/reusable/ScreenWideInput";
import ScreenWideButton from "../../components/reusable/HalfScreenWideButton";
import SquareButton from "../../components/reusable/SquareButton";
import CompaniesFooter from "../../components/reusable/CompaniesFooter";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import LetsGo from "../../components/reusable/LetsGo";

export default function LoginScreen({ route, navigation }) {
  const { user, login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (login(email, password)) {
      // ONCE WE FIGURE OUT HOW TO GO TO HOME SCREEN, PUT HERE
      navigation.navigate("");
    } 
    else {
      Alert.alert(
        "Error",
        "There was an error with authentication. Please try again.",
        [{ text: "OK", onPress: () => {}}]
      );
    }
  };

  const switchToSignUp = () => {
    navigation.navigate("Sign Up Screen");
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <View
          width={w("80%")}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={"center"}
        >
          <LegacyWordmark />
          <SquareButton title="SIGN UP" onClick={switchToSignUp} />
        </View>
        <View paddingTop={h("7%")}>
          <LetsGo />
        </View>
        <View alignItems={"center"} paddingTop={h("6.5%")}>
          <ScreenWideInput
            placeholderText="example@email.com"
            title="Email"
            iconName="envelope-o"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <View paddingTop={h("3%")} paddingBottom={h("4%")}>
            <ScreenWideInput
              placeholderText="Must be at least 8 characters long"
              title="Password"
              iconName="lock"
              password={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
          </View>
          <View
            width={w("80%")}
            alignItems={"center"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <ScreenWideButton
              text="Login with SSO"
              textColor="#8F8F8F"
              backgroundColor="#FFFFFF"
              borderColor="#8F8F8F"
            />
            <ScreenWideButton
              text="Login to Legacy"
              textColor="#FFFFFF"
              backgroundColor="#8F8F8F"
              borderColor="#8F8F8F"
              onClick={signIn}
            />
          </View>
          <View paddingTop={h("4%")}>
            <CompaniesFooter />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
