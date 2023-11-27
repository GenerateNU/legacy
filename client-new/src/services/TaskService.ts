import { ITask } from '@/interfaces/ITask';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';

export const fetchAllUserTasks = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`);
  return response.data as ITask[];
}