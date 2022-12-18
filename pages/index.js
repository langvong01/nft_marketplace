// import Category from '@/components/category/Category';

import Collections from '@/components/collections/Collections';
import Category from '@/components/category/Category';
import Question from '@/components/questions/Question';
import Slider from '@/components/slider/Slider';

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
      <Collections></Collections>
      <Category />
      <Question></Question>
    </div>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const collectionSlider = await getTopTenCollectionLatest();

  return {
    props: {
      collectionSlider: collectionSlider,
    },
  };
}

export default Home;
