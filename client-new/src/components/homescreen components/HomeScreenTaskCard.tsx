import { ITask } from '@/interfaces/ITask';
import { Text, View } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';

type HSTCProps = {  
  task: ITask;
};

const HomeScreenTaskCard: React.FC<HSTCProps> = ({ task }) => {
  return (
    <Pressable onPress={() => console.log(`pressed ${task.id}`)}>
    <View
        paddingLeft={6}
        paddingRight={6}
        paddingTop={2}
        paddingBottom={2}
      bgColor={'#FFFFFF'}
      borderRadius={13}
      borderWidth={1}
      borderColor={'#0F4D3F'}
      flexDir={'row'}
      alignItems={'center'}
      marginBottom={4}

      // style={{
      //     paddingLeft: 20,
      //     paddingRight: 20,
      //     paddingTop: 16,
      //     paddingBottom: 16,
      //     borderRadius: 13,
      //     borderWidth: 1,
      //     flexDirection: 'row',
      //     alignItems: 'center',
      //     marginBottom: 16
      // }}
    >
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: 'inter',
            fontSize: 15,
            fontWeight: '600',
            marginBottom: 8
          }}
        >
            {task.task_title}
        </Text>
        <Text
          style={{
            fontFamily: 'inter',
            fontSize: 12,
            color: '#2F1D12',
            marginBottom: 8
          }}
        >
            {task.task_description}
        </Text>
      </View>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 9999,
          backgroundColor: '#D9D9D9',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 65.13,
            height: 63.43,
            position: 'absolute',
            backgroundColor: '#F7F7F8',
            borderRadius: 9999
          }}
        />
        <Text style={{ fontSize: 8, fontWeight: '600', color: '#2F1D12' }}>
            %
        </Text>
      </View>
    </View>
    </Pressable>
  );
};

export default HomeScreenTaskCard;
