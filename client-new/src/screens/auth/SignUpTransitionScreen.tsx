import { KeyboardAvoidingView, View, Text, Divider, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleProgressBar from "@/components/reusable/CircleProgressBar";
import LegacyWordmark from "@/components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";
import { useOnboarding } from "@/contexts/OnboardingContext";
import React from "react";


export default function SignUpTransitionScreen({ route, navigation }) {
  console.log(route);
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

  return (
    <>
      <View bg={"creamyCanvas"} alignItems="center" h={h("100%")} w={w("100%")}>
        <View paddingTop={h("7%")}></View>

        <LegacyWordmark />
        <View paddingTop={h("4.5%")} paddingBottom={h("2%")}>
          <CircleProgressBar totalCircles={6} completedCircles={0} />
        </View>
        <Divider marginTop={h("2%")} width={w("100%")} color={"#D9D9D9"} />

        <View
          width={w("45%")}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingTop={h("4%")}
          paddingBottom={h("5%")}
        >
          <Text
            fontSize={20}
            fontFamily={"rocaOne"}
            fontWeight={"Regular"}
            fontStyle={"normal"}
            paddingRight={w("2%")}
          >
            Welcome Max!
          </Text>
          <Icon name="flower-tulip-outline" size={30} color={"darkGreen"}></Icon>
        </View>

        <View width={w("80%")}>
          <Text
            fontSize={16}
            color={"#767676"}
            fontFamily={"inter"}
            fontWeight={"Regular"}
            fontStyle={"normal"}
            textAlign="center"
          >
            Welcome to Legacy!
          </Text>
          <Text
            fontSize={16}
            color={"#767676"}
            fontFamily={"inter"}
            fontWeight={"Regular"}
            fontStyle={"normal"}
            paddingBottom={h("1%")}
            textAlign="center"
          >
            We are excited to have you on board
          </Text>
          <Text
            fontSize={16}
            color={"#767676"}
            fontFamily={"inter"}
            fontWeight={"Regular"}
            fontStyle={"normal"}
            paddingTop={h("3%")}
            paddingBottom={h("4%")}
            textAlign="center"
          >
            {" "}
            We have a few questions before we going.{" "}
          </Text>
        </View>
        <View paddingTop={h("32%")}></View>

        <ScreenWideButton
          text="Get Started"
          textColor="#FFFFFF"
          backgroundColor="lightGreen"
          borderColor="lightGreen"
          onClick={next}
        />
      </View>
    </>

  );
}
