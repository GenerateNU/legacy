import React from 'react';
import { View, Text } from 'native-base';

type CircularProgressProps = {
  progress: number;
}

export default function CircleProgress(props: CircularProgressProps) {
  return (
    <View alignItems={'center'} justifyContent={'center'}>
      <View 
          width={100}
          height={100}
          borderRadius={100}
          borderColor={'gray'} 
          borderWidth={5}
          alignItems={'center'}
          justifyContent={'center'}>
          <Text fontSize={18} fontWeight={'bold'}>
            {props.progress}%
          </Text>
      </View>
    </View>
  );
};