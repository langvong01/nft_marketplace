import React, { useCallback, useState } from 'react';
import Style from './CartDetails.module.css';
import CartItem from '../cart-item/CartItem';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { cartState } from 'global-state/cart';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';

const CartDetails = () => {
  const [openSender, setOpenSender] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);

  const totalPrice = useMemo(() => {
    let sum = 0;
    cart.items.forEach((item) => {
      sum += item.price;
    });
    return sum;
  }, [cart.items]);

  const handleClearAllInCart = () => {
    setCart((prev) => {
      return { ...prev, idItemSelected: [], items: [] };
    });
  };
  return (
    <>
      <div className={Style.cart_details_container}>
        {/* header */}
        <div className={Style.cart_details_header}>
          <p>
            <span>{cart?.items.length}</span>item
          </p>
          <button onClick={handleClearAllInCart}>Clear all</button>
        </div>
        {/* item */}

        {/* center */}
        <form
          action="
      "
          className={Style.cart_form}
        >
          <ul>
            {/* cart-item */}
            {cart.items.map((item) => (
              <CartItem key={uuidv4()} item={item}></CartItem>
            ))}
          </ul>
        </form>

        <hr className="line" color="#eee" />

        {/* bottom */}
        <div className={Style.cart_details_payment}>
          <div className={Style.cart_details_payment_header}>
            <p>Payment method</p>
            <p>Crypto</p>
          </div>

          <div className={Style.cart_details_payment_total}>
            <p>Total price</p>
            <p>
              {totalPrice} <span>Matic</span>
            </p>
          </div>
          <div className={Style.cart_details_payment_sender}>
            <div
              className={Style.cart_details_payment_sender_message}
              onClick={() => setOpenSender(!openSender)}
            >
              <p>Send to a different wallet</p>
              {openSender ? (
                <p>
                  <MdKeyboardArrowDown></MdKeyboardArrowDown>
                </p>
              ) : (
                <p>
                  <MdKeyboardArrowUp></MdKeyboardArrowUp>
                </p>
              )}
            </div>
            {openSender ? (
              <div className={Style.cart_details_payment_sender_input}>
                <input
                  type="text"
                  placeholder="e.g. 0x1ed3... or destination.eth, destination.lens"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
