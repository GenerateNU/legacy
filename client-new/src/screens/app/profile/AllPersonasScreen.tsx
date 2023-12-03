import { View, Text, ScrollView } from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import { ActivityIndicator, Pressable } from "react-native";
import Svg, {Path} from "react-native-svg";
import {useEffect, useState} from "react";
import { IPersona } from "@/interfaces/IPersona";
import { getAllPersonas } from "@/services/ProfileService";
import PersonaCard from "@/components/profile/PersonaCard";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import React from "react";
import LegacyWordmarkWithBackArrow from "@/components/reusable/LegacyWordMarkWithBackArrow";
import { useQuery } from "@tanstack/react-query";

/**
 * Screen to render all personas
 * @param route and navigation are props passed in by the react navigation stack
 * @returns All Peronas Screen
 */
export default function AllPersonasScreen({ route, navigation }) {
  /**
   * Sends user to the persona screen. Must pass in title and description of the persona.
   * @param title Title of persona
   * @param description Brief description of the persona
   */
  const toPersona = (title: string, description: string) => {
    navigation.push("Persona Screen", {
      props: {title: title, description: description},
    });
  };

  /**
   * Fetch all data for this screen:
   * - All personas
   */
  const { isPending, data: personas, error } = useQuery({
    queryKey: ["allPersonas"],
    queryFn: async () => await getAllPersonas(),
  });


  return (
    <SafeAreaView
      style={{alignItems: "center", flex: 1, backgroundColor: "#FFFAF2"}}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View width={340} marginTop={50} height={"auto"}>
          <LegacyWordmarkWithBackArrow handleOnPress={() => navigation.navigate("My Persona Screen")} />
          <Text
            style={{
              color: "#252525",
              fontFamily: "Open Sans",
              fontSize: 15,
              fontWeight: "700",
              lineHeight: 20,
              marginTop: 18,
              marginBottom: 16,
            }}
          >
            All Personas
          </Text>
          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Something went wrong ...</Text>}
          {personas?.map((value, index) => (
            <View marginBottom={h("1")} key={index}>
              <PersonaCard
                title={value.persona_title}
                subtitle={'Lorem ipsum dolor sit amet'}
                image='https://i.postimg.cc/44Qn7BWC/temp-Image-KY7-Maq.jpg'
                border={true}
                backgroundColor='white'
                handleOnPress={() =>
                  toPersona(value.persona_title, value.persona_description)
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
