import React from 'react';

//INTERNAL IMPORT
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Style from './Slider.module.scss';
import Image from 'next/image';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const loaderImageSlider1 = () => {
  return 'https://img.seadn.io/files/37e2cbd2ea293e429d2bc9b5f2371571.png?auto=format&fit=max&w=750';
};

const loaderImageSlider2 = () => {
  return 'https://i.seadn.io/gae/Ph9rmCCAMp7mciaCF1Q9EkfdSDrkJZQaQ-xqB47bMXCeVG61mjT3nlk5SNHnpSUC5CM9KqkB-QlWQOxE3KBFI2Di_IyHtvwIwu-Cbg?auto=format&w=750';
};

const loaderImageSlider3 = () => {
  return 'https://i.seadn.io/gae/CTwQGGvYJCBqIycAbWSyRrcoXKWhKihzr6Mh5VCVNUCuCK-JcQgwg1RkZZKxFCbhb7HLms2ITleIOoEAdcy3-mjaCu1BGb7YCJyDws8?auto=format&w=750';
};

const loaderImageSlider4 = () => {
  return 'https://i.seadn.io/gae/XI-ymLP5F25VKTgkEH3QGLAdTfxtFNjY_1k7bYz7vPBRfxO90gjM0P1cbk-veItcf0kfHmBAo7aoThkYGeWziz579uoGF_BkR0ER6A?auto=format&w=1000';
};

const Slider = () => {
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
          <SwiperSlide>
            <div className={Style.slider_item}>
              <Image
                className={Style.slider_img}
                height={100}
                width={100}
                src="https://i.seadn.io/gae/a8T_eqh02zJDY0dag7bG8PrQyds…svbge0i2tqTNcmcZgd7yT7bfkHWHfQ?auto=format&w=3840"
                alt="slider-1"
                loader={loaderImageSlider1}
              />
              <div className={Style.slider_desc}>
                <h3>Origamasks</h3>
                <p>
                  Floor : <span>0,02</span> ETH
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={Style.slider_item}>
              <Image
                className={Style.slider_img}
                height={100}
                width={100}
                src="https://i.seadn.io/gae/a8T_eqh02zJDY0dag7bG8PrQyds…svbge0i2tqTNcmcZgd7yT7bfkHWHfQ?auto=format&w=3840"
                alt="slider-1"
                loader={loaderImageSlider2}
              />
              <div className={Style.slider_desc}>
                <h3>Origamasks</h3>
                <p>
                  Floor : <span>0,02</span> ETH
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={Style.slider_item}>
              <Image
                className={Style.slider_img}
                height={100}
                width={100}
                src="https://i.seadn.io/gae/a8T_eqh02zJDY0dag7bG8PrQyds…svbge0i2tqTNcmcZgd7yT7bfkHWHfQ?auto=format&w=3840"
                alt="slider-1"
                loader={loaderImageSlider3}
              />
              <div className={Style.slider_desc}>
                <h3>Origamasks</h3>
                <p>
                  Floor : <span>0,02</span> ETH
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={Style.slider_item}>
              <Image
                className={Style.slider_img}
                height={100}
                width={100}
                src="https://i.seadn.io/gae/a8T_eqh02zJDY0dag7bG8PrQyds…svbge0i2tqTNcmcZgd7yT7bfkHWHfQ?auto=format&w=3840"
                alt="slider-1"
                loader={loaderImageSlider4}
              />
              <div className={Style.slider_desc}>
                <h3>Origamasks</h3>
                <p>
                  Floor : <span>0,02</span> ETH
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={Style.slider_item}>
              <Image
                className={Style.slider_img}
                height={100}
                width={100}
                src="https://i.seadn.io/gae/a8T_eqh02zJDY0dag7bG8PrQyds…svbge0i2tqTNcmcZgd7yT7bfkHWHfQ?auto=format&w=3840"
                alt="slider-1"
                loader={loaderImageSlider1}
              />
              <div className={Style.slider_desc}>
                <h3>Origamasks</h3>
                <p>
                  Floor : <span>0,02</span> ETH
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
