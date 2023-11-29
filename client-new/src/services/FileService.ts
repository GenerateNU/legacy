import { IFile } from '@/interfaces/IFile';
import axios from 'axios';
import { API_BASE_URL } from '@/services/const';

export const fetchUserFilesList = async (userId: number, tag?: string) => {
  let response;
  if (tag) {
    response = await axios.get(`${API_BASE_URL}/files/${userId}/user`, {params: {tag: tag}});
  } else {
    response = await axios.get(`${API_BASE_URL}/files/${userId}/user`);
  }
  
  return response.data as IFile[];
  // return response.status === 200 ? response.data : [];
};

export const fetchFileURL = async (fileId: number) => {
  const response = await axios.get(`${API_BASE_URL}/files/${fileId}`);
  return response.data as string;
};