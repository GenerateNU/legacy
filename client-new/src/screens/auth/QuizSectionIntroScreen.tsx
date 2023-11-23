import { KeyboardAvoidingView, View, Text, Divider, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircleProgressBar from '@/components/reusable/CircleProgressBar';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useOnboarding } from '@/contexts/OnboardingContext';
import React from 'react';

export default function QuizSectionIntroScreen({ route, navigation }) {
  const {
    page,
    setPage,
    onboardingFlow,
  } = useOnboarding();

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };
  const { props } = route.params;
  return (
    <View bg={'creamyCanvas'} alignItems="center" h={h('100%')} w={w('100%')}>
      <View paddingTop={h('7%')}></View>

      <LegacyWordmark />

      <View paddingTop={h('4.5%')} paddingBottom={h('2%')}>
        <CircleProgressBar
          totalCircles={props.totalCircles}
          completedCircles={0}
        />
      </View>
      <Divider marginTop={h('2%')} width={w('100%')} color={'#D9D9D9'} />

      <View
        width={w('50%')}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingTop={h('4%')}
        paddingBottom={h('3.5%')}
      >
        <Text
          paddingRight={w('3%')}
          fontSize={20}
          fontFamily={'rocaOne'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
        >
          {props.title}
        </Text>
        <Icon name="flower-tulip-outline" size={30} color={'darkGreen'}></Icon>
      </View>

      <View width={w('80%')}>
        <Text
          fontSize={18}
          color={'#767676'}
          fontFamily={'inter'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          paddingBottom={h('1%')}
          textAlign="center"
        >
          Insert section description here
        </Text>
      </View>

      <View paddingTop={h('38%')}>
        <ScreenWideButton
          text={'Get Started'}
          textColor="#FFFFFF"
          backgroundColor="lightGreen"
          borderColor="lightGreen"
          onClick={next}
        />
      </View>
    </View>
  );
}
