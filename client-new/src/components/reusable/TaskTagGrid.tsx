import { View } from 'native-base';

import React, { useState } from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import TaskTag from './TaskTag';

type TaskTagGridProps = {
  pressed: string;
};

export default function TaskTagGrid(props: TaskTagGridProps) {
  const [pressed, setPressed] = useState(props.pressed);

  const pressTag = (tagNum: string) => {
    if (pressed === tagNum) {
      setPressed(null);
    } else {
      setPressed(tagNum);
    }
  };
  return (
    <View flexDirection={'row'} flexWrap={'wrap'} mt={h('2%')}>
      <TaskTag
        taskText={'Emotional'}
        taskPressed={pressed === 'Emotional'}
        taskPressFunction={() => pressTag('Emotional')}
      />
      <TaskTag
        taskText={'Financial'}
        taskPressed={pressed === 'Financial'}
        taskPressFunction={() => pressTag('Financial')}
      />
      <TaskTag
        taskText={'Value Based'}
        taskPressed={pressed === 'Value Based'}
        taskPressFunction={() => pressTag('Value Based')}
      />
      <TaskTag
        taskText={'Holistic'}
        taskPressed={pressed === 'Holistic'}
        taskPressFunction={() => pressTag('Holistic')}
      />
    </View>
  );
}
