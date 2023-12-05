import { IFile } from '@/interfaces/IFile';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';
import axios from 'axios';

export const fetchUserFilesList = async (userId: number, tag?: string[]) => {
  try {
    let response;
    const splitTag = tag?.join(',');
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`, {
        params: { tag: splitTag }
      });
    } else {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`);
    }

    return response.data as IFile[];
  } catch (error) {
    console.log('Error fetching user files list', error);
    throw new Error('Error fetching user files list');
  }
};

export const fetchFileURL = async (fileId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/${fileId}`);
    return response.data as string;
  } catch (error) {
    console.log('Error fetching file URL', error);
    throw new Error('Error fetching file URL');
  }
};
