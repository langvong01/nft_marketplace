import AudioLive from '@/components/audio-live/AudioLive';
import BigNFTSilder from '@/components/big-nft-silder/BigNFTSilder';
import Brand from '@/components/brand/Brand';
import Category from '@/components/category/Category';
import Collection from '@/components/collection/Collection';
import Filter from '@/components/filter/Filter';
import FollowerTab from '@/components/follower-tab/FollowerTab';
import NFTCard from '@/components/nft-card/NFTCard';
import Service from '@/components/service/Service';
import Slider from '@/components/slider/Slider';
import Subscribe from '@/components/subscribe/Subscribe';
import Title from '@/components/title/Title';
import Video from '@/components/video/Video';
import React, { useEffect } from 'react';

//INTERNAL IMPORT
import Style from '../styles/index.module.css';

const Home = () => {
  useEffect(() => {
    document.title = 'NFT';
  }, []);

  return (
    <div className={Style.homePage}>
      <Slider></Slider>
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      <FollowerTab />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
