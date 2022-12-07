// import Category from '@/components/category/Category';

import Category from '@/components/follower-tab/Category';
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

      <Category />
      <Question></Question>
    </div>
  );
};

export default Home;
