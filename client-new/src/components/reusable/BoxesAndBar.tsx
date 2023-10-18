import { Divider, View } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

export default function BoxesAndBars() {
  const bigCircle = (
    <View
      backgroundColor="#FFFFFF"
      height={h("1.1%")}
      width={h("1.1%")}
      borderRadius={h("1.1%")}
      borderWidth={1}
      borderColor={"#000000"}
    ></View>
  );
  const smallCircle = (
    <View
      backgroundColor="#FFFFFF"
      height={h("1.1%") * 0.75}
      width={h("1.1%") * 0.75}
      borderRadius={h("1.1%") * 0.75}
      borderWidth={1}
      borderColor={"#000000"}
    ></View>
  );

  const divider = <Divider color={"#D9D9D9"} width={w("14%")} />;

  return (
    <>
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
