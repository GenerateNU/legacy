import { SafeAreaView } from "react-native-safe-area-context";
import QuestionaireBox from "../../components/reusable/QuestionaireBox";
import { KeyboardAvoidingView, View } from "native-base";
import CircleProgressBar from "../../components/reusable/CircleProgressBar";

export default function QuestionaireScreen() {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView alignItems="center">
        <View alignItems={"center"}>
          <CircleProgressBar totalCircles={6} completedCircles={0} />
          <QuestionaireBox
            text1={"Question 1"}
            text2={"Sample text. Sample text, Sample text, sample text"}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
