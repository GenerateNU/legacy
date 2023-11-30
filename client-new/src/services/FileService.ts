import { IFile } from '@/interfaces/IFile';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';

export const fetchUserFilesList = async (userId: number, tag?: string) => {
  try {
    let response;
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`, {params: {tag: tag}});
    } else {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`);
    }
    
    return response.data as IFile[];
  } catch (error) {
    throw new Error('Error fetching user files list');
  }
};

export const fetchFileURL = async (fileId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/${fileId}`);
    return response.data as string;
  } catch (error) {
    throw new Error('Error fetching file URL');
  }
};