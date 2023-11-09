import React, { useState, useCallback } from 'react';
import { Input, FormControl, Select, TextArea, Checkbox, Radio } from "native-base";
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Button from '@mui/material/Button';
// import { TextareaAutosize } from '@mui/material';
// import { Input } from '@mui/material/';
// import jsPDF from 'jspdf';

const formData = {
  "actions": [
    {
      "action_type": "input",
      "label": "Full Legal Name",
      "placeholder": "Enter your full legal name",
      "name": "full_name",
      "type": "text",
      "required": true
    },
    {
      "action_type": "input",
      "label": "Date of Birth",
      "placeholder": "MM/DD/YYYY",
      "name": "date_of_birth",
      "type": "date",
      "required": true,
      "description": "Please enter your date of birth in the format: MM/DD/YYYY"
    },
    {
      "action_type": "input",
      "label": "Social Security Number",
      "placeholder": "Enter your social security number",
      "name": "ssn",
      "type": "text",
      "required": true,
      "description": "Please provide your 9-digit social security number"
    },
    {
      "action_type": "input",
      "label": "Current Address",
      "placeholder": "Enter your current address",
      "name": "current_address",
      "type": "text",
      "required": true,
      "description": "Please provide your complete current residential address"
    },
    {
      "action_type": "input",
      "label": "Phone Number",
      "placeholder": "Enter your phone number",
      "name": "phone_number",
      "type": "tel",
      "required": true,
      "description": "Please provide a valid phone number where you can be reached"
    },
    {
      "action_type": "input",
      "label": "Email Address",
      "placeholder": "Enter your email address",
      "name": "email",
      "type": "email",
      "required": true,
      "description": "Please provide a valid email address for communication purposes"
    },
    {
      "action_type": "select",
      "label": "Marital Status",
      "name": "marital_status",
      "options": ["Married", "Single", "Divorced", "Widowed"],
      "required": true,
      "placeholder": "Select your marital status",
      "description": "Please select your current marital status from the options provided"
    },
    {
      "action_type": "textarea",
      "label": "Additional Comments",
      "placeholder": "Enter any additional comments",
      "name": "additional_comments",
      "required": false,
      "description": "Feel free to provide any additional information or comments here",
    },
    {
      "action_type": "checkbox",
      "label": "Select Services",
      "name": "services",
      "options": ["Service 1", "Service 2", "Service 3"],
      "required": true,
      "description": "Select the services you require"
    },
    {
      "action_type": "radio",
      "label": "Select Payment Method",
      "name": "payment_method",
      "options": ["Credit Card", "Debit Card", "Cash", "Check"],
      "required": true,
      "description": "Select your preferred method of payment"

    }
  ]
};  


const FormComponent = () => {
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
    const newValues = [...(formState[name] || []), ""]; // Initialize as an array
    setFormState((prevState) => ({ ...prevState, [name]: newValues }));
  };

  // TODO: Doesnt work correctly
  const handleRadioChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
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
      }, {}),
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
    console.log('Form submitted:', { "metadata": { "timestamp": new Date(), } , "form": formState });
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
              <FormControl.HelperText>{action.description}</FormControl.HelperText>
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
            <FormControl.HelperText>{action.description}</FormControl.HelperText>
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
              <FormControl.HelperText>{action.description}</FormControl.HelperText>
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
              <FormControl.HelperText>{action.description}</FormControl.HelperText>
            </>
          );
      default:
        return null;
    }
  };
  console.log('Form submitted:', { "metadata": { "timestamp": new Date(), } , "form": formState });

  return (
    // <FormControl key={index} fullWidth margin="normal"></FormControl>
    <FormControl isInvalid w="75%" maxW="300px">
      {formData.actions.map((action, index) => renderField(action, index))}
      {/* <Button type="submit" variant="contained" color="primary">
        Submit
      </Button> */}
    </FormControl>
  );
};

export default FormComponent;

{/* <FormControl isInvalid w="75%" maxW="300px">
        <FormControl.Label>Password</FormControl.Label>
        <Input placeholder="Enter password" />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Try different from previous passwords.
        </FormControl.ErrorMessage>
      </FormControl> */}

{/* const Example = () => {
  return <Box alignItems="center">
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" defaultValue="12345" placeholder="password" />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>
    </Box>; */}