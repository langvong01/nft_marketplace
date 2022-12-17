import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsImages } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './NFTDetailsImg.module.css';
import images from '../../img';

const NFTDetailsImg = ({ nft }) => {
  const [isdescription, setDescription] = useState(true);
  const [details, setDetails] = useState(true);

  // console.log(nft)
  const openDescription = () => {
    if (!isdescription) {
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
              loader={() => nft.mediaFileUrl}
              src={nft?.mediaFileUrl}
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
          {isdescription ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {isdescription && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.description}</p>
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
              <span>0xCA72f0Ce5e5d21B4bb5f3EF1C0dCF6d4f68d6cbC</span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              TokenID
              <span>
                {nft.tokenId
                  ? nft.tokenId
                  : 26776806034831086110511202867227999346767805661781029920799572850214803875600}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Token Standard
              <span>ERC-1155</span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Creator Fee
              <span>5%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
