import { Input, FormControl, Box, Text, Button } from "native-base";
import React, {useState } from "react";
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
  } from "react-native-responsive-screen";


type ScreenWideButtonProps = {
    text: string;
    textColor: string;
    backgroundColor: string;
    onClick?: (input) => any;
};



export default function ScreenWideButton(props: ScreenWideButtonProps) {

    const buttonStyle = {
        backgroundColor: props.backgroundColor,
        width: w("80%"),
        height: h("5%"),
        borderRadius: w("80%") / 2
      };
    
      const textStyle = {
        color: props.textColor,
      };

  return (
    <>
    <Button style={buttonStyle} onPress={props.onClick}>
      <Text style={textStyle}>{props.text}</Text>
    </Button>
    </>
  );
}

