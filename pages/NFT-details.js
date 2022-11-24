import Brand from '@/components/brand/Brand';
import Category from '@/components/category/Category';
import React from 'react';

//INTERNAL IMPORT

import NFTDetailsPage from '../nft-details-page/NFTDetailsPage';
const NFTDetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
