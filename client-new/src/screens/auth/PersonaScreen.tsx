import { SafeAreaView } from "react-native-safe-area-context";
import { Text, KeyboardAvoidingView, View, Divider } from "native-base";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useState } from "react";
import CircleProgressBar from "../../components/reusable/CircleProgressBar";
import { SvgXml } from "react-native-svg";
// import { Persona } from "../../types/Persona";
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

  // useEffect(() => {
  //   const fetchPersona = async () => {
  //     await sendOnboardingResponse(1, onboardingState);
  //     const persona = await getPersona(1);
  //   };

  //   fetchPersona();
  // }, []);

  // TODO: export this to own file
  const svgImage = `<svg width="156" height="189" viewBox="0 0 156 189" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="156" height="189" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_2891_12160" transform="matrix(0.00146145 0 0 0.00120627 -0.000545142 0)"/>
  </pattern>
  <image id="image0_2891_12160" width="685" height="829" xlink:href="data:image/png;base64,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"/>
  </defs>
  </svg>
  `;

  return (
    <>
      <View bg={"creamyCanvas"} alignItems="center" h={h("100%")} w={w("100%")}>
        <View paddingTop={h("7%")}></View>
        <LegacyWordmark />

        <View paddingTop={h("4.5%")} paddingBottom={h("2%")}>
          <CircleProgressBar totalCircles={6} completedCircles={6} />
        </View>
        <Divider
          marginTop={h("2%")}
          marginBottom={h("2%")}
          width={w("100%")}
          color={"#D9D9D9"}
        />

        <View
          backgroundColor={"#FFFFFF"}
          borderRadius={10}
          borderColor={"darkGreen"}
          borderWidth={1}
          marginTop={h("2%")}
          paddingTop={h("3%")}
          paddingBottom={h("3%")}
          width={w("80%")}
          height={h("60%")}
          alignItems={"center"}
        >
          <View alignItems={"center"} width={w("70%")}>
            <Text
              color={"darkGreen"}
              fontSize={14}
              fontFamily={"inter"}
              fontWeight={"Regular"}
              fontStyle={"normal"}
              paddingBottom={h("1.5%")}
            >
              You've been assigned:
            </Text>

            <Text
              color={"darkGreen"}
              fontSize={20}
              fontFamily={"rocaOne"}
              fontWeight={"Bold"}
              fontStyle={"normal"}
              textAlign={"center"}
            >
              Procrastinating Rookie
              {/* {persona.persona_title} */}
            </Text>
          </View>

          <SvgXml xml={svgImage} width={w("30%")} height={h("30%")} />

          <Text
            fontWeight={300}
            fontSize={14}
            textAlign={"center"}
            width={w("70%")}
            color={"darkGreen"}
          >
            {getDescription()}
          </Text>
        </View>

        <View paddingTop={h("4%")}>
          <ScreenWideButton
            text={"Get Started"}
            textColor="#FFFFFF"
            backgroundColor="lightGreen"
            borderColor="lightGreen"
            onClick={next}
          />
        </View>
      </View>
    </>
  );
}
