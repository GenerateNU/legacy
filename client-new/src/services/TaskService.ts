import { ITask } from '@/interfaces/ITask';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchAllUserTasks = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`);
  return response.data as ITask[];
}