import axios from 'axios';
import { ISubTask } from '../interfaces/ISubTask';
import { API_BASE_URL } from './const';


export const getAllSubTasks = async (taskID: number) => {
  const subtasks = await axios.get(`${API_BASE_URL}/tasks/${taskID}/subtasks`)
      .then((res) => { return res.data; }).catch((err) => { console.log(err); });
  return subtasks;
}