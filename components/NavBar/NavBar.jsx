import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NoSsr from '@mui/material/NoSsr';
//----IMPORT ICON
import { MdPayments, MdShoppingCart, MdAccountCircle } from 'react-icons/md';
import { CgMenuRight } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';
//INTERNAL IMPORT
import Style from './NavBar.module.scss';
import images from '../../img';
import SubTotalCart from './sub-total-cart/SubTotalCart';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  modalCartState,
  modalNotifyMetaMaskState,
  modalPaymentState,
  modalPaymentStateSuccess,
} from '../../global-state/modal';
import ModalBase from '../Modal/ModalBase';
import Cart from '../Cart/Cart';
import Link from 'next/link';
import useHover from '../../hook/useHover';
import { connectMetaMaskState } from '../../global-state/connect-metamask';
import ModalMetaMask from '../Modal/modal-notify-metamask/ModalMetaMask';
import ModalWallet from '../Modal/modal-wall-net/ModalWallet';
import Profile from './Profile/Profile';
import HelpCenter from './help-center/HelpCenter';
import Discover from './Discover/Discover';
import Search from '../search/Search';
import SideBar from './side-bar/SideBar';
import { cartState } from 'global-state/cart';
import ModalPayment from '../Modal/modal-payment/ModalPayment';
import { useCallback } from 'react';
import axiosClient from 'utils/axiosClient';
import { useRouter } from 'next/router';
import ModalPaymentSuccess from '../Modal/modal-payment-success/ModalPaymentSuccess';
import { profileState } from 'global-state/profile';

const NavBar = () => {
  //----USESTATE COMPONNTS
  const [profile, setProfile] = useRecoilState(profileState);
  const [nameAccount, setNameAccount] = useState(null);
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  //set AvatarDefault
  const [avatar, setAvatar] = useState(undefined);

  const [profileRef, isProfileRef] = useHover();
  const [discoveryRef, isDiscoveryRef] = useHover();
  const [helpRef, isHelpRef] = useHover();
  const resetMetaMask = useResetRecoilState(connectMetaMaskState);

  const [isOpenModalMetaMask, setIsOpenModalMetaMask] = useRecoilState(
    modalNotifyMetaMaskState
  );

  const [openCart, setOpenCart] = useRecoilState(modalCartState);
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [cart, setCart] = useRecoilState(cartState);
  const [modalPayment, setModalPayment] = useRecoilState(modalPaymentState);

  const fetchProfileDetail = useCallback(async () => {
    if (metaMask?.accountCurrent) {
      const { data } = await axiosClient.get(
        `/profile/${metaMask.accountCurrent}`
      );

      return data?.body;
    }
  }, [metaMask.accountCurrent]);

  useEffect(() => {
    fetchProfileDetail().then((data) => {
      if (data?.avatar) {
        setNameAccount(data?.name ? data.name : null);
        setAvatar(data.avatar);
      } else {
        setNameAccount(data?.name ? data.name : null);
        setAvatar(images.imgDefault.src);
      }
    });
  }, [fetchProfileDetail, profile]);
  const [modalPaymentSuccess, setModalPaymentSuccess] = useRecoilState(
    modalPaymentStateSuccess
  );

  const handleOpenMeta = () => {
    setIsOpenModalMetaMask((prev) => {
      return { ...prev, open: true };
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async function (accounts) {
        resetMetaMask();
        handleOpenMeta();
        router.push('/');
      });
    }
  }, []);

  return (
    <NoSsr>
      <div className={Style.navbar}>
        <div className={Style.navbar_container}>
          {/* left */}

          <div className={Style.navbar_container_left}>
            <Link href="/" passHref>
              <div className={Style.logo}>
                <img
                  src="https://png.pngtree.com/png-clipart/20220729/original/pngtree-modern-box-nft-logo-png-vector-png-image_8424398.png"
                  alt="logo"
                />
                <p className="font-title text-2xl">Underground</p>
              </div>
            </Link>
            <Search></Search>
          </div>

          {/* right */}
          {/* //END OF LEFT SECTION */}
          <div className={Style.navbar_container_right}>
            {/* DISCOVER MENU */}
            <div
              className={Style.navbar_container_right_discover}
              ref={discoveryRef}
            >
              <p>Discover</p>
              <AnimatePresence>
                {isDiscoveryRef && (
                  <motion.ul
                    className={Style.navbar_container_right_discover_box}
                    initial={{ y: '-15px', opacity: 0 }}
                    animate={{ y: '16px', opacity: 1 }}
                    exit={{ y: '-15px', opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="spring"
                  >
                    <Discover />
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* HELP CENTER MENU */}
            <div className={Style.navbar_container_right_help} ref={helpRef}>
              <p>Help Center</p>
              <AnimatePresence>
                {isHelpRef && (
                  <motion.ul
                    className={Style.navbar_container_right_help_box}
                    initial={{ y: '-15px', opacity: 0 }}
                    animate={{ y: '16px', opacity: 1 }}
                    exit={{ y: '-15px', opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="spring"
                  >
                    <HelpCenter />
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <div
              className={Style.navbar_container_right_cart}
              onClick={() =>
                setOpenCart((prev) => {
                  return { ...prev, open: true };
                })
              }
            >
              <MdShoppingCart className={Style.cart_icons}></MdShoppingCart>
              <SubTotalCart number={cart.idItemSelected.length}></SubTotalCart>
            </div>

            {/* CREATE Meta mask */}
            {/* Cart */}
            <div className={Style.navbar_container_right_metamask}>
              <MdPayments
                className={Style.metamask}
                onClick={handleOpenMeta}
              ></MdPayments>
            </div>
            {/* USER PROFILE */}

            <div
              className={Style.navbar_container_right_profile_box}
              ref={profileRef}
            >
              <div className={Style.navbar_container_right_profile}>
                <div className={Style.navbar_right_profile_icon_box}>
                  {!metaMask.isLogin ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      width={40}
                      height={40}
                      className={`${Style.navbar_container_right_profile} w-[50px] h-[50px]`}
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="Profile"
                      width={40}
                      height={40}
                      className={`${Style.navbar_container_right_profile} w-[50px] h-[50px]`}
                    />
                  )}
                </div>
                <AnimatePresence>
                  {isProfileRef && <Profile name={nameAccount} />}
                </AnimatePresence>
              </div>
            </div>

            <div className={Style.navbar_container_right_menuBtn}>
              <CgMenuRight
                className={Style.menuIcon}
                onClick={() => openSideBar()}
              />
            </div>
          </div>
        </div>

        {/* SIDBAR CPMPONE/NT */}
        {openSideMenu && (
          <div className={Style.sideBar}>
            <SideBar setOpenSideMenu={setOpenSideMenu} />
          </div>
        )}
      </div>

      {/* modal cart */}
      <AnimatePresence>
        {openCart.open ? (
          <ModalBase selector="body">
            <Cart></Cart>
          </ModalBase>
        ) : null}
      </AnimatePresence>

      {/* modal connect metamask */}

      <AnimatePresence>
        {isOpenModalMetaMask.open ? (
          <ModalBase selector="body">
            {!metaMask.accountCurrent ? (
              <ModalMetaMask></ModalMetaMask>
            ) : (
              <ModalWallet></ModalWallet>
            )}
          </ModalBase>
        ) : null}
      </AnimatePresence>

      {/* modal payment */}

      <AnimatePresence>
        {modalPayment.open ? (
          <ModalBase selector="body">
            <ModalPayment></ModalPayment>
          </ModalBase>
        ) : null}
      </AnimatePresence>

      {/* modal-payment-success */}
      <AnimatePresence>
        {modalPaymentSuccess.open ? (
          <ModalBase selector="body">
            <ModalPaymentSuccess></ModalPaymentSuccess>
          </ModalBase>
        ) : null}
      </AnimatePresence>
    </NoSsr>
  );
};

export default NavBar;
