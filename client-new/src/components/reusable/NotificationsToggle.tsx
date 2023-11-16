import {View, Text, Input} from "native-base";
import {Switch} from "react-native";
import {useEffect, useState} from "react";
import {color} from "native-base/lib/typescript/theme/styled-system";

export type NotificationsToggleProps = {
  title: string;
  toggle: boolean;
  toggleChange: (value: boolean) => void;
};

export default function NotificationsToggle(props: NotificationsToggleProps) {
  return (
    <View
      borderBottomColor={"#D9D9D9"}
      borderBottomWidth={1}
      minHeight={90}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"row"}
    >
      <Text fontFamily={"Inter"} fontSize={16} fontWeight={600} marginLeft={5}>
        {props.title}{" "}
      </Text>
      <Switch
        style={{marginLeft: "auto", marginRight: 20}}
        value={props.toggle}
        onValueChange={(newValue) => props.toggleChange(newValue)}
        thumbColor={props.toggle ? "#FFFFFF" : "#2F1D12"}
        trackColor={{false: "transparent", true: "#43A573"}}
      />
    </View>
  );
}
