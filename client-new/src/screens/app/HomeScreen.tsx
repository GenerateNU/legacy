import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { useUser } from '@/contexts/UserContext';
import { Button, KeyboardAvoidingView, ScrollView, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

import HomeScreenGuides from '../../components/homescreen components/HomeScreenGuides';
import HomeScreenTasks from '../../components/homescreen components/HomeScreenTasks';
import { fetchAllUserTasks } from '../../services/TaskService';
import { moderateScale, verticalScale } from '../../utils/FontSizeUtils';
import { ITask } from '@/interfaces/ITask';
import { useProfile } from '@/contexts/ProfileContext';

export default function HomeScreen() {
  const { user, logout } = useUser();
  const { setCompletedOnboarding } = useProfile();

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("FEtching tasks", user.id.toString());
      const response = await fetchAllUserTasks(user.id.toString());
      console.log("Response", response)
      setTasks(response);

    };
    fetchTasks();
  }, []);

  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         const response = await getUser("1")
  //         setTasks(response)
  //     }
  //     fetchUsers()
  // }, [])

  const guideData = [
    {
      title: 'Guide 1',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.'
    },
    {
      title: 'Guide 2',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.'
    },
    {
      title: 'Guide 3',
      description: 'Lorem ipsum dolor sit amet consectetur. Ornare vestibulum.'
    }
  ];

  return (
    <>
      <SafeAreaView
        style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFF9EE' }}
      >
        <Button onPress={() => {
          logout();
          setCompletedOnboarding(false);
        }}>Logout</Button>
        <ScrollView
          bgColor={'#FFF9EE'}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View w={'90%'} flexDir={'column'} justifyContent={'space-between'}>
            <LegacyWordmark />
            <View>
              <View w={'100%'} mt={5}>
                <Text
                  w={'100%'}
                  fontFamily={'rocaOne'}
                  fontWeight={'Regular'}
                  fontStyle={'normal'}
                  color={'#252525'}
                  fontSize={moderateScale(32)}
                >
                  Hello {user?.username}!
                </Text>
              </View>

              <HomeScreenTasks tasks={tasks} />
            </View>

            <View w={'100%'} mt={5}>
              <View justifyContent={'space-between'} flexDir={'row'}>
                <Text
                  color={'#252525'}
                  fontSize={15}
                  fontFamily={'Open Sans'}
                  fontWeight={'700'}
                  lineHeight={20}
                >
                  Guides
                </Text>
                <Text
                  color={'#909090'}
                  fontSize={15}
                  fontFamily={'Open Sans'}
                  fontWeight={'400'}
                  textDecorationLine={'underline'}
                  lineHeight={20}
                >
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
