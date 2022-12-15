import React, { useEffect, useRef, useState, useCallback } from 'react';
import Style from './Cart.module.css';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { MdWarning, MdClose } from 'react-icons/md';

import useOnClickOutside from '../../hook/useClickOutSide';
import {
  modalCartState,
  modalNotifyMetaMaskState,
  modalPaymentState,
} from '../../global-state/modal';
import CartDetails from './cart-details/CartDetails';
import { cartState } from 'global-state/cart';
import { connectMetaMaskState } from 'global-state/connect-metamask';

const Cart = () => {
  const [openCart, setOpenCart] = useRecoilState(modalCartState);
  const [account, setAccount] = useRecoilState(connectMetaMaskState);
  const [cart, setCart] = useRecoilState(cartState);
  const [modalNotifyMetaMask, setModalNotifyMetaMask] = useRecoilState(
    modalNotifyMetaMaskState
  );
  const [modalPayment, setModalPayment] = useRecoilState(modalPaymentState);

  const refCart = useRef();

  const handleCloseModalCart = () => {
    setOpenCart((prev) => {
      return { ...prev, open: false };
    });
  };

  useOnClickOutside(refCart, handleCloseModalCart);

  const handlePayment = () => {
    if (!account.isLogin) {
      setModalNotifyMetaMask((prev) => {
        return { ...prev, open: true };
      });
    } else {
      setModalPayment((prev) => {
        return { ...prev, open: true };
      });

      setOpenCart((prev) => {
        return { ...prev, open: false };
      });

      // gọi api thanh toán bằng metamask
    }
  };

  return (
    <>
      <motion.div
        className={Style.cart}
        ref={refCart}
        initial={{ x: '107%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        exit={{ x: '107%', opacity: 0 }}
      >
        <div className={Style.cart_header}>
          <div className={Style.cart_header_text}>
            <span>Your cart</span>
            <span>
              <MdWarning></MdWarning>
            </span>
          </div>
          <div
            className={Style.cart_header_close}
            onClick={handleCloseModalCart}
          >
            <span>
              <MdClose></MdClose>
            </span>
          </div>
        </div>

        <hr className={Style.line} color="#eee" />
        {cart.items.length > 0 ? (
          <>
            <div className={Style.cart_content}>
              <CartDetails></CartDetails>
            </div>

            <div className={Style.cart_btn}>
              <button className={Style.cart_btn_submit} onClick={handlePayment}>
                Payment
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full px-3 flex justify-center items-center">
            <p className="text-2xl -translate-y-12">
              You need add item in cart
            </p>
          </div>
        )}
        {/* cart-details-content */}
      </motion.div>
    </>
  );
};

const CartDetailsEmpty = () => {
  return <p className={Style.cart_content_empty}>Add items to get started</p>;
};

export default Cart;
