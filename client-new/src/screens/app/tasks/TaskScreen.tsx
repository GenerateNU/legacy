import { useUser } from '@/contexts/UserContext';
import { Input, ScrollView, Text, View } from 'native-base';

import React, { useState } from 'react';

import HomeScreenTaskCard from '../../../components/homescreen components/HomeScreenTaskCard';
import LegacyWordmark from '../../../components/reusable/LegacyWordmark';
import { fetchUserTasks } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { ITask } from '@/interfaces/ITask';
import BackArrowIcon from '@/components/icons/BackArrow';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';

type TaskScreenProps = {
  navigation: any;
};

export default function TaskScreen({ navigation }: TaskScreenProps) {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [fileteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  let debounceTimer;

  const { isPending, data: tasks, error, refetch } = useQuery({
    queryKey: ['tasks', user?.id, selectedTags],
    queryFn: async () => await fetchUserTasks(user?.id, selectedTags),
    staleTime: 60000 // TEMP, unsolved refetch when unncessary
  });

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'#ff0000'}
          />
        }
        backgroundColor={'#FFFAF2'}>
        <View margin={'30px'} marginTop={'60px'}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <LegacyWordmark />
          </View>
          <Pressable onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <View width={'100%'} marginTop={'20px'}>
            <Text
              marginBottom="20px"
              fontSize="24"
              fontWeight={'200'}
              fontFamily={'madeDillan'}
            >
              All Tasks
            </Text>
            <View>
              <Input
                placeholder="Search"
                size="md"
                isDisabled={isPending ? true : false}
                width={'100%'}
                backgroundColor={'#F2F2F2'}
                borderRadius={'10px'}
                paddingLeft={'10px'}
                paddingRight={'10px'}
                marginBottom={'20px'}
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
            </View>
            <View flexDirection={'row'}>
              <TaskTagGrid selectedTags={selectedTags} pressfunc={setSelectedTags} />
            </View>
          </View>
          <View
            marginTop="20px"
            flexDirection="column"
            justifyContent="space-between"
          >
            {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
            {error && <Text>Error: {error.message}</Text>}
            {tasks && tasks.length === 0 && <Text>No tasks found</Text>}
            {tasks && tasks.map((item: ITask, index: number) =>
              <View key={index} mb={0}>
                <HomeScreenTaskCard task={item} isAllTasks={false} handleOnPress={() => navigation.navigate('SubTask Summary Screen', { task: item })} />
              </View> 
            )}
          </View>
          <View marginTop={'20px'}></View>
        </View>
      </ScrollView>
    </>
  );
}