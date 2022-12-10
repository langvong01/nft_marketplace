import axiosClient from './axiosClient';

export const fetcherSWR = async (...args) => {
  const response = await axiosClient.get(`/${args[0]}`, {
    ...args[1],
  });
  const data = response.data;

  return data;
};
