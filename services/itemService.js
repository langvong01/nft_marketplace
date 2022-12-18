import axiosClient from 'utils/axiosClient';

export const getTopTenItem = async (order = 'DESC') => {
  const response = await axiosClient.post('/item/filter', {
    sort_by: ['price'],
    order: [`${order}`],
    page: 1,
    size: 10,
  });

  const data = await response.data.body.content;
  const items = data.filter((item) => {
    if (item.price) {
      return item;
    }
  });
  return items;
};

export const getItemDetails = async (itemId, isLogin = false) => {
  try {
    if (!itemId) return;

    let respone;

    if (isLogin) {
      respone = await axiosClient.get(`/item/auth/${itemId}`);
    } else {
      respone = await axiosClient.get(`/item/${itemId}`);
    }

    return respone.data.body;
  } catch (error) {}
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

export const getItemBySort = async (
  name,
  order = '',
  sortBy = 'price',
  nameCollection = null
) => {
  const response = await axiosClient.post('/item/filter', {
    item_name_like: `%${name}%`,
    collection: { collection_name_like: nameCollection },
    sort_by: [sortBy],
    order: [order],
    page: 1,
    size: 10000,
  });

  return await response.data?.body?.content;
};

export const getAllItems = async () => {
  const response = await axiosClient.post('/item/filter', {
    sort_by: ['price'],
    order: ['DESC'],
    page: 1,
    size: 100000,
  });

  return await response.data?.body.content;
};
