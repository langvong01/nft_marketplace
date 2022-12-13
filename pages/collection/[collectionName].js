import React from 'react';

//INTRNAL IMPORT
import Style from '../../styles/searchPage.module.css';
import SearchIcon from '@mui/icons-material/Search';

import images from '../../img';
import Banner from '@/components/banner/Banner';
import DesciptionCollection from '@/components/collections/DesciptionCollection';
import ListItem from '@/components/collections/ListItem';
import { getItemsInCollectionName } from 'services/itemService';

const ListItemInCollection = ({ items }) => {
  return (
    <div className={Style.searchPage}>
      <Banner collection={items[0].collection} />
      <DesciptionCollection
        collection={items[0].collection}
      ></DesciptionCollection>
      <div className="search-items w-[95%] mx-auto my-4 flex items-center">
        <div className="w-[50%] flex items-center border-2 border-slate-200  cursor-pointer rounded-lg overflow-hidden">
          <span className="w-[50px] ">
            <SearchIcon className="w-full"></SearchIcon>
          </span>
          <input
            type="text"
            placeholder="Search by name item"
            className=" w-full h-full bg-none px-4 py-3"
            name="name"
            id="name"
          />
        </div>
        <select
          name="type"
          id="type"
          className="border-2 border-slate-200 rounded-lg ml-5 px-4 py-3 cursor-pointer"
        >
          <option value="DESC">Price low to high</option>
          <option value="ASC">Price high to low</option>
          <option value="created_at">Recently created</option>
          <option value="listed_at">Recently created</option>
        </select>

        <button className="font-bold px-4 py-3 bg-blue-500 rounded-lg text-white ml-5 hover:opacity-95">
          Search
        </button>
      </div>

      <ListItem items={items}></ListItem>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { collectionName } = context.query;
  const data = await getItemsInCollectionName(collectionName);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      items: data,
    },
  };
}

export default ListItemInCollection;
