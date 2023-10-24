import { KeyboardAvoidingView, View, Text, Divider, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleProgressBar from "../../components/reusable/CircleProgressBar";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useOnboarding } from "../../contexts/OnboardingContext";

export default function QuizSectionIntroScreen({ route, navigation }) {
  const {
    page,
    setPage,
    onboardingState,
    setOnboardingState,
    onboardingFlow,
    handleChange,
  } = useOnboarding();

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };
  const { props } = route.params;
  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <LegacyWordmark />
        <View paddingTop={h("4.5%")} paddingBottom={h("2%")}>
          <CircleProgressBar
            totalCircles={props.totalCircles}
            completedCircles={0}
          />
        </View>
        <Divider marginTop={h("2%")} width={w("100%")} color={"#D9D9D9"} />

        <View
          width={w("45%")}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingTop={h("4%")}
          paddingBottom={h("3.5%")}
        >
          <Text paddingRight={w("3%")} fontSize={20} fontWeight={"semibold"}>
            Quiz Section Title
          </Text>
          <Icon name="flower-tulip-outline" size={30}></Icon>
        </View>

        <View width={w("80%")}>
          <Text
            fontSize={18}
            color={"#7D7D7D"}
            fontWeight={600}
            paddingBottom={h("1%")}
            textAlign="center"
          >
            Section description here, section purpose and outline here
          </Text>
          <Text
            fontSize={14}
            color={"#4A4A4A"}
            fontWeight={300}
            paddingTop={h("3%")}
            paddingBottom={h("4%")}
            textAlign="center"
          >
            Lorem ipsum dolor sit amet consectetur. Rhoncus viverra adipiscing
            cursus amet viverra adipiscing cursus amet
          </Text>
        </View>

        <Button
          backgroundColor={"#D9D9D9"}
          borderRadius={20}
          width={w("35%")}
          onPress={next}
        >
          <Text color={"#000000"} fontWeight={"bold"}>
            Get Started!
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
