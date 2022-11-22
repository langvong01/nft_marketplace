import React from 'react';
import Style from './CartItem.module.css';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';

const myLoader = () => {
  return `https://img.seadn.io/files/be307be33e6f9f835ec31b300bbcfd36.png?fit=max&w=1000`;
};

const CartItem = () => {
  return (
    <>
      <div className={Style.cart_details_item}>
        <div className={Style.cart_img_container}>
          <Image
            src="https://img.seadn.io/files/be307be33e6f9f835ec31b300bbcfd36.png?fit=max&w=1000"
            className={Style.cart_img}
            loader={myLoader}
            height={75}
            width={75}
          ></Image>
        </div>

        <div className={Style.cart_content_container}>
          <p className={Style.cart_item_id}>2380</p>
          <p className={Style.cart_item_author}>Adam Bomb Squad</p>
          <p className={Style.cart_item_voucher}>
            Creator fee : <span>4%</span>
          </p>
        </div>

        <div className={Style.cart_price_container}>
          <button className={Style.cart_btn_delete}>
            <MdDelete></MdDelete>
          </button>
          <p className={Style.cart_item_price}>
            0,49 <span>ETH</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
