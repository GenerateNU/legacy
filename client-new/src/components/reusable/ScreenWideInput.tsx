import { Center, Input } from "native-base";
import { widthPercentageToDP as w, heightPercentageToDP as h } from "react-native-responsive-screen";

type ScreenWideInputProps = {
    placeholder?: string;
}

export default function ScreenWideInput(props: ScreenWideInputProps) {
    return(<><Input width={w('80%')} height={h('5%')} paddingX={"auto"}
    placeholder={ScreenWideInputProps}/></>)
}