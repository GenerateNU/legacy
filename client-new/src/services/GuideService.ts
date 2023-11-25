import axios from 'axios';

import { IGuide } from '@/interfaces/IGuide';
import { sleep } from '@/utils/MockDelayUtil';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchAllGuides = async () => {
  await sleep(1000) 
  const response = await axios.get(`${API_BASE_URL}/guides/`);
  return response.data as IGuide[];
}

export const fetchGuideByName = async (name: string) => {
  await sleep(10000)
  const response = await axios.get(`${API_BASE_URL}/guides/${name}`);
  return response.data as IGuide;
}
