import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { ISubTask } from '@/interfaces/ISubTask';
import TabNavigator from '@/screens/app/BottomTabNavigator';
import { getActions } from '@/services/ActionsService';
import { API_BASE_URL } from '@/services/const';
import FormComponent from '@/utils/Actions';
import { useQuery } from '@tanstack/react-query';
import { Button, HStack, ScrollView, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type SubTaskScreenProps = {
  subtask: ISubTask;
};
const SubTaskScreen = ({ subtask }: SubTaskScreenProps) => {
  // props basically should be an ISubTask

  const { isLoading, error, data } = useQuery({
    queryKey: ['fetchActions', subtask?.id],
    queryFn: () => getActions(subtask?.id)
  });

  console.log('action fetched: ', data); // {"actions": [{"action_type": "input", "label": "Full Legal Name", "name": "full_name", "placeholder": "Enter your full legal name", "required": true, "type": "text"}, {"action_type": "input", "description": "Please enter your date of birth in the format: MM/DD/YYYY", "label": "Date of Birth", "name": "date_of_birth", "placeholder": "MM/DD/YYYY", "required": true, "type": "date"}, {"action_type": "input", "description": "Please provide your 9-digit social security number", "label": "Social Security Number", "name": "ssn", "placeholder": "Enter your social security number", "required": true, "type": "text"}, {"action_type": "input", "description": "Please provide your complete current residential address", "label": "Current Address", "name": "current_address", "placeholder": "Enter your current address", "required": true, "type": "text"}, {"action_type": "input", "description": "Please provide a valid phone number where you can be reached", "label": "Phone Number", "name": "phone_number", "placeholder": "Enter your phone number", "required": true, "type": "tel"}, {"action_type": "input", "description": "Please provide a valid email address for communication purposes", "label": "Email Address", "name": "email", "placeholder": "Enter your email address", "required": true, "type": "email"}, {"action_type": "select", "description": "Please select your current marital status from the options provided", "label": "Marital Status", "name": "marital_status", "options": [Array], "placeholder": "Select your marital status", "required": true}, {"action_type": "textarea", "description": "Feel free to provide any additional information or comments here", "label": "Additional Comments", "name": "additional_comments", "placeholder": "Enter any additional comments", "required": false}, {"action_type": "checkbox", "description": "Select the services you require", "label": "Select Services", "name": "services", "options": [Array], "required": true}, {"action_type": "radio", "description": "Select your preferred method of payment", "label": "Select Payment Method", "name": "payment_method", "options": [Array], "required": true}]}

  if (isLoading) {
    return <Text> ...loading </Text>;
  }

  if (error) {
    return <Text> error </Text>;
  }

  if (data === null) {
    // Data is still being fetched, you can render a loading indicator or return null
    return null;
  }

  return (
    <>
      <ScrollView backgroundColor={'#FFFAF2'}>
        <View margin={'30px'} marginTop={'60px'}>
          <HStack flexDirection="row" justifyContent="center" flex={1}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              flex={1}
            >
              <Button backgroundColor={'transparent'}>
                <Icon name="chevron-back" size={20} color={'#374957'}></Icon>
              </Button>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              flex={1}
            >
              <LegacyWordmark />
            </View>
          </HStack>
          <View width={'100%'} marginTop={'30px'}>
            <Text
              marginBottom="10px"
              fontSize="24"
              fontWeight={'400'}
              fontFamily={'Roca Regular'}
              color={'barkBrown'}
            >
              {subtask.sub_task_name}
            </Text>
            <Text
              marginBottom="20px"
              fontSize="16"
              fontWeight={'400'}
              fontFamily={'Inter_400Regular'}
              color={'barkBrown'}
            >
              {subtask.sub_task_description}
            </Text>
          </View>
          <View width={'100%'} marginTop="15px">
            <FormComponent
              actions={data.actions}
              subTaskName={subtask.sub_task_name}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SubTaskScreen;
