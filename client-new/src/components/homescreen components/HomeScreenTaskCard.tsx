import { ITask } from '@/interfaces/ITask';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import RightArrowIcon from '../icons/RightArrowIcon';
import CircleProgress from '../reusable/CircleProgress';
import { fetchTaskTag } from '@/services/TaskService';

type HSTCProps = {  
  task: ITask;
  isAllTasks?: boolean;
};

const HomeScreenTaskCard: React.FC<HSTCProps> = ({ task, isAllTasks }) => {
  const [tag, setTag] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isAllTasks) {
      const fetchData = async () => {
        setIsPending(true);
        try {
          const fetchedTag = await fetchTaskTag(task.id);
          setTag(fetchedTag);
        } catch (err) {
          setError(err);
        } finally {
          setIsPending(false);
        }
      };

      fetchData();
    }
  }, [isAllTasks, task.id]);

  const progress = Math.floor(Math.random() * 100) + 1;

  return (
    <Pressable onPress={() => console.log(`pressed ${task.id}`)}>
      <View
        paddingLeft={5}
        paddingTop={6}
        paddingBottom={6}
        bgColor={'#FFFFFF'}
        borderRadius={13}
        borderWidth={1}
        borderColor={'#0F4D3F'}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between" 
        marginBottom={4}
        position={'relative'}
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

        {isPending && <View />}
        {error && <View />}
        {tag &&
          <View style={{
            position: 'absolute',
            top: -1,
            right: 0,
            backgroundColor: '#0F4D3F',
            borderTopRightRadius: 12,
            borderBottomLeftRadius: 12,
            paddingLeft: 3,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
          }}>
            <Text style={{
              fontSize: 12,
              color: '#FFFFFF',
            }}>
              {tag}
            </Text>
          </View>
        }
      </View>
    </Pressable>
  );
};

export default HomeScreenTaskCard;