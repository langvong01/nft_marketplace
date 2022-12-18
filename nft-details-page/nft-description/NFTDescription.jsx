import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Style from './NFTDescription.module.css';
import images from '../../img';
import Button from '../../components/Button/Button';
import LineChart from '@/components/NftChart/LineChart';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';
import axiosClient from 'utils/axiosClient';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { cartState } from 'global-state/cart';
import Link from 'next/link';

const NFTDescription = ({ nft }) => {
  const [btn, setBtn] = useState({
    isOnSale: null,
    isOwner: null,
  });
  const [cart, setCart] = useRecoilState(cartState);

  const handleAddItem = (item) => {
    setCart((prev) => {
      const newArray = [...new Set([...prev.idItemSelected, item.itemId])];
      let newArrayItem = [...new Set([...prev.items, item])];

      return { ...prev, idItemSelected: newArray, items: newArrayItem };
    });

    setToast((prev) => {
      return { ...prev, open: true, message: 'Added to cart' };
    });
  };
  const handleRemoveCart = (item) => {
    setCart((prev) => {
      let newArrayId = [...new Set([...prev.idItemSelected, item.itemId])];

      //delete id
      newArrayId = newArrayId.filter((id) => {
        return id !== item.itemId;
      });

      const newArrayItem = prev.items.filter((itemMap) => {
        return item.itemId !== itemMap.itemId;
      });

      return { ...prev, idItemSelected: newArrayId, items: newArrayItem };
    });

    setToast((prev) => {
      return { ...prev, open: true, message: 'Removed to cart' };
    });
  };

  const [toast, setToast] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    message: null,
  });

  const btnAddtoCart = btn.isOnSale && !btn.isOwner;
  const router = useRouter();

  useEffect(() => {
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
          {nft.collectionName && (
            <div className="">
              <button
                onClick={() => router.push(`/collection/${nft.collectionName}`)}
                className="text-primary text-capitalize fs-5"
              >
                {nft.collectionName}
              </button>
            </div>
          )}
          {btn.isOwner && (
            <div className={Style.NFTDescription_box_share_box}>
              {!btn.isOnSale && (
                <Button
                  btnName="Sell"
                  handleClick={() => router.push(`/sell/${nft.itemId}`)}
                  classStyle={Style.button}
                />
              )}
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
              {nft?.creator?.avatar ? (
                <Image
                  loader={() => nft.creator?.avatar}
                  src={nft.creator.avatar}
                  alt="creatorProFile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
              ) : (
                <Image
                  src={images.imgDefault}
                  alt="creatorProFile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
              )}
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={`/account/${nft.creator.walletAddress}`}>
                  <span className="text-primary" style={{ cursor: 'pointer' }}>
                    {nft.creator.name}
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
            {nft?.ownedBy?.avatar ? (
                <Image
                  loader={() => nft.ownedBy?.avatar}
                  src={nft.ownedBy.avatar}
                  alt="ownedProFile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
              ) : (
                <Image
                  src={images.imgDefault}
                  alt="ownedProFile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
              )}
              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Owner</small> <br />
                <Link href={`/account/${nft.ownedBy.walletAddress}`}>
                  <span className="text-primary" style={{ cursor: 'pointer' }}>
                    {nft.ownedBy.name}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            {btn.isOnSale && (
              <div
                className={Style.NFTDescription_box_profile_biding_box_price}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_price_bid
                  }
                >
                  <small>Current Price</small>
                  <p>
                    {nft.price} MATIC<span>( ≈ $3,221.22)</span>
                  </p>
                </div>
              </div>
            )}
          </div>
          {btnAddtoCart && (
            <div
              className={Style.NFTDescription_box_profile_biding_box_button}
              s
            >
              {!cart.idItemSelected.includes(nft.itemId) ? (
                <Button
                  btnName="Add to Cart"
                  handleClick={() => handleAddItem(nft)}
                  classStyle={`${Style.button} w-100`}
                />
              ) : (
                <Button
                  btnName="Remove from Cart"
                  handleClick={() => handleRemoveCart(nft)}
                  classStyle={`${Style.button} w-100`}
                />
              )}
            </div>
          )}

          <div className="mt-5">
            <LineChart />
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
