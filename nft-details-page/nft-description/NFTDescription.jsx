import React, { useState } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';

import Style from './NFTDescription.module.css';
import images from '../../img';

import Button from '../../components/Button/Button';
import LineChart from '@/components/NftChart/LineChart';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';

import axiosClient from 'utils/axiosClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NFTDescription = ({ nft }) => {
  const [btn, setBtn] = useState({
    isOnSale: null,
    isOwner: null,
  });
  const [toast, setToast] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null,
  });

  const btnAddtoCart = btn.isOnSale && !btn.isOwner;
  const router = useRouter();

  useEffect(() => {
    const boolean = false;

    if (nft.isOnSale === 1) {
      setBtn((prev) => {
        return { ...prev, isOnSale: true };
      });
    }
    if (nft.isOwner === 1) {
      setBtn((prev) => {
        return { ...prev, isOwner: true };
      });
    }
  }, [nft.isOnSale, nft.isOwner]);

  const handleCancelListingClick = async () => {
    try {
      const { data } = await axiosClient.get(
        `/item/cancel-listing?itemId=${nft.itemId}`
      );
      setBtn({
        ...btn,
        isOnSale: false,
      });
      setToast({
        ...toast,
        open: true,
        message: 'Cancel Lising is successly',
      });
    } catch (error) {}
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          {btn.isOwner && (
            <div className={Style.NFTDescription_box_share_box}>
              <Button
                btnName="Sell"
                handleClick={() => router.push(`/sell/${nft.itemId}`)}
                classStyle={Style.button}
              />
              {btn.isOnSale && (
                <Button
                  btnName="Cancel Listing"
                  classStyle={`${Style.button} mt-2`}
                  handleClick={handleCancelListingClick}
                ></Button>
              )}
            </div>
          )}
        </div>

        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1 className="text-capitalize">{nft.itemName}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <span>
                  Karli Costa <MdVerified />
                </span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.user2}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Creator</small> <br />
                <span>
                  Karli Costa <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            {btn.isOnSale === 1 && (
              <div
                className={Style.NFTDescription_box_profile_biding_box_price}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_price_bid
                  }
                >
                  <small>Current Bid</small>
                  <p>
                    {nft.price} MATIC<span>( ≈ $3,221.22)</span>
                  </p>
                </div>
              </div>
            )}
            {btnAddtoCart && (
              <div
                className={Style.NFTDescription_box_profile_biding_box_button}
                s
              >
                <Button
                  btnName="Add to Cart"
                  handleClick={() => {}}
                  classStyle={`${Style.button} w-100`}
                />
              </div>
            )}

            <div className="mt-5">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
      <SnackBarSuccess
        open={toast.open}
        vertical={toast.vertical}
        horizontal={toast.horizontal}
        message={toast.message}
        setToast={setToast}
      />
    </div>
  );
};

export default NFTDescription;
