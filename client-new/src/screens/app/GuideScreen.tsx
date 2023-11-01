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
            <View pt={hp("7%")} flexDirection={"column"} w={wp("75%")}>
              <Text
                maxW={wp("80%")}
                py={hp("1%")}
                fontSize={wp("11.5%")}
                bold
                style={styles.headingColor}
              >
                {state.title}
              </Text>
              <Text
                maxW={wp("65%")}
                fontSize="2xl"
                max-width
                style={styles.headingColor}
              >
                {state.sub_title}
              </Text>
              <View py={hp("1%")} flexDirection={"row"} alignItems={"center"}>
                <Image
                  size={50}
                  borderRadius={35}
                  source={{
                    uri: state.author_image_url,
                  }}
                  alt="barack"
                />
                <Text
                  mx={wp("0.75%")}
                  fontSize={"xs"}
                  style={styles.headingColor}
                >
                  Written by {state.author}
                </Text>
              </View>
              <View pb={hp("3%")} flexDirection={"row"}>
                <Text fontSize={"xs"} style={styles.headingColor}>
                  {state.mins_read.toString()} min read
                </Text>
                <Text mx={wp("1%")} fontSize={"xs"} style={styles.headingColor}>
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
                <Text px={"12"} py={"10"} style={styles.guideColor}>
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

const styles = StyleSheet.create({
  headingColor: {
    color: "#0C362F",
  },
  guideColor: {
    color: "#251B22",
  },
  madeFont: {
    fontFamily: "MADE Dillan",
  },
});

export default GuideScreen;
