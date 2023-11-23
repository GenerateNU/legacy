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
import { useOnboarding } from "../../contexts/OnboardingContext";
import React from "react";

export default function QuestionaireScreen({ route, navigation }) {
  const {page, setPage, onboardingState, setOnboardingState, onboardingFlow, handleChange} = useOnboarding();
  const { props } = route.params;

  const back = async () => {
    const prevPage = onboardingFlow[page - 1];
    setPage(page - 1);
    navigation.pop();
  };

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

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
          <CircleProgressBar totalCircles={props.totalCircles} completedCircles={props.completedCircles} />
        </View>
        <Divider
          marginTop={h("2%")}
          marginBottom={h("4%")}
          width={w("100%")}
          color={"#D9D9D9"}
        />
        <QuestionaireBox
          text1={"Question " + props.questionNumber}
          text2={
            props.question
          }
          initialSliderValue={onboardingState[props.inputName]}
          field={props.inputName}
          handleChange={handleChange}
        />

        <View paddingTop={h("4%")}>
          <ScreenWideButton
            text={"Next"}
            textColor={"#FFFFFF"}
            backgroundColor={"#8F8F8F"}
            borderColor={"#8F8F8F"}
            onClick={next}
          />
        </View>

        <View paddingTop={h("2%")}>
        <ScreenWideButton
          text={"Back"}
          textColor={"#000000"}
          backgroundColor={"#FFFFFF"}
          borderColor={"#D9D9D9"}
          onClick={back}
        />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
