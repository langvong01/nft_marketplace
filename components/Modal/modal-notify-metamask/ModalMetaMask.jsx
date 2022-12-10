import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { MdClose } from 'react-icons/md';

import { modalNotifyMetaMask } from '../../../global-state/modal';
import useOnClickOutside from '../../../hook/useClickOutSide';
import Style from './ModalMetaMask.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import images from '../../../img';
import Loading from '../../loading/Loading';
import { connectMetaMaskService } from '../../../services/metaService';

const ModalMetaMask = () => {
  const [isOpenModalMetaMask, setIsOpenModalMetaMask] =
    useRecoilState(modalNotifyMetaMask);
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [loading, setLoading] = useState(false);

  const refModal = useRef();

  const handleCloseModal = () => {
    setLoading(false);
    setIsOpenModalMetaMask((prev) => {
      return { ...prev, open: false };
    });
  };

  useOnClickOutside(refModal, handleCloseModal);

  const handleConectMetaMask = async () => {
    setLoading(true);

    const response = await connectMetaMaskService();

    setMetaMask((prev) => {
      return { ...prev, ...response };
    });

    handleCloseModal();
  };

  return (
    <>
      <motion.div className={Style.modal_metamask_container} ref={refModal}>
        <div className={Style.modal_metamask_header}>
          <p>Connect your wallet</p>
          <button onClick={handleCloseModal}>
            <MdClose></MdClose>
          </button>
        </div>
        <p className={Style.modal_metamask_text}>
          If you don't have a wallet, you can select a provider and create one
          now.<span> Learn more</span>
        </p>
        <hr className={Style.line} color="#eee" />

        <ul className={Style.modal_list_meta}>
          <li className={Style.modal_meta_item} onClick={handleConectMetaMask}>
            {window.ethereum ? (
              <div>
                <Image
                  src={images.provider1}
                  alt={images.provider1}
                  width={30}
                  height={30}
                />
                <p>MetaMask</p>
              </div>
            ) : (
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={images.provider1}
                  alt={images.provider1}
                  width={30}
                  height={30}
                />

                <p>MetaMask</p>
              </a>
            )}

            {loading ? (
              <Loading></Loading>
            ) : (
              <p className={Style.modal_meta_popular}>Popular</p>
            )}
          </li>

          <li className={Style.modal_meta_item}>
            <div>
              <Image
                src={images.provider2}
                alt={images.provider2}
                width={30}
                height={30}
              />
              <p>Coinbase Wallet</p>
            </div>

            <p className={Style.modal_meta_popular}>solana</p>
          </li>

          <li className={Style.modal_meta_item}>
            <div>
              <Image
                src={images.provider3}
                alt={images.provider3}
                width={30}
                height={30}
              />
              <p>WalletConnect</p>
            </div>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default ModalMetaMask;
