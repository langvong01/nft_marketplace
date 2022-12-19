import React, { useState } from 'react';

import { FaUserAlt, FaRegImage, FaMagic, FaRegListAlt } from 'react-icons/fa';

import Link from 'next/link';
import { motion } from 'framer-motion';

import Style from './Profile.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import { modalNotifyMetaMaskState } from '../../../global-state/modal';
import axiosClient from 'utils/axiosClient';
import { TbDownload } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile = ({ name }) => {
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [metaModal, setMetaModal] = useRecoilState(modalNotifyMetaMaskState);
  const router = useRouter();
  const resetMetaMask = useResetRecoilState(connectMetaMaskState);

  const handleClickNotLogin = () => {
    if (!metaMask.accountCurrent) {
      return setMetaModal((prev) => {
        return { ...prev, open: true };
      });
    }
    return;
  };

  const handleLogout = async () => {
    const response = await axiosClient.get('/auth/logout');
    if (response.status === 200) {
      resetMetaMask();
      router.push('/');
    }
  };

  console.log(name);

  return (
    <>
      <motion.div
        className={Style.profile}
        initial={{ y: '-15px', opacity: 0 }}
        animate={{ y: '4px', opacity: 1 }}
        exit={{ y: '-15px', opacity: 0 }}
        transition={{ duration: 0.2 }}
        type="spring"
      >
        <div className={Style.profile_menu}>
          {metaMask.accountCurrent.length > 0 && (
            <div
              className={`${Style.profile_menu_one_item} text-center `}
              onClick={handleClickNotLogin}
            >
              <p>Name</p>
              <p>{name || metaMask.accountCurrent.substring(-1, 10)}</p>
            </div>
          )}
          <div className={Style.profile_menu_one}>
            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaUserAlt />
              <p>
                {metaMask.accountCurrent ? (
                  <Link href={`/account/${metaMask.accountCurrent}`}>
                    My Account
                  </Link>
                ) : (
                  'My Account'
                )}
              </p>
            </div>
            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaMagic />
              <p>
                {metaMask.accountCurrent ? (
                  <Link href={`/uploadItem`}>Create Item</Link>
                ) : (
                  'Create Item'
                )}
              </p>
            </div>
            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaRegImage />

              <p>
                {metaMask.accountCurrent ? (
                  <Link href="/account-setting">Setting</Link>
                ) : (
                  'Setting'
                )}
              </p>
            </div>
            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaRegListAlt />

              <p>
                {metaMask.accountCurrent ? (
                  <Link href="/uploadNFT">Create A Collection</Link>
                ) : (
                  'Create A Collection'
                )}
              </p>
            </div>
          </div>

          {metaMask.accountCurrent ? (
            <div className={Style.profile_menu_two}>
              <div className={Style.profile_menu_one_item}>
                <TbDownload />
                <p>
                  <button onClick={handleLogout}>Disconnect</button>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
