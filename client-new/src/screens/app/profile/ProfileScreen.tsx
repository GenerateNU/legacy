import { View, Text } from 'native-base';
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

/**
 * Screen to render the user's profile
 * @returns
 */
export default function ProfileScreen({ route, navigation }) {
  const userID = '1';
  const [myPersona, setMyPersona] = useState<IPersona | null>(null);
  const [shareModal, setShareModal] = useState<boolean>(false);

  /**
   * Fetch all data for this screen:
   * - My Persona
   */
  const fetchData = async () => {
    const persona = await getPersona(userID);
    setMyPersona(persona);
  };

  /**
   * Load in data on first render
   */
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={600}>
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
        <PersonaCard
          title={'Amanda Kerr'}
          subtitle={myPersona?.persona_title}
          subheading={myPersona?.persona_description}
          image="https://i.postimg.cc/44Qn7BWC/temp-Image-KY7-Maq.jpg"
          border={true}
          backgroundColor="white"
          handleOnPress={() => navigation.navigate('My Persona Screen')}
        />

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
          handleOnPress={() => setShareModal(true)}
        />
      </View>
      {shareModal && (
        <OurModal showModal={shareModal} setShowModal={setShareModal}>
          <View
            backgroundColor={'#D9D9D9'}
            height={272}
            width={241}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text
              textAlign={'center'}
              fontFamily={'Open Sans'}
              fontSize={15}
              fontWeight={'700'}
            >
              {'SHARE / RATE APP'}
            </Text>
          </View>
        </OurModal>
      )}
    </SafeAreaView>
  );
}
