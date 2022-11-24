import React from 'react';

//INTERNAL IMPORT
import Style from '../styles/collection.module.css';
import images from '../img';

import Filter from '../components/Filter/Filter';
import Banner from 'collectionPage/Banner/Banner';
import NFTCardTwo from 'collectionPage/NFTCardTwo/NFTCardTwo';
import Slider from '@/components/slider/Slider';
import Brand from '@/components/brand/Brand';
import CollectionProfile from 'collectionPage/collectionProfile/collectionProfile';

const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
