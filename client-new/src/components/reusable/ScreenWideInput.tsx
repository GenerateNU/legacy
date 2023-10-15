import { Input, FormControl, Container, Button } from "native-base";
import React, { useState } from "react";
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
  icon?: string;
  value: string;
};

export default function ScreenWideInput(props: ScreenWideInputProps) {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const inputLeftElement = props.icon ? (
    <FontAwesome name={props.icon} size={60} color={"green"} />
  ) : undefined;

  const inputRightElement = props.password ? (
    <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
      {show ? "Hide" : "Show"}
    </Button>
  ) : undefined;

  return (
    <>
      <Container>
        <FormControl>{props.title}</FormControl>
        <Input
          type={props.password ? "password" : "text"}
          width={w("80%")}
          height={h("5%")}
          paddingX={"auto"}
          value={props.value}
          onChangeText={(value) => props.onChangeText(value)}
          placeholder={props.placeholderText}
          InputLeftElement={inputLeftElement}
          InputRightElement={inputRightElement}
        />
      </Container>
    </>
  );
}
