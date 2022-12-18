import React, { useMemo } from 'react';

//INTERNAL IMPORT
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Style from './Slider.module.scss';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { vs as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const Slider = ({ cols }) => {
  const router = useRouter();

  return (
    <>
      <div className={Style.slider_container}>
        <p className={Style.slider_header}>Explore, collect, and sell NFTs</p>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={4}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          navigation={true}
        >
          {cols.map((col, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${Style.slider_item} overflow-hidden rounded-lg w-full h-[400px transition-all`}
                onClick={() => router.push(`/collection/${col.collectionName}`)}
              >
                <img
                  className="h-full w-full object-cover rounded-lg hover:scale-105"
                  src={col.featuredImage}
                  alt="slider-1"
                />
                <div
                  className={`absolute bottom-0 -translate-x-3 bg-black py-2 bg-opacity-50 w-[110%] text-center`}
                >
                  <h3 className="capitalize -translate-x-3 p-2">
                    {col.collectionName}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
