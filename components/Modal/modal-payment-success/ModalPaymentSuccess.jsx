import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useOnClickOutside from 'hook/useClickOutSide';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalPaymentStateSuccess } from '../../../global-state/modal';
import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import { MdClose } from 'react-icons/md';
import { cartState } from '../../../global-state/cart';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const ModalPaymentSuccess = () => {
  const router = useRouter();
  const [account, setAccount] = useRecoilState(connectMetaMaskState);
  const [modalPayment, setModalPayment] = useRecoilState(
    modalPaymentStateSuccess
  );
  const [cart, setCart] = useRecoilState(cartState);

  const refModalPaymentSuccess = useRef();

  const handleCloseModal = () => {
    setModalPayment((prev) => {
      return { ...prev, open: false };
    });
  };

  useOnClickOutside(refModalPaymentSuccess, handleCloseModal);
  const resetCart = useResetRecoilState(cartState);

  return (
    <>
      <motion.div
        className="modal-payment-container w-[600px]  bg-white rounded-lg  absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 py-3"
        ref={refModalPaymentSuccess}
      >
        <div className="modal-payment-header w-full px-3 flex items-center justify-between">
          <p className="text-center flex-1 text-2xl">Payment Success</p>
          <button
            className="text-2xl hover:opacity-85 text-inherit"
            onClick={handleCloseModal}
          >
            <MdClose></MdClose>
          </button>
        </div>

        <div className="line w-full h-[2px] bg-gray-100 my-2"></div>

        <div className="modal-payment-content  max-h-[400px] px-4 mt-4 overflow-auto">
          {cart.items.map((item) => (
            <>
              <div className="modal-payment-item flex justify-between mb-3">
                <img
                  src={item.mediaFileUrl}
                  alt=""
                  key={uuidv4()}
                  className="object-cover w-[100px] h-[60px] rounded-md"
                />

                <div className="flex-1 ml-4">
                  <p>
                    1 <span className="ml-1">item</span>
                  </p>

                  <p>
                    Chain : <span className="ml-1">MATIC</span>
                  </p>
                </div>

                <div>
                  <p>
                    {item.price} <span>Matic</span>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="line w-full h-[2px] bg-gray-100 my-2"></div>

        <div className="px-4 mt-3 flex justify-center items-center">
          <button
            className="text-base font-bold py-3 px-4 text-white rounded-lg w-full bg-blue-500"
            onClick={() => {
              setModalPayment((prev) => {
                return { ...prev, open: false };
              });
              resetCart();
              router.push(`/account/${account.accountCurrent}`);
            }}
          >
            PREVIEW
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ModalPaymentSuccess;
