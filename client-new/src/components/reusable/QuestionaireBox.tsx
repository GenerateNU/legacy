import React from "react";
import { View, Text } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ResponseSlider from "./ResponseSlider";

type QuestionaireBoxProps = {
  text1: string;
  text2: string;
};

export default function QuestionaireBox(props: QuestionaireBoxProps) {
  return (
    <View
      backgroundColor={"#FFFFFF"}
      borderRadius={10}
      paddingTop={h("3%")}
      paddingBottom={h("3%")}
      width={w("80%")}
      height={h("50%")}
      alignItems={"center"}
    >
      <View alignItems={"center"} width={w("70%")}>
        <Text fontSize={20} fontWeight={600} paddingBottom={h("1.5%")}>
          {props.text1}
        </Text>
        <Text
          fontSize={16}
          fontWeight={300}
          textAlign={"center"}
          paddingBottom={h("2%")}
        >
          {props.text2}
        </Text>
      </View>

      <View
        width={w("40%")}
        height={w("40%")}
        backgroundColor={"#D9D9D9"}
        marginBottom={h("6.1%")}
      ></View>
      <ResponseSlider />
    </View>
  );
}
