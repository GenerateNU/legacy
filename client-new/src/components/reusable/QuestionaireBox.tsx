import React from "react";
import { View, Text } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

type QuestionaireBoxProps = {
  text1: string;
  text2: string;
};

export default function QuestionaireBox(props: QuestionaireBoxProps) {
  return (
    <View
      width={w("80%")}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <View
        backgroundColor={"#FFFFFF"}
        borderRadius={10}
        padding={20}
        width={w("80%")}
        height={h("60%")}
        alignItems={"center"}
      >
        <View alignItems={"center"}>
          <Text fontSize={20} fontWeight={"bold"}>
            {props.text1}
          </Text>
          <Text fontSize={16}>{props.text2}</Text>
        </View>
      </View>
    </View>
  );
}
