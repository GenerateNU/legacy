import axios from 'axios';

import { ISubTask } from '../interfaces/ISubTask';
import { API_BASE_URL } from './const';
import { sleep } from '@/utils/MockDelayUtil';

export const getAllSubTasks = async (taskID: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskID}/subtasks`);
    return response.data as ISubTask[];
  } catch (error) {
    console.log('Error fetching subtasks', error);
    throw new Error('Error fetching subtasks');
  }
}
