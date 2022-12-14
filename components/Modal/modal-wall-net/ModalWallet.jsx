import React, { useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';

import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import Style from './ModalWallet.module.scss';
import useOnClickOutside from '../../../hook/useClickOutSide';
import { modalNotifyMetaMaskState } from '../../../global-state/modal';

const ModalWallet = () => {
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [isOpenModalMetaMask, setIsOpenModalMetaMask] = useRecoilState(
    modalNotifyMetaMaskState
  );

  const refPayment = useRef();

  useOnClickOutside(refPayment, () => {
    setIsOpenModalMetaMask((prev) => {
      return { ...prev, open: false };
    });
  });

  return (
    <>
      <motion.div
        className={Style.modal_wallet_container}
        initial={{ x: '107%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        exit={{ x: '107%', opacity: 0 }}
        ref={refPayment}
      >
        <div className={Style.modal_wallet_header}>
          <div className={Style.modal_wallet_info}>
            <span>
              <FaUser></FaUser>
            </span>
            <p>My wallet</p>
          </div>

          <div className={Style.modal_wallet_token}>
            <p>{metaMask.accountCurrent}</p>
          </div>
        </div>

        <hr className={Style.line} color="#eee" />

        <div className={Style.modal_wallet_payment}>
          <div className={Style.modal_wallet_total}>
            <p>Total balance</p>
            <p>
              <span>$</span>
              {metaMask.accountBalance}
              <span>USD</span>
            </p>
          </div>
          <button className={Style.modal_wallet_btn_fund}>add funds</button>
        </div>
      </motion.div>
    </>
  );
};

export default ModalWallet;
