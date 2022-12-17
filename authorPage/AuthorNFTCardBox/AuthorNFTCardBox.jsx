import React, { useState } from 'react';

//INTERNAL IMPORT
import Style from './AuthorNFTCardBox.module.css';
import images from '../../img';
import ListItem from '@/components/collections/ListItem';
import Item from '@/components/item/Item';
const AuthorNFTCardBox = ({
  collectiables,
  created,
  itemsOwned,
  itemCreated,
}) => {
  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && (
        <div className={Style.AuthorNFTCardBox_box}>
          {itemsOwned.map((item) => (
            <Item item={item} key={item.itemId} />
          ))}
        </div>
      )}
      {created && (
        <div className={Style.AuthorNFTCardBox_box}>
          {itemCreated.map((item) => (
            <Item item={item} key={item.itemId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
