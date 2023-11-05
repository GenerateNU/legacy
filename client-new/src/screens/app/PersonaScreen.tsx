import {
  KeyboardAvoidingView,
  View,
  Text,
  Divider,
  Button,
  Center,
  Pressable,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTab from "../../components/reusable/ProfileTab";
import { useNavigation } from "@react-navigation/native";
import ScreenWideButton from "../../components/reusable/ScreenWideButton";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import Persona from "../../components/Persona";

export type PersonScreenProps = {
  title: string;
  description: string;
};
export default function PersonaScreen({ route, navigation }) {
  const { props } = route.params;
  const tooAllPersonas = () => {
    navigation.navigate("All Personas Screen");
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          width: 340,
          // borderColor: "black",
          // borderWidth: 1,
          // borderStyle: "solid",
          marginTop: 50,
          height: "auto",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={tooAllPersonas}>
            <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <Path
                d="M14.2751 18.707L8.98206 13.414C8.60712 13.0389 8.39648 12.5303 8.39648 12C8.39648 11.4696 8.60712 10.961 8.98206 10.586L14.2751 5.29297L15.6891 6.70697L10.4001 12L15.6931 17.293L14.2751 18.707Z"
                fill="#374957"
              />
            </Svg>
          </Pressable>
          <Text
            style={{
              color: "#252525",
              fontFamily: "Open Sans",
              fontSize: 20,
              fontWeight: "700",
              lineHeight: 20,
              marginLeft: "auto",
            }}
          >
            Legacy Wordmark
          </Text>
        </View>
        <Persona
          personaTitle={props.title}
          personaDescription={props.description}
        />
      </View>
    </SafeAreaView>
  );
}
