import {View, Text} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import Persona from "@/components/profile/Persona";
import LegacyWordmarkWithBackArrow from "@/components/reusable/LegacyWordMarkWithBackArrow";
import { getPersona } from "@/services/ProfileService";
import { IPersona } from "@/interfaces/IPersona";
import React , {useEffect, useState} from "react";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";

const mockUser = {
  id: "1",
};
export default function MyPersonaScreen({route, navigation}) {
  const [myPersona, setMyPersona] = useState<IPersona | undefined>(undefined);

  /**
   * Fetches the persona of the current user
   */
  const fetchMyPersona = async () => {
    const myPersona = await getPersona(mockUser.id);
    setMyPersona(myPersona);
  };

  /**
   * Loads and displays the persona of the current user
   */
  useEffect(() => {
    fetchMyPersona();
  }, []);

  return (
    <SafeAreaView
      style={{alignItems: "center", flex: 1, backgroundColor: "#FFFAF2"}}
    >
      <View width={340} marginTop={50} height={"auto"}>
        <LegacyWordmarkWithBackArrow
          handleOnPress={() => navigation.navigate("Profile Screen")}
        />
        <Text
          color='#252525'
          fontFamily='Open Sans'
          fontSize={20}
          fontWeight={"700"}
          lineHeight={20}
          marginTop={18}
          marginBottom={5}
        >
          You are an
        </Text>
        <Persona
          personaTitle={myPersona ? myPersona.persona_title : ""}
          personaDescription={myPersona ? myPersona.persona_description : ""}
        />
      </View>
      <View marginTop={"auto"}>
        <ScreenWideButton
          text={"See All Personas"}
          textColor={"#000000"}
          backgroundColor={"#ECECEC"}
          borderColor={"#000000"}
          onClick={() => navigation.navigate("All Personas Screen")}
        />
      </View>
    </SafeAreaView>
  );
}
