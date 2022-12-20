import React, { useState } from 'react';

//INTERNAL IMPORT
import Style from './AuthorNFTCardBox.module.css';
import Item from '@/components/item/Item';
import CollectionCard from '@/components/CollectionCard/CollectionCard';

const AuthorNFTCardBox = ({
  collectionOwned,
  collectiables,
  created,
  itemsOwned,
  itemCreated,
  collections,
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
      {collectionOwned && (
        <div className={Style.AuthorNFTCardBox_box}>
          {collections.map((collection) => (
            <CollectionCard collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
