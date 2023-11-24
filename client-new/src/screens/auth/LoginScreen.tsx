import Footer from '@/components/reusable/Footer';
import HalfScreenWideButton from '@/components/reusable/HalfScreenWideButton';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import LetsGo from '@/components/reusable/LetsGo';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import ScreenWideInput from '@/components/reusable/ScreenWideInput';
import SmallRoundedButton from '@/components/reusable/SmallRoundedButton';
import { useUser } from '@/contexts/UserContext';
import { View } from 'native-base';

import { useState } from 'react';
import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

export default function LoginScreen({ route, navigation }) {
  const { user, login, logout } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    login(email, password);
    console.log('HIT');
    navigation.navigate('Access Screen');

    //
    // login(email, password).then((response) => {
    //   if (response === true) {
    //     // ONCE WE FIGURE OUT HOW TO GO TO HOME SCREEN, PUT HERE
    //     navigation.navigate("");
    //   } else {
    //     const err = JSON.parse(JSON.stringify(response)).code;
    //     console.log("ERROR: ", err)
    //     Alert.alert(
    //       "Error",
    //       "There was an error with authentication. Please try again.",
    //       [{ text: "OK", onPress: () => {} }]
    //     );
    //   }
    // });
  };

  const switchToSignUp = () => {
    navigation.navigate('Sign Up Screen');
  };

  return (
    <View bg={'creamyCanvas'} alignItems="center" h={h('100%')} w={w('100%')}>
      <View height={h('8%')}></View>
      <View
        width={w('80%')}
        flexDirection="row"
        justifyContent="space-between"
        justifyItems={'center'}
      >
        <LegacyWordmark />
        <SmallRoundedButton title="Sign Up" onClick={switchToSignUp} />
      </View>
      <View paddingTop={h('7%')}>
        <LetsGo />
      </View>
      <View alignItems={'center'} paddingTop={h('6.5%')}>
        <ScreenWideInput
          placeholderText="example@email.com"
          title="Email"
          iconName="envelope-o"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <View paddingTop={h('3%')} paddingBottom={h('4%')}>
          <ScreenWideInput
            placeholderText="Must be at least 8 characters long"
            title="Password"
            iconName="lock"
            password={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        <View
          width={w('80%')}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <HalfScreenWideButton
            text={'Login with SSO'}
            textColor={'#000000'}
            backgroundColor={'transparent'}
            borderColor={'lightGreen'}
          />
          <HalfScreenWideButton
            text={'Login to Legacy'}
            textColor={'#FFFFFF'}
            backgroundColor={'lightGreen'}
            borderColor={'lightGreen'}
            onClick={signIn}
          />
        </View>
        <View paddingTop={h('31%')}>
          <Footer />
        </View>
      </View>
    </View>
  );
}
