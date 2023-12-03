import BackArrowIcon from '@/components/icons/BackArrow';
import SearchBar from '@/components/reusable/SearchBar';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { useUser } from '@/contexts/UserContext';
import { ITask } from '@/interfaces/ITask';
import { fetchUserTasks } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { Button, Icon, Input, ScrollView, Text, View } from 'native-base';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native';

import HomeScreenTaskCard from '../../components/homescreen components/HomeScreenTaskCard';
import LegacyWordmark from '../../components/reusable/LegacyWordmark';

export default function TaskScreen({ navigation }) {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [fileteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // let debounceTimer;

  const {
    isPending,
    data: tasks,
    error,
    refetch
  } = useQuery({
    queryKey: ['tasks', user?.id, selectedTags],
    queryFn: async () => await fetchUserTasks(user?.id, selectedTags),
    staleTime: 60000 // TEMP, unsolved refetch when unncessary
  });

  // useEffect(() => {
  //   const debounce = (func, delay) => {
  //     clearTimeout(debounceTimer);
  //     setIsLoading(true); // Set loading to true when debounce starts
  //     debounceTimer = setTimeout(() => {
  //       func();
  //       setIsLoading(false); // Set loading to false when debounce ends
  //     }, delay);
  //   };

  const filterTasks = (tasks: ITask[], keys: string[]): ITask[] => {
    if (search.length > 0) {
      const options = {
        keys: keys,
        threshold: 0.2
      };
      const fuse = new Fuse(tasks, options);
      const fuseResponse = fuse.search(search);
      return fuseResponse.map((item) => item.item);
    } else {
      return tasks;
    }
  };

  // debounce(filterTasks, 300);

  //   return () => {
  //     clearTimeout(debounceTimer);
  //   };
  // }, [search, tasks]);

  return (
    <>
      <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isPending}
        //     onRefresh={() => {
        //       refetch();
        //     }}
        //     colors={['#ff0000', '#00ff00', '#0000ff']}
        //     tintColor={'#ff0000'}
        //   />
        // }
        backgroundColor={'#FFFAF2'}
      >
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
              <SearchBar<ITask>
                isPending={isPending}
                inputSearch={search}
                keys={['task_name', 'task_description']}
                updateSearchValue={setSearch}
                filterItems={filterTasks}
                filteringType={tasks}
                updateFilteredValues={setFilteredTasks}
                width={'100%'}
                backgroundColor={'#F2F2F2'}
                borderRadius={'10px'}
                paddingLeft={'10px'}
                paddingRight={'10px'}
                marginBottom={'10px'}
              />
            </View>
            <View flexDirection={'row'}>
              <TaskTagGrid
                selectedTags={selectedTags}
                pressfunc={setSelectedTags}
              />
            </View>
          </View>
          <View
            marginTop="20px"
            flexDirection="column"
            justifyContent="space-between"
          >
            {error && <Text>error</Text>}
            {isPending && <ActivityIndicator size="small" />}
            {/* {tasks && fileteredTasks?.length === 0 && (
              <Text>No tasks found. Try changing your filters.</Text>
            )} */}
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              fileteredTasks?.map((task) => (
                <HomeScreenTaskCard
                  key={task.id}
                  task={task}
                  // navigation={navigation}
                />
              ))
            )}
          </View>
          <View marginTop={'20px'}></View>
        </View>
      </ScrollView>
    </>
  );
}
