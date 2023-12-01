import axios from 'axios';
import { API_BASE_URL } from './const';

export const createFile = async (uid: number, data: Blob) => {

  const formData = new FormData();
  formData.append('file_data', data, `${uid}-subtask_name.pdf`);

  try {
    const res = await axios.post(`${API_BASE_URL}/files/${uid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', res.data);
  } catch (error) {
    console.log('Error:', error);
  }

  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/files/${uid}`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
};