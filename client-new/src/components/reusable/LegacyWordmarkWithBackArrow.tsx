import {Pressable, Text, View} from "native-base";
import Svg, {Path} from "react-native-svg";
import {color} from "native-base/lib/typescript/theme/styled-system";

export type LegacyWordmarkWithBackArrowProps = {
  handleOnPress: () => void;
};

export default function LegacyWordmarkWithBackArrow(
  props: LegacyWordmarkWithBackArrowProps
) {
  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <Pressable onPress={() => props.handleOnPress()}>
        <Svg width='25' height='24' viewBox='0 0 25 24' fill='none'>
          <Path
            d='M14.2751 18.707L8.98206 13.414C8.60712 13.0389 8.39648 12.5303 8.39648 12C8.39648 11.4696 8.60712 10.961 8.98206 10.586L14.2751 5.29297L15.6891 6.70697L10.4001 12L15.6931 17.293L14.2751 18.707Z'
            fill='#374957'
          />
        </Svg>
      </Pressable>
      <Text
        color='#252525'
        fontFamily='Open Sans'
        fontSize={20}
        fontWeight='700'
        lineHeight={20}
        marginLeft='auto'
      >
        Legacy Wordmark
      </Text>
    </View>
  );
}
