import { getActions } from '@/services/ActionsService';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, ScrollView, Text, View, HStack, Pressable } from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import FormComponent from '@/components/task/Actions';
import { ISubTask } from '@/interfaces/ISubTask';
import BackArrowIcon from '@/components/icons/BackArrow';
import ActivityLoader from '@/components/reusable/ActivityLoader';

type SubTaskScreenProps = {
  route: any
  navigation: any
}
const SubTaskScreen = ({ route, navigation }: SubTaskScreenProps) => {
  const { subtask } = route.params as { subtask: ISubTask };

  const { isLoading, error, data } = useQuery({
    queryKey: ['fetchActions1', subtask?.id],
    queryFn: () => getActions(subtask?.id)
  });

  return (
      <ScrollView backgroundColor={'#FFFAF2'}>
        <View margin={'30px'} marginTop={'60px'}>
          <HStack flexDirection="row" justifyContent="center" flex={1}>
          <Pressable flex={1} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} flex={1}>
            <LegacyWordmark />
          </View>
          </HStack>
          <View width={'100%'} marginTop={'30px'}>
            <Text marginBottom= '10px' fontSize='24' fontWeight={'400'} fontFamily={"Roca Regular"} color={'barkBrown'}>
              {subtask.sub_task_name}
              </Text>
            <Text marginBottom= '20px' fontSize='16' fontWeight={'400'} fontFamily={"Inter_400Regular"} color={'barkBrown'}>
              {subtask.sub_task_description}
            </Text>
          </View>
        {isLoading && <ActivityLoader />}
        {error && <Text> error </Text>}
        {data === null && <Text> null </Text>}
        {data && data.actions && (
          <View width={"100%"} marginTop= '15px'>
            <FormComponent actions={data.actions} subTaskName={subtask.sub_task_name} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SubTaskScreen;
