import axios from 'axios';
import { IAction, IActionList } from '@/interfaces/IAction';
import { ENDPOINT } from './const';

export const getActions = async (subtask_id: number) => {
  try {
    const res = await axios.get(
      `${ENDPOINT}/api/subtasks/${subtask_id}/actions`
    );
    return JSON.parse(res.data);
  } catch (error) {
    throw new Error(error);
  }
};
