import React, { useState } from "react";
import { Input, FormControl, Button, Text, View } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";

type ScreenWideInputProps = {
  title?: string;
  password?: boolean;
  placeholderText?: string;
  onChangeText: (value) => void;
  iconName?: string;
  value: string;
};

export default function ScreenWideInput(props: ScreenWideInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputLeftIcon = props.iconName ? (
    <View paddingLeft={w("4%")} paddingRight={w("1%")}>
      <Icon name={props.iconName} size={20} color={"black"} />
    </View>
  ) : null;

  const inputRightElement = props.password ? (
    <Button
      size={"xs"}
      rounded={"none"}
      width={w("20%")}
      height={h("80%")}
      backgroundColor={"transparent"}
      color={"black"}
      onPress={toggleShowPassword}
    >
      <Text color={"#000000"} fontWeight={"bold"} fontSize={"8"}>
        {showPassword ? "HIDE" : "SHOW"}{" "}
      </Text>
    </Button>
  ) : undefined;

  return (
    <>
      <View>
        <FormControl>{props.title}</FormControl>
        <Input
          type={showPassword || !props.password ? "text" : "password"}
          width={w("80%")}
          height={h("5%")}
          paddingX={"auto"}
          value={props.value}
          backgroundColor={"#FFFFFF"}
          onChangeText={(value) => props.onChangeText(value)}
          placeholder={props.placeholderText}
          InputLeftElement={inputLeftIcon}
          InputRightElement={inputRightElement}
          rounded="full"
        />
      </View>
    </>
  );
}
