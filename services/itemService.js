import axiosClient from 'utils/axiosClient';

export const getTopTenItemLatest = async (order = 'DESC') => {
  const response = await axiosClient.post('/item/filter', {
    sort_by: ['listed_at', 'created_at'],
    order: [`${order}`],
    page: 1,
    size: 10,
  });

  return await response.data.body.content;
};

export const getItemsInCollectionName = async (nameCollection = null) => {
  const response = await axiosClient.post('/item/filter', {
    collection: { collection_name_like: nameCollection },

    sort_by: ['listed_at', 'created_at'],
    order: ['DESC'],
    page: 1,
    size: 1000,
  });

  return await response.data?.body?.content;
};
