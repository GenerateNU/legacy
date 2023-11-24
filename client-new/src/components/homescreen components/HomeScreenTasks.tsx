import { Text, View } from 'native-base';
import React from 'react';
import HomeScreenTaskCard from './HomeScreenTaskCard';
import { ITask } from '@/interfaces/ITask';

type YourJourneyProps = {
  tasks: ITask[];
};

const YourJourneyComponent: React.FC<YourJourneyProps> = ({ tasks }) => {
  // Get the first three tasks
  const displayedTasks = tasks.slice(0, 3);

  return (
    <View width={'100%'} marginTop={5}>
      <View justifyContent={'space-between'} flexDir={'row'}>
        <Text
          color={'#252525'}
          fontFamily={'rocaOne'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          fontSize={24}
          lineHeight={26.4}
        >
          Your Journey
        </Text>
        <Text
          color={'#909090'}
          fontSize={15}
          fontFamily={'Open Sans'}
          fontWeight={'400'}
          textDecorationLine={'underline'}
          lineHeight={20}
        >
          See all
        </Text>
      </View>

      <View mt={5} flexDir={'column'} justifyContent={'space-between'}>
        {displayedTasks.map((item, index) => (
          <View key={index} mb={0}>
            <HomeScreenTaskCard
              title={item.task_title}
              description={item.task_description}
              progress={10}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default YourJourneyComponent;
