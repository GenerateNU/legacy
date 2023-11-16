import { Text, Button } from "native-base";
import React from "react";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

type ScreenWideButtonProps = {
  text: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  onClick?: (input) => any;
};

export default function ScreenWideButton(props: ScreenWideButtonProps) {
  return (
    <>
      <Button
        backgroundColor={props.backgroundColor}
        width={w("80%")}
        height={h("5%")}
        borderRadius={w("80%") / 2}
        onPress={props.onClick}
        borderColor={props.borderColor}
        borderWidth={1}
      >
        <Text color={props.textColor} fontWeight={"400"}>{props.text}</Text>
      </Button>
    </>
  );
}
