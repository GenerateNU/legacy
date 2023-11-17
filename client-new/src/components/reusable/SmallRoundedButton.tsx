import { Button, Text } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";

type SquareButtonProps = {
  title: string;
  onClick?: (input) => any;
};

export default function SmallRoundedButton(props: SquareButtonProps) {
  return (
    <Button
      backgroundColor={"lightGreen"}
      borderRadius={25}
      width={w("23%")}
      onPress={props.onClick}
    >
      <Text color={"#FFFFFF"} fontFamily={"rocaOne"} fontWeight={"bold"}>
        {props.title}
      </Text>
    </Button>
  );
}
