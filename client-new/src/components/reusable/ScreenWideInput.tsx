import { Input, FormControl, Container, Button, Text} from "native-base";
import React, { ReactNode, useState } from "react";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";

type ScreenWideInputProps = {
  title?: string;
  password?: boolean;
  placeholderText?: string;
  onChangeText: (value) => void;
  icon?: ReactNode;
  value: string;
};

export default function ScreenWideInput(props: ScreenWideInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputLeftElement = props.icon ? (
    props.icon
  ) : undefined;

  const inputRightElement = props.password ? (
    <Button size="xs" rounded="none" width={w("20%")} height={h("80%")} backgroundColor="transparent" color="black" onPress={toggleShowPassword}>
      <Text style={{ color: "black", fontWeight: "bold", fontSize: 12}}>{showPassword ? "HIDE" : "SHOW"} </Text>
    </Button>
  ) : undefined;


  return (
    <>
      <Container>
        <FormControl>{props.title}</FormControl>
        <Input
          type={(showPassword || !props.password) ? "text" : "password"}
          width={w("80%")}
          height={h("5%")}
          paddingX={"auto"}
          value={props.value}
          onChangeText={(value) => props.onChangeText(value)}
          placeholder={props.placeholderText}
          InputLeftElement={inputLeftElement}
          InputRightElement={inputRightElement}
          rounded="full"
        />
      </Container>
    </>
  );
}
