import React, { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';

import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import Style from './ModalWallet.module.scss';
import useOnClickOutside from '../../../hook/useClickOutSide';
import { modalNotifyMetaMaskState } from '../../../global-state/modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlipToFrontSharpIcon from '@mui/icons-material/FlipToFrontSharp';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';

const ModalWallet = () => {
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [isOpenModalMetaMask, setIsOpenModalMetaMask] = useRecoilState(
    modalNotifyMetaMaskState
  );
  const [copyState, setCoppyState] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: null,
  });
  const refPayment = useRef();

  useOnClickOutside(refPayment, () => {
    setIsOpenModalMetaMask((prev) => {
      return { ...prev, open: false };
    });
  });

  const handleCoppy = () => {
    setCoppyState(true);
    setToast((prev) => {
      return { ...prev, open: true, message: 'Copied' };
    });
  };
  return (
    <>
      <motion.div
        className={Style.modal_wallet_container}
        initial={{ x: '107%', opacity: 0 }}
        animate={{ x: '0', opacity: 1 }}
        exit={{ x: '107%', opacity: 0 }}
        ref={refPayment}
      >
        <div className={`${Style.modal_wallet_header} flex items-center mb-2`}>
          <div className={Style.modal_wallet_info}>
            <span>
              <FaUser></FaUser>
            </span>
            <p className="m-0">My wallet</p>
          </div>

          <div className={`${Style.modal_wallet_token} flex items-center`}>
            <p className="relative mr-1">
              {metaMask.accountCurrent.substring(-1, 10)}
            </p>
            <CopyToClipboard
              text={metaMask.accountCurrent}
              onCopy={handleCoppy}
              className="flex"
            >
              <Tooltip title="copy">
                <IconButton>
                  <FlipToFrontSharpIcon></FlipToFrontSharpIcon>
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
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

      <SnackBarSuccess
        open={toast.open}
        vertical={toast.vertical}
        horizontal={toast.horizontal}
        message={toast.message}
        setToast={setToast}
      ></SnackBarSuccess>
    </>
  );
};

export default ModalWallet;
