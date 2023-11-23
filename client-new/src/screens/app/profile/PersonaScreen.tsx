import { View, Text, Pressable } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Persona from '@/components/profile/Persona';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';

export type PersonScreenProps = {
  title: string;
  description: string;
};

/**
 * Screen for a single persona that comes from all personas screen
 * @param 
 * @returns 
 */
export default function PersonaScreen({ route, navigation }) {
  const { props } = route.params;

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
      <LegacyWordmarkWithBackArrow
          handleOnPress={() => navigation.navigate('All Personas Screen')}
        />
        <Persona
          personaTitle={props.title}
          personaDescription={props.description}
        />
      </View>
    </SafeAreaView>
  );
}
