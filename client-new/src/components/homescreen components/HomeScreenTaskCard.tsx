import { ITask } from '@/interfaces/ITask';
import { Text, View } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import BackArrowIcon from '../icons/BackArrow';
import { Circle, Svg } from 'react-native-svg';
import RightArrowIcon from '../icons/RightArrowIcon';
import CircleProgress from '../reusable/CircleProgress';

type HSTCProps = {  
  task: ITask;
};

const HomeScreenTaskCard: React.FC<HSTCProps> = ({ task }) => {
  const progress = Math.floor(Math.random() * 100) + 1;

  return (
    <Pressable onPress={() => console.log(`pressed ${task.id}`)}>
      <View
        paddingLeft={5}
        // paddingRight={5}
        paddingTop={4}
        paddingBottom={4}
        bgColor={'#FFFFFF'}
        borderRadius={13}
        borderWidth={1}
        borderColor={'#0F4D3F'}
        flexDirection="row" // Set flexDirection to 'row'
        alignItems="center" // Align items vertically
        justifyContent="space-between" // Spread items horizontally
        marginBottom={4}
      >
        <View flexDir={'row'} alignItems={'flex-start'} justifyContent={'space-between'} width={'100%'}>
          <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-start', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
            <Text style={{
              fontSize: 15,
              fontWeight: '600',
              marginBottom: 5,
          }}
            >
              {task.task_name}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#2F1D12',
            }}>
            {task.task_description}
            </Text>
          </View>
          <CircleProgress progress={progress} />
          <View style={{ alignSelf: 'flex-end', marginTop: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <RightArrowIcon />
          </View>

        </View>
      </View>
    </Pressable>
  );
};

export default HomeScreenTaskCard;
