import { View, Text, Button, Skeleton, AlertDialog } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import PersonaCard from '@/components/profile/PersonaCard';
import ProfileCard from '@/components/profile/ProfileCard';
import { useEffect, useState } from 'react';
import OurModal from '@/components/reusable/Modal';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';
import { IPersona } from '@/interfaces/IPersona';
import React from 'react';
import { getPersona } from '@/services/ProfileService';
import { useUser } from '@/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Alert, Modal } from 'react-native';

/**
 * Screen to render the user's profile
 * @returns
 */
export default function ProfileScreen({ route, navigation }) {
  const { user, logout } = useUser();
  const { setCompletedOnboarding } = useUser();

  /**
   * Fetch all data for this screen:
   * - My Persona
   */
  const { isPending, data: persona, error } = useQuery({
    queryKey: ['persona', user?.id],
    queryFn: async () => await getPersona(user?.id)
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout()
          }
        }
      ],
      { cancelable: false }
    );

  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Delete Pressed')
        }
      ],
      { cancelable: false }
    );
  }

  const handleShare = () => {
    Alert.alert(
      'Share Legacy',
      'Share Legacy with your friends!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Share',
          style: 'default',
          onPress: () => console.log('Share Pressed')
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
        <LegacyWordmarkWithBackArrow handleOnPress={() => {}} />
        <Text
          color={'#252525'}
          fontSize={24}
          fontWeight={'700'}
          fontFamily={'Roca Regular'}
          lineHeight={h('5%')}
          marginTop={h('2.5%')}
          marginBottom={h('2.5%')}
        >
          Profile
        </Text>
        {isPending && <ActivityIndicator size="small" color="#43A573" />}
        {error && <Text>Something went wrong...</Text>}
        {persona && (
          <PersonaCard
            title={user?.username}
            subtitle={persona?.persona_title}
            subheading={'View My Persona'}
            image="https://i.postimg.cc/44Qn7BWC/temp-Image-KY7-Maq.jpg"
            border={true}
            backgroundColor="white"
            handleOnPress={() => navigation.navigate('My Persona Screen')}
          />
        )}

        <ProfileCard
          title={'Notification Settings'}
          handleOnPress={() => navigation.navigate('Notifications Screen')}
        />
        <ProfileCard
          title={'Password and Security'}
          handleOnPress={() =>
            navigation.navigate('Password and Security Screen')
          }
        />
        <ProfileCard title={'Personal Access'} />
        <ProfileCard
          title={'Share and Rate Legacy'}
          handleOnPress={() => handleShare()}
        />
      </View>

      {/* {shareModal && ( */}
      {/* // <OurModasl showModal={shareModal} setShowModal={setShareModal}>/ */}
      {/* </OurModal> */}
      {/* )} */}

      <View
        height={h('5%')}
        width={w('100%')}
        position={'absolute'}
        bottom={h('8%')}
        flexDirection={'column'}
        padding={10}
      >
        <Button
          onPress={handleLogout}
          width={w('80%')}
          height={h('5%')}
          borderRadius={w('80%') / 2}
          borderColor={'#43A573'}
          borderWidth={1}
          backgroundColor={'#FFF9EE'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={h('1%')}
        >
          <Text color={'#2F1D12'} fontFamily={'Inter'} fontWeight={'600'} fontSize={12}>
            Logout
          </Text>
        </Button>

        <Button
          onPress={handleDeleteAccount}
          width={w('80%')}
          height={h('5%')}
          borderRadius={w('80%') / 2}
          borderColor={'warning.700'}
          borderWidth={1}
          backgroundColor={'warning.700'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text color={'white'} fontFamily={'Inter'} fontWeight={'600'} fontSize={12}>
            Delete Account
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
