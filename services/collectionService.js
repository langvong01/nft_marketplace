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



export const getAllCollectionInCategory = async (id) => {
  const response = await axiosClient.post('/collection/filter', {
    category: { category_id: id },
    sort_by: ['total_value', 'created_at'],
    order: ['DESC'],
    page: 1,
    size: 1000,
  });

  return await response.data?.body.content;
};

export const getDetailCollectionByName = async (name) => {
  const response = await axiosClient.post('/collection/filter', {
    collection_name_like: name,
    sort_by: ['total_value', 'created_at'],
    order: ['DESC'],
    page: 1,
    size: 1000,
  });

  return await response.data?.body.content;
};
