import { Button, Pressable, Text, View } from 'native-base';
import React from 'react';
import HomeScreenTaskCard from './HomeScreenTaskCard';
import { ITask } from '@/interfaces/ITask';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTasks } from '@/services/TaskService';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

type YourJourneyComponentProps = {
  user_id: number;
};

const YourJourneyComponent: React.FC<YourJourneyComponentProps> = ({ user_id }) => {
  const { isPending, data: tasks, error } = useQuery({
    queryKey: ['tasks', user_id],
    queryFn: async () => await fetchUserTasks(user_id)
  });

  return (
    <View width={'100%'}>
      <View mt={2} flexDir={'column'} justifyContent={'space-evenly'}>
        {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
        {error && <Text>Error: {error.message}</Text>}
        {tasks && tasks.length === 0 && <Text>No tasks found</Text>}
        {tasks && tasks.slice(0, 3).map((item: ITask, index: number) =>
          <View key={index} mb={0}>
            <HomeScreenTaskCard task={item} isAllTasks={false} />
          </View> 
        )}
      </View>
    </View>
  );
};

export default YourJourneyComponent;
