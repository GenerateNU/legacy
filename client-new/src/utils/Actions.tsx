import React, { useState, useCallback } from 'react';
import {
  Text,
  Input,
  FormControl,
  Select,
  TextArea,
  Checkbox,
  Radio,
  Button,
  View
} from 'native-base';
import { IAction, IActionList } from '@/interfaces/IAction';

const FormComponent = ({ actions }: IActionList) => {
  const [formState, setFormState] = useState({});
  const handleListChange = (e, name, index) => {
    e.preventDefault();

    // Check if the index is within the bounds of the existing list of items.
    if (index >= formState[name].length) {
      return;
    }

    const { value } = e.target;
    const newValues = [...(formState[name] || [])];
    newValues[index] = value;
    setFormState((prevState) => ({ ...prevState, [name]: newValues }));
  };

  const handleRemoveListItem = (name, index) => {
    const newValues = [...formState[name]];
    newValues.splice(index, 1);
    setFormState((prevState) => ({ ...prevState, [name]: newValues }));
  };

  const handleAddListItem = (e, name) => {
    const newValues = [...(formState[name] || []), '']; // Initialize as an array
    setFormState((prevState) => ({ ...prevState, [name]: newValues }));
  };

  // TODO: Doesnt work correctly
  const handleRadioChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextAreaChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (values, name) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: values.reduce((obj, value) => {
        obj[value] = true;
        return obj;
      }, {})
    }));
  };
/*
  const generatePDF = () => {

    const doc = new jsPDF();
    doc.text(20, 20, 'Form Data:');
    let verticalPosition = 30;
    for (const [key, value] of Object.entries(formState)) {
      doc.text(20, verticalPosition, `${key}: ${value}`);
      verticalPosition += 10;
    }
    doc.save('form_data.pdf');
  };
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      metadata: { timestamp: new Date() },
      form: formState
    });
    //generatePDF();
  };

  const renderField = (action, index) => {
    switch (action.action_type) {
      case 'input':
        return (
          <>
            <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{action.label}</Text>
            {/* Conditonally based on type */}
            <View marginBottom= '10px'>
              <Input
                key={index}
                // label={action.label}
                placeholder={action.placeholder}
                // name={action.name}
                type={action.type}
                // required={action.required}
                onChangeText={(value) => handleInputChange(action.name, value)}
                margin="normal"
                variant="outlined"
                backgroundColor={"#F5EFE7"}
              />
            </View>
            {/* <FormControl.HelperText>{action.description}</FormControl.HelperText> */}
          </>
        );
      case 'select':
        return (
          <>
            <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{action.label}</Text>
            <View marginBottom= '10px'>
              <Select
                minWidth="200"
                accessibilityLabel={action.placeholder}
                placeholder={action.placeholder}
                selectedValue={formState[action.name] || ''}
                onValueChange={(value) => handleSelectChange(action.name, value)}
                mt={1}
                backgroundColor={"#F5EFE7"}
              >
                {action.options.map((option, idx) => (
                  <Select.Item key={idx} label={option} value={option} />
                ))}
              </Select>
            </View>
            {/*<FormControl.HelperText>
              {action.description}
              </FormControl.HelperText>*/}
          </>
        );
      case 'textarea':
        return (
          <>
            <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{action.label}</Text>
            <View marginBottom= '10px'>
              <TextArea
                key={index}
                area-label={action.label}
                // label={action.label}
                placeholder={action.placeholder}
                // name={action.name}
                // required={action.required}
                numberOfLines={4}
                onChangeText={(value) => handleTextAreaChange(action.name, value)}
                margin="normal"
                variant="outlined"
                autoCompleteType={undefined}
                backgroundColor={"#F5EFE7"}
              />
            </View>
            {/*<FormControl.HelperText>
              {action.description}
            </FormControl.HelperText>*/}
          </>
        );
      case 'checkbox':
        return (
          <>
            <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{action.label}</Text>
            <View marginBottom= '10px'>
              <Checkbox.Group
                color="deepEvergreen"
                defaultValue={[]}
                onChange={(values) => handleCheckboxChange(values, action.name)}
                style={{ flexDirection: 'column' }}
              >
                {action.options.map((option, idx) => (
                  <Checkbox key={idx} value={option} my={1}>
                    <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{option}</Text>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </View>
            {/*<FormControl.HelperText>
              {action.description}
              </FormControl.HelperText>*/}
          </>
        );
      case 'radio':
        return (
          <>
            <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{action.label}</Text>
            <View marginBottom= '10px'>
              <Radio.Group
                name={action.name}
                defaultValue={formState[action.name] || ''}
                onChange={(value) => handleRadioChange(action.name, value)}
                style={{ flexDirection: 'column' }}
              >
                {action.options.map((option, idx) => (
                  <Radio key={idx} value={option} colorScheme="deepEvergreen">
                    <Text fontFamily={"Inter_400Regular"} color={'brown'} fontSize={12}>{option}</Text>
                  </Radio>
                ))}
              </Radio.Group>
            </View>
            {/*<FormControl.HelperText>
              {action.description}
              </FormControl.HelperText>*/}
          </>
        );
      default:
        return null;
    }
  };
  console.log('Form submitted:', {
    metadata: { timestamp: new Date() },
    form: formState
  });

  return (
    <FormControl isInvalid w="75%" width={"100%"}>
      {actions.map((action, index) => renderField(action, index))}
    </FormControl>
  );
};

export default FormComponent;
