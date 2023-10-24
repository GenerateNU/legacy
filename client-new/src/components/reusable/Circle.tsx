import { View, Text } from "native-base";
import { border } from "native-base/lib/typescript/theme/styled-system";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

type CircleProps = {
  color: string;
  border?: boolean
};

export default function Circle(props: CircleProps) {

  const borderWidth = props.border ? 1 : 0

  return (
    <>
      <View
        height={h("1.6%")}
        width={h("1.6%")}
        backgroundColor={props.color}
        borderRadius={w("80%") / 2}
        borderColor={"#000000"}
        borderWidth={borderWidth}
      ></View>
    </>
  );
}
