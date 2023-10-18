import { SafeAreaView } from "react-native-safe-area-context";
import QuestionaireBox from "../../components/reusable/QuestionaireBox";
import { Button, Divider, KeyboardAvoidingView, View } from "native-base";
import CircleProgressBar from "../../components/reusable/CircleProgressBar";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ScreenWideButton from "../../components/reusable/ScreenWideButton";

export default function QuestionaireScreen({ route, navigation }) {
  // TODO: Uncomment this and abstract this screen
  //const { props } = route.params;
  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <View
          width={w("80%")}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={"center"}
          paddingBottom={h("3%")}
        >
          <Button backgroundColor={"transparent"}>
            <Icon name="chevron-back" size={20} color={"#374957"}></Icon>
          </Button>
          <LegacyWordmark />
        </View>

        <View paddingBottom={h("1%")}>
          <CircleProgressBar totalCircles={6} completedCircles={4} />
        </View>
        <Divider
          marginTop={h("2%")}
          marginBottom={h("4%")}
          width={w("100%")}
          color={"#D9D9D9"}
        />
        <QuestionaireBox
          text1={"Question 1"}
          text2={
            "Lorem ipsum dolor sit amet consectetur. Rhoncus viverra adipiscing cursus amet viverra adipiscing cursus amet ? "
          }
        />

        <View paddingTop={h("4%")}>
          <ScreenWideButton
            text={"Next"}
            textColor={"#FFFFFF"}
            backgroundColor={"#8F8F8F"}
            borderColor={"#8F8F8F"}
          />
        </View>

        <View paddingTop={h("2%")}>
        <ScreenWideButton
          text={"Back"}
          textColor={"#000000"}
          backgroundColor={"#FFFFFF"}
          borderColor={"#D9D9D9"}
        />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
