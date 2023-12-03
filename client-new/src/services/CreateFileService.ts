import axios from 'axios';
import { API_BASE_URL } from './const';

export const createFile = async (uid: number, sub_task_name: string, data: object) => {

  try {
    const res = await axios.post(`${API_BASE_URL}/files/makepdf/${uid}/${sub_task_name}`, data);

    console.log('Response:', res.data);
  } catch (error) {
    console.log('Error:', error);
  }

};