import { useEffect, useState } from 'react';
import { ISubTask } from '@/interfaces/ISubTask';
import { getAllSubTasks } from '@/services/AllSubTasksService';
import { Button, HStack, ScrollView, Text, View } from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import HomeScreenTaskCard from '@/components/homescreen components/HomeScreenTaskCard';
import { useQuery } from 'react-query';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import CircleProgressSubtask from '@/components/reusable/CircleProgressSubtask';
import RightArrowIcon from '@/components/icons/RightArrowIcon';

const SubTaskSummaryScreen = ({ props }) => {
    // props basically should be an ITask

    const progress = Math.floor(Math.random() * 100) + 1;

    const { isLoading, error, data } = useQuery(
        ['fetchSubTasks', props.id],
        () => getAllSubTasks(props.id)
      );
    
      console.log(props.id)
      console.log('subtask fetched: ', data); // {"actions": [{"action_type": "input", "label": "Full Legal Name", "name": "full_name", "placeholder": "Enter your full legal name", "required": true, "type": "text"}, {"action_type": "input", "description": "Please enter your date of birth in the format: MM/DD/YYYY", "label": "Date of Birth", "name": "date_of_birth", "placeholder": "MM/DD/YYYY", "required": true, "type": "date"}, {"action_type": "input", "description": "Please provide your 9-digit social security number", "label": "Social Security Number", "name": "ssn", "placeholder": "Enter your social security number", "required": true, "type": "text"}, {"action_type": "input", "description": "Please provide your complete current residential address", "label": "Current Address", "name": "current_address", "placeholder": "Enter your current address", "required": true, "type": "text"}, {"action_type": "input", "description": "Please provide a valid phone number where you can be reached", "label": "Phone Number", "name": "phone_number", "placeholder": "Enter your phone number", "required": true, "type": "tel"}, {"action_type": "input", "description": "Please provide a valid email address for communication purposes", "label": "Email Address", "name": "email", "placeholder": "Enter your email address", "required": true, "type": "email"}, {"action_type": "select", "description": "Please select your current marital status from the options provided", "label": "Marital Status", "name": "marital_status", "options": [Array], "placeholder": "Select your marital status", "required": true}, {"action_type": "textarea", "description": "Feel free to provide any additional information or comments here", "label": "Additional Comments", "name": "additional_comments", "placeholder": "Enter any additional comments", "required": false}, {"action_type": "checkbox", "description": "Select the services you require", "label": "Select Services", "name": "services", "options": [Array], "required": true}, {"action_type": "radio", "description": "Select your preferred method of payment", "label": "Select Payment Method", "name": "payment_method", "options": [Array], "required": true}]}
    
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}} flex={1}>
                  <Button backgroundColor={"transparent"}>
                    <Icon name="chevron-back" size={20} color={"#374957"}></Icon>
                  </Button>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}} flex={1}>
                  <LegacyWordmark/>
                </View>
            </HStack>
            <View width={'100%'} marginTop={'20px'}>
              <Text marginBottom= '25px' fontSize='32' fontWeight={'400'} fontFamily={"Roca Regular"} color={'barkBrown'} justifyContent={'center'} textAlign={"center"} lineHeight={"32"}>
                {props.task_name}
              </Text>
              <CircleProgressSubtask progress={progress}/>
              <Text marginTop= '25px' fontSize='24' fontWeight={'400'} fontFamily={"Roca Regular"} color={'barkBrown'}>
                Upcoming Tasks
              </Text>
            </View>
            <View width={"100%"} marginTop= '15px'>
              <View marginTop= '5px' flexDirection='column' justifyContent='space-between' flex={1}>
                  {data.map((item, index) => (
                    <View
                    paddingLeft={5}
                    paddingTop={2.5}
                    paddingBottom={3.5}
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
                            {item.sub_task_name}
                          </Text>
                          <Text style={{
                            fontSize: 14,
                            color: '#2F1D12',
                          }}>
                          {item.sub_task_description}
                          </Text>
                        </View>
                        <View alignSelf={'center'} marginTop={2.5}>
                          <RightArrowIcon />
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        </>
    )};


    export default SubTaskSummaryScreen;