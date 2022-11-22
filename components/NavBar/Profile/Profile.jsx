import React from 'react';
import Image from 'next/image';
import { FaUserAlt, FaRegImage, FaUserEdit } from 'react-icons/fa';
import { MdHelpCenter } from 'react-icons/md';
import { TbDownloadOff, TbDownload } from 'react-icons/tb';
import Link from 'next/link';
import { motion } from 'framer-motion';
//INTERNAL IMPORT
import Style from './Profile.module.css';
import images from '../../../img';

const Profile = () => {
  return (
    <motion.div
      className={Style.profile}
      initial={{ y: '-15px', opacity: 0 }}
      animate={{ y: '4px', opacity: 1 }}
      exit={{ y: '-15px', opacity: 0 }}
      transition={{ duration: 0.2 }}
      type="spring"
    >
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: '/myprofile' }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: '/my-items' }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: '/edit-profile' }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: '/help' }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: '/disconnet' }}>Disconnet</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
