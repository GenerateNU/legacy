import {
  KeyboardAvoidingView,
  View,
  Text,
  Divider,
  Button,
  Center,
  Pressable,
} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileTab from "../../../components/reusable/ProfileTab";
import {useNavigation} from "@react-navigation/native";
import ScreenWideButton from "../../../components/reusable/ScreenWideButton";
import {ScrollView, TouchableHighlight, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";
import Persona from "../../../components/Persona";
import LegacyWordmarkWithBackArrow from "../../../components/reusable/LegacyWordmarkWithBackArrow";

const persona = {
  title: "Adventuring Optimist",
  description:
    "The adventuring optimist approaches end-of-life planning with a unique zest for embracing the inevitable journey. They view this phase as a final, grand adventure, an opportunity to curate the most unforgettable finale to their life's story.",
};
export default function MyPersonaScreen({route, navigation}) {
  const toProfile = () => {
    // Navigate to the target screen (e.g., 'DetailsScreen')
    navigation.navigate("Profile Screen");
  };

  const tooAllPersonas = () => {
    navigation.navigate("All Personas Screen");
  };

  return (
    <SafeAreaView style={{alignItems: "center", flex: 1}}>
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
        <LegacyWordmarkWithBackArrow handleOnPress={toProfile} />
        <Text
          style={{
            color: "#252525",
            fontFamily: "Open Sans",
            fontSize: 15,
            fontWeight: "700",
            lineHeight: 20,
            marginTop: 26,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          You are an
        </Text>
        <Persona
          personaTitle={persona.title}
          personaDescription={persona.description}
        />
      </View>
      <View marginTop={"auto"}>
        <ScreenWideButton
          text={"See All Personas"}
          textColor={"#000000"}
          backgroundColor={"#ECECEC"}
          borderColor={"#000000"}
          onClick={tooAllPersonas}
        />
      </View>
    </SafeAreaView>
  );
}
