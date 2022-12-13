import React from 'react';
import Style from './CartItem.module.css';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { cartState } from 'global-state/cart';

const CartItem = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const handleRemoveCart = (itemInCart) => {
    setCart((prev) => {
      let newArrayId = [
        ...new Set([...prev.idItemSelected, itemInCart.itemId]),
      ];

      //delete id
      newArrayId = newArrayId.filter((id) => {
        return id !== itemInCart.itemId;
      });

      const newArrayItem = prev.items.filter((itemMap) => {
        return itemInCart.itemId !== itemMap.itemId;
      });

      return { ...prev, idItemSelected: newArrayId, items: newArrayItem };
    });
  };

  return (
    <>
      <div className={Style.cart_details_item}>
        <div className={Style.cart_img_container}>
          <Image
            src={item.mediaFileUrl}
            className={Style.cart_img}
            unoptimized={true} // <=== insert this prop
            height={75}
            width={75}
          ></Image>
        </div>

        <div className={Style.cart_content_container}>
          <p className={Style.cart_item_id}>{item.itemId}</p>
          <p className={Style.cart_item_author}>{item.itemName}</p>
          <p className={Style.cart_item_voucher}>
            Creator fee : <span>4%</span>
          </p>
        </div>

        <div className={Style.cart_price_container}>
          <button
            className={Style.cart_btn_delete}
            onClick={() => handleRemoveCart(item)}
            type="button"
          >
            <MdDelete></MdDelete>
          </button>
          <p className={Style.cart_item_price}>
            {item.price} <span>ETH</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
