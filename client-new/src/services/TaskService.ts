import { ITask } from '@/interfaces/ITask';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';

export const fetchUserTasks = async (userId: number, tag?: string) => {
  try {
    let response;
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`, {params: {tag: tag}});
    } else {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`);
    }
    
    return response.data as ITask[];
  } catch (error) {
    throw new Error('Error fetching user tasks');
  }
};

export const fetchTaskTag = async (taskId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/tag`);
    return response.data as string;
  } catch (error) {
    throw new Error('Error fetching task tag');
  }
}
