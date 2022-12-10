import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './NFTDetailsImg.module.css';
import images from '../../img';

const NFTDetailsImg = () => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);

  const openDescription = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={images.nft_image_1}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={1000}
              height={1000}
              objectFit="cover"
            />
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>
              Tattooed Kitty Gang (“TKG”) is a collection of 666 badass kitty
              gangsters, with symbol of tattoos, living in the Proud Kitty Gang
              (“PKG”) metaverse. Each TKG is an 1/1 ID as gangster member & all
              the joint rights.
            </p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Contract Address
              <span>0xf4910c763ed4e47a585e2d34baa9a4b611ae448c</span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              TokenID
              <span>
                26776806034831086110511202867227999346767805661781029920799572850214803875600
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Token Standard
              <span>ERC-1155</span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Creator Fee
              <span>0%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
