import { Text, View } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

export default function Footer() {
  return (
    <>
      <View justifyContent={"center"} alignItems={"center"}>
        <Text
          fontSize={12}
          fontFamily={"inter"}
          fontWeight={"Regular"}
          fontStyle={"normal"}
          color={"darkGreen"}
        >
          Terms of Service | Privacy Policy
        </Text>
      </View>
    </>
  );
}
