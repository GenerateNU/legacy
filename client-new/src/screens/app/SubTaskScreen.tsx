import { IAction, IActionList } from '@/interfaces/IAction';
import { getActions } from '@/services/SubTaskService';
import { ENDPOINT } from '@/services/const';
import FormComponent from '@/utils/Actions';
import { Text } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { useQuery } from 'react-query';

const SubTaskScreen = ({ subtask_id }) => {
  const [state, setState] = useState<IActionList>(null);
  // props should include a id field

  const { isLoading, error, data } = useQuery(
    ['fetchActions', subtask_id],
    () => getActions(subtask_id)
  );

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

  return <FormComponent actions={data.actions} />;
};

export default SubTaskScreen;
