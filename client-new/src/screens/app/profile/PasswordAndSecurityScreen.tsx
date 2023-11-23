import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import LegacyWordmarkWithBackArrow from "@/components/reusable/LegacyWordMarkWithBackArrow";
import {View, Text} from "native-base";
import PasswordInput from "@/components/profile/PasswordInput";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";
import {Pressable} from "react-native";

export default function PasswordAndSecurityScreeen({route, navigation}) {
  const [curentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  /**
   * Navigate to Profile Screen
   */
  const toProfile = () => {
    navigation.navigate("Profile Screen");
  };

  /**
   * Save password and navigate to Profile Screen
   */
  const handleSavePassword = () => {
    console.log("pressed save password");
    toProfile();
  };

  return (
    <SafeAreaView
      style={{alignItems: "center", flex: 1, backgroundColor: "#FFFAF2"}}
    >
      <View width={340} marginTop={50} height={"auto"}>
        <LegacyWordmarkWithBackArrow handleOnPress={() => toProfile()} />
        <Text
          color='#252525'
          fontFamily='Open Sans'
          fontSize={15}
          fontWeight={"700"}
          lineHeight={20}
          marginTop={18}
          marginBottom={5}
        >
          Change Password
        </Text>
        <PasswordInput
          title={"Type your current password"}
          password={curentPassword}
          handleOnChange={setCurrentPassword}
        />
        <PasswordInput
          title={"Retype your new password"}
          password={newPassword}
          handleOnChange={setNewPassword}
        />
        <PasswordInput
          title={"Type your new password"}
          password={retypeNewPassword}
          handleOnChange={setRetypeNewPassword}
        />
        <ScreenWideButton
          text={"Save password"}
          textColor='white'
          backgroundColor='#43A573'
          borderColor='#43A573'
          width={"100%"}
          onClick={() => {
            handleSavePassword();
          }}
        />
        <View alignItems={"center"} marginTop={5}>
          <Pressable
            onPress={() => {
              console.log("pressed forgot password");
            }}
          >
            <Text underline>Forgot Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
