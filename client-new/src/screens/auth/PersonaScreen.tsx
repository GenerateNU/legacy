import { SafeAreaView } from "react-native-safe-area-context";
import { Text, KeyboardAvoidingView, View } from "native-base";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ScreenWideButton from "../../components/reusable/ScreenWideButton";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useProfile } from "../../contexts/ProfileContext";
import { getPersona } from "../../services/PersonaService";
import React from "react";
import { convertNumericToString } from "../../utils/ObjectConversionUtils";
import { IPersona } from "../../interfaces/IPersona";

const PersonaScreen = ({ route, navigation }) => {
  const {
    page,
    setPage,
    onboardingState,
    setOnboardingState,
    onboardingFlow,
    handleChange,
  } = useOnboarding();

  const { user } = useUser();
  const { fetchProfile, completeOnboarding } = useProfile();
  const [persona, setPersona] = useState<IPersona>(null);

  const requestOnboarding = convertNumericToString(onboardingState);

  useEffect(() => {
    const completedOnboarding = async () => {
      await fetchProfile(user.id);
      await completeOnboarding(requestOnboarding);
      const persona = await getPersona(user.id);
      setPersona(persona);
    };

    completedOnboarding();
  }, [user]);



  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

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
              {persona?.persona_title ?? "Persona Name"}
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
            {persona?.persona_description ?? "Persona Description"}
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
};

export default PersonaScreen;