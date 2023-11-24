import { KeyboardAvoidingView, Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingScreen({ route, navigation }) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View height={h('80%')} justifyContent="center" alignItems="center">
          <Text fontSize={50} fontWeight={600}>
            Landing Page
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
