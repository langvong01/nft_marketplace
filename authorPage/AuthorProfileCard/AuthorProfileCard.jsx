import React, { useState } from 'react';
import Image from 'next/image';
import { MdVerified, MdCloudUpload } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './AuthorProfileCard.module.css';
import images from '../../img';
import Button from '../../components/Button/Button';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';

const AuthorProfileCard = ({ profile }) => {
  const [share, setShare] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById('myWalletAdress');
    navigator.clipboard.writeText(copyText.innerText);
    setToast({ ...toast, open: true });
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
    } else {
      setShare(false);
    }
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          <Image
            loader={() => profile.avatar}
            src={profile?.avatar}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <div className={Style.AuthorProfileCard_box_info_name}>
            <h2>{profile?.name}</h2>
            <MdVerified className={Style.AuthorProfileCard_box_info_icon} />
          </div>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <span id="myWalletAdress">{profile?.walletAddress}</span>
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfileCard_box_info_icon}
            />
            <SnackBarSuccess
              open={toast.open}
              vertical={toast.vertical}
              horizontal={toast.horizontal}
              message="Copy is success"
              setToast={setToast}
            />
          </div>
          <div className={Style.AuthorProfileCard_box_info_address}>
            <span id="myWalletAdress">{profile?.email}</span>
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfileCard_box_info_icon}
            />
          </div>
          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
          </div>
        </div>

        <div className={Style.AuthorProfileCard_box_share}>
          <Button btnName="Follow" handleClick={() => {}} />
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{' '}
                {''}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{' '}
                {''}
                Instragram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{' '}
                {''}
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{' '}
                {''}
                YouTube
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
