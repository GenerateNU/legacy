import { KeyboardAvoidingView, View, Text, Divider, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleProgressBar from "@/components/reusable/CircleProgressBar";
import LegacyWordmark from "@/components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
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
          <Text fontSize={20} fontWeight={"semibold"} paddingRight={w("2%")}>
            Welcome Max!
          </Text>
          <Icon name="flower-tulip-outline" size={30}></Icon>
        </View>

        <View width={w("80%")}>
          <Text
            fontSize={18}
            color={"#C4C4C4"}
            fontWeight={"semibold"}
            paddingBottom={h("1%")}
            textAlign="center"
          >
            Our mission is to mission, your mission here, your mission statement
            here
          </Text>
          <Text
            fontSize={18}
            color={"#C4C4C4"}
            fontWeight={"semibold"}
            paddingTop={h("3%")}
            paddingBottom={h("4%")}
            textAlign="center"
          >
            {" "}
            We have a few questions before we going.{" "}
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
