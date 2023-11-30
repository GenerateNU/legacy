import { ITask } from '@/interfaces/ITask';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';

export const fetchUserTasks = async (userId: number, tag?: string[]) => {
  try {
    let response;
    const splitTag = tag?.join(',');
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`, {params: {tag: splitTag}});
    } else {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`);
    }
    
    return response.data as ITask[];
  } catch (error) {
    console.log('Error fetching user tasks', error, 'userId', userId, 'tag', tag);
    throw new Error('Error fetching user tasks');
  }
};

export const fetchTaskTag = async (taskId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/tag`);
    return response.data as string;
  } catch (error) {
    console.log('Error fetching task tag', error);
    throw new Error('Error fetching task tag');
  }
}
