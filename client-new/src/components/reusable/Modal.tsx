import {View, Text, Center, Modal} from "native-base";
import Circle from "./Circle";
import {color} from "native-base/lib/typescript/theme/styled-system";
import Svg, {Path} from "react-native-svg";
import {StyleProp, ViewStyle} from "react-native";
import {ScrollView, TouchableHighlight, TouchableOpacity} from "react-native";

export type ModalProps = {
  title: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OurModal(props: ModalProps) {
  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        <View
          backgroundColor={"#D9D9D9"}
          height={272}
          width={241}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            textAlign={"center"}
            fontFamily={"Open Sans"}
            fontSize={15}
            fontWeight={"700"}
          >
            {props.title}
          </Text>
        </View>
      </Modal>
    </Center>
  );
}
