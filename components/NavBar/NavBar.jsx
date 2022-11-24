import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
//----IMPORT ICON
import { MdNotifications, MdShoppingCart } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuRight } from 'react-icons/cg';
import { ethers } from 'ethers';
import { AnimatePresence, motion } from 'framer-motion';

//INTERNAL IMPORT
import Style from './NavBar.module.scss';
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import images from '../../img';
import SubTotalCart from './SubToTalCart/SubTotalCart';
import { useRecoilState } from 'recoil';
import { cartModalState } from '../../global-state/modal';
import ModalBase from '../Modal/ModalBase';
import Cart from '../Cart/Cart';
import Link from 'next/link';
import useHover from '../../hook/useHover';
import { connectMetaMaskState } from '../../global-state/connect-metamask';

const NavBar = () => {
  //----USESTATE COMPONNTS
  const [profileRef, isProfileRef] = useHover(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openCart, setOpenCart] = useRecoilState(cartModalState);
  const [discoveryRef, isDiscoveryRef] = useHover();
  const [helpRef, isHelpRef] = useHover();

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* left */}

        <div className={Style.navbar_container_left}>
          <Link href="/" passHref>
            <div className={Style.logo}>
              <img
                src="https://opensea.io/static/images/logos/opensea.svg"
                alt="logo"
              />
              <p>Underground</p>
            </div>
          </Link>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input
                type="text"
                placeholder="Search items, collections, and accounts"
              />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* right */}
        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          {/* Collection meny*/}
          <div className={Style.navbar_container_right_collection}>
            <Link href="/collection">Collection</Link>
          </div>

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
          <div className={Style.navbar_container_right_cart}>
            <MdShoppingCart
              className={Style.cart}
              onClick={() =>
                setOpenCart((prev) => {
                  return { ...prev, open: true, animation: true };
                })
              }
            ></MdShoppingCart>
            <SubTotalCart></SubTotalCart>
            <AnimatePresence>
              {openCart.open ? (
                <ModalBase selector="body">
                  <Cart></Cart>
                </ModalBase>
              ) : null}
            </AnimatePresence>
          </div>

          {/* CREATE BUTTON SECTION */}

          {/* USER PROFILE */}

          <div
            className={Style.navbar_container_right_profile_box}
            ref={profileRef}
          >
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                className={Style.navbar_container_right_profile}
              />
              <AnimatePresence>{isProfileRef && <Profile />}</AnimatePresence>
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
  );
};

export default NavBar;
