import axiosClient from 'utils/axiosClient';

export const getTopTenCollectionLatest = async (order = 'DESC') => {
  const response = await axiosClient.post('/collection/filter', {
    sort_by: ['total_value', 'created_at'],
    order: [`${order}`],
    page: 1,
    size: 10,
  });

  return await response.data.body.content;
};
