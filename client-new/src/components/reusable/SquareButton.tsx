import { Button, Text } from "native-base";
import React from "react";

type SquareButtonProps = {
  title: string;
  onClick?: (input) => any;
};

export default function SquareButton(props: SquareButtonProps) {
  return (
    <Button
      backgroundColor={"#D9D9D9"}
      borderRadius={7}
      size={"xs"}
      onPress={props.onClick}
    >
      <Text color={"#000000"} fontWeight={"bold"}>
        {" "}
        {props.title}{" "}
      </Text>
    </Button>
  );
}
