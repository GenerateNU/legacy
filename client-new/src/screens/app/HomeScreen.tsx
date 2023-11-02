import { KeyboardAvoidingView, View, Text, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
} from "react-native-responsive-screen";
import LegacyWordmark from "../../components/reusable/LegacyWordmark";
import { useEffect, useState } from "react";
import { getTasks } from "../../services/TaskService";
import HomeScreenTasks from "../../components/homescreen components/HomeScreenTasks";
import HomeScreenGuides from "../../components/homescreen components/HomeScreenGuides";

export default function HomeScreen() {
    const { user, logout } = useAuth();

    const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks("1")
      setTasks(response)
    }
    fetchTasks()
  }, [])


    const guideData = [
        { title: 'Guide 1', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.'},
        { title: 'Guide 2', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.' },
        { title: 'Guide 3', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.' },
    ];

    return (
        <>
            <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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

                            <HomeScreenTasks tasks = {tasks}/>
                        </View>


                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ color: '#252525', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '700', lineHeight: 20 }}>
                                    Guides
                                </Text>


                                <Text style={{ color: '#909090', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '400', textDecorationLine: 'underline', lineHeight: 20 }}>
                                    See all
                                </Text>
                            </View>

                            <HomeScreenGuides guides = {guideData}/>
                        </View>


                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
