import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import LegacyWordmarkWithBackArrow from "../../../components/reusable/LegacyWordmarkWithBackArrow";
import {View, Text} from "native-base";

export default function NotificationsScreen({route, navigation}) {
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
          marginBottom={16}
        >
          Notifications
        </Text>
      </View>
    </SafeAreaView>
  );
}
