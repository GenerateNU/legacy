import { SafeAreaView } from "react-native-safe-area-context";
import QuestionaireBox from "@/components/reusable/QuestionaireBox";
import { KeyboardAvoidingView, View, Text } from "native-base";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import ScreenWideButton from "@/components/reusable/ScreenWideButton";
import React from "react";

export default function AccessScreen({ route, navigation }) {
  const toSignUp = () => {
    navigation.navigate("Sign Up Screen");
  };

  const toLogin = () => {
    navigation.navigate("Login Screen");
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <View height={h("8%")}></View>
        <View width={w("80%")} paddingBottom={h("3%")} alignItems="center">
          <View alignItems="center">
            <Text color={"#000000"} fontSize={30} fontWeight={700}>
              More Life.
            </Text>
            <Text color={"#000000"} fontSize={30} fontWeight={700}>
              Less Stress.
            </Text>
          </View>
          <Text
            textAlign={"center"}
            fontSize={12}
            fontWeight={400}
            paddingTop={h("2%")}
            paddingBottom={h("3%")}
          >
            Lorem ipsum dolor sit amet consectetur. Congue habitant fermentum
            eget ornare sit.
          </Text>

          <View
            width={w("70%")}
            height={h("40%")}
            backgroundColor={"#D9D9D9"}
            marginBottom={h("5%")}
          ></View>

          <View paddingTop={h("2%")}>
            <ScreenWideButton
              text={"Sign Up"}
              textColor={"#FFFFFF"}
              backgroundColor={"#8F8F8F"}
              borderColor={"#8F8F8F"}
              onClick={toSignUp}
            />
          </View>

          <View paddingTop={h("2%")}>
            <ScreenWideButton
              text={"Login"}
              textColor={"#000000"}
              backgroundColor={"#FFFFFF"}
              borderColor={"#D9D9D9"}
              onClick={toLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
