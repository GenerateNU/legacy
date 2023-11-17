import { Divider, View, Text, Button } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import React from "react";

export default function ResponseSlider() {
  const bigCircle = (
    <View
      backgroundColor="#FFFFFF"
      height={h("1.5%")}
      width={h("1.5%")}
      borderRadius={h("1.5%")}
      borderWidth={1}
      borderColor={"#000000"}
    ></View>
  );
  const smallCircle = (
    <View
      backgroundColor="#FFFFFF"
      height={h("1.5%") * 0.75}
      width={h("1.5%") * 0.75}
      borderRadius={h("1.5%") * 0.75}
      borderWidth={1}
      borderColor={"#000000"}
    ></View>
  );

  const divider = <Divider color={"#D9D9D9"} width={w("14%")} />;

  return (
    <>
      <View
        width={w("68%")}
        flexDirection="row"
        justifyContent={"space-between"}
        alignItems="center"
        paddingBottom={h("0.5%")}
      >
        <Text fontSize={9}>1</Text>
        <Text fontSize={9}>5</Text>
      </View>

      <View
        width={w("80%")}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        {bigCircle}
        {divider}
        {smallCircle}
        {divider}
        {smallCircle}
        {divider}
        {smallCircle}
        {divider}
        {bigCircle}
      </View>
    </>
  );
}
