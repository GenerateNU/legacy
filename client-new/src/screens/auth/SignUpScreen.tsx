import Footer from '@/components/reusable/Footer';
import ScreenWideButton from '@/components/reusable/HalfScreenWideButton';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import LetsGo from '@/components/reusable/LetsGo';
import ScreenWideInput from '@/components/reusable/ScreenWideInput';
import SmallRoundedButton from '@/components/reusable/SmallRoundedButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useUser } from '@/contexts/UserContext';
import { FormControl, Icon, Input, KeyboardAvoidingView, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { getMonth } from '@/utils/DateUtils';

// TODO: signup is still not fully reistant
export default function SignUpScreen({ route, navigation }) {
  const { createAccount } = useUser();

  const emailSchema = z.string().email('Invalid email format');
  const passwordSchema = z.string().min(8, 'Password must be at least 8 characters long');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState<Date>(new Date())

  const signUp = () => {
    console.log('username: ', username)
    console.log('email: ', email)
    const signup = async () => {
      // validation
      if (username === '' || email === '' || password === '' || date === null) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      try {
        emailSchema.parse(email);
        passwordSchema.parse(password);
      } catch (error) {
        if (error instanceof z.ZodError) {
          Alert.alert('Error', error.issues[0].message);
          return;
        }
      }

      if (await createAccount(username, email, password)) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        setUsername('');
        setEmail('');
        setPassword('');

        return;
      }
      navigation.setOptions();
      navigation.navigate('Onboarding Stack');
    }

    signup();
  };

  useEffect(() => {
    console.log('date: ', date)
  }, [date])

  const switchToLogin = () => {
    navigation.navigate('Login Screen');
  };

  return (
    <>
      <View bg={'creamyCanvas'} alignItems="center" h={h('100%')} w={w('100%')}>
        <View
          alignItems="center"
          width={w('80%')}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={'center'}
          paddingTop={h('8%')}
        >
          <LegacyWordmark />
          <SmallRoundedButton title="Login" onClick={switchToLogin} />
        </View>
        <View paddingTop={h('7%')}>
          <LetsGo />
        </View>
        <View alignItems={'center'} paddingTop={h('6.5%')}>
          <ScreenWideInput
            placeholderText="Example"
            title="Full Name"
            iconName="user-o"
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
          <View paddingTop={h('3%')}>
            <ScreenWideInput
              placeholderText="example@email.com"
              title="Email"
              iconName="envelope-o"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
          </View>
          <View paddingTop={h('3%')}>
            <ScreenWideInput
              placeholderText="Must be at least 8 characters long"
              title="Password"
              iconName="lock"
              password={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
          </View>
          <View paddingTop={h('3%')} paddingBottom={h('3%')}>
            <ScreenWideInput
              title="Date of Birth"
              onChangeText={(value) => setDate(value)}
              placeholderText="Select your date of birth"
              iconName="calendar"
              disabled={false}
              password={false}
              isDatePicker={true}
            />

          </View>
          <View
            width={w('80%')}
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <ScreenWideButton
              text="Sign up with SSO"
              textColor={'#000000'}
              backgroundColor={'transparent'}
              borderColor={'lightGreen'}
              onClick={() => Alert.alert('Not implemented yet')}
            />
            <ScreenWideButton
              text="Sign up to Legacy"
              textColor={'#FFFFFF'}
              backgroundColor={'lightGreen'}
              borderColor={'lightGreen'}
              onClick={signUp}
            />
          </View>
          <View paddingTop={h('20%')}>
            <Footer />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16
  }
});
