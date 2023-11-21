import { View, Text, Pressable } from 'native-base';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from 'react-native-responsive-screen';
import React from 'react';
import { moderateScale } from '@/utils/FontSizeUtils';

type TaskTagProps = {
  taskText: string;
  taskPressed: boolean;
  taskPressFunction?: () => void;
};

export default function TaskTag(props: TaskTagProps) {
  return (
    <Pressable
      paddingX={w('3.5%')}
      paddingY={h('1.5%')}
      backgroundColor={props.taskPressed ? 'deepEvergreen' : '#00000000'}
      alignSelf={'flex-start'}
      borderRadius={30}
      borderColor={'deepEvergreen'}
      borderWidth={1.5}
      onPress={props.taskPressFunction}
      marginTop={h('0.75%')}
      marginRight={w('0.5%')}
    >
      <Text
        fontFamily={'inter'}
        fontWeight={'600'}
        fontSize={moderateScale(13)}
        color={props.taskPressed ? '#FFFFFF' : 'deepEvergreen'}
      >
        {props.taskText}
      </Text>
    </Pressable>
  );
}
