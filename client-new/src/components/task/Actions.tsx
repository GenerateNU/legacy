import { useUser } from '@/contexts/UserContext';
import { IAction } from '@/interfaces/IAction';
import { createFile } from '@/services/CreateFileService';
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  Select,
  Text,
  TextArea,
  View
} from 'native-base';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';

import React, { useCallback, useEffect, useState } from 'react';
import { ZodIssue, z } from 'zod';
import InputField from '@/components/task/InputField';
import SelectField from '@/components/task/SelectField';
import TextAreaField from '@/components/task/TextAreaField';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import { GestureResponderEvent } from 'react-native';


type FormComponentProps = {
  actions: IAction[];
  subTaskName: string;
};

const FormComponent = ({ actions, subTaskName }: FormComponentProps) => {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState<ZodIssue[]>([]);
  const { user } = useUser();

  const handleSubmit = async (e: GestureResponderEvent) => {
    e.preventDefault();


    try {
      setFormState({ ...formState, user_id: user?.id, sub_task_name: subTaskName, timestamp: Date.now() })
      await createFile(user?.id, subTaskName, formState);
    }
    catch (err) {
      console.log(err);
    }
  }

  const renderField = (action, index: number) => {
    switch (action.action_type) {
      case 'input':
        return <InputField
          action={action}
          index={index}
          setFormState={setFormState}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      case 'select':
        return <SelectField action={action} index={index} setFormState={setFormState} />
      case 'textarea':
        return <TextAreaField action={action} index={index} setFormState={setFormState} setFormErrors={setFormErrors} />
      case 'checkbox':
        return <CheckboxField action={action} index={index} setFormState={setFormState} />
      case 'radio':
        return <RadioField action={action} index={index} setFormState={setFormState} formState={formState} />
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        {actions.map((action, index) => (
          <FormControl
            isRequired={action.required}
            // isInvalid={formErrors.some((error) => error.path[0] === action.name)}
            key={index}
            mt={4}
          >
            <FormControl.Label>
              <Text>{action.label}</Text>
            </FormControl.Label>
            {renderField(action, index)}
          </FormControl>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        }}
      >
        <Button
          textDecorationColor={'#FFFFFF'}
          backgroundColor={'#43A573'}
          borderColor={'#43A573'}
          onPress={handleSubmit}
          flex={0.9}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

export default FormComponent;