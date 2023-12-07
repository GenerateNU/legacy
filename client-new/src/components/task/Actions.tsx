import { useUser } from '@/contexts/UserContext';
import { IAction, IActionList } from '@/interfaces/IAction';
import { createFile } from '@/services/CreateFileService';
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Radio,
  Select,
  Text,
  TextArea,
  View
} from 'native-base';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';

import React, { useCallback, useState } from 'react';
import { ZodIssue, z } from 'zod';

type FormComponentProps = {
  actions: IAction[];
  subTaskName: string;
};

const FormComponent = ({ actions, subTaskName }: FormComponentProps) => {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user } = useUser();

    try {
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
        return <SelectField action={action} index={index} setFormState={setFormState} setFormErrors={setFormErrors} />
      case 'textarea':
        return <TextAreaField action={action} index={index} setFormState={setFormState} setFormErrors={setFormErrors} />
      case 'checkbox':
        return <CheckboxField action={action} index={index} setFormState={setFormState} setFormErrors={setFormErrors} />
      case 'radio':
        return <RadioField action={action} index={index} setFormState={setFormState} formState={formState} setFormErrors={setFormErrors} />
      default:
        return null;
    }
  };

  return (
    <FormControl isInvalid width={'100%'} marginBottom={h('2%')}>
      {actions.map((action, index) =>
        <View
          key={index}
          width={'100%'}
          marginBottom={h('2%')}
        >
          {renderField(action, index)}
        </View>
      )}
      <HStack
        flexDirection="row"
        justifyContent="center"
        flex={1}
        marginTop={'10px'}
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
      </HStack>
    </FormControl>
  );
};

export default FormComponent;


const InputField = ({ action, index, setFormState, setFormErrors, formErrors }) => {

  const handleInputChange = (name: string, value: string) => {
    const errorMessage = validateInput(value);

    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const validateInput = (value: string) => {
    try {
      const schema = z.string().min(1).max(10);
      schema.parse(value);
      return undefined;
    } catch (error) {
      return error.message;
    }
  }


  return (
    <View width={'100%'}>
      <Text
        fontFamily={'Inter_400Regular'}
        color={'barkBrown'}
        fontSize={h('1.5%')}
      >
        {action.label}
      </Text>
      <View>
        <Input
          key={index}
          placeholder={action.placeholder}
          type={action.type}
          onChangeText={(value) => handleInputChange(action.name, value)}
          borderBottomWidth={h('0.1%')}
          borderTopWidth={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          borderBottomColor={'Brown'}
          backgroundColor={'#F5EFE7'}
        />
      </View>
      {formErrors[action.name] && (
        <Text>Error: {formErrors[action.name]}</Text>
      )}
    </View>
  );
}

const SelectField = ({ action, index, setFormState, setFormErrors }) => {
  const handleSelectChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <View width={'100%'}>
      <Text
        fontFamily={'Inter_400Regular'}
        color={'barkBrown'}
        fontSize={h('1.5%')}
      >
        {action.label}
      </Text>
      <View width={'100%'}>
        <Select
          minWidth="200"
          accessibilityLabel={action.placeholder}
          placeholder={action.placeholder}
          selectedValue={action.name}
          onValueChange={(value) => handleSelectChange(action.name, value)}
          mt={1}
          backgroundColor={'#F5EFE7'}

        >
          {action.options.map((option, idx) => (
            <Select.Item key={idx} label={option} value={option} />
          ))}
        </Select>
      </View>
    </View>
  );
}

const TextAreaField = ({ action, index, setFormState, setFormErrors }) => {
  const handleTextAreaChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <View width={'100%'}>
      <Text
        fontFamily={'Inter_400Regular'}
        color={'barkBrown'}
        fontSize={h('1.5%')}
      >
        {action.label}
      </Text>
      <View width={'100%'}>
        <TextArea
          key={index}
          area-label={action.label}
          placeholder={action.placeholder}
          numberOfLines={4}
          onChangeText={(value) => handleTextAreaChange(action.name, value)}
          autoCompleteType="off"
          backgroundColor={'#F5EFE7'}
        />
      </View>
    </View>
  );
}

const CheckboxField = ({ action, index, setFormState, setFormErrors }) => {
  const handleCheckboxChange = (values, name) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: values.reduce((obj, value) => {
        obj[value] = true;
        return obj;
      }, {})
    }));
  };

  return (
    <View width={'100%'}>
      <Text
        fontFamily={'Inter_400Regular'}
        color={'barkBrown'}
        fontSize={12}
      >
        {action.label}
      </Text>
      <View>
        <Checkbox.Group
          color="deepEvergreen"
          defaultValue={[]}
          onChange={(values) => handleCheckboxChange(values, action.name)}
          style={{ flexDirection: 'column' }}
        >
          {action.options.map((option: string, idx: number) => (
            <Checkbox key={idx} value={option} my={1}>
              <Text
                fontFamily={'Inter_400Regular'}
                color={'barkBrown'}
                fontSize={12}
              >
                {option}
              </Text>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </View>
    </View >
  );
}

const RadioField = ({ action, index, setFormState, formState, setFormErrors }) => {
  const handleRadioChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Text
        fontFamily={'Inter_400Regular'}
        color={'barkBrown'}
        fontSize={12}
      >
        {action.label}
      </Text>
      <View marginBottom="10px">
        <Radio.Group
          name={action.name}
          defaultValue={formState[action.name] || ''}
          onChange={(value) => handleRadioChange(action.name, value)}
          style={{ flexDirection: 'column' }}
        >
          {action.options.map((option, idx) => (
            <Radio key={idx} value={option} colorScheme="deepEvergreen">
              <Text
                fontFamily={'Inter_400Regular'}
                color={'barkBrown'}
                fontSize={12}
              >
                {option}
              </Text>
            </Radio>
          ))}
        </Radio.Group>
      </View>
      {/*<FormControl.HelperText>
        {action.description}
        </FormControl.HelperText>*/}
    </>
  );
}