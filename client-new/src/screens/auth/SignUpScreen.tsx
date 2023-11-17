import { KeyboardAvoidingView, View } from "native-base";
import { StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import ScreenWideInput from "../../components/reusable/ScreenWideInput";
import ScreenWideButton from "../../components/reusable/HalfScreenWideButton";
import SquareButton from "../../components/reusable/SmallRoundedButton";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import LetsGo from "../../components/reusable/LetsGo";
import Footer from "../../components/reusable/Footer";

export default function SignUpScreen({ route, navigation }) {
  const { user, createAccount } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createAccount(fullName, email, password);
    navigation.setOptions();
    navigation.navigate("Onboarding Stack");
    // createAccount(fullName, email, password).then((response) => {
    //   if (response === true) {
    //     navigation.setOptions();
    //     navigation.navigate("Onboarding Stack");
    //   } else {
    //     const errorMessage = response.code;
    //     console.log("ERROR: ", errorMessage);
    //     if (errorMessage === "auth/invalid-email") {
    //       Alert.alert("Error", "Invalid email, please try again.", [
    //         { text: "OK", onPress: () => {} },
    //       ]);
    //     } else if (errorMessage === "auth/email-already-in-use") {
    //       Alert.alert(
    //         "Error",
    //         "A Legacy account already exists for this email. Please log in.",
    //         [{ text: "OK", onPress: () => {} }]
    //       );
    //     } else if (errorMessage === "auth/weak-password") {
    //       Alert.alert("Error", "Password must be 8 characters long.", [
    //         { text: "OK", onPress: () => {} },
    //       ]);
    //     } else {
    //       Alert.alert(
    //         "Error",
    //         "There was an error with signing up. Please try again.",
    //         [{ text: "OK", onPress: () => {} }]
    //       );
    //     }
    //   }
    // });
  };

  const switchToLogin = () => {
    navigation.navigate("Login Screen");
  };

  return (
    <>
      <View bg={"creamyCanvas"} alignItems="center" h={h("100%")} w={w("100%")}>
        <View
          alignItems="center"
          width={w("80%")}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={"center"}
          paddingTop={h("8%")}
        >
          <LegacyWordmark />
          <SquareButton title="Login" onClick={switchToLogin} />
        </View>
        <View paddingTop={h("7%")}>
          <LetsGo />
        </View>
        <View alignItems={"center"} paddingTop={h("6.5%")}>
          <ScreenWideInput
            placeholderText="Example"
            title="Full Name"
            iconName="user-o"
            onChangeText={(value) => setFullName(value)}
            value={fullName}
          />
          <View paddingTop={h("3%")}>
            <ScreenWideInput
              placeholderText="example@email.com"
              title="Email"
              iconName="envelope-o"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
          </View>
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
              text="Sign up with SSO"
              textColor={"#000000"}
              backgroundColor={"transparent"}
              borderColor={"lightGreen"}
            />
            <ScreenWideButton
              text="Sign up to Legacy"
              textColor={"#FFFFFF"}
              backgroundColor={"lightGreen"}
              borderColor={"lightGreen"}
              onClick={signUp}
            />
          </View>
          <View paddingTop={h("20%")}>
            <Footer />
          </View>
        </View>
      </View>
    </>
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
