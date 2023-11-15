import {View, Text} from "native-base";
import Circle from "./Circle";
import {color} from "native-base/lib/typescript/theme/styled-system";
import Svg, {Path} from "react-native-svg";
import {StyleProp, ViewStyle} from "react-native";
import {ScrollView, TouchableHighlight, TouchableOpacity} from "react-native";

export type PasswordInputProps = {
  title: string;
  border?: boolean;
  handleOnPress?: () => void;
};

export default function PasswordInput(props: PasswordInputProps) {
  return (
    <TouchableOpacity onPress={props.handleOnPress}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            minHeight: 76,
          },
          containerWithOutBoarder,
        ]}
      >
        <View
          style={{
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            width: "auto",
          }}
        >
          <Text
            style={{
              color: "#252525",
              fontFamily: "Open Sans",
              fontSize: 15,
              fontWeight: "600",
              lineHeight: 20,
            }}
          >
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const containerWithBoarder: StyleProp<ViewStyle> = {
  borderColor: "#D9D9D9",
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: 13,
};

const containerWithOutBoarder: StyleProp<ViewStyle> = {
  borderBottomColor: "#D9D9D9",
  // borderBottomColor: "#EFEFEF",
  borderBottomWidth: 1,
  borderStyle: "solid",
};
