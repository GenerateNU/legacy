import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWideButton from "../../components/reusable/ScreenWideButton";

export default function AccessScreen({ route, navigation }) {

    const toSignUp = () => {
        navigation.navigate("Sign Up Screen")
    }

    const toLogin = () => {
        navigation.navigate("Login Screen")
    }

    return (<SafeAreaView>
        <Text>More Life.</Text>
        <Text>Less Stress.</Text>
        <Text>Lorem ipsum dolor sit amet consectetur. Congue habitant fermentum eget ornare sit.</Text>
        <ScreenWideButton text={"Sign up"} textColor={"#FFFFFF"} backgroundColor={"#8F8F8F"} borderColor={""} onClick={toSignUp}/>
        <ScreenWideButton text={"Login"} textColor={"#8F8F8F"} backgroundColor={""} borderColor={"#8F8F8F"} onClick={toLogin}/>
    </SafeAreaView>)
}