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
import {
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Svg, {Path} from "react-native-svg";
import {useEffect, useState} from "react";
import {Persona} from "../../../types/Persona";
import {IPersona} from "../../../interfaces/IPersona";
import {getAllPersonas} from "../../../services/profileService";

export default function AllPersonasScreen({route, navigation}) {
  const [personas, setPersonas] = useState<IPersona[]>([]);

  /**
   * Sends user to the persona screen. Must pass in title and description of the persona.
   * @param title Title of persona
   * @param description Brief description of the persona
   */
  const toPersona = (title: string, description: string) => {
    navigation.push("Persona Screen", {
      props: {title: title, description: description},
    });
  };

  /**
   * Sends user back to their own Persona Screen
   */
  const toMyPersona = () => {
    navigation.navigate("My Persona Screen");
  };

  useEffect(() => {
    /**
     * Fetch the personas for this screen
     */
    async function fetchData() {
      try {
        const personasData = await getAllPersonas();
        setPersonas(personasData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{alignItems: "center", flex: 1}}>
      <View
        style={{
          width: 340,
          // borderColor: "black",
          // borderWidth: 1,
          // borderStyle: "solid",
          marginTop: 50,
          height: "auto",
        }}
      >
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Pressable onPress={toMyPersona}>
            <Svg width='25' height='24' viewBox='0 0 25 24' fill='none'>
              <Path
                d='M14.2751 18.707L8.98206 13.414C8.60712 13.0389 8.39648 12.5303 8.39648 12C8.39648 11.4696 8.60712 10.961 8.98206 10.586L14.2751 5.29297L15.6891 6.70697L10.4001 12L15.6931 17.293L14.2751 18.707Z'
                fill='#374957'
              />
            </Svg>
          </Pressable>

          <Text
            style={{
              color: "#252525",
              fontFamily: "Open Sans",
              fontSize: 20,
              fontWeight: "700",
              lineHeight: 20,
              marginLeft: "auto",
            }}
          >
            Legacy Wordmark
          </Text>
        </View>
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
          All Personas
        </Text>
        {personas.map((value, index) => (
          <View style={{marginBottom: 12}} key={index}>
            {/* Not best practice to use index here */}
            <ProfileTab
              title={value.persona_title}
              subtitle={value.persona_description}
              image='hi'
              border={true}
              handleOnPress={() =>
                toPersona(value.persona_title, value.persona_description)
              }
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
