import { KeyboardAvoidingView, View, Text, } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import { SvgUri } from "react-native-svg";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenTaskCard from "../../components/reusable/HomeScreenTaskCard";


export default function HomeScreen() {
  const { user, logout } = useAuth();
  const testData = [
    {
      title: 'Acknowledge Your Aversion to End-Of-Life-Planning',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.',
      progress: 33,
    },
    {
      title: 'Create Familiarity with the Process',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.',
      progress: 10,
    },
    {
      title: 'Define Your Values and Priorities',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.',
      progress: 0,
    },
  ];

  return (
    <>
      <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <LegacyWordmark />

          <View>
            <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={{ width: '100%', color: '#252525', fontSize: 18, }}>
                Hello Amanda!
              </Text>
            </View>

            <View style={{ width: '100%', marginTop: 20 }}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ color: '#252525', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '700', lineHeight: 20 }}>
                  Your Journey
                </Text>
                <Text style={{ color: '#909090', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '400', textDecorationLine: 'underline', lineHeight: 20 }}>
                  See all
                </Text>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
                {testData.map((item, index) => (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <HomeScreenTaskCard title={item.title} description={item.description} progress={item.progress} />
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