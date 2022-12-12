import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './Banner.module.scss';

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={`${Style.banner_img} relative`}>
        <Image
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={2000}
          height={450}
        />

        <div className="banner-sub p-2 bg-white rounded-md absolute w-[200px] h-[200px] -translate-y-2/4 translate-x-[40px] shadow-md">
          <Image
            src={bannerImage}
            objectFit="cover"
            alt="background"
            width={200}
            height={200}
            className="object-cover w-full rounded-md"
          />
        </div>
      </div>

      <div className={Style.banner_img_mobile}>
        <Image
          src={bannerImage}
          objectFit="cover"
          alt="background"
          width={1600}
          height={900}
        />
      </div>
    </div>
  );
};

export default Banner;
