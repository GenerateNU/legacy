import axios from 'axios';
import { ENDPOINT } from './const';

export const createFile = async (uid: string, data: Blob) => {

  const formData = new FormData();
  formData.append('file_data', data, `${uid}-subtask_name.pdf`);

  try {
    const res = await axios.post(`${ENDPOINT}/api/files/${uid}`, formData, {
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
      `${ENDPOINT}/api/files/${uid}`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
};