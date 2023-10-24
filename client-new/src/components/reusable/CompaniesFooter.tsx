import { Text, View } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

export default function CompaniesFooter() {
  return (
    <>
      <View
        width={w("80%")}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={h("1.5%")}
      >
        <Text fontSize={12}>Company 1</Text>
        <Text fontSize={12}>Company 2</Text>
        <Text fontSize={12}>Company 3</Text>
      </View>
      <View justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={12}>
          See why these companies are partnered with Legacy
        </Text>
      </View>
    </>
  );
}
