import { SafeAreaView } from "react-native-safe-area-context";
import { Text, KeyboardAvoidingView, View } from "native-base";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useState } from "react";
import { sendOnboardingResponse, getPersona } from "@/services/authService";
import { IPersona } from "@/interfaces/IPersona";
import React from "react";

export default function PersonaScreen({ route, navigation }) {
  const {
    page,
    setPage,
    onboardingState,
    setOnboardingState,
    onboardingFlow,
    handleChange,
  } = useOnboarding();

  const [persona, setPersona] = useState<IPersona>(null);

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  const calculateScore = () => {
    let sum = 0;
    for (const response in onboardingState) {
      sum += onboardingState[response];
    }
    if (sum < 18) return "Procrastinating Rookie";
    else if (sum < 36) return "Easygoing Explorer";
    else if (sum < 54) return "Multitasking Dynamo";
    else if (sum < 72) return "Tranquil Trailblazer";
    else if (sum < 91) return "Adventurous Optimist";
  };

  const getDescription = () => {
    const persona = calculateScore();
    if (persona === "Procrastinating Rookie")
      return "Enjoys a challenge, scarcity mindset, the ultimate planner, a perfectionist, selfish, always on the edge, half-empty glass thinker, externally motivated, all-at-once worker, quick-start guide enthusiast, uncomfortable discussing death, less nurturing, inexperienced with EOLP, racing against time, tight finances, dipping toes in the water.";
    else if (persona === "Easygoing Explorer")
      return 'Thrives on adventure, abundance advocate, let\'s-see-what-happens future, content with "good enough," empathetic, beach-level tranquility, sunny disposition, internally motivated, explores tasks over time, full novel enthusiast, comfortable discussing death, nurturing, fairly familiar with EOLP, no rush, tight finances, ready to start.';
    else if (persona === "Multitasking Dynamo")
      return "Loves a challenge, abundance believer, the ultimate planner, prefers perfection, selfish, edgy, half-empty glass view, externally motivated, all-at-once worker, quick-start guide fan, uncomfortable discussing death, less nurturing, somewhat familiar with EOLP, procrastinator, comfortable finances, at the starting line.";
    else if (persona === "Tranquil Trailblazer")
      return 'Adventuresome, abundance thinker, let\'s-see-what-happens future, content with "good enough," empathetic, always at the beach, glass-half-full mentality, internally motivated, an explorer of tasks, quick-start guide lover, comfortable discussing death, nurturing, knowledgeable about EOLP, no rush, comfortable finances, ready to start.';
    else if (persona === "Adventurous Optimist")
      return "Always up for new experiences, believes in abundance, a laid-back planner, a chill perfectionist, empathetic, beach-level calmness, a sunny outlook, internally motivated, explores tasks over time, loves the full novel, comfortable discussing death, nurturing, well-versed in EOLP, has time to plan, financially stable, ready to start.";
  };

  useEffect(() => {
    const fetchPersona = async () => {
      await sendOnboardingResponse(1, onboardingState);
      const persona = await getPersona(1);
    };

    fetchPersona();
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <View width={w("80%")} paddingBottom={h("4%")} alignItems="center">
          <LegacyWordmark />
        </View>

        <View
          backgroundColor={"#FFFFFF"}
          borderRadius={10}
          paddingTop={h("3%")}
          paddingBottom={h("3%")}
          width={w("80%")}
          height={h("70%")}
          alignItems={"center"}
        >
          <View alignItems={"center"} width={w("70%")}>
            <Text
              color={"#4A4A4A"}
              fontSize={14}
              fontWeight={400}
              paddingBottom={h("1.5%")}
            >
              You've been assigned:
            </Text>

            <Text
              color={"#000000"}
              fontSize={20}
              fontWeight={600}
              textAlign={"center"}
              paddingBottom={h("4%")}
            >
              {persona.persona_title}
            </Text>
          </View>

          <View
            width={w("40%")}
            height={w("40%")}
            backgroundColor={"#D9D9D9"}
            marginBottom={h("5%")}
          ></View>

          <Text
            color={"#4A4A4A"}
            fontWeight={300}
            fontSize={14}
            textAlign={"center"}
            width={w("70%")}
          >
            {getDescription()}
          </Text>
        </View>

        <View paddingTop={h("4%")}>
          <ScreenWideButton
            text={"Get Started"}
            textColor={"#FFFFFF"}
            backgroundColor={"#8F8F8F"}
            borderColor={"#8F8F8F"}
            onClick={next}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
