import axios from 'axios';

import { IGuide } from '@/interfaces/IGuide';
import { sleep } from '@/utils/MockDelayUtil';
import { API_BASE_URL } from '@/services/const';

export const fetchAllGuides = async () => {
  await sleep(1000)  // Simulate network delay
  const response = await axios.get(`${API_BASE_URL}/guides/`);
  return response.data as IGuide[];
}

export const fetchGuideByName = async (name: string) => {
  await sleep(10000) // Simulate network delay
  const response = await axios.get(`${API_BASE_URL}/guides/${name}`);
  return response.data as IGuide;
}
