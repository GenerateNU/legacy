import { IAction, IActionList } from '@/interfaces/IAction';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';

export const getActions = async (subtask_id: number) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/api/subtasks/${subtask_id}/actions`
    );
    return JSON.parse(res.data);
  } catch (error) {
    console.log('Error fetching actions', error);
    throw new Error('Error fetching actions');
  }
};
