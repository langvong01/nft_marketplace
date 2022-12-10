import axiosClient from './axiosClient';

export const fetcherSWR = async (...args) => {
  const response = await axiosClient.get(`/${args[0]}`);
  const data = response.data;

  return data;
};
