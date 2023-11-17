import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import LegacyWordmarkWithBackArrow from "../../../components/reusable/LegacyWordmarkWithBackArrow";
import {View, Text} from "native-base";
import NotificationsToggle from "../../../components/reusable/NotificationsToggle";
import {getItemAsync, setItemAsync} from "expo-secure-store";

// Currently does actually set reminders or store user preferecnes in local storage
export default function NotificationsScreen({route, navigation}) {
  const [motivationReminders, setMotivationReminders] =
    useState<boolean>(false);
  const [progressReminders, setProgressReminders] = useState<boolean>(false);

  const toProfile = () => {
    navigation.navigate("Profile Screen");
  };

  const handleMotivationReminders = (newValue: boolean) => {
    setMotivationReminders(newValue);
    setItemAsync("motivationReminders", newValue.toString());
  };

  const handleProgressReminders = (newValue: boolean) => {
    setProgressReminders(newValue);
    setItemAsync("progressReminders", newValue.toString());
  };

  /**
   * Diplay users saved setings
   */
  const handleScreenSetup = async () => {
    setMotivationReminders(
      (await getItemAsync("motivationReminders")) === "true"
    );
    setProgressReminders((await getItemAsync("progressReminders")) === "true");
  };

  useEffect(() => {
    handleScreenSetup();
  }, []);

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
          marginBottom={10}
        >
          Notifications
        </Text>

        <NotificationsToggle
          title='Allow motivation reminders'
          toggle={motivationReminders}
          toggleChange={handleMotivationReminders}
        />
        <NotificationsToggle
          title='Allow progress reminders'
          toggle={progressReminders}
          toggleChange={handleProgressReminders}
        />
      </View>
    </SafeAreaView>
  );
}
