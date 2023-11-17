import { KeyboardAvoidingView, View, Text } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../contexts/UserContext";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import { SvgUri } from "react-native-svg";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

export default function HomeScreen() {
  const { user, logout } = useUser();
  const testData = [
    {
      title: "Acknowledge Your Aversion to End-Of-Life-Planning",
      description: "Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.",
      progress: 33,
    },
    {
      title: "Create Familiarity with the Process",
      description: "Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.",
      progress: 10,
    },
    {
      title: "Define Your Values and Priorities",
      description: "Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.",
      progress: 0,
    },
  ];

  return (
    <>
      <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <LegacyWordmark />

          <View>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text style={{ width: "100%", color: "#252525", fontSize: 18 }}>
                Hello {user.username}!
              </Text>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#252525",
                    fontSize: 15,
                    fontFamily: "Open Sans",
                    fontWeight: "700",
                    lineHeight: 20,
                  }}
                >
                  Your Journey
                </Text>
                <Text
                  style={{
                    color: "#909090",
                    fontSize: 15,
                    fontFamily: "Open Sans",
                    fontWeight: "400",
                    textDecorationLine: "underline",
                    lineHeight: 20,
                  }}
                >
                  See all
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {testData.map((item, index) => (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <Card
                      title={item.title}
                      description={item.description}
                      progress={item.progress}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const Card = (props) => {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: "white",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#EFEFEF",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginHorizontal: 12,
        }}
      >
        <Text
          style={{
            color: "#252525",
            fontSize: 15,
            fontFamily: "Open Sans",
            fontWeight: "600",
            lineHeight: 20,
            flexWrap: "wrap",
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: "#C1C3C7",
            fontSize: 12,
            fontFamily: "Open Sans",
            fontWeight: "400",
            lineHeight: 20,
            flexWrap: "wrap",
          }}
        >
          {props.description}
        </Text>
      </View>
      <View
        style={{
          width: 72,
          height: 74,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            width: 65.13,
            height: 63.43,
            position: "absolute",
            backgroundColor: "#D9D9D9",
            borderRadius: 9999,
            transform: [{ rotate: "-96.92deg" }],
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              transform: [{ rotate: "-98.20deg" }],
              backgroundColor: "#F7F7F8",
              borderRadius: 9999,
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            textAlign: "center",
            color: "#252525",
            fontSize: 8,
            fontFamily: "Open Sans",
            fontWeight: "600",
            lineHeight: 20,
          }}
        >
          {props.progress}%
        </Text>
      </View>
    </View>
  );
};
