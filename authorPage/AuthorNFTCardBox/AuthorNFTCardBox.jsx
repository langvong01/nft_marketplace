import React, { useState } from 'react';

//INTERNAL IMPORT
import Style from './AuthorNFTCardBox.module.css';
import images from '../../img';
import ListItem from '@/components/collections/ListItem';

const AuthorNFTCardBox = ({
  collectiables,
  created,
  itemsOwned,
  itemCreated,
}) => {
  return (
    <div className={Style.AuthorNFTCardBox}>
      <div className={Style.AuthorNFTCardBox_box}>
        {collectiables && <ListItem items={itemsOwned} />}
        {created && <ListItem items={itemCreated} />}
      </div>
    </div>
  );
};

export default AuthorNFTCardBox;
