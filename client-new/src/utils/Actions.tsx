import { IAction, IActionList } from '@/interfaces/IAction';
import {
  Checkbox,
  FormControl,
  Input,
  Radio,
  Select,
  TextArea
} from 'native-base';

import React, { useCallback, useState } from 'react';

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

  // const generatePDF = () => {

  //   const doc = new jsPDF();
  //   doc.text(20, 20, 'Form Data:');
  //   let verticalPosition = 30;
  //   for (const [key, value] of Object.entries(formState)) {
  //     doc.text(20, verticalPosition, `${key}: ${value}`);
  //     verticalPosition += 10;
  //   }
  //   doc.save('form_data.pdf');
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      metadata: { timestamp: new Date() },
      form: formState
    });
    // generatePDF();
  };

  const renderField = (action, index) => {
    switch (action.action_type) {
      case 'input':
        return (
          <>
            <FormControl.Label>{action.label}</FormControl.Label>
            {/* Conditonally based on type */}
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
            />
            {/* <FormControl.HelperText>{action.description}</FormControl.HelperText> */}
          </>
        );
      case 'select':
        return (
          <>
            <FormControl.Label>{action.label}</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel={action.placeholder}
              placeholder={action.placeholder}
              selectedValue={formState[action.name] || ''}
              onValueChange={(value) => handleSelectChange(action.name, value)}
              mt={1}
            >
              {action.options.map((option, idx) => (
                <Select.Item key={idx} label={option} value={option} />
              ))}
            </Select>
            <FormControl.HelperText>
              {action.description}
            </FormControl.HelperText>
          </>
        );
      case 'textarea':
        return (
          <>
            <FormControl.Label>{action.label}</FormControl.Label>
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
            />
            <FormControl.HelperText>
              {action.description}
            </FormControl.HelperText>
          </>
        );
      case 'checkbox':
        return (
          <>
            <FormControl.Label>{action.label}</FormControl.Label>
            <Checkbox.Group
              colorScheme="green"
              defaultValue={[]}
              onChange={(values) => handleCheckboxChange(values, action.name)}
              style={{ flexDirection: 'column' }}
            >
              {action.options.map((option, idx) => (
                <Checkbox key={idx} value={option} my={1}>
                  {option}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <FormControl.HelperText>
              {action.description}
            </FormControl.HelperText>
          </>
        );
      case 'radio':
        return (
          <>
            <FormControl.Label>{action.label}</FormControl.Label>
            <Radio.Group
              name={action.name}
              defaultValue={formState[action.name] || ''}
              onChange={(value) => handleRadioChange(action.name, value)}
              style={{ flexDirection: 'column' }}
            >
              {action.options.map((option, idx) => (
                <Radio key={idx} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
            <FormControl.HelperText>
              {action.description}
            </FormControl.HelperText>
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
    <FormControl isInvalid w="75%" maxW="300px">
      {actions.map((action, index) => renderField(action, index))}
    </FormControl>
  );
};

export default FormComponent;
