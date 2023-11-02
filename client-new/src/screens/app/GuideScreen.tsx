/* eslint-disable react-native/no-inline-styles */
//import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView, Box, View, Text, Image } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getGuide } from "../../services/GuideService";
import { useEffect, useState } from "react";

type Guide = {
  guide_name: string;
  title: string;
  sub_title: string;
  author: string;
  author_image_url: string;
  mins_read: Number;
  date: Date;
  full_text: string;
};
const GuideScreen = (props) => {
  // props should include a guideName field.
  const [state, setState] = useState<Guide>(null);

  useEffect(() => {
    const init = async (guideName: String) => {
      const guide = await getGuide(guideName);
      console.log(guide);
      setState(guide);
    };

    init(props.guideName);
  }, []);

  const getMonth = (month: number) => {
    const map = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return map[month];
  };

  return (
    state && (
      <ScrollView>
        <View bg="#FFB017" w={wp("100%")}>
          <View alignItems={"center"}>
            <View pt={hp("11%")} flexDirection={"column"} w={wp("75%")}>
              <Text
                maxW={wp("80%")}
                py={hp("1%")}
                fontFamily={"madeDillan"}
                fontSize={wp("11.5%")}
                bold
                color={"deepEvergreen"}
              >
                {state.title}
              </Text>
              <Text
                maxW={wp("65%")}
                fontFamily={"dmSans"}
                fontWeight={"Regular"}
                fontStyle={"normal"}
                fontSize="2xl"
                max-width
                color={"deepEvergreen"}
              >
                {state.sub_title}
              </Text>
              <View py={hp("2%")} flexDirection={"row"} alignItems={"center"}>
                <Image
                  size={50}
                  borderRadius={35}
                  source={{
                    uri: state.author_image_url,
                  }}
                  alt="barack"
                />
                <Text
                  px={wp("1.25%")}
                  fontFamily={"dmSans"}
                  fontWeight={"Bold"}
                  fontStyle={"normal"}
                  fontSize={"xs"}
                  color={"deepEvergreen"}
                >
                  Written by {state.author}
                </Text>
              </View>
              <View pb={hp("4%")} flexDirection={"row"}>
                <Text
                  fontFamily={"dmSans"}
                  fontWeight={"Bold"}
                  fontStyle={"normal"}
                  fontSize={"xs"}
                  color={"deepEvergreen"}
                >
                  {state.mins_read.toString()} min read
                </Text>
                <Text
                  px={wp("2%")}
                  fontFamily={"dmSans"}
                  fontWeight={"Bold"}
                  fontStyle={"normal"}
                  fontSize={"xs"}
                  color={"deepEvergreen"}
                >
                  {getMonth(new Date(state.date).getMonth())}{" "}
                  {new Date(state.date).getDay().toString()},{" "}
                  {new Date(state.date).getFullYear().toString()}
                </Text>
              </View>
            </View>
            <View>
              <Box
                roundedTop={wp("17%")}
                bg="#FAF8F2"
                w={wp("100%")}
                h={hp("100%")}
              >
                <Text
                  px={"12"}
                  py={"10"}
                  fontFamily={"dmSans"}
                  fontWeight={"Regular"}
                  fontStyle={"normal"}
                  color={"muteEggplant"}
                >
                  {state.full_text}
                </Text>
              </Box>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default GuideScreen;
