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

const AuthorProfileCard = () => {
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
            src={images.nft_image_1}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
          />
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          <div className={Style.AuthorProfileCard_box_info_name}>
            <h2>Dony Herrera</h2>
            <MdVerified className={Style.AuthorProfileCard_box_info_icon} />
          </div>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <span id="myWalletAdress">
              0xf4910c763ed4e47a585e2d34baa9a4b611ae448c
            </span>
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfileCard_box_info_icon}
            />
            <SnackBarSuccess
              open={toast.open}
              vertical={toast.vertical}
              horizontal={toast.horizontal}
              message="Copy is success"
              setToast = {setToast}
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
          {/* <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{' '}
              {''}
              Report abouse
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
