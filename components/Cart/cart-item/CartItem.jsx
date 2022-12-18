import React from 'react';
import Style from './CartItem.module.css';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { cartState } from 'global-state/cart';
import { useRouter } from 'next/router';

const CartItem = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const router = useRouter();

  const handleRemoveCart = (e, itemInCart) => {
    e.stopPropagation();
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
      <div
        className={Style.cart_details_item}
        onClick={() => router.push(`/NFT-details/${item.itemId}`)}
      >
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
        </div>

        <div className={Style.cart_price_container}>
          <button
            className={Style.cart_btn_delete}
            onClick={(e) => handleRemoveCart(e, item)}
            type="button"
          >
            <MdDelete></MdDelete>
          </button>
          <p className={Style.cart_item_price}>
            {item.price} <span>Matic</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
