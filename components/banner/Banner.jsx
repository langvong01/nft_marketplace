import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './Banner.module.scss';

const Banner = ({ bannerImage, collection = null }) => {
  return (
    <div className={Style.banner}>
      <div className={`${Style.banner_img} relative`}>
        <img
          src={bannerImage || collection?.bannerImage}
          alt="background"
          className="w-full object-cover h-[300px]"
        />

        <div className="banner-sub p-2 bg-white rounded-md absolute w-[150px] h-[150px] -translate-y-2/4 translate-x-[40px] shadow-md overflow-hidden">
          <img
            src={bannerImage || collection?.logoImage}
            alt="background"
            className="object-cover w-full rounded-md h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
