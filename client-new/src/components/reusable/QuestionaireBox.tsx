import React from "react";
import { View, Text, Slider } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ResponseSlider from "./ResponseSlider";

type QuestionaireBoxProps = {
  text1: string;
  text2: string;
  initialSliderValue: number;
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

      <View
        width={w("68%")}
        flexDirection="row"
        justifyContent={"space-between"}
        alignItems="center"
        paddingBottom={h("0.5%")}
      >
        <Text fontSize={11}>1</Text>
        <Text fontSize={11}>5</Text>
      </View>

      <Slider
        w={w("67%")}
        colorScheme="gray"
        defaultValue={props.initialSliderValue}
        minValue={1}
        maxValue={5}
        step={1}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      {/* <ResponseSlider /> */}
    </View>
  );
}
