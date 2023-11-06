import { KeyboardAvoidingView, View, Text, ScrollView } from "native-base";
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
// import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { getTasks } from "../../services/TaskService";
import { moderateScale, verticalScale } from "../../utils/FontSizeUtils";
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
        { title: 'Guide 1', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.' },
        { title: 'Guide 2', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.' },
        { title: 'Guide 3', description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.' },
    ];

    return (
        <>
            <SafeAreaView style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFF9EE'}}>
                <ScrollView bgColor={'#FFF9EE'} contentContainerStyle={{ alignItems: 'center' }}>
                    <View w={'90%'} flexDir={'column'} justifyContent={'space-between'}>
                        <LegacyWordmark />
                        <View>
                            <View w={'100%'} mt={5}>
                                <Text 
                                w={'100%'}
                                fontFamily={"rocaOne"}
                                fontWeight={"Regular"}
                                fontStyle={"normal"}
                                color={'#252525'}
                                fontSize={moderateScale(40)}>
                                    Hello Amanda!
                                </Text>
                            </View>

                            <HomeScreenTasks tasks={tasks} />
                        </View>


                        <View w={'100%'} mt={5}>
                            <View justifyContent={'space-between'} flexDir={'row'}>
                                <Text color={'#252525'} fontSize={15} fontFamily={'Open Sans'} fontWeight={'700'} lineHeight={20}>
                                    Guides
                                </Text>


                                <Text color={'#909090'} fontSize={15} fontFamily={'Open Sans'} fontWeight={'400'} textDecorationLine={'underline'} lineHeight={20}>
                                    See all
                                </Text>
                            </View>

                            <HomeScreenGuides guides={guideData} />
                        </View>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
