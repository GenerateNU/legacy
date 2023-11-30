import axios from 'axios';
import { ISubTask } from '../interfaces/ISubTask';
import { ENDPOINT } from './const';


export const getAllSubTasks = async (taskID: string) => {
  const subtasks = await axios.get(`${ENDPOINT}/api/tasks/${taskID}/subtasks`)
      .then((res) => { return res.data; }).catch((err) => { console.log(err); });
  return subtasks;
}