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

  // </View >
  return (
    <View>
        {actions.map((action, index) => (
          <ScrollView key={index}>
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
          </ScrollView>
        ))}
      <SubmitButton handleSubmit={handleSubmit} />
    </View>
  );
}

export default FormComponent;

type SubmitButtonProps = {
  handleSubmit: (e: GestureResponderEvent) => void
}

const SubmitButton = ({ handleSubmit }: SubmitButtonProps) => {
  return (
    <View
      marginBottom={h('3%')}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      marginTop={h('3%')}
      width={'100%'}
      backgroundColor={'#FFFAF2'}
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
  )
}