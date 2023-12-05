import { IAction, IActionList } from '@/interfaces/IAction';
import { API_BASE_URL } from '@/services/const';
import axios from 'axios';

export const getActions = async (subtask_id: number) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/subtasks/${subtask_id}/actions`
    );
    return JSON.parse(res.data);
  } catch (error) {
    console.log('Error fetching actions', error);
    throw new Error('Error fetching actions');
  }
};
