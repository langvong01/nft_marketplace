import React, { useState } from 'react';
import Style from './CartDetails.module.css';
import CartItem from '../cart-item/CartItem';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const CartDetails = () => {
  const [openSender, setOpenSender] = useState(false);

  return (
    <>
      <div className={Style.cart_details_container}>
        {/* header */}
        <div className={Style.cart_details_header}>
          <p>
            <span>1</span>item
          </p>
          <button>Clear all</button>
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
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
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
              0.458 <span>ETH</span>
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
