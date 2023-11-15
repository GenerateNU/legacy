import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import LegacyWordmarkWithBackArrow from "../../../components/reusable/LegacyWordmarkWithBackArrow";
import {View, Text} from "native-base";
import ProfileTab from "../../../components/reusable/ProfileTab";
import PasswordInput from "../../../components/reusable/PasswordInput";

export default function PasswordAndSecurityScreeen({route, navigation}) {
  const toProfile = () => {
    navigation.navigate("Profile Screen");
  };
  return (
    <SafeAreaView style={{alignItems: "center", flex: 1}}>
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
        <PasswordInput title={"Type your current password"} />
        <PasswordInput title={"Retype your new password"} />
        <PasswordInput title={"Type your new password"} />
      </View>
    </SafeAreaView>
  );
}
