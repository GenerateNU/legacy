import { View } from 'native-base';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h
  } from 'react-native-responsive-screen';
import React from 'react';

export default function ScreenBody({ children }) {
  return (
    <View paddingLeft={w('8%')} paddingRight={w('8%')}>
      {children}
    </View>
  );
}
