import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiFillCopy } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './NFTDetailsImg.module.css';
import images from '../../img';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';

const NFTDetailsImg = ({ nft }) => {
  const [isdescription, setDescription] = useState(true);
  const [details, setDetails] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById('contractAdresss');
    navigator.clipboard.writeText(copyText.innerText);
    setToast({ ...toast, open: true });
  };

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
              Contract Adress
              <div className={Style.NFTDetailsImg_box_contract_address}>
                <span id="contractAdresss">
                  0xCA72f0Ce5e5d21B4bb5f3EF1C0dCF6d4f68d6cbC
                </span>
                <AiFillCopy
                  onClick={() => copyAddress()}
                  className={Style.NFTDetailsImg_box_icon}
                />
              </div>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              TokenID
              <span>
                {nft.tokenId
                  ? nft.tokenId
                  : 1212121}
              </span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Token Standard
              <span>ERC-721</span>
            </div>
            <div className={Style.NFTDetailsImg_box_details_row}>
              Creator Fee
              <span>5%</span>
            </div>
          </div>
        )}
      </div>
      <SnackBarSuccess
        open={toast.open}
        vertical={toast.vertical}
        horizontal={toast.horizontal}
        message="Copy is success"
        setToast={setToast}
      />
    </div>
  );
};

export default NFTDetailsImg;
