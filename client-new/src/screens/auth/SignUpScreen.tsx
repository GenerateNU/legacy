import { Button, Input, KeyboardAvoidingView, View } from "native-base";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import ScreenWideInput from "../../components/reusable/ScreenWideInput";
import { FontAwesome } from "@expo/vector-icons";
import ScreenWideButton from "../../components/reusable/ScreenWideButton";
import SquareButton from "../../components/reusable/SquareButton";

export default function AccessScreen() {
  const { user, createAccount, login, logout } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createAccount(email, password);
  };

  const signIn = () => {
    login(email, password);
  };





  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View alignItems={"center"}>
          <SquareButton
            title = "LOGIN"
          />
         <ScreenWideInput
            placeholderText="Example"
            title="Full Name"
            onChangeText={(value) => setFullName(value)}
            value={fullName}
          />
          <ScreenWideInput
            placeholderText="example@email.com"
            title="Email"
            iconName="envelope-o"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <ScreenWideInput
            placeholderText="Must be at least 8 characters long"
            title="Password"
            iconName="lock"
            password={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <ScreenWideButton text="Login to Legacy" textColor="#FFFFFF" backgroundColor="#8F8F8F"/>
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
