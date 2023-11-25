import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { useUser } from '@/contexts/UserContext';
import { Button, KeyboardAvoidingView, ScrollView, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
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
import { useTask } from '@/contexts/TaskContext';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGuides } from '@/services/GuideService';

export default function HomeScreen() {
  const { user, logout } = useUser();
  const { setCompletedOnboarding } = useProfile();

  const { tasks } = useTask();

  const { isPending, data: guides, error } = useQuery({
    queryKey: ['guides'],
    queryFn: fetchAllGuides
  });

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#FFF9EE' }}
      >
        <ScrollView 
          bgColor={'#FFF9EE'}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          marginLeft={w('5%')}
          marginRight={w('5%')}
        >
          <Button onPress={() => {
            logout();
            setCompletedOnboarding(false);
          }}>Logout</Button>
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
              {tasks && (
                <View w={'100%'}>
                  <HomeScreenTasks tasks={tasks} />
                </View>
              )}
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
              {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
              {error && <Text>Error: {error.message}</Text>}
              {guides && <HomeScreenGuides guides={guides} />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
