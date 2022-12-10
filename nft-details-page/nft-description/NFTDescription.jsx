import React, { useState } from 'react';
import Image from 'next/image';
import {
  MdVerified,
  MdCloudUpload,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from 'react-icons/ti';
import { BiTransferAlt, BiDollar } from 'react-icons/bi';

import Style from './NFTDescription.module.css';
import images from '../../img';

import Button from '../../components/Button/Button';
import LineChart from '@/components/NftChart/LineChart';

const NFTDescription = () => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <Button
              btnName="Sell"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </div>

        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>BearX #23453</h1>
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
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  1.000 ETH <span>( ≈ $3,221.22)</span>
                </p>
              </div>
            </div>
            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              <Button
                btnName="Add to Cart"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </div>

            <div className="mt-5">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
