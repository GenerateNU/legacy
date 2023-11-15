import {
  KeyboardAvoidingView,
  View,
  Text,
  Divider,
  Button,
  Center,
} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import ProfileTab from "../../../components/reusable/ProfileTab";
import {useNavigation} from "@react-navigation/native";
import ScreenWideButton from "../../../components/reusable/ScreenWideButton";
import {TouchableHighlight, TouchableOpacity} from "react-native";
import {useState} from "react";
import Modal from "../../../components/reusable/Modal";
import OurModal from "../../../components/reusable/Modal";

export default function ProfileScreen({route, navigation}) {
  const [shareModal, setShareModal] = useState<boolean>(false);
  const toMyPersona = () => {
    navigation.navigate("My Persona Screen");
  };

  const toPasswordAndSecurity = () => {
    navigation.navigate("Password and Security Screen");
  };

  return (
    <SafeAreaView style={{alignItems: "center", flex: 1}}>
      <View width={340} marginTop={50} height={600}>
        <Text
          color={"#252525"}
          fontFamily={"Open Sans"}
          fontSize={20}
          fontWeight={"700"}
          lineHeight={20}
        >
          Legacy Wordmark
        </Text>
        <Text
          style={{
            color: "#252525",
            fontFamily: "Open Sans",
            fontSize: 15,
            fontWeight: "700",
            lineHeight: 20,
            marginTop: 18,
            marginBottom: 16,
          }}
        >
          Profile
        </Text>
        <ProfileTab
          title={"Amanda Kerr"}
          subtitle='Adventuring Optimist'
          subheading='View My Persona'
          image='hi'
          border={true}
          handleOnPress={toMyPersona}
        />
        <ProfileTab
          title={"Notification Settings"}
          handleOnPress={() => navigation.navigate("Notifications Screen")}
        />
        <ProfileTab
          title={"Password and Security"}
          handleOnPress={() => toPasswordAndSecurity()}
        />
        <ProfileTab
          title={"Share and Rate Legacy"}
          handleOnPress={() => setShareModal(true)}
        />
      </View>
      {shareModal && (
        <OurModal showModal={shareModal} setShowModal={setShareModal}>
          <View
            backgroundColor={"#D9D9D9"}
            height={272}
            width={241}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text
              textAlign={"center"}
              fontFamily={"Open Sans"}
              fontSize={15}
              fontWeight={"700"}
            >
              {"SHARE / RATE APP"}
            </Text>
          </View>
        </OurModal>
      )}
    </SafeAreaView>
  );
}
