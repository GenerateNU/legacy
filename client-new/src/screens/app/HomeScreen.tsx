import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { useUser } from '@/contexts/UserContext';
import { Button, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'native-base';

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
import { moderateScale, verticalScale } from '../../utils/FontSizeUtils';
import { ITask } from '@/interfaces/ITask';
import { useProfile } from '@/contexts/ProfileContext';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGuides } from '@/services/GuideService';
import { RefreshControl } from 'react-native';

export default function HomeScreen({ navigation }) {
  const { user, logout, refetchUser } = useUser();
  const { setCompletedOnboarding } = useProfile();

  const { isPending, data: guides, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllGuides
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9EE' }}>
        <ScrollView 
          bgColor={'#FFF9EE'}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          marginLeft={w('1%')}
          marginRight={w('1%')}
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
              refetchUser();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'#ff0000'}
          />
        }
        >
          <Button onPress={() => {
            logout();
            setCompletedOnboarding(false);
          }}>Logout</Button>
          <View w={'95%'} flexDir={'column'} justifyContent={'space-between'}>
            <LegacyWordmark />
            <View>
              <View w={'100%'} mt={5} mb={5}>
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
              <View w={'100%'}>
                <View justifyContent={'space-between'} flexDir={'row'} alignContent={'center'} alignItems={'center'} width={'100%'}
                  fontSize={15}
                  fontFamily={'Open Sans'}
                  fontWeight={'400'}
                  textDecorationLine={'underline'}
                  lineHeight={20}
                >
                  <Text
                    color={'#252525'}
                    fontFamily={'rocaOne'}
                    fontWeight={'Regular'}
                    fontStyle={'normal'}
                    fontSize={24}
                    lineHeight={26.4}
                  >
                    Your Journey
                  </Text>
                  <Pressable onPress={() => navigation.navigate('Task Screen')}>
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
                  </Pressable>
                </View>
                <HomeScreenTasks user_id={user?.id} />
              </View>
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
              <Pressable onPress={() => navigation.navigate('Guide Screen')}>
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
                </Pressable>
            </View>
            {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
            {error && <Text>Error: {error.message}</Text>}
            {guides && <HomeScreenGuides guides={guides} />}
            </View>
          </View>
        </ScrollView>
    </SafeAreaView >
  );
}
